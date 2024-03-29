<?php
/**
 * "Content Language" taxonomy functions.
 *
 * In order to allow creating content in languages that don't have a dedicated
 * site, we register "Content Language" as a taxonomy which can be set on a
 * per-post basis. This allows for individual posts relevant to communities not
 * otherwise served by the blog to be translated and associated with the
 * original post in the same way that MultiLingual Press handles associating
 * content between different lnaguage sites.
 */

/**
 * Register the content-language taxonomy.
 *
 * This taxonomy is used to describe the language of content in posts, etc.
 *
 * @return void
 */
function wmf_register_content_language_taxonomy(): void {
	$language_type_args = array(
		'hierarchical' => false,
		'show_in_rest' => true,
		'rewrite' => false,
		'label' => __( 'Content Language', 'shiro-admin' ),
	);
	register_taxonomy( 'content-language', apply_filters( 'wmf_content_language_post_types', [ 'post' ] ), $language_type_args );
}

/**
 * Get the slug (i.e. the locale code) for the main language of the current site.
 *
 * Returns an empty string if it can't determine the primary language.
 *
 * In practice, this will always be US English, but this is better than
 * hard-coding that.
 *
 * @return string
 */
function wmf_get_current_content_language_slug(): string {
	if ( ! function_exists( '\\Inpsyde\\MultilingualPress\\siteLocale' ) ) {
		return '';
	}
	try {
		return \Inpsyde\MultilingualPress\siteLocale( get_current_blog_id() );
	} catch ( \Inpsyde\MultilingualPress\Framework\Database\Exception\NonexistentTable $exception ) {
		return '';
	}
}

/**
 * Get the term corresponding to the main language, or null if none exists.
 *
 * @return \WP_Term|null
 */
function wmf_get_current_content_language_term(): ?WP_Term {
	$term = get_term_by( 'slug', wmf_get_current_content_language_slug(), 'content-language' );
	if ( ! is_a( $term, WP_Term::class ) ) {
		return null;
	}

	return $term;
}

/**
 * Get the term corresponding to the main language, creating it if it doesn't exist.
 *
 * Returns null if the term cannot be found and cannot be created.
 *
 * @return \WP_Term|null
 */
function wmf_get_and_maybe_create_current_language_term(): ?WP_Term {
	$term = wmf_get_current_content_language_term();
	if ( $term === null ) {
		$term = wmf_create_current_language_term();
	}

	return $term;
}

/**
 * Create a content-language term for the site's current main language.
 *
 * @return \WP_Term|null
 */
function wmf_create_current_language_term(): ?WP_Term {

	// Make sure that we always have the "main language" term.
	$main_locale = wmf_get_current_content_language_term();

	if ( is_a( $main_locale, WP_Term::class ) ) {
		return $main_locale;
	}

	// If the current language term doesn't exist, create it now and return it.
	$created_term = wp_insert_term( wmf_get_current_content_language_slug(), 'content-language' );

	if ( is_wp_error( $created_term ) ) {
		return null;
	}

	return get_term( $created_term['term_id'], 'content-language' );
}

/**
 * Add the default language term if there is not already a content-language set.
 *
 * Primarily this is used as a hook on wp_insert_post -- you usually won't be
 * calling it manually.
 *
 * @param int $post_ID Post ID to set default language term on.
 * @return void
 */
function wmf_add_default_content_language( int $post_ID ): void {
	$languages = wp_get_post_terms( $post_ID, 'content-language' );
	if ( is_wp_error( $languages ) ) {
		/*
		 * The `content-language` taxonomy doesn't exist. We can't recover
		 * from this kind of error, so bail early.
		 */
		return;
	}
	$main_locale = wmf_get_and_maybe_create_current_language_term();
	if ( $main_locale === null ) {
		/*
		 * The current language term doesn't exist and can't be created, which
		 * is not an error we can recover from.
		 */
		return;
	}
	if ( count( $languages ) === 0 ) {
		// No languages chosen, so set the default.
		wp_set_post_terms( $post_ID, array( $main_locale->term_id ), 'content-language' );
	}
}

/**
 * Filter posts by content language on post listings.
 *
 * This is used to ensure that posts having different current-language
 * taxonomy are not displayed on the post listings.
 *
 * @param \WP_Query $query Query object to filter.
 * @return void
 */
function wmf_filter_posts_by_content_language( WP_Query $query ) : void {

	// Don't filter the admin.
	if ( is_admin() ) {
		return;
	}

	// Restrict content-language filtering to the main query.
	if ( ! $query->is_main_query() ) {
		return;
	}

	// Only filter posts.
	if ( ! empty( $query->get( 'post_type' ) ) && ! in_array( $query->get( 'post_type' ), apply_filters( 'wmf_content_language_post_types', [ 'post' ] ), true ) ) {
		return;
	}

	// Allow user to see single posts no matter what.
	if ( is_singular() ) {
		return;
	}

	// Allow users to see post history setting the content-language.
	if ( $query->is_tax( 'content-language' ) ) {
		return;
	}

	// Try to cover all the potential cases where we don't want the content-language filter to work.
	if (
			$query->is_post_type_archive() ||
			$query->is_category() ||
			$query->is_tag() ||
			$query->is_author() ||
			$query->is_date() ||
			$query->is_search() ||
			$query->is_feed() ||
			$query->is_404()
		) {
		return;
	}

	// Get term of main language.
	$main_locale = wmf_get_and_maybe_create_current_language_term();
	if ( $main_locale === null ) {
		return;
	}

	// Filter posts which has content-language set to main_locale.
	$query->set( 'tax_query', [
		[
			'taxonomy' => 'content-language',
			'field'    => 'slug',
			'terms'    => $main_locale->slug,
		],
	] );
}

add_action( 'pre_get_posts', 'wmf_filter_posts_by_content_language' );
add_action( 'wp_insert_post', 'wmf_add_default_content_language' );
add_action( 'admin_init', 'wmf_create_current_language_term' );
add_action( 'init', 'wmf_register_content_language_taxonomy' );

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	/**
	 * Adds the site's main language as a content-language term for all posts that have not set a content-language term.
	 *
	 * ## OPTIONS
	 *
	 * [--dry-run[=<boolean>]]
	 * : When true, no changes are made to DB.
	 * ---
	 * default: true
	 * options:
	 *   - true
	 *   - false
	 * ---
	 *
	 * ## EXAMPLES
	 *
	 *    // Run command but make no changes.
	 *    wp vip apply-default-language
	 *
	 *    // Run command and make changes.
	 *    wp vip apply-default-language --dry-run=false
	 *
	 * @param array $args Command-line positional args.
	 * @param array $opts Command-line associative args.
	 * @return void
	 */
	function wmf_cli_apply_default_language( $args, $opts ) {
		wp_suspend_cache_invalidation( true );
		wp_suspend_cache_addition( true );
		wp_defer_term_counting( true );
		vip_reset_db_query_log();
		vip_reset_local_object_cache();

		// Default to dry run.
		$dry_run = ! ( ( $opts['dry-run'] ?? true ) === 'false' );

		if ( $dry_run ) {
			WP_CLI::warning( 'This is dry run; nothing will actually be changed.' );
			sleep( 5 );
		}

		$term = wmf_get_and_maybe_create_current_language_term();
		if ( $term === null ) {
			WP_CLI::error( 'Count not find term for current language!' );
			return;
		}

		$query_args = [
			'post_types' => apply_filters( 'wmf_content_language_post_types', [ 'post' ] ),

			/*
			 * Getting *all* posts is a bad practice, but in this case it's the
			 * simplest solution:
			 * - The action the loop takes changes the thing the query looks
			 *   for, so originally this just repeated the query.
			 * - This works fine across multiple queries for dry-run=false, but
			 *   for dry-run=true (the default) it creates an infinite loop.
			 * - These should behave the same, with changes to the DB being the
			 *   only difference, so the above is a problem.
			 * In this particular context, we can be 99% certain we're only
			 * running this command in a known environment with ~500 posts, and
			 * the action we run on each post is minimal. Given that, a query
			 * getting *all* posts should be safe.
			 */
			'posts_per_page' => -1,
			'fields' => 'ids',
			// phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			'tax_query' => [
				[
					'taxonomy' => 'content-language',
					'field' => 'term_id',
					'terms' => [ $term->term_id ],
					'operator' => 'NOT EXISTS',
				],
			],
		];
		$posts = get_posts( $query_args );
		$count = 0;
		foreach ( $posts as $post_id ) {
			$terms = wp_get_post_terms( $post_id, 'content-language' );
			if ( is_wp_error( $terms ) ) {
				WP_CLI::error( "$post_id - Cannot find content-language taxonomy!" );
				$count++;
				continue;
			}
			if ( count( $terms ) > 0 ) {
				WP_CLI::success( "$post_id - Has languages; no need to update." );
				$count++;
				continue;
			}

			if ( ! $dry_run ) {
				wmf_add_default_content_language( $post_id );
			}
			WP_CLI::success( "$post_id - Updated content-language terms!" );
			$count++;
			unset( $terms );
		}
		wp_defer_term_counting( false );
		WP_CLI::success( "Updated $count posts." );
	}
	\WP_CLI::add_command( 'vip apply-default-language', 'wmf_cli_apply_default_language' );
}
