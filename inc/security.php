<?php
/**
 * Adding security functions.
 *
 * @package wikimedia-contest;
 */

namespace WMF\Security;

/**
 * Booting up the security functionalities.
 *
 * Delegate these responsibilities to the security plugin, if active.
 *
 * Once security plugin is stable, this logic can be removed.
 */
function init() {
	if ( ! function_exists( 'WMF\\Security\\CSP\\bootstrap' ) ) {
		add_action( 'send_headers', __NAMESPACE__ . '\\set_content_security_policy' ); // Policy for content security.
	}
	if ( ! function_exists( 'WMF\\Security\\HTTP_Headers\\bootstrap' ) ) {
		add_action( 'send_headers', __NAMESPACE__ . '\\enable_strict_transport_security' ); // Making sure of HTTPS.
		add_action( 'send_headers', __NAMESPACE__ . '\\set_x_content_type_options' ); // Option of X Content Type.
		add_action( 'send_headers', __NAMESPACE__ . '\\set_referrer_policy' ); // Policy for referrer.
		add_action( 'send_headers', __NAMESPACE__ . '\\set_permissions_policy' ); // Policy for permissions.
	}

	// The following makes videos work on DEVELOP
	add_action( 'send_headers', __NAMESPACE__ . '\\set_additional_content_security_policy' ); // Policy for content security.
}

/**
 * Functioning for HSTS, requirement of HTTPS for all connections.
 */
function enable_strict_transport_security() {
	header( 'Strict-Transport-Security: max-age=31536000' );
}

/**
 * Configures and sends an additional Content Security Policy (CSP) header.
 * The method defines a set of allowed sources for media content and applies it.
 *
 * NOTE: Can be removed when upstreamed into the wikimedia-wordpress-security-plugin.
 *
 * @return void
 */
function set_additional_content_security_policy() {
	$csp_allowed = [
		// Enable video on DEVELOP
		"media-src 'self' https://videos.files.wordpress.com",
	];

	header( 'Content-Security-Policy: ' . implode( '; ', $csp_allowed ) );
}

/**
 * Function for setting strict Policy of Content Security.
 * Only allowing content of Wikimedia domain.
 */
function set_content_security_policy() {
	/**
	 * IMPORTANT NOTICE
	 *
	 * Because of many errors being watched in the WMF site, the current
	 * implementation of our Content-Security-Policy (CSP) is having the 'unsafe-inline'
	 * directive for the scripts and also the styles. This, even resolving the errors,
	 * is allowing potential Cross-Site Scripting (XSS) attacks.
	 *
	 * TODO:
	 *
	 * 1. Removal of 'unsafe-inline' directive for scripts and styles: This directive
	 *    is making less the efficiency of the CSP against attacks of XSS.
	 *
	 * 2. Alternatives being proposed:
	 *
	 *    a. Using a nonce: This would need adding a nonce unique to each inline script/style tag.
	 *
	 *    b. Using a hash: This involves mapping and making hashes for all inline scripts/styles
	 *       and including these hashes in the CSP as exceptions.
	 *
	 * Please make a note that both strategies will demand substantial effort and testing to make
	 * sure that functionality of site remains not affected.
	 */

	$csp_allowed = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.wikimedia.org https://*.wp.com https://www.youtube.com https://player.vimeo.com http://localhost https://localhost http://localhost:8080",
		"frame-src 'self' https://www.youtube.com https://player.vimeo.com https://*.wp.com",
		"style-src 'self' 'unsafe-inline' https://*.wikimedia.org https://*.wp.com",
		"img-src 'self' data: https://*.wikimedia.org https://*.wp.com https://wikimediafoundation.org",
		"font-src 'self' data: https://*.wp.com",
		"connect-src 'self' https://*.wikipedia.org wss://*.wordpress.com",
	];

	header( 'Content-Security-Policy: ' . implode( '; ', $csp_allowed ) );
	header( 'X-Frame-Options: SAMEORIGIN' );
}

/**
 * Setting the X-Content-Type-Options for no sniffing of MIME type.
 */
function set_x_content_type_options() {
	header( 'X-Content-Type-Options: nosniff' );
}

/**
 * Function for setting Referrer Policy. No referrer information.
 */
function set_referrer_policy() {
	header( 'Referrer-Policy: no-referrer' );
}

/**
 * Finally, function for setting the Permissions Policy.
 * We're allowing only the fullscreen feature from our domain.
 */
function set_permissions_policy() {
	header( 'Permissions-Policy: fullscreen=(self)' );
}
