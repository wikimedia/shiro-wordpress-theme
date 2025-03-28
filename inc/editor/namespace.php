<?php
/**
 * Functionality related to supporting the stepped migration to block editor content.
 */

namespace WMF\Editor;

use Asset_Loader;
use WMF\Assets;

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
		'shiro/double-heading',
		'shiro/linked-toc-columns',
		'shiro/linked-toc-item',
		'shiro/share-article',
		'shiro/spotlight',
		'shiro/stairs',
		'shiro/stair',
		'shiro/toc',
		'shiro/toc-columns',
		'shiro/tweet-this',
		'shiro/mailchimp-subscribe',
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

		// Plugin blocks
		'gravityforms/form',

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

	// Define colors selectable in the editor.
	add_theme_support( 'editor-color-palette', [
		[
			'name' => __( 'Base 10', 'shiro-admin' ),
			'slug' => 'base10',
			'color' => '#202122',
		],
		[
			'name' => __( 'Base 20', 'shiro-admin' ),
			'slug' => 'base20',
			'color' => '#54595d',
		],
		[
			'name' => __( 'Base 30', 'shiro-admin' ),
			'slug' => 'base30',
			'color' => '#72777d',
		],
		[
			'name' => __( 'Base 50', 'shiro-admin' ),
			'slug' => 'base50',
			'color' => '#a2a9b1',
		],
		[
			'name' => __( 'Base 0', 'shiro-admin' ),
			'slug' => 'base0',
			'color' => '#000000',
		],
		[
			'name' => __( 'Base 70', 'shiro-admin' ),
			'slug' => 'base70',
			'color' => '#c8ccd1',
		],
		[
			'name' => __( 'Base 80', 'shiro-admin' ),
			'slug' => 'base80',
			'color' => '#eaecf0',
		],
		[
			'name' => __( 'Base 90', 'shiro-admin' ),
			'slug' => 'base90',
			'color' => '#f8f9fa',
		],
		[
			'name' => __( 'Base 100', 'shiro-admin' ),
			'slug' => 'base100',
			'color' => '#ffffff',
		],
		[
			'name' => __( 'Blue', 'shiro-admin' ),
			'slug' => 'blue',
			'color' => '#0063bf',
		],
		[
			'name' => __( 'Blue AAA', 'shiro-admin' ),
			'slug' => 'blue-aaa',
			'color' => '#0C57A8',
		],
		[
			'name' => __( 'Blue 50', 'shiro-admin' ),
			'slug' => 'blue50',
			'color' => '#3a25ff',
		],
		[
			'name' => __( 'Blue 70', 'shiro-admin' ),
			'slug' => 'blue70',
			'color' => '#c3d8ef',
		],
		[
			'name' => __( 'Bright Blue', 'shiro-admin' ),
			'slug' => 'bright-blue',
			'color' => '#049dff',
		],
		[
			'name' => __( 'Bright Blue 70', 'shiro-admin' ),
			'slug' => 'bright-blue-70',
			'color' => '#c0e6ff',
		],
		[
			'name' => __( 'Dark Green', 'shiro-admin' ),
			'slug' => 'dark-green',
			'color' => '#305d70',
		],
		[
			'name' => __( 'Dark Green 70', 'shiro-admin' ),
			'slug' => 'dark-green-70',
			'color' => '#cbd6db',
		],
		[
			'name' => __( 'Blue 90', 'shiro-admin' ),
			'slug' => 'blue90',
			'color' => '#eeeaff',
		],
		[
			'name' => __( 'Green AAA', 'shiro-admin' ),
			'slug' => 'green-aaa',
			'color' => '#246342',
		],
		[
			'name' => __( 'Green', 'shiro-admin' ),
			'slug' => 'green',
			'color' => '#339966',
		],
		[
			'name' => __( 'Green 70', 'shiro-admin' ),
			'slug' => 'green70',
			'color' => '#cbe0d5',
		],
		[
			'name' => __( 'Bright Green', 'shiro-admin' ),
			'slug' => 'bright-green',
			'color' => '#71d1b3',
		],
		[
			'name' => __( 'Bright Green 70', 'shiro-admin' ),
			'slug' => 'bright-green70',
			'color' => '#dbf3ec',
		],
		[
			'name' => __( 'Orange', 'shiro-admin' ),
			'slug' => 'orange',
			'color' => '#ee8019',
		],
		[
			'name' => __( 'Orange 70', 'shiro-admin' ),
			'slug' => 'orange70',
			'color' => '#fbdfc5',
		],
		[
			'name' => __( 'Pink', 'shiro-admin' ),
			'slug' => 'pink',
			'color' => '#e679a6',
		],
		[
			'name' => __( 'Pink 70', 'shiro-admin' ),
			'slug' => 'pink70',
			'color' => '#f9dde9',
		],
		[
			'name' => __( 'Purple', 'shiro-admin' ),
			'slug' => 'purple',
			'color' => '#5748b5',
		],
		[
			'name' => __( 'Purple 70', 'shiro-admin' ),
			'slug' => 'purple70',
			'color' => '#d5d1ec',
		],
		[
			'name' => __( 'Red', 'shiro-admin' ),
			'slug' => 'red',
			'color' => '#900',
		],
		[
			'name' => __( 'Red AAA', 'shiro-admin' ),
			'slug' => 'red-aaa',
			'color' => '#970302',
		],
		[
			'name' => __( 'Red 70', 'shiro-admin' ),
			'slug' => 'red70',
			'color' => '#e5c0c0',
		],
		[
			'name' => __( 'Red 50', 'shiro-admin' ),
			'slug' => 'red50',
			'color' => '#d40356',
		],
		[
			'name' => __( 'Red 90', 'shiro-admin' ),
			'slug' => 'red90',
			'color' => '#fbe9f1',
		],
		[
			'name' => __( 'Yellow', 'shiro-admin' ),
			'slug' => 'yellow',
			'color' => '#f0bc00',
		],
		[
			'name' => __( 'Yellow 50', 'shiro-admin' ),
			'slug' => 'yellow50',
			'color' => '#fffd33',
		],
		[
			'name' => __( 'Yellow 70', 'shiro-admin' ),
			'slug' => 'yellow70',
			'color' => '#fbeebf',
		],
		[
			'name' => __( 'Yellow 90', 'shiro-admin' ),
			'slug' => 'yellow90',
			'color' => '#fef6e7',
		],
		[
			'name' => __( 'Bright Yellow', 'shiro-admin' ),
			'slug' => 'bright-yellow',
			'color' => '#e9e7c4',
		],
		[
			'name' => __( 'Bright Yellow 70', 'shiro-admin' ),
			'slug' => 'bright-yellow-70',
			'color' => '#f9f9f0',
		],
		[
			'name' => __( 'Light Blue', 'shiro-admin' ),
			'slug' => 'light-blue',
			'color' => '#effafd',
		],
	] );

	// Disable custom color and gradient selection in the editor.
	add_theme_support( 'disable-custom-colors' );
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
function register_core_block_styles() : void {
	// Add styles to Table block.
	register_block_style(
		'core/table',
		array(
			'name'  => 'reports-archive',
			'label' => 'Reports Archive',
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
	Asset_Loader\enqueue_asset(
		Assets\get_manifest_path( 'editor.js' ),
		'editor.js',
		[
			'dependencies' => [
				'wp-dom-ready',
				'wp-i18n',
				'wp-blocks',
				'wp-block-editor',
				'wp-components',
				'wp-compose',
				'wp-element',
				'wp-hooks',
				'wp-token-list',
			],
			'handle' => 'shiro_editor_js',
		]
	);

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
