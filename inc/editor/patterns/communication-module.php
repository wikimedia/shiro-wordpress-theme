<?php
/**
 * Block pattern for the newsletter & contact section.
 */

namespace WMF\Editor\Patterns\CommunicationModule;

const NAME = 'shiro/communication-module';

const PATTERN = <<<CONTENT
<!-- wp:group {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}}} -->
<div class="wp-block-group alignwide" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:var(--wp--preset--spacing--40)"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:shiro/contact -->
<div class="wp-block-shiro-contact contact"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" class="contact__icon"><path fill="#000" fill-rule="evenodd" d="M14.5 5.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M2 16c0-2 2.083-5 8-5s8 3 8 5v3H2z" clip-rule="evenodd"></path></svg><h3 class="contact__title">Contact us</h3><div class="contact__description">Questions about the Wikimedia Foundation or our projects? Get in touch with our team.</div><a class="contact__call-to-action" href="https://wikimediafoundation.org/about/contact/">Contact</a><h4 class="contact__social-title">Follow</h4><!-- wp:buttons {"style":{"spacing":{"blockGap":{"top":"var:preset|spacing|8","left":"var:preset|spacing|8"}}}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-as-link has-icon has-icon-social-facebook-blue"} -->
<div class="wp-block-button is-style-as-link has-icon has-icon-social-facebook-blue"><a class="wp-block-button__link wp-element-button" href="https://www.facebook.com/wikimediafoundation/" target="_blank" rel="noreferrer noopener">Facebook</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-as-link has-icon has-icon-social-instagram-blue"} -->
<div class="wp-block-button is-style-as-link has-icon has-icon-social-instagram-blue"><a class="wp-block-button__link wp-element-button" href="https://www.instagram.com/wikimediafoundation/" target="_blank" rel="noreferrer noopener">Instagram</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-as-link has-icon has-icon-social-bluesky-blue"} -->
<div class="wp-block-button is-style-as-link has-icon has-icon-social-bluesky-blue"><a class="wp-block-button__link wp-element-button" href="https://bsky.app/profile/wikimediafoundation.org" target="_blank" rel="noreferrer noopener">Bluesky</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-as-link has-icon has-icon-social-linkedin-blue"} -->
<div class="wp-block-button is-style-as-link has-icon has-icon-social-linkedin-blue"><a class="wp-block-button__link wp-element-button" href="https://www.linkedin.com/company/wikimedia-foundation" target="_blank" rel="noreferrer noopener">LinkedIn</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:shiro/contact --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->
CONTENT;
