<?php
/**
 * The template for displaying all single stories.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package shiro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // File should never be accessed directly.
}

get_header();

while ( have_posts() ) :
	the_post();

	?>

	<?php
	// The Stories page which contains the list of stories sets the following post meta to the page ID on the
	// 'update_post_meta' hook.
	$parent_page_id = get_post_meta( get_the_ID(), '_story_parent_page', true ) ?? get_page_by_path( '/who-we-are/' );

	get_template_part(
		'template-parts/header/story',
		'single',
		array(
			'breadcrumb_parent' => $parent_page_id,
			'share_links'       => get_post_meta( get_the_ID(), 'contact_links', true ),
		)
	);

	$share_links = get_post_meta( get_the_ID(), 'contact_links', true );
	?>

<div class="alignwide mar-bottom">
	<div class="flex flex-medium flex-space-between mar-bottom_lg">
		<div class="w-48p">
			<?php
				get_template_part(
					'template-parts/thumbnail',
					'framed',
					array(
						'inner_image'     => get_post_thumbnail_id( get_the_ID() ),
						'container_class' => '',
					)
				);
			?>
		</div>
	</div>
	<div class="w-50p">
		<div class="article-main mod-margin-bottom wysiwyg">
			<?php the_content(); ?>
		</div>
	</div>
</div>
</div>

	<?php

	get_template_part( 'template-parts/page/page', 'offsite-links' );
endwhile;

get_footer();
