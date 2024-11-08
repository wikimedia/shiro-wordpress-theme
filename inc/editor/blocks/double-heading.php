<?php
/**
 * Server-side registration for the shiro/blog-post block.
 *
 * @package shiro
 */

namespace WMF\Editor\Blocks\DoubleHeading;

const BLOCK_NAME = 'shiro/double-heading';

/**
 * Bootstrap this block functionality.
 */
function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

/**
 * Register the block here.
 */
function register_block() {
	register_block_type(
		BLOCK_NAME,
		array(
			'apiVersion'      => 2,
			'render_callback' => __NAMESPACE__ . '\\render_block',
		)
	);
}

/**
 * Render this block, given its attributes.
 *
 * @param [] $attributes Block attributes.
 * @return string HTML markup.
 */
function render_block( $attributes ) {
	$site_language         = wmf_get_translations()[0] ?? array();
	$translated_headings   = array();
	$site_language_heading = null;
	$custom_class          = $attributes['class_name'] ?? false;
	$class_name            = $custom_class ? "double-heading $custom_class" : 'double-heading';

	foreach ( ( $attributes['secondaryHeadings'] ?? array() ) as $heading ) {
		if ( $site_language['shortname'] ?? ( $heading['lang'] ?? '' ) === null ) {
			$site_language_heading = $heading;
			continue;
		}

		if ( trim( $heading['text'] ) === '' ) {
			continue;
		}

		$heading['class_name'] = '';
		if ( $heading['switchRtl'] ?? false ) {
			$heading['class_name'] = 'switch-rtl';
		}
		$translated_headings[] = $heading;
	}

	$translated_heading = null;
	if ( count( $translated_headings ) > 0 ) {
		$random_key         = array_rand( $translated_headings );
		$translated_heading = $translated_headings[ $random_key ];
	}
	$primary_heading = $attributes['primaryHeading'] ?? null;

	ob_start()
	?>
		<div class="<?php echo esc_attr( $class_name ); ?>">
			<?php if ( ! empty( $site_language_heading ) ) : ?>
				<p class="double-heading__secondary is-style-h5">
					<span><?php echo esc_html( $site_language_heading['text'] ); ?></span>
					<?php if ( ! empty( $translated_heading ) ) : ?>
						—
						<span
							class="<?php echo esc_attr( $translated_heading['class_name'] ); ?>"
							lang="<?php echo esc_attr( $translated_heading['lang'] ?? '' ); ?>"
						>
							<?php echo esc_html( $translated_heading['text'] ); ?>
						</span>
					<?php endif; ?>
				</p>
			<?php endif; ?>
			<?php if ( $primary_heading ) : ?>
				<h2 class="double-heading__primary is-style-h3">
					<?php echo esc_html( $primary_heading ); ?>
				</h2>
			<?php endif; ?>
		</div>
	<?php
	return ob_get_clean();
}
