<?php
/**
 * Callback for server-side rendering for the blog-list block.
 *
 * @param array $attributes Parsed block attributes.
 *
 * @return string HTML markup.
 */

use WMF\Editor\Blocks\BlogPost;

$args = [
	'posts_per_page'   => $attributes['postsToShow'],
	'post_status'      => 'publish',
	'order'            => $attributes['order'],
	'orderby'          => $attributes['orderBy'],
	'suppress_filters' => false,
];

$categories = array_column( $attributes['categories'] ?? [], 'id' );
$excluded_categories = array_column( $attributes['excludedCategories'] ?? [], 'id' );

if ( count( $categories ) > 0 ) {
	$args['cat'] = join( ',', $categories );
}

if ( count( $excluded_categories ) > 0 ) {
	if ( ! isset( $args['cat'] ) ) {
		$args['cat'] = '';
	}
	$args['cat'] = array_reduce( $excluded_categories, function ( $carry, $item ) {
		return $carry . ",-$item";
	}, $args['cat'] );
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
	$in_translated = array_reduce( $args['category__in'] ?? [], function ( $collected, $cat_id ) {
		if ( $collected === true ) {
			return true;
		}
		$term = get_term( $cat_id, 'category' );

		return $term->slug === 'translations';
	}, false );

	if ( ! $in_translated ) {
		// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
		$args['tax_query'] = [
			[
				'taxonomy' => 'content-language',
				'field' => 'term_id',
				'terms' => [ wmf_get_current_content_language_term()->term_id ],
			],
		];
	}
}

$recent_posts = get_posts( $args );

if ( count( $recent_posts ) > 0 ) {
	foreach ( $recent_posts as $recent_post ) {
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo BlogPost\render_block( [
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Need to reiterate for the dynamic array value.
			'post_id' => $recent_post->ID,
			'align' => 'wide',
		] );
	}
}
