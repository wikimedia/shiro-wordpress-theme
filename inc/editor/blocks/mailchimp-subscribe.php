<?php
/**
 * Modify the behavior of the Mailchimp Subscribe block.
 */

namespace WMF\Editor\Blocks\MailChimpSubscribe;

/**
 * Bootstrap hooks for modifying the mailchimp plugin block.
 */
function bootstrap() {
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\mailchimp_resources_dequeue', 11 );
	add_filter( 'render_block', __NAMESPACE__ . '\\filter_mailchimp_output', 10, 2 );

	// Remove Mailchimp styles, we'll provide our own.
	update_option( 'mc_nuke_all_styles', true );
}

/**
 * Remove uneeded Mailchimp styles & JS that are loaded by the Mailchimp plugin.
 */
function mailchimp_resources_dequeue() {
	// Dequeue resources that aren't needed for the email address field, like datepicker.
	wp_dequeue_style( 'flick' );
	wp_dequeue_script( 'jquery-ui-datepicker' );
	remove_action( 'wp_head', 'mc_datepicker_load' );
}

/**
 * Modify the render of the mailchimp subscribe block to add placeholder text and screenreader class.
 *
 * @param string $block_content The block content.
 * @param array  $block The full block, including name and attributes.
 * @return $block_content The updated block content.
 */
function filter_mailchimp_output( $block_content, $block ) {
	// Main block.
	if ( 'mailchimp/mailchimp' === $block['blockName'] ) {
		// Remove extra space characters from empty message container.
		// We still need this box for the validation and confirmation messages.
		$block_content = preg_replace(
			'/<div class="mc_message_wrapper" id="mc_message">\s*<\/div>/',
			'<div class="mc_message_wrapper" id="mc_message"></div>',
			$block_content
		);
	
		return $block_content;
	}
	
	// Form field block.
	if ( 'mailchimp/mailchimp-form-field' !== $block['blockName'] ) {
		return $block_content;
	}

	$updated_email_field = sprintf(
		'<input type="text" size="18" placeholder="%s" name="mc_mv_EMAIL" id="mc_mv_EMAIL" class="mc_input"/>',
		esc_attr__( 'Enter your email', 'shiro' )
	);

	$block_content = str_replace(
		'<input type="text" size="18" placeholder="" name="mc_mv_EMAIL" id="mc_mv_EMAIL" class="mc_input"/>',
		$updated_email_field,
		$block_content
	);

	$block_content = str_replace(
		'<label for="mc_mv_EMAIL" class="mc_var_label mc_header mc_header_email">',
		'<label for="mc_mv_EMAIL" class="mc_var_label mc_header mc_header_email screen-reader-text">',
		$block_content
	);

	return $block_content;
}
