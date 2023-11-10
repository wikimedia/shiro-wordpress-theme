<?php
/**
 * Register the shiro/blog-list block.
 *
 * @package shiro
 */

namespace WMF\Editor\Blocks\BlogList;

use WMF\Editor\Blocks\BlogPost;

const BLOCK_NAME = 'shiro/blog-list';

/**
 * Bootstrap this block functionality.
 */
function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

/**
 * Register the block here.
 */
function register_block() {
	register_block_type(
		BLOCK_NAME,
		array(
			'apiVersion'      => 2,
			'render_callback' => __NAMESPACE__ . '\\render_block',
			'attributes'      => array(
				'postsToShow'        => array(
					'type'    => 'integer',
					'default' => 2,
				),
				'categories'         => array(
					'type'  => 'array',
					'items' => array(
						'type' => 'object',
					),
				),
				'excludedCategories' => array(
					'type'  => 'array',
					'items' => array(
						'type' => 'object',
					),
				),
				'order'              => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'            => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'selectedAuthor'     => array(
					'type' => 'number',
				),
			),
		)
	);
}

/**
 * Callback for server-side rendering for the blog-list block.
 *
 * @param array $attributes Parsed block attributes.
 *
 * @return string HTML markup.
 */
function render_block( $attributes ): string {
	$args = array(
		'posts_per_page'   => $attributes['postsToShow'],
		'post_status'      => 'publish',
		'order'            => $attributes['order'],
		'orderby'          => $attributes['orderBy'],
		'suppress_filters' => false,
	);

	$categories          = array_column( $attributes['categories'] ?? array(), 'id' );
	$excluded_categories = array_column( $attributes['excludedCategories'] ?? array(), 'id' );

	if ( count( $categories ) > 0 ) {
		$args['cat'] = join( ',', $categories );
	}

	if ( count( $excluded_categories ) > 0 ) {
		if ( ! isset( $args['cat'] ) ) {
			$args['cat'] = '';
		}
		$args['cat'] = array_reduce(
			$excluded_categories,
			function ( $carry, $item ) {
				return $carry . ",-$item";
			},
			$args['cat'] 
		);
	}

	if ( isset( $attributes['selectedAuthor'] ) ) {
		$args['author'] = $attributes['selectedAuthor'];
	}

	if ( wmf_get_current_content_language_term() !== null ) {
		/*
		 * This allows for a special case where translated posts will *not* be
		 * filtered out: If the block has `Translations` selected as one of the
		 * categories to show, then we *don't* filter out non-main languages.
		 * To do so would almost certainly result in no posts being returned.
		 */
		$in_translated = array_reduce(
			$args['category__in'] ?? array(),
			function ( $collected, $cat_id ) {
				if ( true === $collected ) {
					return true;
				}
				$term = get_term( $cat_id, 'category' );

				return 'translations' === $term->slug;
			},
			false 
		);

		if ( ! $in_translated ) {
            // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			$args['tax_query'] = array(
				array(
					'taxonomy' => 'content-language',
					'field'    => 'term_id',
					'terms'    => array( wmf_get_current_content_language_term()->term_id ),
				),
			);
		}
	}

	$recent_posts = get_posts( $args );

	if ( count( $recent_posts ) > 0 ) {
		$output = '';

		foreach ( $recent_posts as $recent_post ) {
			$output .= BlogPost\render_block( array( 'post_id' => $recent_post->ID ) );
		}

		return $output;
	}

	return '';
}
