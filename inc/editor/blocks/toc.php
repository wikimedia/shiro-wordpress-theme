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
	$headings = [];
	add_filter( 'render_block', function( $block_content, $block ) use ( &$headings ) {
		if ( 'core/heading' === $block['blockName'] ) {
			// We need to get the items class and href, so using a domdoc to confidently locate them.
			$heading_block_doc = new \DOMDocument();
			$heading_block_doc->loadHTML( $block_content, \LIBXML_HTML_NOIMPLIED | \LIBXML_HTML_NODEFDTD );
			if ( $heading_block_doc->hasChildNodes() ) {
				$heading = $heading_block_doc->childNodes[0];
				$headings[] = [
					'nodeName' => $heading->nodeName,
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
		ob_start();
		?>
		<ul class="wp-block-shiro-toc table-of-contents toc">
			<?php foreach ( $headings as $idx => $heading ) : ?>
			<?php if ( $heading['nodeName'] === 'h2' && ( $headings[ $idx - 1 ]['nodeName'] ?? 'h2' ) !== 'h2' ) : ?>
			</ul></li>
			<?php endif; ?>
			<li class="toc__item">
			<a class="toc__link" href="#<?php echo esc_attr( $heading['anchor'] ); ?>"><?php echo esc_html( $heading['content'] ); ?></a>
			<?php if ( ( $headings[ $idx + 1 ]['nodeName'] ?? 'h2' ) !== 'h2' ) : ?>
			<ul>
			<?php else :?>
			</li>
			<?php endif; ?>
			<?php endforeach; ?>
		</ul>
		<?php
		return str_replace( PLACEHOLDER, (string) ob_get_clean(), $content );
	} );
}
