<?php
/**
 * Title: Header Light
 * Slug: shiro/header-light
 * Description: Header with nav and social icons
 * Categories: header
 * Keywords: header, nav, links, button
 * Viewport Width: 1500
 * Block Types: core/template-part/header
 * Post Types: wp_template
 * Inserter: true
 */

?>

<!-- wp:group {"tagName":"header","metadata":{"name":"Header"},"align":"full","className":"site-header","style":{"spacing":{"padding":{"top":"var:preset|spacing|medium","bottom":"var:preset|spacing|medium","right":"var:preset|spacing|medium","left":"var:preset|spacing|medium"}},"elements":{"link":{"color":{"text":"var:preset|color|main"}}},"border":{"bottom":{"color":"var:preset|color|border-light","width":"1px"},"top":[],"right":[],"left":[]},"position":{"type":"sticky","top":"0px"}},"backgroundColor":"base","layout":{"inherit":true,"type":"constrained"}} -->
<header class="wp-block-group alignfull site-header has-base-background-color has-background has-link-color" style="border-bottom-color:var(--wp--preset--color--border-light);border-bottom-width:1px;padding-top:var(--wp--preset--spacing--medium);padding-right:var(--wp--preset--spacing--medium);padding-bottom:var(--wp--preset--spacing--medium);padding-left:var(--wp--preset--spacing--medium)"><!-- wp:group {"align":"wide","layout":{"type":"flex","justifyContent":"space-between"}} -->
<?php
/**
 * Available translations are calculated here because we need to know it to
 * determine if the inner header should initialize the language switcher
 * dropdown.
 *
 * TODO: Move the translations into a block or core nav menu.
 */
$translations = array_filter( wmf_get_translations(), function ( $translation ) {
	return $translation['uri'] !== '';
} );
?>
<div class="wp-block-group alignwide" <?php if ( count( $translations ) > 0 ) : ?>
			data-dropdown="language-switcher" data-dropdown-toggle=".language-switcher__button"
			data-dropdown-status="uninitialized"
			data-dropdown-content=".language-switcher__content"
			data-visible="no" data-trap="inactive" data-backdrop="inactive" data-toggleable="yes"
		<?php endif; ?>>
	<!-- wp:site-logo {"width":144,"shouldSyncIcon":false} /-->

	<!-- wp:navigation {"openSubmenusOnClick":true,"icon":"menu","style":{"spacing":{"blockGap":"var:preset|spacing|small"},"layout":{"selfStretch":"fit","flexSize":null}},"fontSize":"small"} /-->
	<?php get_template_part( 'template-parts/site-header/language-switcher', null, [ 'translations' => $translations ] ); ?>
	<!-- wp:buttons -->
	<div class="wp-block-buttons"><!-- wp:button -->
	<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://donate.wikimedia.org/?wmf_medium=wmfSite&amp;wmf_campaign=navButton&amp;uselang=en&amp;wmf_source=10">Donate now</a></div>
	<!-- /wp:button --></div>
	<!-- /wp:buttons -->
</div>
<!-- /wp:group --></header>
<!-- /wp:group -->
