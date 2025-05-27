<?php
/**
 * Title: Mega menu - news
 * Slug: shiro/mega-news
 * Description: Mega menu container for the "news" menu.
 * Categories: menu
 * Keywords: 
 * Viewport Width: 1500
 * Block Types:
 * Post Types: wp_template
 * Inserter: true
 */

?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}},"backgroundColor":"black-05","layout":{"type":"default"}} -->
<div class="wp-block-group has-black-05-background-color has-background" style="padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40)"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"21.75rem","metadata":{"name":"Intro"},"className":"intro","style":{"spacing":{"blockGap":"var:preset|spacing|16"}}} -->
<div class="wp-block-column intro" style="flex-basis:21.75rem"><!-- wp:heading {"fontSize":"x-large"} -->
<h2 class="wp-block-heading has-x-large-font-size">Now more than ever, people need access to information they can trust. Stay up to date on our efforts to maintain free knowledge.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|primary-legacy-blue-aaa"}}}}} -->
<p class="has-link-color"><a href="/news/">Find out more</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"metadata":{"name":"Pages"},"className":"pages"} -->
<div class="wp-block-column pages"><!-- wp:query {"queryId":0,"query":{"perPage":3,"pages":"1","offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"taxQuery":null,"parents":[],"format":[]},"layout":{"type":"default"}} -->
<div class="wp-block-query"><!-- wp:post-template {"style":{"spacing":{"blockGap":"var:preset|spacing|24"}},"layout":{"type":"grid","columnCount":3}} -->
<!-- wp:post-featured-image {"isLink":true,"sizeSlug":"medium"} /-->

<!-- wp:group -->
<div class="wp-block-group">
<!-- wp:post-terms {"term":"category"} /-->
<!-- wp:post-title {"level":4,"isLink":true} /-->
 </div>
<!-- /wp:group -->

<!-- /wp:post-template --></div>
<!-- /wp:query --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->
