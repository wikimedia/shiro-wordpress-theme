<?php
/**
 * Handles general connect module which will appear on all pages unless excluded.
 *
 * @package shiro
 */

$template_args = $args;

$defaults = array(
	// Headings.
	'pre_heading'                 => get_theme_mod( 'wmf_connect_pre_heading', __( 'Connect', 'shiro-admin' ) ),
	'heading'                     => get_theme_mod( 'wmf_connect_heading', __( 'Stay up-to-date on our work.', 'shiro-admin' ) ),

	// Contact box.
	'contact_heading'             => get_theme_mod( 'wmf_contact_heading', __( 'Say hello', 'shiro-admin' ) ),
	'contact_content'             => get_theme_mod( 'wmf_contact_content', __( 'How to get in touch with the team connected to this content. Whether it’s a site to visit, contact person, etc. Rich text box.', 'shiro-admin' ) ),
	'contact_link'                => get_theme_mod( 'wmf_contact_link', __( 'email@domain.url', 'shiro-admin' ) ),
	'contact_link_text'           => get_theme_mod( 'wmf_contact_link_text', __( 'email@domain.url', 'shiro-admin' ) ),
);

$rand_translation_title = wmf_get_random_translation( 'wmf_connect_pre_heading' );

// We don't want empty fields from the page to affect the output.
foreach ( $defaults as $key => $default ) {
	$template_args[ $key ] = empty( $template_args[ $key ] ) ? $default : $template_args[ $key ];
}

$contact_link_href = is_email( $template_args['contact_link'] ) ? sprintf( 'mailto:%s', $template_args['contact_link'] ) : $template_args['contact_link'];
$contact_link_text = ! empty( $template_args['contact_link_text'] ) ? $template_args['contact_link_text'] : $template_args['contact_link'];

?>

<div class="connect-container white-bg mod-margin-bottom">
	<div class="mw-980">
		<?php if ( ! empty( $template_args['pre_heading'] ) ) : ?>
			<p class="double-heading__secondary is-style-h5">
				<?php echo esc_html( $template_args['pre_heading'] ); ?>
				<?php if ( ! empty( $rand_translation_title['lang'] ?? '' ) ) : ?>
				— <span lang="<?php echo esc_attr( $rand_translation_title['lang'] ?? '' ); ?>"><?php echo esc_html( $rand_translation_title['content'] ?? '' ); ?></span>
				<?php endif; ?>
			</p>
		<?php endif; ?>
		<?php if ( ! empty( $template_args['heading'] ) ) : ?>
			<h2 class="double-heading__primary is-style-h3">
				<?php echo esc_html( $template_args['heading'] ); ?>
			</h2>
		<?php endif; ?>

		<div class="flex flex-medium flex-space-between">
			<div class="module-mu w-48p rounded">
				<?php wmf_show_icon( 'userAvatar' ); ?>
				<?php if ( ! empty( $template_args['contact_heading'] ) ) : ?>
					<h3 class="is-style-sans-h3"><?php echo esc_html( $template_args['contact_heading'] ); ?></h3>
				<?php endif; ?>
				<?php if ( ! empty( $template_args['contact_content'] ) ) : ?>
					<div class="wysiwyg">
						<?php echo wp_kses_post( wpautop( $template_args['contact_content'] ) ); ?>
					</div>
				<?php endif; ?>
				<?php if ( ! empty( $contact_link_href ) ) : ?>
					<div class="wysiwyg">
						<!-- Single link -->
						<a class="arrow-link" href="<?php echo esc_url( $contact_link_href ); ?>" target="_blank"><?php echo esc_html( $contact_link_text ); ?></a>
					</div>
				<?php endif; ?>
				<?php get_template_part( 'template-parts/modules/social/follow', 'horizontal', $template_args ); ?>
			</div><!-- End .multi-use -->
		</div>
	</div>
</div>
