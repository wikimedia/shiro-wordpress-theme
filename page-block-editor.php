<?php
/**
 * The template for displaying block editor pages.
 *
 * This is a complete replacement of page.php when all pages are converted to
 * blocks.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package shiro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // File should never be accessed directly.
}

get_header();

while ( have_posts() ) {
	the_post();

	$template_args = [];

	$blocks = parse_blocks( get_post()->post_content );
	$first_block = $blocks[0]['blockName'];
	$show_title = (
			$first_block !== 'shiro/landing-page-hero' &&
			$first_block !== 'shiro/home-page-hero' &&
			$first_block !== 'shiro/report-landing-hero'
	);

	if ( $show_title ) {
		$template_args['h1_title'] = get_the_title();
	}

	/**
	 * Breadcrumb link switch
	 *
	 * Possible values of the switch:
	 * 1. '' - meta data from component not set (page wasn't yet edited with this component on the page)
	 * 2. 'on' - set to yes
	 * 3. 'off' - set to no
	 */
	$breadcrumb_link_switch = get_post_meta( get_the_ID(), 'show_breadcrumb_links', true );
	$parent_page = wp_get_post_parent_id( get_the_ID() );
	$template_args['breadcrumb_parent'] = $parent_page;
	$show_breadcrumb = false;

	if ( $breadcrumb_link_switch === 'on' ) {
		$template_args['breadcrumb_custom_parent_link']  = get_post_meta( get_the_ID(), 'breadcrumb_link_title', true );
		$template_args['breadcrumb_custom_parent_title'] = get_post_meta( get_the_ID(), 'breadcrumb_link_url', true );

		$show_breadcrumb = true;
	} elseif ( $breadcrumb_link_switch === 'off' ) { // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedElseif
		// Does nothing.
	} elseif ( $breadcrumb_link_switch === '' && $show_title ) {
		// Default behavior.
		if ( ! empty( $parent_page ) ) {
			$show_breadcrumb = true;
		}
	}

	if ( $show_title || $show_breadcrumb ) {
		get_template_part( 'template-parts/header/page', 'noimage', $template_args );
	} else {
		?>
		</div>
	</div><!-- Close out the secondary header. -->

	<main id="content" class="module-area article-main is-layout-constrained has-global-padding">
		<?php
	}

	the_content();
}
get_footer();
