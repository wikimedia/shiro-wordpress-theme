<?php
/**
 * Adds Header for default pages
 *
 * @package shiro
 */

$page_header_data = $args;

?>
		<div class="header-main">
			<?php get_template_part( 'template-parts/header/header', 'content', $page_header_data ); ?>
		</div>
	</div>
</div><!-- Close out the secondary header. -->

<main id="content" class="module-area is-layout-constrained has-global-padding">
