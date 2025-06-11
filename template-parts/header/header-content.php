<?php
/**
 * Common Header partial
 *
 * @package shiro
 */

$page_header_data = $args;

$h4_link              = ! empty( $page_header_data['h4_link'] ) ? $page_header_data['h4_link'] : '';
$h4_title             = ! empty( $page_header_data['h4_title'] ) ? $page_header_data['h4_title'] : '';
$h2_link              = ! empty( $page_header_data['h2_link'] ) ? $page_header_data['h2_link'] : '';
$h2_title             = ! empty( $page_header_data['h2_title'] ) ? $page_header_data['h2_title'] : '';
$title                = ! empty( $page_header_data['h1_title'] ) ? $page_header_data['h1_title'] : '';
$alt_title            = ! empty( $page_header_data['h1_alt_title'] ) ? $page_header_data['h1_alt_title'] : '';
$meta                 = ! empty( $page_header_data['page_meta'] ) ? $page_header_data['page_meta'] : '';
$allowed_tags         = wp_kses_allowed_html( 'post' );
$allowed_tags['time'] = true;
$button = ! empty( get_post_meta( get_the_ID(), 'intro_button', true ) ) ? get_post_meta( get_the_ID(), 'intro_button', true ) : '';
$extra_height_class = empty( $button['title'] ) ? '' : 'ungrid-extra-height';
$image            = ! empty( $page_header_data['image'] ) ? $page_header_data['image'] : '';

$single_title = '';
if ( ! empty( $h2_title ) xor ! empty( $title ) ) {
	$single_title = ! empty( $h2_title ) ? $h2_title : $title;
}

if ( is_page() ) {
	/**
	 * Page breadcrumb link switch
	 *
	 * Possible values of the switch, inserted on edit page screen:
	 * 1. '' - meta data from component not set (page wasn't yet edited with this component on the page)
	 * 2. 'on' - set to yes
	 * 3. 'off' - set to no
	 */
	$breadcrumb_link_switch = get_post_meta( get_the_ID(), 'show_breadcrumb_links', true );
	if ( $breadcrumb_link_switch === 'on' ) {
		$breadcrumb_link_custom_title = get_post_meta( get_the_ID(), 'breadcrumb_link_title', true );
		$h4_title = ! empty( $breadcrumb_link_custom_title ) ? $breadcrumb_link_custom_title : $h4_title;

		$breadcrumb_link_custom_url = get_post_meta( get_the_ID(), 'breadcrumb_link_url', true );
		$h4_link = ! empty( $breadcrumb_link_custom_url ) ? $breadcrumb_link_custom_url : $h4_link;
	} elseif ( $breadcrumb_link_switch === 'off' ) {
		$h4_link = '';
		$h4_title = '';
	} elseif ( $breadcrumb_link_switch === '' ) { // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedElseif
		// Don't do anything, page wasn't yet edited with this component on the page.
		// Breadcumb link will be displayed with default values.
	}
}

?>

<div class="header-content">

	<!-- Top back link -->
	<?php if ( ! empty( $h4_title ) ) : ?>
	<h2 class="h4 eyebrow">
		<?php if ( ! empty( $h4_link ) ) : ?>
		<a class="back-arrow-link" href="<?php echo esc_url( $h4_link ); ?>">
		<?php endif; ?>
			<?php echo esc_html( $h4_title ); ?>
		<?php if ( ! empty( $h4_link ) ) : ?>
		</a>
		<?php endif; ?>
	</h2>
	<?php endif; ?>

	<!-- Blog home  -->
	<?php if ( is_home() && ! empty( $h2_title ) ) { ?>
		<h2 class="h1 eyebrow"><?php echo esc_html( $h2_title ); ?></h2>
	<?php } ?>

	<?php if ( ! is_front_page() && ! is_home() ) { ?>
		<!-- h1 or title as heading -->
		<?php if ( ! empty( $single_title ) && ! wmf_is_transparency_report_page() && ! apply_filters( 'wmf_hide_page_title', false ) ) { ?>
			<h1>
				<?php echo wp_kses( $single_title, array( 'span' => array( 'class' ) ) ); ?>
			</h1>
			<?php if ( ! empty( $image ) ) { ?>
				<img src="<?php echo esc_url( $image ); ?>" alt="">
			<?php } ?>
		<?php } ?>

		<!-- h2 and title, without image -->
		<?php if ( empty( $image ) && ! empty( $h2_title ) && ! empty( $title ) && ! wmf_is_transparency_report_page() ) { ?>
			<h2 class="h2 eyebrow">
				<?php echo esc_html( $h2_title ); ?>
			</h2>
			<div class="flex flex-medium page-landing fifty-fifty">
				<div class="module-mu w-50p">
					<h1><?php echo wp_kses( $title, array( 'span' => array( 'class' ) ) ); ?></h1>
				</div>
				<div class="page-intro-text module-mu w-50p">
					<!-- No content here -->
				</div>
			</div>
		<?php } ?>

		<!-- h2 and title, with image -->
		<?php if ( ! empty( $image ) && ! empty( $h2_title ) && ! empty( $title ) ) { ?>
			<div class="ungrid <?php echo esc_attr( $extra_height_class ); ?>">
				<div class="alignwide">
					<?php if ( ! empty( $image ) && ! empty( $h2_title ) && ! empty( $title ) ) { ?>
						<div class="flex flex-medium page-landing fifty-fifty">
							<div class="module-mu w-50p">
								<h2 class="h2 eyebrow">
									<?php echo esc_html( $h2_title ); ?>
								</h2>
								<h1><?php echo wp_kses_post( $title ); ?></h1>
								<?php get_template_part( 'template-parts/modules/intro/button', null, $button ); ?>
							</div>
							<div class="page-intro-text module-mu w-50p" >
								<div class="bg-img" style="background-image: url(<?php echo esc_url( $image ); ?>);">

								</div>
							</div>
						</div>
						<?php if ( ! wmf_is_transparency_report_page() ) { ?>
						<div class="content">
							<?php the_content(); ?>
						</div>
						<?php } ?>
					<?php } ?>
				</div>
			</div>
		<?php } ?>
	<?php } ?>

	<?php if ( ! empty( $alt_title ) ) : ?>
		<h2 class="h1 mar-bottom"><?php echo wp_kses( $alt_title, array( 'span' => array( 'class' ) ) ); ?></h2>
	<?php endif; ?>

	<?php if ( ! empty( $meta ) ) : ?>
	<div class="post-meta h4">
		<?php echo wp_kses( $meta, $allowed_tags ); ?>
	</div>
	<?php endif; ?>
</div>
