<?php
/**
 * Server-side registration for the shiro/clock block.
 */

namespace WMF\Editor\Blocks\DonationPortalForm;

use WP_Post;

const BLOCK_NAME = 'shiro/donation-portal-form';

/**
 * Bootstrap this block functionality.
 */
function bootstrap() {
	add_action( 'wp_after_insert_post', __NAMESPACE__ . '\\action_wp_after_insert_post', 10, 4 );
}

/**
 * Fires once a post, its terms and meta data has been saved.
 *
 * @param int           $post_id     Post ID.
 * @param \WP_Post      $post        Post object.
 * @param bool          $update      Whether this is an existing post being updated.
 * @param null|\WP_Post $post_before Null for new posts, the WP_Post object prior to the update for updated posts.
 */
function action_wp_after_insert_post( $post_id, WP_Post $post, $update, ?WP_Post $post_before ) : void {
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
	} else if ( in_array( $path, $geoip_paths, true ) ) {
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
