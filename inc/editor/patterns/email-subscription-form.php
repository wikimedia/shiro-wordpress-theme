<?php
/**
 * Block pattern for the email newsletter subscription form.
 */

namespace WMF\Editor\Patterns\EmailSubscriptionForm;

const NAME = 'shiro/email-subscription-form';

const PATTERN = <<<CONTENT
<!-- wp:group {"align":"full","backgroundColor":"yellow","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-yellow-background-color has-background"><!-- wp:columns {"verticalAlignment":"center","align":"wide"} -->
<div class="wp-block-columns alignwide are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"blockGap":"var:preset|spacing|16"}}} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading -->
<h2 class="wp-block-heading">Subscribe for news</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Get the latest updates about the Wikimedia Foundation directly to your inbox.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"blockGap":"0"}}} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:mailchimp/mailchimp {"list_id":"","header":"","sub_header":"","submit_text":"Subscribe","double_opt_in":true,"update_existing_subscribers":true,"show_unsubscribe_link":false,"unsubscribe_link_text":"You may unsubscribe at any time by clicking this link or the provided link on any marketing message.","metadata":{"categories":["wikimedia"],"patternName":"shiro/email-subscription-form","name":"Email subscription form"},"align":"wide","backgroundColor":"wmf-report-yellow"} -->
<!-- wp:mailchimp/mailchimp-form-field {"tag":"EMAIL","label":"Email Address","visible":true,"type":"email"} /-->
<!-- wp:mailchimp/mailchimp-form-field {"tag":"OPTIN","label":"Confirm choice","visible":true,"type":"radio"} /-->
<!-- /wp:mailchimp/mailchimp -->

<!-- wp:paragraph -->
<p>For more details, see our <a href="/privacy-policy/">Privacy statement.</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->
CONTENT;
