<?php
/**
 * Title: Our work news carousel
 * Slug: shiro/news-carousel
 * Description: Block pattern for a full-width news carousel with surrounding elements.
 * Categories: wikimedia
 * Keywords:
 * Viewport Width: 1500
 * Block Types:
 * Post Types:
 * Inserter: true
 */

?>

<!-- wp:group {"align":"full","backgroundColor":"lightest-purple","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-lightest-purple-background-color has-background"><!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"31.75%"} -->
<div class="wp-block-column" style="flex-basis:31.75%"><!-- wp:heading -->
<h2 class="wp-block-heading">Our work</h2>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:paragraph -->
<p>Read more about how we are supporting the people, policies, and products that make Wikipedia and Wikimedia projects possible.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:shiro/carousel {"perPage":3,"layout":"carousel-posts","align":"wide"} -->
<div class="wp-block-shiro-carousel alignwide shiro-carousel" data-splide="{&quot;label&quot;:&quot;&quot;,&quot;perPage&quot;:3,&quot;arrows&quot;:true,&quot;pagination&quot;:true,&quot;type&quot;:&quot;slide&quot;,&quot;autoplay&quot;:false,&quot;interval&quot;:5000,&quot;arrowPath&quot;:&quot;M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0Zm0 8.87-1.962 1.975 7.764 7.764H8.87v2.782h16.932l-7.764 7.778L20 31.13 31.13 20 20 8.87Z&quot;}"><!-- wp:query {"queryId":5,"query":{"perPage":6,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"taxQuery":null,"parents":[],"format":[]},"className":"shiro-carousel__track"} -->
<div class="wp-block-query shiro-carousel__track"><!-- wp:post-template {"className":"shiro-carousel__list","style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"grid","columnCount":null,"minimumColumnWidth":"18rem"}} -->
<!-- wp:post-featured-image {"sizeSlug":"medium"} /-->

<!-- wp:group -->
<div class="wp-block-group"><!-- wp:post-terms {"term":"category"} /-->

<!-- wp:post-title {"level":4,"isLink":true} /--></div>
<!-- /wp:group -->
<!-- /wp:post-template --></div>
<!-- /wp:query --></div>
<!-- /wp:shiro/carousel -->

<!-- wp:buttons {"align":"wide","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
<div class="wp-block-buttons alignwide" style="margin-top:0;margin-bottom:0"><!-- wp:button {"className":"is-style-as-arrow-link"} -->
<div class="wp-block-button is-style-as-arrow-link"><a class="wp-block-button__link wp-element-button" href="/news">See more updates</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->
