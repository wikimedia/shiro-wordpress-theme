<?php
/**
 * Additional Network Settings
 *
 * @package shiro
 */

namespace WMF\Network_Settings;

/**
 * Bootstrap network functionality.
 */
function bootstrap() {
	add_action( 'network_admin_menu', __NAMESPACE__ . '\\add_menu_and_fields' );
	add_action( 'network_admin_edit_seo_settings_page', __NAMESPACE__ . '\\seo_settings_page_update' );
}

/**
 * Creates the sub-menu page and register the SEO and social media settings.
 */
function add_menu_and_fields() {
	add_submenu_page(
		'settings.php',
		__( 'Search Engine Optimization and Social Media Settings', 'shiro-admin' ),
		__( 'SEO & Social', 'shiro-admin' ),
		'manage_network_options',
		'seo_settings_page',
		__NAMESPACE__ . '\\render_settings_page'
	);

	add_settings_section(
		'matomo_settings_section',
		__( 'Matomo settings', 'shiro-admin' ),
		__NAMESPACE__ . '\\matomo_settings_section_content',
		'seo_settings_page'
	);

	register_setting( 'seo_settings_page', 'matomo_siteid' );

	add_settings_field(
		'matomo_siteid_field',
		__( 'Enter Matomo Site ID', 'shiro-admin' ),
		__NAMESPACE__ . '\\matomo_siteid_field_content',
		'seo_settings_page',
		'matomo_settings_section'
	);

	add_settings_section(
		'ogmeta_settings_section',
		__( 'Open Graph protocol settings', 'shiro-admin' ),
		__NAMESPACE__ . '\\ogmeta_settings_section_content',
		'seo_settings_page'
	);

	register_setting( 'seo_settings_page', 'ogmeta_ogimageurl' );

	add_settings_field(
		'ogmeta_ogimageurl_field',
		__( 'Set URL of image for OG:Image', 'shiro-admin' ),
		__NAMESPACE__ . '\\ogmeta_ogimageurl_field_content',
		'seo_settings_page',
		'ogmeta_settings_section'
	);

	add_settings_section(
		'mastodon_settings_section',
		__( 'Mastodon settings', 'shiro-admin' ),
		__NAMESPACE__ . '\\mastodon_settings_section_content',
		'seo_settings_page'
	);

	register_setting( 'seo_settings_page', 'mastodon_handle_verify' );

	add_settings_field(
		'mastodon_handle_verify_field',
		__( 'Set wikimedia.social handle - without "@" prefix - for Mastodon verification', 'shiro-admin' ),
		__NAMESPACE__ . '\\mastodon_handle_verify_field_content',
		'seo_settings_page',
		'mastodon_settings_section'
	);
}

/**
 * Render the settings page.
 */
function render_settings_page() {
	// phpcs:disable WordPress.Security.NonceVerification.Recommended -- add_submenu_page callback.
	?>

	<?php if ( isset( $_GET['updated'] ) && sanitize_text_field( wp_unslash( $_GET['updated'] ) ) ) : ?>
		<div id="message" class="updated notice is-dismissible">
			<p><?php esc_html_e( 'SEO and social media settings were saved.', 'shiro-admin' ); ?></p>
		</div>
	<?php endif; ?>

	<div class="wrap">

		<h1><?php esc_html_e( 'Search Engine Optimization and Social Media Settings', 'shiro-admin' ); ?></h1>

		<form method="post" action="edit.php?action=seo_settings_page">
			<?php
			settings_fields( 'seo_settings_page' );
			do_settings_sections( 'seo_settings_page' );
			submit_button();
			?>
		</form>

	</div>
	<?php
	// phpcs:enable
}

/**
 * Matomo settings section content.
 */
function matomo_settings_section_content() {
	esc_html_e( 'Use the options below to configure the usage of Matomo', 'shiro-admin' );
}

/**
 * Matomo Site ID field content.
 */
function matomo_siteid_field_content() {
	$matomo_siteid = get_site_option( 'matomo_siteid' );

	?>
		<label>
			<input
				type="number"
				name="matomo_siteid"
				value="<?php echo esc_attr( $matomo_siteid ); ?>"
			>
		</label>
		<?php
}

/**
 * Open Graph protocol settings section content.
 */
function ogmeta_settings_section_content() {
	esc_html_e( 'Use the options below to configure Open Graph protocol values for the entire network of sites.', 'shiro-admin' );
}

/**
 * OG:Image field content.
 */
function ogmeta_ogimageurl_field_content() {
	$ogmeta_ogimageurl = get_site_option( 'ogmeta_ogimageurl' );

	?>
		<label>
			<input
				type="text"
				name="ogmeta_ogimageurl"
				value="<?php echo esc_attr( $ogmeta_ogimageurl ); ?>"
			>
		</label>
		<?php
}

/**
 * Mastodon settings section content.
 */
function mastodon_settings_section_content() {
	esc_html_e( 'Use the options below to configure Mastodon values for the entire network of sites.', 'shiro-admin' );
}

/**
 * Mastodon wikimedia.social handle verification field content.
 */
function mastodon_handle_verify_field_content() {
	$mastodon_handle_verify = get_site_option( 'mastodon_handle_verify' );

	?>
		<label>
			<input
				type="text"
				name="mastodon_handle_verify"
				value="<?php echo esc_attr( $mastodon_handle_verify ); ?>"
			>
		</label>
		<?php
}

/**
 * Update the SEO and social media settings.
 */
function seo_settings_page_update() {
	check_admin_referer( 'seo_settings_page-options' );

	$matomo_siteid = sanitize_text_field( $_POST['matomo_siteid'] ?? '' );
	if ( $matomo_siteid ) {
		update_site_option( 'matomo_siteid', $matomo_siteid );
	}

	$ogmeta_ogimageurl = sanitize_text_field( $_POST['ogmeta_ogimageurl'] ?? '' );
	if ( $ogmeta_ogimageurl ) {
		update_site_option( 'ogmeta_ogimageurl', $ogmeta_ogimageurl );
	}

	$mastodon_handle_verify = sanitize_text_field( $_POST['mastodon_handle_verify'] ?? '' );
	if ( $mastodon_handle_verify ) {
		update_site_option( 'mastodon_handle_verify', $mastodon_handle_verify );
	}

	wp_safe_redirect( add_query_arg( 'updated', 'true', network_admin_url( 'settings.php?page=seo_settings_page' ) ) );
	exit;
}
