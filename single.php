<?php
/**
 * The template for displaying all single posts.
 *
 * @link    https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package shiro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // File should never be accessed directly.
}

get_header();
while ( have_posts() ) {
	the_post();
	$intro        = get_post_meta( get_the_ID(), 'page_intro', true );
	$parent_page  = get_option( 'page_for_posts' );
	$allowed_tags = array(
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

	get_template_part(
		'template-parts/header/page',
		'single',
		array(
			'h4_link'   => get_the_permalink( $parent_page ),
			'h4_title'  => get_the_title( $parent_page ),
			'h1_title'  => get_the_title(),
			'page_meta' => sprintf(
				'<span>%s</span><span class="separator">&bull;</span><time datetime="%s">%s</time>',
				wmf_byline(),
				get_the_date( 'c' ),
				get_the_date()
			),
		)
	);

	get_template_part(
		'template-parts/thumbnail',
		'full',
		array(
			'inner_image' => get_post_thumbnail_id(),
		)
	);

	$has_read_more_categories = wmf_enhanced_has_block( 'shiro/read-more-categories' );
	$has_social_share         = wmf_enhanced_has_block( 'shiro/share-article' );
	?>

	<?php if ( ! empty( $intro ) ) : ?>
		<div class="article-title">
			<?php echo wp_kses( $intro, $allowed_tags ); ?>
		</div>
	<?php endif; ?>

	<article class="wysiwyg is-layout-constrained">
		<?php the_content(); ?>

		<?php
		if ( ! $has_social_share ) {
			echo '<div>';
				block_template_part( 'share-article' );
			echo '</div>';
		}

		if ( ! $has_read_more_categories ) {
			echo wp_kses_post( \WMF\Editor\Blocks\ReadMoreCategories\render_block( array() ) );
		}
		?>
	</article>

	<?php
}

$has_blog_list = wmf_enhanced_has_block( 'shiro/blog-list' );
$has_connect   = wmf_enhanced_has_block( 'shiro/contact' );
$has_spotlight = wmf_enhanced_has_block( 'shiro/spotlight' );

$modules = array(
	'profile',
	'offsite-links',
	'cta',
	$has_blog_list ? false : 'related-posts',
	$has_spotlight ? false : 'support',
	$has_connect ? false : 'connect',
);

$modules = array_filter( $modules );
foreach ( $modules as $module ) {
	get_template_part( 'template-parts/page/page', $module );
}
get_footer() ?>
