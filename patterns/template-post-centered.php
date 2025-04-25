<?php
/**
 * Title: Post Centered
 * Slug: shiro/template-post-centered
 * Template Types: single
 * Description: A centered post layout where the content sits in a container in the middle of the page.
 * Categories: shiro/posts
 * Keywords: post, centered
 * Viewport Width: 1500
 * Inserter: false
 */
?>
<!-- wp:template-part {"slug":"header","tagName":"header","className":"site-header"} /-->

<!-- wp:group {"tagName":"main","metadata":{"name":"Content Area"},"align":"wide","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|xx-large","bottom":"var:preset|spacing|xx-large"},"blockGap":"var:preset|spacing|medium"}},"layout":{"type":"default"}} -->
<main class="wp-block-group alignwide" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--xx-large);padding-bottom:var(--wp--preset--spacing--xx-large)"><!-- wp:group {"metadata":{"name":"Content Header"},"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull"><!-- wp:post-terms {"term":"category","className":"is-style-default","style":{"typography":{"fontStyle":"normal","fontWeight":"500"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontSize":"small"} /-->

<!-- wp:post-title {"level":1,"fontFamily":"secondary"} /-->

<!-- wp:group {"style":{"spacing":{"blockGap":"10px"},"elements":{"link":{"color":{"text":"var:preset|color|secondary"}}},"typography":{"fontStyle":"normal","fontWeight":"500"}},"textColor":"secondary","fontSize":"small","layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group has-secondary-color has-text-color has-link-color has-small-font-size" style="font-style:normal;font-weight:500"><!-- wp:post-author {"showBio":false} /-->

<!-- wp:paragraph {"textColor":"secondary"} -->
<p class="has-secondary-color has-text-color"><?php esc_html_e( '·', 'shiro' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:post-date /--></div>
<!-- /wp:group -->

<!-- wp:post-featured-image {"style":{"spacing":{"margin":{"top":"var:preset|spacing|large","right":"var:preset|spacing|large","bottom":"var:preset|spacing|large","left":"var:preset|spacing|large"}}}} /--></div>
<!-- /wp:group -->

<!-- wp:post-content {"align":"wide","layout":{"type":"constrained"}} /-->

<!-- wp:group {"metadata":{"name":"Tags"},"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:group {"className":"post-meta","style":{"border":{"radius":"5px"},"spacing":{"margin":{"top":"var:preset|spacing|large"}}},"fontSize":"small","layout":{"type":"flex","justifyContent":"space-between"}} -->
<div class="wp-block-group post-meta has-small-font-size" style="border-radius:5px;margin-top:var(--wp--preset--spacing--large)"><!-- wp:post-terms {"term":"post_tag","className":"is-style-term-button","style":{"elements":{"link":{"color":{"text":"var:preset|color|secondary"}}}},"textColor":"secondary"} /--></div>
<!-- /wp:group --></div>
<!-- /wp:group --></main>
<!-- /wp:group -->

<!-- wp:group {"metadata":{"name":"Comments Area"},"align":"full","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"right":"0","left":"0"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-right:0;padding-left:0"><!-- wp:comments {"align":"full","className":"wp-block-comments-query-loop","style":{"spacing":{"padding":{"top":"var:preset|spacing|x-large","bottom":"var:preset|spacing|x-large","left":"var:preset|spacing|medium","right":"var:preset|spacing|medium"},"margin":{"top":"0","bottom":"0"}}},"backgroundColor":"tertiary"} -->
<div class="wp-block-comments alignfull wp-block-comments-query-loop has-tertiary-background-color has-background" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--x-large);padding-right:var(--wp--preset--spacing--medium);padding-bottom:var(--wp--preset--spacing--x-large);padding-left:var(--wp--preset--spacing--medium)"><!-- wp:group {"metadata":{"name":"Comments Inside"},"style":{"spacing":{"blockGap":"var:preset|spacing|medium","padding":{"right":"0","left":"0"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-right:0;padding-left:0"><!-- wp:group {"metadata":{"name":"Comments Title"},"style":{"spacing":{"blockGap":"0.5rem"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading -->
<h2 class="wp-block-heading"><?php esc_html_e( 'Comments', 'shiro' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:comments-title {"level":3,"style":{"elements":{"link":{"color":{"text":"var:preset|color|secondary"}}}},"textColor":"secondary","fontSize":"base"} /--></div>
<!-- /wp:group -->

<!-- wp:comment-template {"style":{"spacing":{"margin":{"top":"var:preset|spacing|large"}}}} -->
<!-- wp:group {"metadata":{"name":"Comment Content"},"style":{"spacing":{"margin":{"top":"0","bottom":"var:preset|spacing|medium"},"padding":{"top":"var:preset|spacing|medium","bottom":"var:preset|spacing|medium","left":"var:preset|spacing|medium","right":"var:preset|spacing|medium"},"blockGap":"var:preset|spacing|small"},"border":{"radius":"5px","bottom":{"color":"var:preset|color|border-light","width":"1px"}}},"backgroundColor":"base"} -->
<div class="wp-block-group has-base-background-color has-background" style="border-radius:5px;border-bottom-color:var(--wp--preset--color--border-light);border-bottom-width:1px;margin-top:0;margin-bottom:var(--wp--preset--spacing--medium);padding-top:var(--wp--preset--spacing--medium);padding-right:var(--wp--preset--spacing--medium);padding-bottom:var(--wp--preset--spacing--medium);padding-left:var(--wp--preset--spacing--medium)"><!-- wp:group {"metadata":{"name":"Comment Author"},"style":{"spacing":{"blockGap":"var:preset|spacing|small"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:avatar {"size":44,"style":{"border":{"radius":"100px"}}} /-->

<!-- wp:group {"style":{"spacing":{"blockGap":"0"}}} -->
<div class="wp-block-group"><!-- wp:comment-author-name /-->

<!-- wp:comment-date {"style":{"elements":{"link":{"color":{"text":"var:preset|color|secondary"}}}},"textColor":"secondary"} /--></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:comment-content {"fontSize":"small"} /-->

<!-- wp:group {"metadata":{"name":"Comment Actions"},"style":{"elements":{"link":{"color":{"text":"var:preset|color|secondary"}}},"spacing":{"blockGap":"var:preset|spacing|small"}},"textColor":"secondary","layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group has-secondary-color has-text-color has-link-color"><!-- wp:comment-edit-link /-->

<!-- wp:comment-reply-link /--></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
<!-- /wp:comment-template -->

<!-- wp:group {"metadata":{"name":"Comment Pagination"},"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:comments-pagination {"style":{"elements":{"link":{"color":{"text":"var:preset|color|secondary"}}}},"textColor":"secondary","layout":{"type":"flex","justifyContent":"space-between"}} -->
<!-- wp:comments-pagination-previous /-->

<!-- wp:comments-pagination-next /-->
<!-- /wp:comments-pagination --></div>
<!-- /wp:group -->

<!-- wp:post-comments-form /--></div>
<!-- /wp:group --></div>
<!-- /wp:comments --></div>
<!-- /wp:group -->

<!-- wp:group {"metadata":{"name":"Latest Posts"},"align":"full","style":{"spacing":{"blockGap":"0","padding":{"top":"var:preset|spacing|x-large","bottom":"var:preset|spacing|x-large"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--x-large);padding-bottom:var(--wp--preset--spacing--x-large)"><!-- wp:query {"queryId":1,"query":{"perPage":"3","pages":"3","offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"exclude","inherit":false},"align":"wide"} -->
<div class="wp-block-query alignwide"><!-- wp:post-template {"style":{"spacing":{"blockGap":"var:preset|spacing|large"}},"fontSize":"large","layout":{"type":"grid","columnCount":3}} -->
<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|small"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"left"}} -->
<div class="wp-block-group"><!-- wp:post-terms {"term":"category","className":"is-style-default","style":{"typography":{"fontStyle":"normal","fontWeight":"500"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"fontSize":"x-small"} /-->

<!-- wp:post-title {"isLink":true,"style":{"spacing":{"margin":{"top":"0px","right":"0px","bottom":"0px","left":"0px"}},"typography":{"fontStyle":"normal","fontWeight":"600","textDecoration":"none"}},"fontSize":"base"} /-->

<!-- wp:post-date {"fontSize":"x-small"} /--></div>
<!-- /wp:group -->
<!-- /wp:post-template --></div>
<!-- /wp:query --></div>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer","className":"site-footer"} /-->
