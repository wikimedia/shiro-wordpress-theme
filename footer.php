<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package shiro
 */

use WMF\Images\Credits;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // File should never be accessed directly.
}

// Automatically add credits to all content that is not an archive, search, or 404 page.
if ( ! is_archive() && ! is_home() && ! is_404() ) {
	get_template_part( 'template-parts/modules/images/credits', null, array( 'image_ids' => Credits::get_instance()->get_ids() ) );
}
?>
</main>

<?php
$wmf_blackout_modal_enabled           = get_theme_mod( 'wmf_blackout_modal_enabled' );
$wmf_blackout_modal_content           = get_theme_mod( 'wmf_blackout_modal_content', '<h1>Black Lives Matter.<br>Black History Matters.<br>Black Communities Matter.</h1><h2><a href="https://medium.com/freely-sharing-the-sum-of-all-knowledge">Read the Wikimedia Foundation\'s statement.</a></h2><h2><a href="https://meta.wikimedia.org/wiki/Black_Lives_Matter">Take action on Wikimedia.</a></h2>' );
$wmf_blackout_modal_cookie            = get_theme_mod( 'wmf_blackout_modal_cookie', 'blackoutModalDismissed' );
$wmf_blackout_modal_cookie_expiration = get_theme_mod( 'wmf_blackout_modal_cookie_expiration', 30 );
?>

<?php if ( $wmf_blackout_modal_enabled ) : ?>
	<!-- Blackout Modal -->
	<div class="blackout-modal" aria-hidden="true" role="dialog" data-cookie="<?php echo esc_attr( $wmf_blackout_modal_cookie ); ?>" data-cookie-expiration="<?php echo esc_attr( $wmf_blackout_modal_cookie_expiration ); ?>">
		<div class="blackout-modal-dialog" role="document">
			<div class="blackout-modal-header">
				<button type="button" class="btn-close close-blackout-modal" aria-hidden="true">
					<span class="screen-reader-text"><?php esc_html_e( 'Close', 'shiro' ); ?></span>
					&times;
				</button>
			</div>
			<div class="blackout-modal-body">
				<?php echo wp_kses_post( $wmf_blackout_modal_content ); ?>
			</div>
		</div>
	</div>
	<!-- /Blackout Modal -->
<?php endif; ?>
<?php block_template_part( 'footer' ); ?>

<?php wp_footer(); ?>

</div>
</body>
</html>
