<?php
/**
 * Title: Footer
 * Slug: shiro/footer-dark
 * Description: 
 * Categories: footer
 * Keywords: 
 * Viewport Width: 1500
 * Block Types: core/template-part/footer
 * Post Types: wp_template
 * Inserter: true
 */

//phpcs:ignore WordPressVIPMinimum.Security.Mustache
?>

<!-- wp:group {"tagName":"footer","metadata":{"name":"Footer"},"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|xx-large","bottom":"var:preset|spacing|xx-large","right":"var:preset|spacing|medium","left":"var:preset|spacing|medium"},"margin":{"top":"0px"},"blockGap":"var:preset|spacing|x-large"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"backgroundColor":"main","textColor":"base","layout":{"inherit":true,"type":"constrained"}} -->
<footer class="wp-block-group alignfull has-base-color has-main-background-color has-text-color has-background has-link-color" style="margin-top:0px;padding-top:var(--wp--preset--spacing--xx-large);padding-right:var(--wp--preset--spacing--medium);padding-bottom:var(--wp--preset--spacing--xx-large);padding-left:var(--wp--preset--spacing--medium)"><!-- wp:columns {"metadata":{"name":"Footer Columns"},"align":"wide","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|x-large","left":"var:preset|spacing|x-large"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:site-title {"level":0,"isLink":false,"style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} /-->

<!-- wp:paragraph {"textColor":"main-accent","fontSize":"small"} -->
<p class="has-main-accent-color has-text-color has-small-font-size"><?php esc_html_e( 'Easily create beautiful, fully-customizable websites with the new WordPress Site Editor and the Shiro block theme.', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:social-links {"iconColor":"main","iconColorValue":"#150E29","iconBackgroundColor":"base","iconBackgroundColorValue":"#fff","className":"is-style-default","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|small","left":"var:preset|spacing|small"}}},"layout":{"type":"flex","justifyContent":"left"}} -->
<ul class="wp-block-social-links has-icon-color has-icon-background-color is-style-default"><!-- wp:social-link {"url":"#","service":"twitter"} /-->

<!-- wp:social-link {"url":"#","service":"instagram"} /-->

<!-- wp:social-link {"url":"#","service":"linkedin"} /-->

<!-- wp:social-link {"url":"#","service":"facebook"} /--></ul>
<!-- /wp:social-links --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:columns {"metadata":{"name":"Nav Columns"}} -->
<div class="wp-block-columns"><!-- wp:column {"metadata":{"name":"Nav Column"}} -->
<div class="wp-block-column"><!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}}} -->
<p style="font-style:normal;font-weight:600"><?php esc_html_e( 'Company', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|small"}},"textColor":"main-accent","fontSize":"small","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-main-accent-color has-text-color has-small-font-size"><!-- wp:paragraph -->
<p><?php esc_html_e( 'About', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Careers', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Brand Assets', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Contact', 'shiro' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"metadata":{"name":"Nav Column"}} -->
<div class="wp-block-column"><!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}}} -->
<p style="font-style:normal;font-weight:600"><?php esc_html_e( 'Resources', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|small"}},"textColor":"main-accent","fontSize":"small","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-main-accent-color has-text-color has-small-font-size"><!-- wp:paragraph -->
<p><?php esc_html_e( 'Blog', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Contact', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Support Docs', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Get Help', 'shiro' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"metadata":{"name":"Nav Column"}} -->
<div class="wp-block-column"><!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}}} -->
<p style="font-style:normal;font-weight:600"><?php esc_html_e( 'Product', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|small"}},"textColor":"main-accent","fontSize":"small","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-main-accent-color has-text-color has-small-font-size"><!-- wp:paragraph -->
<p><?php esc_html_e( 'Features', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Pricing', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Use Cases', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Demo', 'shiro' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->
</footer>
<!-- /wp:group -->
