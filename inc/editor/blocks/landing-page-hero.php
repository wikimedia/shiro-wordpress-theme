<?php
/**
 * Custom editor filtering for deprecation handling around Landing Page Hero
 * InnerBlock content. We tried to do this as a normal block deprecation, but
 * the combination of attributes in production resulted in a very unreliable
 * conversion hit rate and content was being lost on conversion.
 */

namespace WMF\Editor\Blocks\LandingPageHero;

const CTA_LINK_PATTERN = '/(<a[^>]+class="[^"]*hero__call-to-action[^>]+target="_blank"[^>]*)>/';
const PAGE_INTRO_PATTERN = '/<div class="hero__intro"><p>(.*?)<\/p><\/div>/';

/**
 * Connect namespace functions to actions and hooks.
 */
function bootstrap() {
	add_action( 'rest_request_after_callbacks', __NAMESPACE__ . '\\maybe_set_open_in_new_tab', 10, 3 );
	add_action( 'rest_request_after_callbacks', __NAMESPACE__ . '\\convert_page_intro_to_blocks', 10, 3 );
}

/**
 * Helper function to detect whether a REST response is edit-context and
 * contains an instance of the langing page hero block.
 *
 * @param \WP_REST_Response|\WP_Error $response Result to send to the client.
 * @param \WP_REST_Request            $request  Request used to generate the response.
 * @return bool Whether this is a context=edit request for a post with a Landing Page Hero.
 */
function _contains_landing_page_hero_block( $response, $request ) {
	if ( is_wp_error( $response ) ) {
		return false;
	}
	if ( $request->get_param( 'context' ) !== 'edit' ) {
		return false;
	}
	if ( strpos( $response->get_data()['content']['raw'] ?? '', 'landing-page-hero' ) === false ) {
		return false;
	}
	return true;
}

/**
 * Detect manually-added markup for opening a Landing Page Hero CTA in a new tab,
 * and set the block attribute that will allow that to function properly.
 *
 * This is difficult to implement as a deprecation because we are simultaneously
 * dealing with the "pageIntro to InnerBlocks" transform.
 *
 * @param \WP_REST_Response|\WP_Error $response Result to send to the client.
 * @param array                       $handler  Route handler used for the request.
 * @param \WP_REST_Request            $request  Request used to generate the response.
 */
function maybe_set_open_in_new_tab( $response, $handler, $request ) {
	if ( ! _contains_landing_page_hero_block( $response, $request ) ) {
		return $response;
	}

	$data = $response->get_data();
	if ( strpos( $data['content']['raw'], 'ctaOpenInNewTab' ) !== false ) {
		// Attribute already exists, carry on.
		return $response;
	}

	preg_match( CTA_LINK_PATTERN, $data['content']['raw'], $matches );
	if ( empty( $matches ) ) {
		// No target="_blank" markup detected.
		return $response;
	}

	// Standardize the rel attribute in the matched link.
	$data['content']['raw'] = preg_replace(
		CTA_LINK_PATTERN,
		'$1 rel="noreferrer noopener">',
		preg_replace( '/ rel="(noreferrer ?|noopener ?)+"/', '', $data['content']['raw'] )
	);

	// Set the open-in-new-tab when the block doesn't have attrs already.
	$data['content']['raw'] = str_replace(
		'<!-- wp:shiro/landing-page-hero -->',
		'<!-- wp:shiro/landing-page-hero {"ctaOpenInNewTab":true} -->',
		$data['content']['raw']
	);

	// Set the open-in-new-tab attr in the more common case where block has attrs.
	$data['content']['raw'] = str_replace(
		'<!-- wp:shiro/landing-page-hero {',
		'<!-- wp:shiro/landing-page-hero {"ctaOpenInNewTab":true,',
		$data['content']['raw']
	);

	$response->set_data( $data );
	return $response;
}

/**
 * Filter edit-context requests for posts including the Landing Page Hero block
 * to convert the rendered pageIntro RichText into full InnerBlocks.
 *
 * @param \WP_REST_Response|\WP_Error $response Result to send to the client.
 * @param array                       $handler  Route handler used for the request.
 * @param \WP_REST_Request            $request  Request used to generate the response.
 */
function convert_page_intro_to_blocks( $response, $handler, $request ) {
	if ( ! _contains_landing_page_hero_block( $response, $request ) ) {
		return $response;
	}

	$data = $response->get_data();
	preg_match( PAGE_INTRO_PATTERN, $data['content']['raw'], $matches );
	if ( empty( $matches ) ) {
		return $response;
	}

	$paragraph_blocks = array_map(
		fn ( $content ) => "<!-- wp:paragraph -->\n$content\n<!-- /wp:paragraph -->",
		explode( '</p><p>', $matches[1] )
	);
	$data['content']['raw'] = preg_replace(
		PAGE_INTRO_PATTERN,
		'<div class="hero__intro">' . implode( '', $paragraph_blocks ) . '</div>',
		$data['content']['raw']
	);

	$response->set_data( $data );
	return $response;
}
