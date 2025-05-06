<?php
/**
 * Block pattern for the email newsletter subscription form.
 */

namespace WMF\Editor\Patterns\EmailSubscriptionForm;

const NAME = 'shiro/email-subscription-form';

const PATTERN = <<<CONTENT
<!-- wp:mailchimp/mailchimp {"list_id":"cc9f3669af","header":"Subscribe for news","sub_header":"Get the latest updates about the Wikimedia Foundation directly to your inbox.","submit_text":"Subscribe","double_opt_in":true,"update_existing_subscribers":true,"show_unsubscribe_link":true,"unsubscribe_link_text":"By signing up you agree to our Privacy Policy. You may unsubscribe at any time by clicking this link or the provided link on any marketing message.","show_required_indicator":false,"align":"full","backgroundColor":"wmf-report-yellow"} -->
<!-- wp:mailchimp/mailchimp-form-field {"tag":"EMAIL","label":"Email Address","visible":true,"type":"email"} /-->

<!-- wp:mailchimp/mailchimp-audience-group {"id":"65d7b92091","label":"Your Interests","visible":false} /-->

<!-- wp:mailchimp/mailchimp-audience-group {"id":"040d98408c","label":"Your Interests","visible":false} /-->
<!-- /wp:mailchimp/mailchimp -->
CONTENT;
