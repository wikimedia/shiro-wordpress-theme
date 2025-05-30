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

<!-- wp:group {"tagName":"header","metadata":{"name":"Header"},"align":"full","className":"site-header","style":{"elements":{"link":{"color":{"text":"var:preset|color|main"}}},"border":{"bottom":{"color":"var:preset|color|border-light","width":"1px"},"top":[],"right":[],"left":[]},"position":{"type":"sticky","top":"0px"},"spacing":{"padding":{"top":"0","bottom":"0"}}},"backgroundColor":"base","layout":{"inherit":true,"type":"constrained"}} -->
<header class="wp-block-group alignfull site-header has-base-background-color has-background has-link-color" style="border-bottom-color:var(--wp--preset--color--border-light);border-bottom-width:1px;padding-top:0;padding-bottom:0"><!-- wp:group {"align":"wide","className":"site-header\u002d\u002dinner","style":{"spacing":{"blockGap":"var:preset|spacing|16"}},"layout":{"type":"flex","justifyContent":"space-between"}} -->
<div class="wp-block-group alignwide site-header--inner"><!-- wp:site-logo {"width":172,"shouldSyncIcon":false} /-->

<!-- wp:navigation {"ref":77251,"openSubmenusOnClick":true,"overlayMenu":"always","icon":"menu","className":"primary-nav","style":{"spacing":{"blockGap":"0"},"layout":{"selfStretch":"fit","flexSize":null}}} /-->

<!-- wp:navigation {"ref":77284,"overlayMenu":"never","className":"language-switcher-nav","style":{"spacing":{"blockGap":"0"}}} /-->

<!-- wp:buttons {"className":"donate-nav"} -->
<div class="wp-block-buttons donate-nav"><!-- wp:button {"backgroundColor":"green-aaa"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-green-aaa-background-color has-background wp-element-button" href="https://donate.wikimedia.org/?wmf_medium=wmfSite&amp;wmf_campaign=navButton&amp;uselang=en&amp;wmf_source=10">Donate <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-base-color">now</mark></a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></header>
<!-- /wp:group -->
