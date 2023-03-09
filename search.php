<?php
/**
 *
 * Template for displaying search results
 *
 * @package shiro
 */

get_header();

$wmf_results_copy = get_theme_mod( 'wmf_search_results_copy', /* translators: 1. search query */ __( 'Search results for %s', 'shiro-admin' ) );

$template_args = array(
	/* translators: Query that is currently being searched */
	'h1_title' => sprintf( __( $wmf_results_copy, 'shiro' ), get_search_query() ),
);

get_template_part( 'template-parts/header/page-noimage', null, $template_args );

?>

<?php if ( have_posts() ) : ?>
	<div class="search-results__count mw-980">
		<?php
			$total_results = $wp_query->found_posts;
			$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
			$posts_per_page = get_query_var( 'posts_per_page' );
			$first_result = ( $posts_per_page * $paged ) - $posts_per_page + 1;
			$last_result = min( $total_results, $wp_query->post_count * $paged );
			if ( $total_results === 1 ) {
				$first_result = 1;
				$last_result  = 1;
			}
			/* translators: 1. first result, 2. last result, 3. total results */
			printf( __( 'Showing %1$d-%2$d of %3$d results', 'shiro' ), $first_result, $last_result, $total_results );
		?>
	</div>

	<div class="search-results__tabs mw-980">
		<?php
			$options = [
				'all' => 'All',
				'post' => 'News',
				'page' => 'Pages',
			];

			$selected = isset( $_GET['post_type'] ) ? esc_attr( array_shift( $_GET['post_type'] ) ) : 'all';

			foreach ( $options as $key => $value ) {
				$active = $selected === $key ? 'active' : '';
				$href = esc_url( home_url( '/' ) ) . '?s=' . get_search_query() . '&post_type[]=' . $key;
				echo '<a href="' . $href . '" class="' . $active . '">' . $value . '</a>';
			}
		?>
	</div>
<?php endif; ?>

<div class="mw-980 mod-margin-bottom flex flex-medium news-card-list">

	<div id="search-results" class="card-list-container">

			<?php
				if ( have_posts() ) {
					while ( have_posts() ) {
						the_post();

						// Render the block for the current post
						echo WMF\Editor\Blocks\BlogPost\render_block(
							[ 'post_id' => $post->ID ]
						);
					}
				} else {
					// If there are no posts, display a "content-none" template
					get_template_part( 'template-parts/content', 'none' );
				}
			?>
		</div>
	</div>

	<div id="pagination">
		<?php
		if ( have_posts() ) :
			get_template_part( 'template-parts/pagination' );
		endif;
		?>
	</div>

<?php
get_footer();
