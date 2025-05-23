<?php
/**
 * GeoIP and currency helper functions.
 *
 * @see https://docs.wpvip.com/infrastructure/ip-geolocation/
 */

/**
 * Check to see if the current path page cache should be bucketed by country code.
 *
 * @return void
 */
function wmf_maybe_enable_geoip() {
	if ( did_action( 'init' ) ) {
		_doing_it_wrong( __FUNCTION__, 'This function must be called before the init hook', '2025-05-22' );
		return;
	}

	if ( ! isset( $_SERVER['REQUEST_URI'] ) ) {
		return;
	}

	$geoip_paths = apply_filters( 'wmf_geoip_paths', get_option( 'wmf_geoip_paths', [] ) );

	if ( empty( $geoip_paths ) ) {
		return;
	}

	$path = wp_parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );

	if ( ! in_array( $path, $geoip_paths, true ) ) {
		return;
	}

	wmf_enable_geoip();
}

/**
 * Enables country code cache variation for the current request.
 *
 * @return void
 */
function wmf_enable_geoip() {
	header( 'Vary: X-Country-Code', false );
}

/**
 * Adds the current path to enable GeoIP for.
 *
 * @return void
 */
function wmf_enable_geoip_for_current_path() {
	if ( ! isset( $_SERVER['REQUEST_URI'] ) ) {
		return;
	}

	$path = wp_parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );

	if ( is_admin() || strpos( $path, rest_url() ) === 0 ) {
		return;
	}

	$geoip_paths = (array) get_option( 'wmf_geoip_paths', [] );

	if ( in_array( $path, $geoip_paths, true ) ) {
		return;
	}

	$geoip_paths[] = $path;
	update_option( 'wmf_geoip_paths', $geoip_paths );

	if ( ! headers_sent() ) {
		wmf_enable_geoip();
	}
}

/**
 * Get the WordPress VIP country code if available.
 *
 * @return string|null
 */
function wmf_get_country_code() {
	if ( ! isset( $_SERVER['GEOIP_COUNTRY_CODE'] ) ) {
		return null;
	}

	return strtoupper( sanitize_key( wp_unslash( $_SERVER['GEOIP_COUNTRY_CODE'] ) ) );
}

/**
 * Get the currency code for the current user's country based on GEOIP_COUNTRY_CODE.
 *
 * Defaults to USD.
 *
 * @param string $country_code 2-letter country code.
 * @return string Currency code or null if not found.
 */
function wmf_get_currency_code( $country_code ) {
	$map = wmf_get_country_to_currency_map();
	return isset( $map[ $country_code ] ) ? $map[ $country_code ] : 'USD';
}

/**
 * Get the currency symbol for a given currency code.
 *
 * @param string $currency_code The currency code to get the symbol for.
 * @return string|null Currency symbol or null if not found.
 */
function wmf_get_currency_symbol( $currency_code ) {
	$symbols = [
		'USD' => '$',
		'CAD' => 'CA$',
		'AUD' => 'A$',
		'NZD' => 'NZ$',
		'GBP' => '£',
		'EUR' => '€',
		'AED' => 'د.إ',
		'ANG' => 'ƒ',
		'ARS' => '$',
		'AOA' => 'Kz',
		'BBD' => 'Bds$',
		'BDT' => '৳',
		'BGN' => 'лв',
		'BHD' => '.د.ب',
		'BMD' => '$',
		'BOB' => 'Bs.',
		'BRL' => 'R$',
		'BZD' => 'BZ$',
		'CHF' => 'Fr.',
		'CLP' => '$',
		'CNY' => '¥',
		'COP' => '$',
		'CRC' => '₡',
		'CZK' => 'Kč',
		'DKK' => 'kr',
		'DOP' => 'RD$',
		'DZD' => 'دج',
		'EGP' => '£',
		'FJD' => 'FJ$',
		'GBP' => '£',
		'GHS' => '₵',
		'GTQ' => 'Q',
		'HKD' => 'HK$',
		'HNL' => 'L',
		'HUF' => 'Ft',
		'IDR' => 'Rp',
		'ILS' => '₪',
		'INR' => '₹',
		'JMD' => 'J$',
		'JOD' => 'JD',
		'JPY' => '¥',
		'KES' => 'KSh',
		'KHR' => '៛',
		'KRW' => '₩',
		'KWD' => 'د.ك',
		'KZT' => '₸',
		'LBP' => 'ل.ل',
		'LKR' => 'Rs',
		'MAD' => 'د.م.',
		'MKD' => 'ден',
		'MXN' => '$',
		'MYR' => 'RM',
		'MVR' => 'Rf',
		'NOK' => 'kr',
		'NPR' => '₨',
		'OMR' => 'ر.ع.',
		'PAB' => 'B/.',
		'PEN' => 'S/',
		'PGK' => 'K',
		'PHP' => '₱',
		'PKR' => '₨',
		'PLN' => 'zł',
		'QAR' => 'ر.ق',
		'RON' => 'lei',
		'RUB' => '₽',
		'SAR' => 'ر.س',
		'SEK' => 'kr',
		'SGD' => 'S$',
		'THB' => '฿',
		'TRY' => '₺',
		'TTD' => 'TT$',
		'TWD' => 'NT$',
		'UAH' => '₴',
		'UYU' => '$U',
		'UZS' => 'soʻm',
		'VND' => '₫',
		'XCD' => 'EC$',
		'ZAR' => 'R',
	];

	return isset( $symbols[ $currency_code ] ) ? $symbols[ $currency_code ] : $currency_code;
}

/**
 * Country code to currency code map.
 *
 * @see https://donate.wikimedia.org/w/index.php?title=Template:CurrencyCode&action=edit
 *
 * @return array
 */
function wmf_get_country_to_currency_map() : array {
	return [
		'US' => 'USD',
		'CA' => 'CAD',
		'AU' => 'AUD',
		'NZ' => 'NZD',
		'GB' => 'GBP',
		'AD' => 'EUR',
		'AL' => 'EUR',
		'AM' => 'EUR',
		'AT' => 'EUR',
		'AZ' => 'EUR',
		'BE' => 'EUR',
		'BY' => 'EUR',
		'CI' => 'EUR',
		'CY' => 'EUR',
		'DE' => 'EUR',
		'EE' => 'EUR',
		'ES' => 'EUR',
		'FI' => 'EUR',
		'FR' => 'EUR',
		'GF' => 'EUR',
		'GR' => 'EUR',
		'HR' => 'EUR',
		'IE' => 'EUR',
		'IT' => 'EUR',
		'LT' => 'EUR',
		'LU' => 'EUR',
		'LV' => 'EUR',
		'LY' => 'EUR',
		'MC' => 'EUR',
		'ME' => 'EUR',
		'MG' => 'EUR',
		'MT' => 'EUR',
		'NL' => 'EUR',
		'PT' => 'EUR',
		'RE' => 'EUR',
		'RS' => 'EUR',
		'SI' => 'EUR',
		'SK' => 'EUR',
		'SM' => 'EUR',
		'SR' => 'EUR',
		'VA' => 'EUR',
		'AE' => 'AED',
		'AF' => 'USD',
		'AG' => 'XCD',
		'AN' => 'ANG',
		'AO' => 'USD',
		'AR' => 'ARS',
		'AS' => 'USD',
		'AW' => 'USD',
		'BB' => 'BBD',
		'BD' => 'BDT',
		'BF' => 'USD',
		'BG' => 'BGN',
		'BH' => 'BHD',
		'BI' => 'USD',
		'BJ' => 'USD',
		'BM' => 'BMD',
		'BN' => 'USD',
		'BO' => 'BOB',
		'BR' => 'BRL',
		'BS' => 'USD',
		'BW' => 'USD',
		'BZ' => 'BZD',
		'CF' => 'USD',
		'CG' => 'USD',
		'CH' => 'CHF',
		'CK' => 'NZD',
		'CL' => 'CLP',
		'CM' => 'USD',
		'CN' => 'CNY',
		'CO' => 'COP',
		'CR' => 'CRC',
		'CV' => 'USD',
		'CZ' => 'CZK',
		'DJ' => 'USD',
		'DK' => 'DKK',
		'DM' => 'XCD',
		'DO' => 'DOP',
		'DZ' => 'DZD',
		'EC' => 'USD',
		'EG' => 'EGP',
		'ER' => 'USD',
		'ET' => 'USD',
		'FJ' => 'FJD',
		'FM' => 'USD',
		'FO' => 'DKK',
		'GA' => 'USD',
		'GD' => 'XCD',
		'GE' => 'USD',
		'GL' => 'DKK',
		'GM' => 'USD',
		'GQ' => 'USD',
		'GT' => 'GTQ',
		'GU' => 'USD',
		'GW' => 'USD',
		'HK' => 'HKD',
		'HN' => 'HNL',
		'HU' => 'HUF',
		'ID' => 'IDR',
		'IL' => 'ILS',
		'IN' => 'INR',
		'IQ' => 'USD',
		'IS' => 'EUR',
		'JM' => 'JMD',
		'JO' => 'JOD',
		'JP' => 'JPY',
		'KE' => 'KES',
		'KH' => 'KHR',
		'KI' => 'AUD',
		'KM' => 'USD',
		'KN' => 'XCD',
		'KP' => 'USD',
		'KR' => 'KRW',
		'KW' => 'USD',
		'KZ' => 'KZT',
		'LB' => 'LBP',
		'LC' => 'XCD',
		'LI' => 'CHF',
		'LK' => 'LKR',
		'LR' => 'USD',
		'MA' => 'MAD',
		'MD' => 'USD',
		'MH' => 'USD',
		'MK' => 'MKD',
		'ML' => 'USD',
		'MO' => 'USD',
		'MP' => 'USD',
		'MR' => 'USD',
		'MU' => 'USD',
		'MV' => 'MVR',
		'MW' => 'GBP',
		'MX' => 'MXN',
		'MY' => 'MYR',
		'MZ' => 'USD',
		'NA' => 'USD',
		'NE' => 'USD',
		'NG' => 'USD',
		'NI' => 'NIO',
		'NO' => 'NOK',
		'NP' => 'INR',
		'NR' => 'AUD',
		'OM' => 'OMR',
		'PA' => 'PAB',
		'PE' => 'PEN',
		'PG' => 'AUD',
		'PH' => 'PHP',
		'PK' => 'PKR',
		'PL' => 'PLN',
		'PR' => 'USD',
		'PS' => 'USD',
		'PW' => 'USD',
		'PY' => 'PYG',
		'QA' => 'QAR',
		'RO' => 'RON',
		'RU' => 'RUB',
		'SA' => 'SAR',
		'SB' => 'USD',
		'SC' => 'USD',
		'SD' => 'GBP',
		'SE' => 'SEK',
		'SG' => 'SGD',
		'SN' => 'USD',
		'SV' => 'USD',
		'TD' => 'USD',
		'TG' => 'USD',
		'TH' => 'THB',
		'TM' => 'TMT',
		'TN' => 'USD',
		'TO' => 'USD',
		'TP' => 'USD',
		'TR' => 'TRY',
		'TT' => 'TTD',
		'TW' => 'TWD',
		'TZ' => 'USD',
		'UA' => 'UAH',
		'UY' => 'UYU',
		'UZ' => 'UZS',
		'VC' => 'USD',
		'VE' => 'USD',
		'VI' => 'USD',
		'VN' => 'USD',
		'VU' => 'AUD',
		'YE' => 'USD',
		'ZA' => 'ZAR',
		'ZM' => 'USD',
		'ZW' => 'USD',
	];
}
