<?php
/**
 * Server-side registration for the shiro/clock block.
 */

namespace WMF\Editor\Blocks\DonationPortalForm;

use WP_Block_Type_Registry;
use WP_Post;

const BLOCK_NAME = 'shiro/donation-portal-form';

/**
 * Bootstrap this block functionality.
 */
function bootstrap() {
	add_action( 'wp_after_insert_post', __NAMESPACE__ . '\\action_wp_after_insert_post', 10, 4 );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\action_enqueue_block_editor_assets' );
}

/**
 * Localise currencies for block UI.
 */
function action_enqueue_block_editor_assets() : void {

	wp_add_inline_script(
		WP_Block_Type_Registry::get_instance()->get_registered( BLOCK_NAME )->editor_script_handles[0],
		sprintf(
			 'const DONATION_FORM_CURRENCIES = %s;',
			  wp_json_encode( wmf_get_currency_to_symbol_map() )
		),
		'before'
	);

}

/**
 * Fires once a post, its terms and meta data has been saved.
 *
 * @param int     $post_id Post ID.
 * @param WP_Post $post    Post object.
 */
function action_wp_after_insert_post( $post_id, WP_Post $post ) : void {
	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! is_post_type_viewable( $post->post_type ) ) {
		return;
	}

	if ( $post->post_status !== 'publish' ) {
		return;
	}

	$path = wp_parse_url( get_the_permalink( $post ), PHP_URL_PATH );
	$geoip_paths = (array) get_option( 'wmf_geoip_paths', [] );
	$should_update = false;

	// Check if we should add/remove this path for GeoIP.
	if ( has_block( BLOCK_NAME, $post ) ) {
		$geoip_paths[] = $path;
		$should_update = true;
	} elseif ( in_array( $path, $geoip_paths, true ) ) {
		$geoip_paths = array_filter( $geoip_paths, function ( $_path ) use ( $path ) {
			return $_path !== $path;
		} );
		$should_update = true;
	}

	// Update the stored paths to enable GeoIP for.
	if ( $should_update ) {
		$geoip_paths = array_values( array_unique( array_filter( $geoip_paths ) ) );
		update_option( 'wmf_geoip_paths', $geoip_paths );
	}
}
