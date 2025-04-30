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
<!-- wp:group {"tagName":"header","metadata":{"name":"Header"},"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|medium","bottom":"var:preset|spacing|medium","right":"var:preset|spacing|medium","left":"var:preset|spacing|medium"}},"elements":{"link":{"color":{"text":"var:preset|color|main"}}},"border":{"bottom":{"color":"var:preset|color|border-light","width":"1px"},"top":{},"right":{},"left":{}}},"backgroundColor":"base","layout":{"inherit":true,"type":"constrained"}} -->
<header class="wp-block-group alignfull has-base-background-color has-background has-link-color" style="border-bottom-color:var(--wp--preset--color--border-light);border-bottom-width:1px;padding-top:var(--wp--preset--spacing--medium);padding-right:var(--wp--preset--spacing--medium);padding-bottom:var(--wp--preset--spacing--medium);padding-left:var(--wp--preset--spacing--medium)"><!-- wp:group {"align":"wide","layout":{"type":"flex","justifyContent":"space-between"}} -->
<div class="wp-block-group alignwide">
	<!-- wp:site-logo {"width":144,"shouldSyncIcon":false} /-->

	<!-- wp:navigation {"ref":77177,"openSubmenusOnClick":true,"icon":"menu","style":{"spacing":{"blockGap":"var:preset|spacing|small"},"layout":{"selfStretch":"fit","flexSize":null}},"fontSize":"small"} /-->

	<?php
	/**
	 * Available translations are calculated here because we need to know it to
	 * determine if the inner header should initialize the language switcher
	 * dropdown.
	 */
	$translations = array_filter( wmf_get_translations(), function ( $translation ) {
		return $translation['uri'] !== '';
	} );
	?>
	<?php get_template_part( 'template-parts/site-header/language-switcher', null, [ 'translations' => $translations ] ); ?>
	<div class='nav-search nav-search--desktop'>
		<?php get_template_part( 'template-parts/site-navigation/search' ); ?>
	</div>
	<?php get_template_part( 'template-parts/site-header/donate' ); ?>
</div>
<!-- /wp:group --></header>
<!-- /wp:group -->

<?php
// Add translation alert for untranslated content.
wmf_translation_alert();
?>
