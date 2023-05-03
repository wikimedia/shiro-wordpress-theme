<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package shiro
 */

get_header();

$post_id          = get_option( 'page_for_posts' );
$featured_post_id = get_post_meta( $post_id, 'featured_post', true );

$template_args = array(
	'h2_title' => get_the_title( $post_id ),
);

get_template_part( 'template-parts/header/page-noimage', null, $template_args );

?>

<?php if ( have_posts() ) : ?>
	<div class="mw-980">
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
	</div>

	<div class="search-results__tabs mw-980">
		<?php
			$options = [
				'all' => __( 'All', 'shiro' ),
				'post' => __( 'News', 'shiro' ),
				'page' => __( 'Pages', 'shiro' ),
			];

			// All is the default option if none is selected, or if the post_type provided isn't in the list.
			$query_option = ( isset( $_GET['post_type'][0] ) ) // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				? sanitize_text_field( wp_unslash( $_GET['post_type'][0] ) ) // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				: 'post';
			$option = array_key_exists( $query_option, $options ) ? $query_option : 'all';
			$selected = esc_attr( $option );

			foreach ( $options as $key => $value ) {
				$active = $selected === $key ? 'active' : '';

				$href = add_query_arg( 's', get_search_query(), home_url( '/' ) );

				// Simplest way to get the all types is not adding post_type param filter.
				if ( $key !== 'all' ) {
					$href = add_query_arg( 'post_type[]', $key, $href );

					/* translators: post type, i.e., News or Pages */
					$aria_label = sprintf( __( 'Filter search for %s only', 'shiro' ), $value );
				} else {
					$aria_label = sprintf( __( 'Show all search results', 'shiro' ), $value );
				}

				printf(
					'<a href="%1$s" class="search-results__tab %2$s" aria-label="%3$s" title="%3$s">%4$s</a>',
					esc_url( $href ),
					esc_attr( $active ),
					esc_attr( $aria_label ),
					esc_html( $value )
				);
			}
			?>
	</div>
<?php endif; ?>

<style type="text/css">
	.search-form__field {
		border: unset;
	}
</style>

<div class="mw-980">
	<h2>Search by text</h2>
	<form role="search" method="get" class="search-form">

		<label class="search-form__label">
			<span class="screen-reader-text"><?php echo esc_html_x( 'Search for:', 'label' ) ?></span>
			<input type="search" class="search-form__field"
				placeholder="<?php echo esc_attr_x( $wmf_search_placeholder, 'placeholder' ) ?>"
				value="<?php echo get_search_query() ?>" name="s"
				title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>" />
		</label>
		<button type="submit" class="search-form__button">
			<span class="screen-reader-text"><?php echo esc_html( $wmf_search_button ) ?></span>
			<?php wmf_show_icon( 'search', 'search-form__icon' ); ?>
		</button>

		<h2>Filter by date</h2>
		<div class="search-results__date-filter">
			<label for="date-filter-start">Start Date</label>
			<input type="date" id="date-filter-start" name="date-filter-start">
			<label for="date-filter-end">End Date</label>
			<input type="date" id="date-filter-end" name="date-filter-end">
			<button id="date-filter-submit">Filter</button>
		</div>
	</form>
</div>

<?php
function add_query_vars_filter( $vars ){
	$vars[] = "end_date";
	$vars[] = "start_date";
	return $vars;
  }
add_filter( 'query_vars', 'add_query_vars_filter' );

function parse_date_range_query_string( $query ){
$start_date = get_query_var('start_date', 1900);
$end_date = get_query_var('end_date', date("Y"));
if (!is_admin() && $query->is_main_query()) {
		  $query->set('date_query', array(
			  array(
				  'after' => array(
						  'year' => $start_date,
						  'month' => 1,
						  'day' => 1
					  ),
				  'before' => array(
						  'year'  => $end_date,
						  'month' => 12,
						  'day' => 31
					  ),
				  'inclusive' => true
			  ),
		  )
	  );
  }
}

add_filter( 'pre_get_posts', 'parse_date_range_query_string' );
?>

<div class="mw-980">
	<h2>Categories</h2>
	<?php
	$categories = get_categories();
	foreach ($categories as $category) {
		if ($category->parent == 0) {
			$category_display = $category->name;
		} else {
			$category_display = get_category_parents($category->parent, false, ' > ', false) . $category->name;
		}

		echo '<div style="display: inline-block; margin: 5px; padding: 10px; width: auto; border: 1px solid #CCC;">';
		echo '<input type="checkbox" id="' . $category->term_id . '" name="' . $category->term_id . '" value="' . $category->term_id . '">&nbsp;';
		echo '<label for="' . $category->term_id . '">' . $category_display . '</label>&nbsp;&nbsp;';
		echo '</div>';
	}
	?>
</div>

<div class="blog-list">

	<?php
	$post = get_post( $featured_post_id );
	if ( ! empty( $post ) ) {
		$featured_post_id = (int) $post->ID;
		echo wp_kses_post( WMF\Editor\Blocks\BlogPost\render_block(
			[
				'post_id' => $featured_post_id,
				'is_featured' => true,
			]
		) );
	}
	?>

	<?php get_template_part( 'template-parts/category-list' ); ?>

	<?php
	if ( have_posts() ) :
		while ( have_posts() ) :
			the_post();

			if ( get_the_ID() === intval( $featured_post_id ) ) {
				continue;
			}

			echo wp_kses_post( WMF\Editor\Blocks\BlogPost\render_block(
				[ 'post_id' => $post->ID ]
			) );
		endwhile;

	else :
		get_template_part( 'template-parts/content', 'none' );
	endif;
	?>

</div>

<?php
if ( have_posts() ) :
	get_template_part( 'template-parts/pagination' );
endif;

$modules = array(
	'support',
	'connect',
);

foreach ( $modules as $module ) {
	get_template_part( 'template-parts/page/page', $module );
}

get_footer();
