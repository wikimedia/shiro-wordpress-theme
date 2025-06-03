<?php
/**
 * Functionality related to finding and loading assets.
 */

namespace WMF\Assets;

use Asset_Loader\Manifest;

function bootstrap() : void {
	if ( wp_get_environment_type() === 'local' ) {
		add_action( 'wp_footer', __NAMESPACE__ . '\\suppress_dev_server_error_overlay' );
		add_action( 'admin_footer', __NAMESPACE__ . '\\suppress_dev_server_error_overlay' );
	}
}

/**
 * Get the array of valid theme build manifests.
 *
 * @return array
 */
function get_manifests() : array {
	return [
		get_template_directory() . '/assets/dist/development-asset-manifest.json',
		get_template_directory() . '/assets/dist/production-asset-manifest.json',
	];
}

/**
 * Check through the available manifests to find the first which includes the
 * target asset. This allows some assets to be loaded from a running DevServer
 * while others load from production files on disk.
 *
 * @param string $target_asset Desired asset within the manifest.
 * @return string|null
 */
function get_manifest_path( $target_asset ) {
	foreach ( get_manifests() as $manifest_path ) {
		$asset_uri = Manifest\get_manifest_resource( $manifest_path, $target_asset );
		if ( ! empty( $asset_uri ) ) {
			return $manifest_path;
		}
	}
}

/**
 * Manually hide the Webpack DevServer error overlay using CSS.
 *
 * There is not a clean way to disable the overlay in code due a DevServer bug,
 * and it is very distracting when benign-in-practice errors in third-party code
 * or low-impact SCSS warnings trigger it to appear while working on features.
 *
 * @return void
 */
function suppress_dev_server_error_overlay(): void {
	echo '<style type="text/css">#webpack-dev-server-client-overlay,#react-refresh-overlay{display:none;}</style>';
}
