<?php
/**
 * Block pattern for a full-width donation bar.
 */

namespace WMF\Editor\Patterns\DonationBar;

const NAME = 'shiro/donation-bar';

const PATTERN = <<<HTML
<!-- wp:group {"align":"full","className":"pattern-donation-bar","style":{"spacing":{"padding":{"top":"var:preset|spacing|24","bottom":"var:preset|spacing|24"}}},"backgroundColor":"blue-aaa","fontSize":"large","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull pattern-donation-bar has-blue-aaa-background-color has-background has-large-font-size" style="padding-top:var(--wp--preset--spacing--24);padding-bottom:var(--wp--preset--spacing--24)"><!-- wp:group {"align":"wide","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group alignwide"><!-- wp:paragraph {"className":"is-style-sans-p","style":{"layout":{"selfStretch":"fixed","flexSize":"400px"}},"fontFamily":"display"} -->
<p class="is-style-sans-p has-display-font-family"><strong>Help us support everyone’s access to reliable information.</strong> <a href="/support/">Why donate?</a></p>
<!-- /wp:paragraph -->

<!-- wp:shiro/donation-portal-form /--></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
HTML;
