<?php
/**
 * Callback for server-side rendering for the donation portal form block.
 */

// Additional check for whether this path should have GeoIP enabled or not.
wmf_enable_geoip_for_current_path();

$country_code = wmf_get_country_code();

if ( ! isset( $_SERVER['REQUEST_URI'] ) ) {
	return '';
}

// Check if this country is not supported.
if (
	// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	strpos( $_SERVER['REQUEST_URI'], '/block-renderer/' ) === false &&
	in_array( $country_code, (array) ( $attributes['unsupportedCountries'] ?? [] ), true )
) :
	// translators: Only basic inline HTML is allowed, anything else will be stripped on output.
	$fallback = __( 'We are not fundraising in your country at this time, but monetary contributions are not your only option for donating to and supporting Wikipedia. <a href="/participate/">Learn how to participate</a>.', 'shiro' );
	$allowed_html = [
		'a' => [
			'href' => true,
			'rel' => true,
			'target' => true,
		],
		'strong' => [],
		'em' => [],
		'span' => [],
	];
	?>
	<div <?php echo get_block_wrapper_attributes( [ 'class' => 'is-fallback' ] ); // phpcs:ignore ?>>
		<p><?php echo wp_kses( $attributes['fallbackText'] ?: $fallback, $allowed_html ); ?></p>
	</div>
	<?php
	return;
endif;

$currency_code = wmf_get_currency_code( $country_code );
$currency_symbol = wmf_get_currency_symbol( $currency_code );
$default_amount = $attributes['defaultAmount'] ?? '10';

// Check for currency specific default.
if ( ! empty( $attributes['defaultCurrencyAmount'] ) ) {
	$default_amounts = array_values( wp_list_filter(
		$attributes['defaultCurrencyAmount'],
		[ 'currency' => $currency_code ]
	) );
	$default_amount = $default_amounts[0]['amount'] ?? $default_amount;
}

?>

<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore ?>>
	<form method="get" action="https://donate.wikimedia.org">
		<input type="hidden" name="appeal" value="WP25" />
		<input type="hidden" name="pym_appeal" value="WP25" />
		<input type="hidden" name="wmf_medium" value="<?php echo esc_attr( $attributes['medium'] ?? '' ); ?>" />
		<input type="hidden" name="wmf_campaign" value="<?php echo esc_attr( $attributes['campaign'] ?? '' ); ?>" />
		<input type="hidden" name="wmf_source" value="<?php echo esc_attr( $attributes['source'] ?? $default_amount ); ?>" />
		<input type="hidden" name="uselang" value="<?php echo esc_attr( strtolower( str_replace( '_', '-', get_locale() ) ) ); ?>" />
		<input type="hidden" name="country" value="<?php echo esc_attr( $country_code ); ?>" />

		<fieldset>
			<legend><?php esc_html_e( 'Amount', 'shiro' ); ?></legend>
			<div class="wp-block-shiro-donation-portal-form__amount">
				<abbr title="<?php echo esc_attr( $currency_code ); ?>">
					<?php echo esc_html( $currency_symbol ); ?>
				</abbr>
				<input type="number" name="preSelect" placeholder="<?php echo esc_attr( $default_amount ); ?>" value="<?php echo esc_attr( $default_amount ); ?>" min="1" step="any" required />
			</div>
		</fieldset>

		<fieldset>
			<legend><?php esc_html_e( 'Frequency', 'shiro' ); ?></legend>
			<label>
				<input type="radio" name="frequency" value="onetime" checked />
				<span><?php esc_html_e( 'Just once', 'shiro' ); ?></span>
			</label>
			<label>
				<input type="radio" name="frequency" value="monthly" />
				<span><?php esc_html_e( 'Give monthly', 'shiro' ); ?></span>
			</label>
			<?php if ( ! empty( $attributes['showAnnual'] ) ) : ?>
				<label>
					<input type="radio" name="frequency" value="annual" />
					<span><?php esc_html_e( 'Annual', 'shiro' ); ?></span>
				</label>
			<?php endif; ?>
		</fieldset>

		<div class="wp-block-button is-style-transparent">
			<button class="wp-block-button__link wp-element-button" type="submit"><?php esc_html_e( 'Donate now', 'shiro' ); ?></button>
		</div>
	</form>
</div>
