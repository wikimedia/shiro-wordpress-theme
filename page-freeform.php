<?php
/**
 * Template Name: Freeform
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package shiro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // File should never be accessed directly.
}

get_header();
while ( have_posts() ) {
	the_post();

	// Page Header.
	$template_args = array(
		'h2_title' => '',
		'h1_title' => '',
	);

	get_template_part( 'template-parts/header/page', 'noimage', $template_args );

	?>
	<div class="freeform-content alignfull">
		<?php the_content(); ?>
	</div>

	<?php get_template_part( 'template-parts/page/page', 'connect' ); ?>

	<?php
}
get_footer();
