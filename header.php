<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package shiro
 */

use WMF\Images\Credits;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // File should never be accessed directly.
}

$wmf_skip2_content_label = get_theme_mod( 'wmf_skip2_content_label', __( 'Skip to content', 'shiro-admin' ) );
$wmf_post_thumbnail_url = get_the_post_thumbnail_url( get_the_ID() );
$wmf_ogmeta_ogimageurl = get_site_option( 'ogmeta_ogimageurl' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Setting up 'og:image' variable within <head> -->
<?php
// If set, configure 'featured image' as 'og:image'.
if ( $wmf_post_thumbnail_url && ! ( is_plugin_active( 'wordpress-seo/wp-seo.php' ) ) ) : ?>
	<meta property="og:image" content="<?php echo esc_url( $wmf_post_thumbnail_url ); ?>" />
	<?php
	// If set, configure 'ogmeta_ogimageurl' as 'og:image'.
elseif ( $wmf_ogmeta_ogimageurl && ! ( is_plugin_active( 'wordpress-seo/wp-seo.php' ) ) ) : ?>
	<meta property="og:image" content="<?php echo esc_url( $wmf_ogmeta_ogimageurl ); ?>" />
<?php endif; ?>

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div data-dropdown-backdrop></div>
	<a class="skip-link screen-reader-text" href="#content"><?php echo esc_html( $wmf_skip2_content_label ); ?></a>
	<div id="page" class="site">
		<?php block_template_part( 'header' ); ?>
		<header class="<?php echo esc_attr( wmf_get_header_container_class() ); ?>">
			<div class="header-inner mw-980">
				<?php wmf_translation_alert(); ?>
<?php
