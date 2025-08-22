<?php
/**
 * Adds Header for single story pages.
 *
 * @package shiro
 */

$story_header_data = $args;
?>

<div class="header-main header-role">
	<div class="header-content">
		<?php get_template_part( 'template-parts/header/breadcrumbs', null, $story_header_data ); ?>

		<h1><?php the_title(); ?></h1>

	</div>
</div>

</div>
</div><!-- Close out the secondary header. -->

<main id="content" class="module-area is-layout-constrained has-global-padding">
