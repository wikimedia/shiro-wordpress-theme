<?php
/**
 * Block functions to extend the core group block.
 */

namespace WMF\Editor\Blocks\MegaMenu;

/**
 * Connect namespace methods to hooks and filters.
 *
 * @return void
 */
function bootstrap(): void {
	add_filter( 'render_block', __NAMESPACE__ . '\\render_navigation', 10, 2 );
}

/**
 * Adjust the mega menu button content for search and language switcher.
 *
 * @param string $block_content The block content.
 * @param array  $block The full block, including name and attributes.
 * @return $block_content The updated block content.
 */
function render_navigation( $block_content, $block ) {
	if ( 'hm-blocks/hm-mega-menu-block' !== $block['blockName'] ) {
		return $block_content;
	}

	if ( ! array_key_exists( 'className', $block['attrs'] ) || ! in_array( $block['attrs']['className'], [ 'language-switcher', 'search' ], true ) ) {
		return $block_content;
	}

	if ( 'search' === $block['attrs']['className'] ) {
		// Replace the editor supplied button label with the current language label.
		$block_content = preg_replace(
			'>\s*(.*)<span class="wp-block-hm-mega-menu__toggle-icon">',
			'<span class="screen-reader-text">$1</span><span class="wp-block-hm-mega-menu__toggle-icon"',
			$block_content
		);

		return $block_content;
	}

	if ( 'language-switcher' !== $block['attrs']['className'] ) {
		return $block_content;
	}

	// Check to see if this page has translations. If not, return an empty block early.
	$translations = array_filter( wmf_get_translations(), function ( $translation ) {
		return $translation['uri'] !== '';
	} );

	if ( empty( $translations ) ) {
		return '';
	}

	// Get the current site's language and "current language" label.
	$current_label = get_theme_mod( 'wmf_current_language_label', __( 'Current language:', 'shiro-admin' ) );
	$current       = array_reduce( $translations, function ( $carry, $item ) {
		if ( is_string( $carry ) ) {
			return $carry;
		}

		return $item['selected'] ? $item['shortname'] ?? null : null;
	}, null );

	// Set up the extra button content.
	$button_content = sprintf(
		'<span class="screen-reader-text">%s </span><span class="language-switcher__label">%s</span>',
		esc_html( $current_label ),
		esc_html( (string) $current )
	);

	// Replace the editor supplied button label with the current language label.
	$block_content = preg_replace(
		'>.*<span class="wp-block-hm-mega-menu__toggle-icon">',
		$button_content . '<span class="wp-block-hm-mega-menu__toggle-icon"',
		$block_content
	);

	// Add the language-switcher__button class to the button.
	$block_content = str_replace(
		'"wp-block-hm-mega-menu__toggle"',
		'"wp-block-hm-mega-menu__toggle language-switcher__button"',
		$block_content
	);

	return $block_content;
}
