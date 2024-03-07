<?php
/**
 * Register the shiro/inline-languages block.
 */

namespace WMF\Editor\Blocks\InlineLanguages;

const BLOCK_NAME = 'shiro/inline-languages';

/**
 * Connect namespace functions to actions and filters.
 */
function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

/**
 * Register block.
 */
function register_block(): void {
	register_block_type(
		BLOCK_NAME,
		[
			'apiVersion' => 2,
			'render_callback' => __NAMESPACE__ . '\\render_block',
			'icon' => 'translation',
			'attributes' => [
				'align' => [
					'type' => 'string',
					'default' => 'center',
				],
			],
		]
	);
}

/**
 * Render inline languages block.
 *
 * @param array $attributes Block attributes array.
 * @return string
 */
function render_block( $attributes ) {
	$class = 'inline-languages';
	if ( isset( $attributes['align'] ) && $attributes['align'] === 'full' ) {
		$class .= ' alignfull';
	}
	$output = '<div class="' . $class . '"><ul class="inline-languages__list">';
	foreach ( \wmf_get_translations() as $index => $lang ) {
		$el = $lang['selected']
			? '<span>' . esc_html( $lang['name'] ) . '</span>'
			: '<a href="' . esc_url( $lang['uri'] ) . '" lang="' . esc_attr( $lang['shortname'] ) . '">' . esc_html( $lang['name'] ) . '</a>';
		$output .= '<li class="inline-languages__language' . ( $lang['selected'] ? ' inline-languages__language--current' : ' ' ) . '">' . $el . '</li>';
	}
	$output .= '</ul></div>';

	return $output;
}
