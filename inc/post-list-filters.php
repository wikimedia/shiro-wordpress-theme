<?php
/**
 * Functionality for Post List Filters.
 *
 * @package shiro
 */

namespace Post_List_Filters;

/**
 * Bootstrap post list filters functionality.
 */
function bootstrap() {
	add_action( 'pre_get_posts', __NAMESPACE__ . '\\custom_post_list_filters' );
}

/**
 * Handles post list filtering by text, date and categories.
 *
 * This function is hooked into the pre_get_posts action below.
 *
 * @param WP_Query $query
 * @return void
 */
function custom_post_list_filters( $query ) : void {

	if ( ! $query->is_main_query() ) {
		return;
	}

	// Filter by search text.
	$search_text = isset( $_GET['s'] ) ? sanitize_text_field( $_GET['s'] ) : '';
	if ( $search_text ) {
		$query->set( 's', $search_text );
	}

	// Filter by date interval.
	$date_from = isset( $_GET['date_from'] ) ? sanitize_text_field( $_GET['date_from'] ) : '';
	$date_to   = isset( $_GET['date_to'] ) ? sanitize_text_field( $_GET['date_to'] ) : '';
	if ( ! empty( $date_from ) && ! empty( $date_to ) ) {
		$query->set( 'date_query', [
			[
				'after'     => $date_from,
				'before'    => $date_to,
				'inclusive' => true,
			],
		] );
	}

	// Filter by categories.
	$categories = isset( $_GET['categories'] ) ? $_GET['categories'] : [];
	if ( ! empty( $categories ) ) {
		$query->set( 'tax_query', [
			[
				'taxonomy' => 'category',
				'field'    => 'slug',
				'terms'    => $categories,
			],
		] );
	}
}
