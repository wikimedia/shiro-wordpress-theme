<?php
/**
 * Adds header breadcrumbs
 *
 * @package shiro
 */

$defaults = [
	'breadcrumb_parent'              => is_singular() ? wp_get_post_parent_id( get_the_ID() ) : null,
	'breadcrumb_custom_parent_link'  => '',
	'breadcrumb_custom_parent_title' => '',
];
$breadcrumb_args = wp_parse_args( $args, $defaults );

$breadcrumb_parent       = $breadcrumb_args['breadcrumb_parent'];
$breadcrumb_parent_link  = $breadcrumb_args['breadcrumb_custom_parent_link'];
$breadcrumb_parent_title = $breadcrumb_args['breadcrumb_custom_parent_title'];

if ( empty( $breadcrumb_parent_link ) && ! empty( $breadcrumb_parent ) ) {
	$breadcrumb_parent_link = get_the_permalink( $breadcrumb_parent );
}

if ( empty( $breadcrumb_parent_title ) && ! empty( $breadcrumb_parent ) ) {
	$breadcrumb_parent_title = get_the_title( $breadcrumb_parent );
}

$post_ancestors = is_page() ? get_post_ancestors( $breadcrumb_parent ) : [];

$home_page_id = get_option( 'page_on_front' );
$home_title = $home_page_id ? get_the_title( $home_page_id ) : __( 'Home', 'shiro' );
?>

<nav aria-label="Breadcrumbs" class="breadcrumbs">
	<h2 class="screen-reader-text"><?php echo esc_html__( 'You are here:', 'shiro' ); ?></h2>
	<ul>
		<li><a href="<?php echo esc_url( home_url() ); ?>">
			<?php echo esc_html( $home_title ); ?>
		</a></li>

		<?php
		if ( ! empty( $post_ancestors ) ) :
			foreach ( array_reverse( $post_ancestors ) as $ancestor ) :
				?>
				<li><a href="<?php echo esc_url( get_the_permalink( $ancestor ) ); ?>">
					<?php echo esc_html( get_the_title( $ancestor ) ); ?>
				</a></li>
			<?php endforeach; ?>
		<?php endif; ?>

		<?php if ( ! empty( $breadcrumb_parent_link ) && ! empty( $breadcrumb_parent_title ) ) : ?>
			<li><a href="<?php echo esc_url( $breadcrumb_parent_link ); ?>">
				<?php echo esc_html( $breadcrumb_parent_title ); ?>
			</a></li>
		<?php endif; ?>

		<li aria-current="page"><?php the_title(); ?></li>
	</ul>
</nav>
