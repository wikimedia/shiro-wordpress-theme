<?php
/**
 * Adds Header for default pages
 *
 * @package shiro
 */

$page_header_data = $args;

$title        = ! empty( $page_header_data['h1_title'] ) ? $page_header_data['h1_title'] : '';
$meta         = ! empty( $page_header_data['page_meta'] ) ? $page_header_data['page_meta'] : '';
$allowed_tags = [
	'span' => [ 'class' => [] ],
	'time' => [
		'datetime' => [],
		'itemprop' => [],
	],
	'a'    => [
		'href' => [],
		'class' => [],
		'title' => [],
		'rel' => [],
	],
];
?>

<div class="header-main">
	<div class="header-content mar-bottom_lg header-single">
		<?php get_template_part( 'template-parts/header/breadcrumbs', null, $page_header_data ); ?>

		<div class="mw-784">
			<?php if ( ! empty( $title ) ) : ?>
				<h1><?php shiro_safe_title( $title ); ?></h1>
			<?php endif; ?>

			<?php if ( ! empty( $meta ) ) : ?>
				<div class="post-meta h4">
					<?php echo wp_kses( $meta, $allowed_tags ); ?>
				</div>
			<?php endif; ?>

			<?php block_template_part( 'share-article' ); ?>
		</div>
	</div>
</div>

</div>
</div><!-- Close out the secondary header. -->
<main id="content" class="module-area is-layout-constrained has-global-padding">
