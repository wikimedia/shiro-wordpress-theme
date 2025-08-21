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

if ( ! defined( 'ABSPATH' ) ) {
	exit; // File should never be accessed directly.
}

get_header(); ?>

<?php

$posts_page = get_option( 'page_for_posts' );

$template_args = array(
	'h1_title'          => get_the_archive_title(),
	'breadcrumb_parent' => $posts_page,
);

get_template_part( 'template-parts/header/page-noimage', null, $template_args );

?>

<?php if ( have_posts() ) : ?>
<div class="blog-list is-layout-flow alignwide">
	<?php
	while ( have_posts() ) :
		the_post();

		// Escaping is done within wrapped template part.
		// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
		echo WMF\Editor\Blocks\BlogPost\render_block(
			[ 'post_id' => $post->ID ]
		);
		// phpcs:enable
	endwhile;
	?>
</div>
	<?php
else :
	get_template_part( 'template-parts/content', 'none' );
endif;
?>

<?php
if ( have_posts() ) :
	get_template_part( 'template-parts/pagination' );
endif;

get_footer();
