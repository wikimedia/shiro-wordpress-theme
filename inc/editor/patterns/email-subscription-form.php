<?php
/**
 * Block pattern for the email newsletter subscription form.
 */

namespace WMF\Editor\Patterns\EmailSubscriptionForm;

const NAME = 'shiro/email-subscription-form';

const PATTERN = <<<CONTENT
<!-- wp:shiro/mailchimp-subscribe {"align":"full","backgroundColor":"wmf-report-yellow"} -->
<aside class="wp-block-shiro-mailchimp-subscribe alignfull mailchimp-subscribe has-wmf-report-yellow-background-color has-background"><header class="mailchimp-subscribe__header"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Subscribe for news</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Get the latest updates about the Wikimedia Foundation directly to your inbox.</p>
<!-- /wp:paragraph --></header><div class="mailchimp-subscribe__input-container"><div class="mailchimp-subscribe__column-input"><!-- input_field --></div><div class="mailchimp-subscribe__column-button"><button class="wp-block-shiro-button" type="submit">Subscribe</button></div><p class="mailchimp-subscribe__description has-small-font-size">By signing up you agree to our Privacy Policy. You may unsubscribe at any time by clicking on the provided link on any marketing message.</p></div></aside>
<!-- /wp:shiro/mailchimp-subscribe -->
CONTENT;
