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

<!-- wp:group {"backgroundColor":"base90","layout":{"type":"default"}} -->
<div class="wp-block-group has-base90-background-color has-background"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"metadata":{"name":"Intro"}} -->
<div class="wp-block-column"><!-- wp:heading -->
<h2 class="wp-block-heading">Now more than ever, people need access to information they can trust. Stay up to date on our efforts to maintain free knowledge.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><a href="https://wikimedia.vipdev.lndo.site/news/" data-type="page" data-id="11">Find out more</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"metadata":{"name":"Pages"}} -->
<div class="wp-block-column"><!-- wp:query {"queryId":0,"query":{"perPage":3,"pages":"1","offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"taxQuery":null,"parents":[],"format":[]},"layout":{"type":"default"}} -->
<div class="wp-block-query"><!-- wp:post-template -->
<!-- wp:post-featured-image /-->

<!-- wp:post-terms {"term":"category"} /-->

<!-- wp:post-title /-->
<!-- /wp:post-template -->

<!-- wp:query-pagination -->
<!-- wp:query-pagination-previous /-->

<!-- wp:query-pagination-numbers /-->

<!-- wp:query-pagination-next /-->
<!-- /wp:query-pagination -->

<!-- wp:query-no-results -->
<!-- wp:paragraph {"placeholder":"Add text or blocks that will display when a query returns no results."} -->
<p></p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results --></div>
<!-- /wp:query --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->
