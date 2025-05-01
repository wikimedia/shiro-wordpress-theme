<?php
/**
 * Define the behavior of the Mailchimp Subscribe block.
 */

namespace WMF\Editor\Blocks\MailChimpSubscribe;

use WMF\Customizer\Connect;

/**
 * Bootstrap hooks for the mailchimp block
 */
function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\register' );
}

/**
 * Render mailchimp subscribe block. This is required because wp_kses_post will
 * strip <form> and <input> tags. For the mailchimp subscribe we need those
 * tags. Other than these changes, this is de facto a static block.
 *
 * @param array  $block_attributes Saved block attributes.
 * @param string $content          Rendered block inner content.
 */
function render_block( $block_attributes, $content ) {
	$action          = get_theme_mod( 'wmf_subscribe_action', Connect::defaults( 'wmf_subscribe_action' ) );
	$group_number    = get_theme_mod( 'wmf_subscribe_group_number', Connect::defaults( 'wmf_subscribe_group_number' ) );
	$group_number_id = 'mce-group[' . $group_number . ']-' . $group_number . '-1';

	$input_placeholder = empty( $block_attributes['inputPlaceholder'] ) ?
		__( 'Email address', 'shiro' ) :
		$block_attributes['inputPlaceholder'];

	$form_start = '<form action="' . esc_url( $action ) . '" method="POST" class="mailchimp-subscribe__form">';
	$form_end   = '</form>';
	$input_field = '<input' .
		' class="mailchimp-subscribe__input-field"' .
		' id="wmf-subscribe-input-email"' .
		' name="EMAIL"' .
		' placeholder="' . esc_attr( $input_placeholder ) . '"' .
		' required=""' .
		' type="email" />';
	$additional_fields = '<input type="hidden" value="2" name="group[' . esc_attr( $group_number ) . ']" id="' . esc_attr( $group_number_id ) . '" />';

	$content = str_replace( '<!-- input_field -->', $input_field, $content );

	return $form_start . $content . $additional_fields . $form_end;
}

/**
 * Register the mailchimp block.
 */
function register() {
	register_block_type( 'shiro/mailchimp-subscribe', array(
		'apiVersion' => 2,
		'render_callback' => __NAMESPACE__ . '\\render_block',
	) );
}
