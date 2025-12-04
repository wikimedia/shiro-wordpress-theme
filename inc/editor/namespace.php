<?php
/**
 * Functionality related to supporting the stepped migration to block editor content.
 */

namespace WMF\Editor;

use Asset_Loader;
use WMF\Assets;

const SCRIPT_DEBUG_WARNING = 'Hot reloading was requested but SCRIPT_DEBUG is false. Your bundle will not load. Please enable SCRIPT_DEBUG or disable hot reloading.';

/**
 * Bootstrap hooks relevant to the block editor.
 */
function bootstrap() {
	add_filter( 'init', __NAMESPACE__ . '\\register_blocks' );
	add_filter( 'body_class', __NAMESPACE__ . '\\body_class' );
	add_filter( 'allowed_block_types_all', __NAMESPACE__ . '\\filter_blocks', 10, 2 );
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\add_theme_supports' );
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\register_core_block_styles' );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
	add_filter( 'block_categories_all', __NAMESPACE__ . '\\add_block_categories' );

	// Disable block directory, we cannot (and would not want to) dynamically add plugins.
	remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );
}

/**
 * Register blocks which use the block.json standard.
 */
function register_blocks() {
	$block_dirs = glob( get_template_directory() . '/assets/dist/blocks/*/block.json' );

	foreach ( $block_dirs as $block_dir ) {
		register_block_type_from_metadata( $block_dir );
	}
}

/**
 * Add "has-blocks" class to posts with block content.
 *
 * Used to support a stepped migration to the new block editor styles.
 *
 * @param string[] $body_classes Body classes.
 * @return string[] Updated classlist array.
 */
function body_class( $body_classes ) {
	if ( is_singular() && has_blocks( get_queried_object_id() ) ) {
		$body_classes[] = 'has-blocks';
	}

	return $body_classes;
}

/**
 * Filter the allowed blocks to an include list of blocks that we deem as
 * relevant to the project. Can return true to include all blocks, or false to
 * include no blocks.
 *
 * @param bool|string[]            $allowed_block_types  Array of block type slugs, or boolean to enable/disable all.
 * @param \WP_Block_Editor_Context $block_editor_context The current block editor context.
 *
 * @return bool|string[] Filtered allowed blocks list.
 */
function filter_blocks( $allowed_block_types, $block_editor_context ) {
	$blocks = [
		// Custom blocks
		'shiro/banner',
		'shiro/blog-list',
		'shiro/card',
		'shiro/carousel',
		'shiro/clock',
		'shiro/clock-stat',
		'shiro/collapsible-text',
		'shiro/contact',
		'shiro/donation-portal-form',
		'shiro/double-heading',
		'shiro/linked-toc-columns',
		'shiro/linked-toc-item',
		'shiro/share-article',
		'shiro/spotlight',
		'shiro/stairs',
		'shiro/stair',
		'shiro/tabbed',
		'shiro/tabbed-item',
		'shiro/toc',
		'shiro/toc-columns',
		'shiro/tweet-this',
		'shiro/inline-languages',
		'shiro/external-link',
		'shiro/profile',
		'shiro/profile-list',
		'shiro/unseen-artist',
		'shiro/unseen-facts',
		'shiro/unseen-footer',
		'shiro/unseen-intro',
		'shiro/accordion',
		'shiro/accordion-item',
		'shiro/interactive-card',
		'shiro/video-promo-container',
		'shiro/video-promo-play',

		// Plugin blocks
		'gravityforms/form',
		'mailchimp/mailchimp',
		'mailchimp/mailchimp-form-field',
		'mailchimp/mailchimp-audience-group',

		// Core blocks
		'core/paragraph',
		'core/image',
		'core/heading',
		'core/list',
		'core/list-item',
		'core/table',
		'core/audio',
		'core/video',
		'core/file',
		'core/columns',
		'core/column',
		'core/group',
		'core/separator',
		'core/spacer',
		'core/embed',
		'core/freeform',
		'core/missing',
		'core/block',
		'core/button',
		'core/buttons',
		'core/latest-posts',
		'core/post-featured-image',
		'core/post-template',
		'core/post-terms',
		'core/post-title',
		'core/query',
		'core/quote',
		'core/shortcode',
	];

	if ( ( $block_editor_context->post->post_type ?? '' ) === 'post' ) {
		$blocks[] = 'shiro/read-more-categories';
		$blocks[] = 'shiro/blog-post-heading';
	}

	if ( ( $block_editor_context->post->post_type ?? '' ) === 'page' ) {
		$blocks[] = 'shiro/home-page-hero';
		$blocks[] = 'shiro/landing-page-hero';
		$blocks[] = 'shiro/report-landing-hero';
	}

	if ( ( $block_editor_context->name ?? '' ) === 'core/edit-site' ) {
		$blocks[] = 'core/navigation';
		$blocks[] = 'core/navigation-link';
		$blocks[] = 'core/navigation-submenu';
		$blocks[] = 'core/search';
		$blocks[] = 'core/site-logo';
		$blocks[] = 'core/site-tagline';
		$blocks[] = 'core/site-title';
		$blocks[] = 'core/social-links';
		$blocks[] = 'core/social-link';
		$blocks[] = 'hm-blocks/hm-mega-menu-block';
		$blocks[] = 'shiro/language-switcher-list';
	}

	return $blocks;
}

/**
 * Add theme supports for editor functionality.
 */
function add_theme_supports() {

	// Add support and default values for block editor styles.
	add_theme_support( 'editor-styles' );
	$css_file = is_rtl() ? 'editor-style.rtl.css' : 'editor-style.css';
	add_editor_style( $css_file );

	// Define alternate font sizes selectable in the editor (the default
	// for body copy is 18px / 1.75 on desktop; 16px / 1.75 on mobile).
	add_theme_support( 'editor-font-sizes', [
		[
			'name' => __( 'Small', 'shiro-admin' ),
			'shortName' => __( 'S', 'shiro-admin' ),
			'size' => 14,
			'slug' => 'small',
		],
		[
			'name' => __( 'Medium', 'shiro-admin' ),
			'shortName' => __( 'M', 'shiro-admin' ),
			'size' => 20,
			'slug' => 'medium',
		],
		[
			'name' => __( 'Large', 'shiro-admin' ),
			'shortName' => __( 'L', 'shiro-admin' ),
			'size' => 24,
			'slug' => 'large',
		],
		[
			'name' => __( 'X-Large', 'shiro-admin' ),
			'shortName' => __( 'XL', 'shiro-admin' ),
			'size' => 32,
			'slug' => 'xlarge',
		],
		[
			'name' => __( 'Jumbo', 'shiro-admin' ),
			'shortName' => __( 'J', 'shiro-admin' ),
			'size' => 40,
			'slug' => 'jumbo',
		],
	] );

	// Remove the ability to set custom font sizes in the editor.
	add_theme_support( 'disable-custom-font-sizes' );

	// Disable and gradient selection in the editor.
	add_theme_support( 'editor-gradient-presets', [] );
	add_theme_support( 'disable-custom-gradients' );

	// Allow for "wide" and "full" alignment options on blocks that support them.
	add_theme_support( 'align-wide' );

	// Add support for block template parts.
	// See https://learn.wordpress.org/tutorial/using-block-template-parts-in-classic-themes/.
	add_theme_support( 'block-template-parts' );
}

/**
 * Register block styles for core blocks, to correspond with CSS classes loaded
 * by the theme which apply different rules to those blocks' frontend display.
 */
function register_core_block_styles(): void {
	// Add styles to Table block.
	register_block_style(
		'core/table',
		array(
			'name'  => 'reports-archive',
			'label' => 'Reports Archive',
		)
	);

	// Add styles to Group block.
	register_block_style(
		'core/group',
		array(
			'name'  => 'clickable-card',
			'label' => 'Clickable Card',
		)
	);
}

/**
 * Return the post that is being edited.
 *
 * @return false|array|\WP_Post|null
 */
function get_admin_post() {
	// 1. We can't verify a nonce because we didn't create this request.
	// 2. A core sanitization function isn't used, but the value is carefully checked.
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended,WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	$post_id            = $_GET['post'] ?? false;

	if ( is_numeric( $post_id ) && (int) $post_id > 0 ) {
		return get_post( $post_id );
	}

	return false;
}

/**
 * Determine whether the current admin post has blocks.
 */
function admin_post_has_blocks(): bool {
	$post = get_admin_post();

	return $post && has_blocks( $post->post_content );
}

/**
 * Determine whether the current admin post is a new post.
 */
function admin_post_is_new(): bool {
	$post = get_admin_post();

	return ! $post || $post->post_content === '';
}

/**
 * Determine whether the field manager meta boxes should be shown.
 */
function is_using_block_editor(): bool {
	return admin_post_is_new() || admin_post_has_blocks();
}

/**
 * Enqueue assets used only in the block editor.
 */
function enqueue_block_editor_assets() {
	$editor_asset = include get_theme_file_path( 'assets/dist/editor.asset.php' );

	wp_enqueue_script(
		'shiro_editor_js',
		get_theme_file_uri( 'assets/dist/editor.js' ),
		$editor_asset['dependencies'],
		$editor_asset['version'],
		true
	);

	if ( wp_get_environment_type() === 'local' && is_array( $editor_asset['dependencies'] ) && in_array( 'wp-react-refresh-runtime', $editor_asset['dependencies'], true ) ) {
		warn_if_script_debug_not_enabled();
		wp_add_inline_script(
			'shiro_editor_js',
			sprintf( 'window.__webpack_public_path__ = %s;', wp_json_encode( get_theme_file_uri( 'assets/dist/' ) ) ),
			'before'
		);
	}

	$languages = wmf_get_translations();

	wp_localize_script(
		'shiro_editor_js',
		'shiroEditorVariables',
		array(
			'themeUrl'      => get_template_directory_uri(),
			'languages'     => $languages,
			'siteLanguage'  => $languages[0]['shortname'] ?? '',
			'wmfIsMainSite' => wmf_is_main_site(),
		)
	);

	$editor_css_asset = is_rtl() ? 'editor.rtl.css' : 'editor.css';
	Asset_Loader\enqueue_asset(
		Assets\get_manifest_path( $editor_css_asset ),
		$editor_css_asset,
		[
			'handle' => 'shiro_editor_css',
		]
	);

	$editor_style_css_asset = is_rtl() ? 'editor-style.rtl.css' : 'editor-style.css';
	Asset_Loader\enqueue_asset(
		Assets\get_manifest_path( $editor_style_css_asset ),
		$editor_style_css_asset,
		[
			'handle' => 'shiro_editor_style_css',
		]
	);
}

/**
 * Add categories relevant to Wikimedia.
 *
 * @param array $categories Original categories.
 * @return array Modified categories.
 */
function add_block_categories( $categories ) {
	return array_merge(
		array(
			array(
				'slug' => 'wikimedia',
				'title' => __( 'Wikimedia', 'shiro-admin' ),
			),
		),
		$categories
	);
}

/**
 * Show a visible warning if we try to use a hot-reloading dev server while
 * SCRIPT_DEBUG is false: otherwise, the script will silently fail to load.
 */
function warn_if_script_debug_not_enabled(): void {
	static $has_shown;

	$is_script_debug_mode = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG;

	if ( $has_shown || $is_script_debug_mode || ! is_admin() ) {
		return;
	}

	// Runtime only loads in SCRIPT_DEBUG mode. Show a warning.
	wp_enqueue_script( 'wp-data' );
	add_action( 'admin_footer', __NAMESPACE__ . '\\show_editor_debug_mode_warning', 100 );

	$has_shown = true;
}

/**
 * Use the block editor notices package to show a warning in the editor if
 * hot reloading is required by a script when SCRIPT_DEBUG is disabled.
 */
function show_editor_debug_mode_warning(): void {
	?>
	<script>
	window.addEventListener( 'DOMContentLoaded', () => {
		wp.data.dispatch( 'core/notices' ).createNotice(
			'warning',
			<?php echo wp_json_encode( SCRIPT_DEBUG_WARNING ); ?>,
			{
				isDismissible: false,
			}
		);
	} );
	</script>
	<?php
}
