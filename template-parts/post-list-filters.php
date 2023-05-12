<?php
/**
 * Template for post list filter controls
 *
 * @package shiro
 */

// Get query vars.
$query_var_search_term = get_search_query();
$query_var_date_from   = isset( $_GET['date_from'] ) ? sanitize_text_field( $_GET['date_from'] ) : '';
$query_var_date_to     = isset( $_GET['date_to'] ) ? sanitize_text_field( $_GET['date_to'] ) : '';
$query_var_categories  = isset( $_GET['categories'] ) ? array_map( 'sanitize_text_field', $_GET['categories'] ) : [];

?>

<section class="post-list-filter mw-980">

	<div class="post-list-filter__head">

			<?php
			$total_results = $wp_query->found_posts;
			$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
			$posts_per_page = get_query_var( 'posts_per_page' );
			$first_result = ( $posts_per_page * $paged ) - $posts_per_page + 1;
			$last_result = min( $total_results, $wp_query->post_count * $paged );
			if ( $total_results === 1 ) {
				printf( esc_html__( 'Showing 1 of 1 result', 'shiro' ) );
			} elseif ( $total_results > 0 ) {
				printf(
					/* translators: 1. first result, 2. last result, 3. total results */
					esc_html__( 'Showing %1$s - %2$s of %3$s results', 'shiro' ),
					esc_html( $first_result ),
					esc_html( $last_result ),
					esc_html( $total_results )
				);
			}
			?>

		<button class="action-button post-list-filter__toggle">
			<span class="post-list-filter__toggle--hide"><?php echo __( 'Hide filters' ); ?></span>
			<span class="post-list-filter__toggle--show">
			<?php
			if ( isset( $_GET['post_list_filters_nonce'] ) && wp_verify_nonce( sanitize_text_field( $_GET['post_list_filters_nonce'] ), 'post_list_filters' ) ) {
				$filter_count = 0;

				// Search term.
				if ( ! empty( $query_var_search_term ) ) {
					$filter_count++;
				}

				// Date interval.
				if ( ! empty( $query_var_date_from ) && ! empty( $query_var_date_to ) ) {
					$filter_count++;
				}

				// Categories.
				$filter_count += count( $query_var_categories );

				printf( esc_html__( 'Show filters', 'shiro' ) );

				if ( $filter_count > 0 ) {
					echo ' <em>';
					/* translators: 1. how many filters were applied */
					printf( esc_html__( '(%s applied)', 'shiro' ), esc_html( $filter_count ) );
					echo '</em>';
				}
			} else {
				printf( esc_html__( 'Show filters', 'shiro' ) );
			}
			?>
			</span>
		</button>

	</div>

	<form method="get" class="post-list-filter__form">

		<?php wp_nonce_field( 'post_list_filters', 'post_list_filters_nonce' ); ?>

		<div class="post-list-filter__container mw-980">

			<div class="filter-by-text">
				<h5>
					<?php printf( esc_html__( 'Filter by text', 'shiro' ) ); ?>
					<?php if ( ! empty( $query_var_search_term ) ) : ?>
						&nbsp;<em><u>(<?php printf( esc_html__( 'applied', 'shiro' ) ); ?>)</u></em>
					<?php endif; ?>
				</h5>
				<div class="search-text-input-button">
					<input type="text" name="s" value="<?php echo $query_var_search_term; ?>">
				</div>
			</div>

			<div class="filter-by-date">
				<h5>
					<?php printf( esc_html__( 'Filter by date', 'shiro' ) ); ?>
					<?php if ( ! empty( $query_var_date_from ) && ! empty( $query_var_date_to ) ) : ?>
						&nbsp;<em><u>(<?php printf( esc_html__( 'applied', 'shiro' ) ); ?>)</u></em>
					<?php endif; ?>
				</h5>
				<div class="filter-date-inputs-container">
					<input type="date" name="date_from" placeholder="From" value="<?php echo esc_attr( $query_var_date_from ); ?>">
					<input type="date" name="date_to" placeholder="To" value="<?php echo esc_attr( $query_var_date_to ); ?>">
					<button type="button" class="action-button action-button--clear" id="button-reset-date-filters"><?php printf( esc_html__( 'Reset', 'shiro' ) ); ?></button>
				</div>
			</div>

			<div class="filter-by-category">
				<?php
				$categories = get_categories();

				foreach ( $categories as $category ) {
					$category_display = ( $category->parent == 0 )
						? $category->name
						: get_category_parents( $category->parent, false, ' > ', false ) . $category->name;

					$categories_array[ $category->slug ] = $category_display;
				}
				asort( $categories_array );
				?>

				<h5>
					<?php printf( esc_html__( 'Filter by category', 'shiro' ) ); ?>
					<?php if ( count( $query_var_categories ) > 0 ) : ?>
						&nbsp;<em><u>(<?php echo count( $query_var_categories ) . ' ' . esc_html__( 'applied', 'shiro' ); ?>)</u></em>
					<?php endif; ?>
				</h5>

				<ul class='category-container'>
					<?php foreach ( $categories_array as $category->slug => $category_display ) : ?>
					<li>
						<label class='individual-category'>
							<input type="checkbox" name="categories[]" value="<?php echo esc_attr( $category->slug ); ?>" <?php checked( in_array( $category->slug, $query_var_categories ) ); ?>>
							<?php echo esc_html( $category_display ); ?>
						</label>
					</li>
					<?php endforeach; ?>
				</ul>

			</div>

			<button class='action-button action-button--clear' id="button-clear-filters" type="reset"><?php printf( esc_html__( 'Clear filters', 'shiro' ) ); ?></button>
			<button class="action-button action-button--right" id="button-apply-filters" type="submit"><?php printf( esc_html__( 'Apply filters', 'shiro' ) ); ?></button>

		</div>

	</form>

</div>
