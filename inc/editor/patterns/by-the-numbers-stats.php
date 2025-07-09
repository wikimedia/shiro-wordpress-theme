<?php
/**
 * Block pattern for a "By the numbers" stats section.
 */

namespace WMF\Editor\Patterns\ByTheNumbersStats;

const NAME = 'shiro/by-the-numbers-stats';

const PATTERN = <<<HTML
<!-- wp:group {"align":"wide","className":"by-the-numbers-stats","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide by-the-numbers-stats" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)"><!-- wp:columns {"align":"wide","className":"is-style-default"} -->
<div class="wp-block-columns alignwide is-style-default"><!-- wp:column {"width":"31.112%"} -->
<div class="wp-block-column" style="flex-basis:31.112%"><!-- wp:heading -->
<h2 class="wp-block-heading">By the numbers</h2>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"width":""} -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>Wikipedia is the backbone of the internet’s knowledge. From students to chatbots, everyone learns from it.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns {"align":"wide","className":"is-style-separators-between","style":{"spacing":{"margin":{"top":"var:preset|spacing|64"}}}} -->
<div class="wp-block-columns alignwide is-style-separators-between" style="margin-top:var(--wp--preset--spacing--64)"><!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|16","padding":{"top":"var:preset|spacing|24","bottom":"var:preset|spacing|24"}}}} -->
<div class="wp-block-column" style="padding-top:var(--wp--preset--spacing--24);padding-bottom:var(--wp--preset--spacing--24)"><!-- wp:image {"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/themes/shiro/assets/src/svg/wiki-globe.svg" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Wikipedia receives more than</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"margin":{"top":"0","bottom":"0"}}},"fontSize":"jumbo","fontFamily":"display"} -->
<p class="has-display-font-family has-jumbo-font-size" style="margin-top:0;margin-bottom:0;font-style:normal;font-weight:600">15 billion</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
<p style="margin-top:0;margin-bottom:0">views each month.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|16","padding":{"top":"var:preset|spacing|24","bottom":"var:preset|spacing|24"}}}} -->
<div class="wp-block-column" style="padding-top:var(--wp--preset--spacing--24);padding-bottom:var(--wp--preset--spacing--24)"><!-- wp:image {"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/themes/shiro/assets/src/svg/wiki-friendship.svg" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The Wikimedia Foundation supports nearly</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"margin":{"top":"0","bottom":"0"}}},"fontSize":"jumbo","fontFamily":"display"} -->
<p class="has-display-font-family has-jumbo-font-size" style="margin-top:0;margin-bottom:0;font-style:normal;font-weight:600">260,000</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
<p style="margin-top:0;margin-bottom:0">volunteers every month.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|16","padding":{"top":"var:preset|spacing|24","bottom":"var:preset|spacing|24"}}}} -->
<div class="wp-block-column" style="padding-top:var(--wp--preset--spacing--24);padding-bottom:var(--wp--preset--spacing--24)"><!-- wp:image {"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/themes/shiro/assets/src/svg/wiki-collaboration.svg" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Every minute</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"margin":{"top":"0","bottom":"0"}}},"fontSize":"jumbo","fontFamily":"display"} -->
<p class="has-display-font-family has-jumbo-font-size" style="margin-top:0;margin-bottom:0;font-style:normal;font-weight:600">342</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
<p style="margin-top:0;margin-bottom:0">new edits are made to Wikipedia.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:separator {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|24","bottom":"var:preset|spacing|24"}}}} -->
<hr class="wp-block-separator alignwide has-alpha-channel-opacity" style="margin-top:var(--wp--preset--spacing--24);margin-bottom:var(--wp--preset--spacing--24)"/>
<!-- /wp:separator -->

<!-- wp:columns {"align":"wide","className":"is-style-separators-between","style":{"spacing":{"margin":{"top":"var:preset|spacing|24"}}}} -->
<div class="wp-block-columns alignwide is-style-separators-between" style="margin-top:var(--wp--preset--spacing--24)"><!-- wp:column {"width":"50%","style":{"spacing":{"padding":{"top":"var:preset|spacing|24","bottom":"var:preset|spacing|24"},"blockGap":"var:preset|spacing|16"}}} -->
<div class="wp-block-column" style="padding-top:var(--wp--preset--spacing--24);padding-bottom:var(--wp--preset--spacing--24);flex-basis:50%"><!-- wp:image {"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/themes/shiro/assets/src/svg/wiki-global.svg" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>With over <strong>64 million articles</strong>, in <strong>300+ languages</strong>, Wikipedia is the home of trusted information online.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"50%","style":{"spacing":{"padding":{"top":"var:preset|spacing|24","bottom":"var:preset|spacing|24"},"blockGap":"var:preset|spacing|16"}}} -->
<div class="wp-block-column" style="padding-top:var(--wp--preset--spacing--24);padding-bottom:var(--wp--preset--spacing--24);flex-basis:50%"><!-- wp:image {"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/themes/shiro/assets/src/svg/wiki-mobile.svg" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Wikipedia is the only website among the <strong>top 10</strong> most visited that is hosted by a nonprofit organization.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"align":"wide"} -->
<div class="wp-block-buttons alignwide"><!-- wp:button {"className":"is-style-as-arrow-link"} -->
<div class="wp-block-button is-style-as-arrow-link"><a class="wp-block-button__link wp-element-button" href="/about/">More about us</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->
HTML;
