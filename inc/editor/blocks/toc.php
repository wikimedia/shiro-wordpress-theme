<?php
/**
 * Additional functionality for the shiro/toc block.
 *
 * This block is defined as a client side block in JS. This is additional functionality when rendering the block.
 *
 * @package shiro
 */

namespace WMF\Editor\Blocks\TOC;

const BLOCK_NAME = 'shiro/toc';
const PLACEHOLDER = '%MENU_PLACEHOLDER%';

/**
 * Bootstrap this block functionality.
 */
function bootstrap() {
	add_filter( 'render_block', __NAMESPACE__ . '\\render_toc_block', 10, 2 );

	$headings = [];
	add_filter( 'render_block', function( $block_content, $block ) use ( &$headings ) {
		if ( 'core/heading' === $block['blockName'] ) {
			// We need to get the items class and href, so using a domdoc to confidently locate them.
			$heading_block_doc = new \DOMDocument();
			$heading_block_doc->loadHTML( $block_content, \LIBXML_HTML_NOIMPLIED | \LIBXML_HTML_NODEFDTD );
			if ( $heading_block_doc->hasChildNodes() ) {
				$heading = $heading_block_doc->childNodes[0];
				$headings[] = [
					'node' => $heading->nodeName,
					'anchor' => $heading->getAttribute( 'id' ),
					'content' => trim( wp_kses( $block_content, [] ) ),
				];
			}
		}
		return $block_content;
	}, 10, 2 );

	add_filter( 'render_block', function( $block_content, $block ) {
		if ( 'shiro/toc' === $block['blockName'] ) {
			return preg_replace( '/<ul[^>]+class="wp-block-shiro-toc.*<\/ul>/', PLACEHOLDER, $block_content );
		}
		return $block_content;
	}, 30, 2 );

	add_filter( 'the_content', function( $content ) use ( &$headings ) {
		if ( empty( $headings ) || strpos( $content, PLACEHOLDER ) === false ) {
			return $content;
		}
		// Break headings into a naively nested structure where any heading
		// h2 or below is top level, and all others are nested within the
		// prior h2. The first heading is always treated as top level.
		// This should work properly in a well-ordered document, and be
		// resilient to poorly constructed heading hierarchies otherwise.
		$nested_headings = [];
		foreach ( $headings as $idx => $heading ) {
			if ( $idx === 0 || $heading['node'] < 'h3' ) {
				$nested_headings[] = array_merge( $heading, [ 'children' => [] ] );
				continue;
			}
			$nested_headings[ array_key_last( $nested_headings ) ]['children'][] = $heading;
		}
		ob_start();
		?>
		<ul class="wp-block-shiro-toc table-of-contents toc">
			<?php foreach ( $nested_headings as $heading ) : ?>
			<li class="toc__item">
				<a class="toc__link" href="#<?php echo esc_attr( $heading['anchor'] ); ?>"><?php echo esc_html( $heading['content'] ); ?></a>
				<?php if ( count( $heading['children'] ) ) : ?>
				<ul class="toc toc__nested">
					<?php foreach ( $heading['children'] as $nested_heading ) : ?>
					<li class="toc__item">
						<a class="toc__link" href="#<?php echo esc_attr( $nested_heading['anchor'] ); ?>">
							<?php echo esc_html( $nested_heading['content'] ); ?>
						</a>
					</li>
					<?php endforeach; ?>
				</ul>
				<?php endif; ?>
			</li>
			<?php endforeach; ?>
		</ul>
		<?php
		return str_replace( PLACEHOLDER, (string) ob_get_clean(), $content );
	} );
}

/**
 * Output the ToC <ul> element given an array of headings.
 *
 * Expected structure:
 *
 * [
 *     [ 'node' => (h2|h3), 'anchor' => '#string', contents: 'Heading title', children: [] ],
 *     [ ... ]
 * ]
 *
 * @param array   $headings            List of headings.
 * @param boolean $render_nested_items Whether to render subitems.
 */
function render_headings_list( $headings, $render_nested_items = true ) : void {
	if ( empty( $headings ) ) {
		return;
	}
	?>
	<ul class="wp-block-shiro-toc table-of-contents toc">
		<?php foreach ( $headings as $heading ) : ?>
		<li class="toc__item">
			<a class="toc__link" href="#<?php echo esc_attr( $heading['anchor'] ); ?>"><?php echo esc_html( $heading['content'] ); ?></a>
			<?php if ( $render_nested_items && count( $heading['children'] ) ) : ?>
			<ul class="toc toc__nested">
				<?php foreach ( $heading['children'] as $nested_heading ) : ?>
				<li class="toc__item">
					<a class="toc__link" href="#<?php echo esc_attr( $nested_heading['anchor'] ); ?>">
						<?php echo esc_html( $nested_heading['content'] ); ?>
					</a>
				</li>
				<?php endforeach; ?>
			</ul>
			<?php endif; ?>
		</li>
		<?php endforeach; ?>
	</ul>
	<?php
}

/**
 * Render the table of contents block.
 *
 * @param string $block_content Saved block content.
 * @param array  $block         Block array.
 * @return string Rendered block content.
 */
function render_toc_block( string $block_content, array $block ) : string {
	if ( $block['blockName'] !== BLOCK_NAME ) {
		return $block_content;
	}

	if ( ! is_singular() ) {
		return '';
	}

	$headings = get_headings_from_post( get_post() );

	if ( empty( $headings ) ) {
		return '';
	}

	ob_start();
	?>
	<nav
		class="toc-nav"
		data-backdrop="inactive"
		data-dropdown="toc-nav"
		data-dropdown-content=".toc"
		data-dropdown-status="uninitialized"
		data-dropdown-toggle=".toc__button"
		data-sticky="false"
		data-toggleable="yes"
		data-trap="inactive"
		data-visible="false"
	>
		<h2 class="toc__title screen-reader-text">
			<?php esc_html_e( 'Table of Contents', 'shiro' ); ?>
		</h2>
		<button aria-expanded="false" class="toc__button" hidden>
			<span class="btn-label-a11y">
				<?php esc_html_e( 'Navigate within this page.', 'shiro' ); ?>
			</span>
			<span class="btn-label-active-item">
				<?php echo esc_html( $headings[0]['content'] ?? __( 'Toggle menu', 'shiro' ) ); ?>
			</span>
		</button>
		<ul class="wp-block-shiro-toc table-of-contents toc">
			<?php render_headings_list( $headings, $block['attrs']['nested'] ?? false ); ?>
		</ul>
	</nav>
	<?php
	return (string) ob_get_clean();
}
