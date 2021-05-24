<?php
/**
 * Block patterns for content editors to quickly create content.
 */

namespace WMF\Editor\Patterns;

/**
 * @var string The slug for the block pattern category to group these into.
 */
const CATEGORY_NAME = 'wikimedia';

/**
 * Hook into WordPress
 */
function bootstrap() {
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\register_pattern' );
}

function register_pattern() {
	register_block_pattern_category( 'wikimedia-columns', [
		'label' => __( 'Wikimedia columns', 'shiro-admin' ),
	] );

	register_block_pattern( FactColumns\NAME, [
		'title' => __( 'Numbered fact columns', 'shiro' ),
		'categories' => [ CATEGORY_NAME ],
		'content' => FactColumns\PATTERN,
	] );

	register_block_pattern( 'shiro/tweet-columns', [
		'title' => __( 'Tweet this columns', 'shiro-admin' ),
		'categories' => [ 'wikimedia-columns' ],
		'content' => <<<CONTENT
<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"backgroundColor":"blue90"} -->
<div class="wp-block-group has-blue-90-background-color has-background"><div class="wp-block-group__inner-container"><!-- wp:paragraph {"className":"is-style-h1"} -->
<p class="is-style-h1">200,000+</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Editors contribute to Wikimedia projects every month</strong></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-tertiary has-icon has-icon-social-twitter-blue"} -->
<div class="wp-block-button is-style-tertiary has-icon has-icon-social-twitter-blue"><a class="wp-block-button__link">Tweet this</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"backgroundColor":"blue90"} -->
<div class="wp-block-group has-blue-90-background-color has-background"><div class="wp-block-group__inner-container"><!-- wp:paragraph {"className":"is-style-h1"} -->
<p class="is-style-h1">68+ million</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Media files on Wikimedia Commons</strong></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-tertiary has-icon has-icon-social-twitter-blue"} -->
<div class="wp-block-button is-style-tertiary has-icon has-icon-social-twitter-blue"><a class="wp-block-button__link">Tweet this</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"backgroundColor":"blue90"} -->
<div class="wp-block-group has-blue-90-background-color has-background"><div class="wp-block-group__inner-container"><!-- wp:paragraph {"className":"is-style-h1"} -->
<p class="is-style-h1">1+ billion</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Unique devices access Wikimedia projects every month</strong></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-tertiary has-icon has-icon-social-twitter-blue"} -->
<div class="wp-block-button is-style-tertiary has-icon has-icon-social-twitter-blue"><a class="wp-block-button__link">Tweet this</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group -->
<div class="wp-block-group"><div class="wp-block-group__inner-container"></div></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

	register_block_pattern( LinkColumns\NAME, [
		'title' => __( 'External link columns', 'shiro' ),
		'categories' => [ CATEGORY_NAME ],
		'content' => LinkColumns\pattern(),
	] );

	register_block_pattern( CardColumns\NAME, [
		'title' => __( 'Cards' ),
		'categories' => [ CATEGORY_NAME ],
		'content' => CardColumns\PATTERN,
	] );

	register_block_pattern( BlogList\NAME, [
		'title' => __( 'Blog list section', 'shiro' ),
		'categories' => [ CATEGORY_NAME ],
		'content' => BlogList\PATTERN,
	] );

}
