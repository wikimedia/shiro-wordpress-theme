<?php
/**
 * Template for post list filter controls
 *
 * @package shiro
 */
?>

 <section class="post-list-filter mw-980">

	<div class="post-list-filter__head">

		<h3>
			<?php
			$total_results = $wp_query->found_posts;
			$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
			$posts_per_page = get_query_var( 'posts_per_page' );
			$first_result = ( $posts_per_page * $paged ) - $posts_per_page + 1;
			$last_result = min( $total_results, $wp_query->post_count * $paged );
			if ( $total_results === 1 ) {
				printf( esc_html__( 'Showing 1 of 1 result', 'shiro' ) );
			} else {
				printf(
					/* translators: 1. first result, 2. last result, 3. total results */
					esc_html__( 'Showing %1$s - %2$s of %3$s results', 'shiro' ),
					esc_html( $first_result ),
					esc_html( $last_result ),
					esc_html( $total_results )
				);
			}
			?>
		</h3>

		<button class="post-list-filter__toggle">
			<?php
				$filter_count = 0;

				$search_term = get_search_query();
				if ( ! empty( $search_term ) ) {
					$filter_count++;
				}

				if ( ! empty( sanitize_text_field( $_GET['date_from'] ) ) && ! empty( sanitize_text_field( $_GET['date_to'] ) ) ) {
					$filter_count++;
				}

				if ( ! empty( $_GET['categories'] ) ) {
					$filter_count += count( $_GET['categories'] );
				}

				printf( esc_html__( 'Show filters', 'shiro' ) );

				if ( $filter_count > 0 ) {
					echo ' <i>';
					/* translators: 1. how many filters were applied */
					printf( esc_html__( '(%s applied)' , 'shiro' ), $filter_count );
					echo '</i>';
				}
			?>
		</button>

	</div>

	<form method="get" class="post-list-filter__form">

		<div class="post-list-filter__container mw-980">

			<div class="filter-by-text">
				<h5><?php printf( esc_html__( 'Filter by text', 'shiro' ) ); ?></h5>
				<div class="search-text-input-button">
					<input type="text" name="s" value="<?php echo get_search_query(); ?>">
				</div>
			</div>

			<div class="filter-by-date">
				<h5><?php printf( esc_html__( 'Filter by date', 'shiro' ) ); ?></h5>
				<div class="filter-date-inputs-container">
					<input type="date" name="date_from" placeholder="From" value="<?php echo isset( $_GET['date_from'] ) ? sanitize_text_field( $_GET['date_from'] ) : ''; ?>">
					<input type="date" name="date_to" placeholder="To" value="<?php echo isset( $_GET['date_to'] ) ? sanitize_text_field( $_GET['date_to'] ) : ''; ?>">
					<button type="button" class="button-reset-date-filters">Reset</button>
				</div>
			</div>

			<div class="filter-by-category">
				<?php
					$categories = get_categories();
					$current_categories = isset( $_GET['categories'] ) ? $_GET['categories'] : [];

					foreach ( $categories as $category ) {
						$category_display = ($category->parent == 0)
							? $category->name
							: get_category_parents($category->parent, false, ' > ', false) . $category->name;

						$categories_array[ $category->slug ] = $category_display;
					}
					asort($categories_array);
				?>

				<h5>
					<?php printf( esc_html__( 'Filter by category', 'shiro' ) ); ?>
					<?php if ( count( $current_categories ) > 0 ) : ?>
						&nbsp;
						<i>
							(
								<?php echo count( $current_categories ); ?>
								<?php printf( esc_html__( 'applied', 'shiro' ) ); ?>
							)
						</i>
					<?php endif; ?>
				</h5>

				<ul>
					<?php foreach ( $categories_array as $category->slug => $category_display ) : ?>
					<li>
						<label class='individual-category'>
							<input type="checkbox" name="categories[]" value="<?php echo esc_attr( $category->slug ); ?>" <?php checked( in_array( $category->slug, $current_categories ) ); ?>>
							<?php echo esc_html( $category_display ); ?>
						</label>
					</li>
					<?php endforeach; ?>
				</ul>

			</div>

			<button class='button-clear-filters' type="reset"><?php printf( esc_html__( 'Clear filters', 'shiro' ) ); ?></button>
			<button type="submit" class="button-apply-filters"><?php printf( esc_html__( 'Apply filters', 'shiro' ) ); ?></button>

		</div>

	</form>

</div>
