<?php
/**
 * Template Name: Report page
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package shiro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // File should never be accessed directly.
}

get_header();
while ( have_posts() ) :
	the_post();

	// Page Header.
	$parent_page   = wp_get_post_parent_id( get_the_ID() );
	$bodytext1     = get_post_meta( get_the_ID(), 'page_intro', true );
	$allowed_tags  = array(
		'span'   => array(
			'class' => array(),
			'style' => array(),
		),
		'img'    => array(
			'src'    => array(),
			'height' => array(),
			'width'  => array(),
			'alt'    => array(),
			'style'  => array(),
			'class'  => array(),
		),
		'em'     => array(),
		'strong' => array(),
		'a'      => array(
			'href'  => array(),
			'class' => array(),
			'title' => array(),
			'rel'   => array(),
		),
		'p'      => array(),
		'br'     => array(),
	);
	$template_args = array(
		'breadcrumb_parent_link'  => ! empty( $parent_page ) ? get_the_permalink( $parent_page ) : '',
		'breadcrumb_parent_title' => ! empty( $parent_page ) ? get_the_title( $parent_page ) : '',
		'h2_title'                => get_the_title(),
		'h1_title'                => get_post_meta( get_the_ID(), 'sub_title', true ),
	);

	if ( has_post_thumbnail() ) {
		$template_args['image'] = get_the_post_thumbnail_url( get_the_ID(), 'large' );
		get_template_part( 'template-parts/header/page', 'image', $template_args );
	} else {
		get_template_part( 'template-parts/header/page', 'noimage', $template_args );
	}
	?>
	<div class="alignwide flex flex-medium report-template toc__section">
		<div class="w-32p toc__sidebar">
			<?php get_sidebar( 'list' ); ?>
		</div>

		<div class="w-68p toc__content">
			<div class="page-intro">
				<?php if ( ! has_post_thumbnail() ) : ?>
					<?php get_template_part( 'template-parts/page/page', 'intro' ); ?>
				<?php endif; ?>
				<?php echo wp_kses( $bodytext1, $allowed_tags ); ?>
			</div>

			<div class="page-intro">
				<?php get_template_part( 'template-parts/page/page', 'facts' ); ?>
			</div>

			<?php get_template_part( 'template-parts/page/page', 'list' ); ?>
		</div>
	</div>

	<?php
	$modules = array(
		'stories',
		'cta',
		'related',
		'support',
		'connect',
	);

	foreach ( $modules as $module ) {
		get_template_part( 'template-parts/page/page', $module );
	}
	?>

	<?php
endwhile;

get_footer();
