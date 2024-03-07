<?php
/**
 * Server-side registration for the shiro/clock block.
 */

namespace WMF\Editor\Blocks\Clock;

use Asset_Loader;
use WMF\Assets;

const BLOCK_NAME = 'shiro/clock';

/**
 * Bootstrap this block functionality.
 */
function bootstrap() {
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register_block_view_script' );
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

/**
 * Register (but do not enqueue) the frontend view script for the block.
 *
 * This will be conditionally enqueued by WP when the block is present on the
 * page using the block.json "viewScript" property.
 */
function register_block_view_script() : void {
	Asset_Loader\register_asset(
		Assets\get_manifest_path( 'blocks/clock.js' ),
		'blocks/clock.js',
		[
			'handle'       => 'clock-frontend',
			'dependencies' => [],
		]
	);
}

/**
 * Register the block here.
 */
function register_block() : void {
	register_block_type_from_metadata( get_template_directory() . '/assets/src/editor/blocks/clock' );
}
