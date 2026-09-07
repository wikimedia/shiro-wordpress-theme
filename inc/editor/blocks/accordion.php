<?php
/**
 * Additional functionality for the shiro/accordion block.
 *
 * The accordion blocks are static (their markup is saved into post content), so
 * there is no render callback to hook. This adds FAQPage structured data by
 * reading the saved question/answer markup and appending an FAQPage node to
 * Yoast's schema @graph. Google retired FAQ rich results in 2023, so this pays
 * off as GEO / AI-citation structured data rather than a search rich snippet.
 *
 * @package shiro
 */

namespace WMF\Editor\Blocks\Accordion;

use DOMDocument;
use DOMNode;
use DOMXPath;

const BLOCK_NAME = 'shiro/accordion';

/**
 * Bootstrap this block functionality.
 */
function bootstrap() {
	// Yoast already owns the page @graph (Organization, BreadcrumbList, …), so
	// append an FAQPage node to it rather than emitting a separate JSON-LD island.
	add_filter( 'wpseo_schema_graph', __NAMESPACE__ . '\\add_faq_schema', 11, 2 );
}

/**
 * Append an FAQPage node to the Yoast schema graph for singular pages that
 * contain a shiro/accordion block.
 *
 * @param array $graph   The Yoast schema graph.
 * @param mixed $context Yoast Meta_Tags_Context for the current page.
 * @return array The (possibly extended) schema graph.
 */
function add_faq_schema( $graph, $context = null ): array {
	if ( ! is_array( $graph ) || ! is_singular() ) {
		return $graph;
	}

	$post = get_post();
	if ( ! $post || ! has_block( BLOCK_NAME, $post ) ) {
		return $graph;
	}

	$questions = get_faq_items_from_content( $post->post_content ?? '' );
	if ( empty( $questions ) ) {
		return $graph;
	}

	$canonical = '';
	if ( is_object( $context ) && ! empty( $context->canonical ) ) {
		$canonical = $context->canonical;
	}
	if ( empty( $canonical ) ) {
		$canonical = (string) get_permalink( $post );
	}

	$graph[] = [
		'@type'      => 'FAQPage',
		'@id'        => $canonical . '#faq',
		'mainEntity' => array_map(
			function ( $item ) {
				return [
					'@type'          => 'Question',
					'name'           => $item['name'],
					'acceptedAnswer' => [
						'@type' => 'Answer',
						'text'  => $item['answer'],
					],
				];
			},
			$questions
		),
	];

	// Link the FAQPage to the page's WebPage node so it sits in the graph rather
	// than floating; Yoast ids its WebPage node as <canonical>#webpage.
	$graph[ array_key_last( $graph ) ]['mainEntityOfPage'] = [ '@id' => $canonical . '#webpage' ];

	return $graph;
}

/**
 * Extract question/answer pairs from saved accordion markup.
 *
 * Reads the static block HTML directly (mirroring inc/editor/blocks/toc.php),
 * since sourced block attributes such as the accordion-item title are not
 * available to parse_blocks() on the server.
 *
 * @param string $content Raw post content.
 * @return array List of [ 'name' => string, 'answer' => string ] pairs.
 */
function get_faq_items_from_content( string $content ): array {
	if ( trim( $content ) === '' ) {
		return [];
	}

	$doc = new DOMDocument();

	// Suppress libxml warnings for the theme's HTML fragments; see toc.php / #907.
	libxml_use_internal_errors( true );
	$doc->loadHTML( '<meta charset="UTF-8">' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
	libxml_clear_errors();

	$xpath = new DOMXPath( $doc );

	// Match the exact `accordion-item` class token (not accordion-item__title etc.).
	$items = $xpath->query( "//*[contains(concat(' ', normalize-space(@class), ' '), ' accordion-item ')]" );

	$faq = [];
	if ( ! $items ) {
		return $faq;
	}

	/* phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase */
	foreach ( $items as $item ) {
		$title_nodes  = $xpath->query( ".//*[contains(concat(' ', normalize-space(@class), ' '), ' accordion-item__title-text ')]", $item );
		$answer_nodes = $xpath->query( ".//*[contains(concat(' ', normalize-space(@class), ' '), ' accordion-item__content ')]", $item );

		if ( ! $title_nodes || ! $title_nodes->length || ! $answer_nodes || ! $answer_nodes->length ) {
			continue;
		}

		$name   = trim( preg_replace( '/\s+/', ' ', $title_nodes->item( 0 )->textContent ) );
		$answer = trim( inner_html( $answer_nodes->item( 0 ) ) );

		if ( $name === '' || $answer === '' ) {
			continue;
		}

		$faq[] = [
			'name'   => $name,
			'answer' => $answer,
		];
	}
	/* phpcs:enable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase */

	return $faq;
}

/**
 * Serialise the inner HTML of a DOM node (its children, not the node itself).
 *
 * @param DOMNode $node Node whose children to serialise.
 * @return string Inner HTML.
 */
function inner_html( DOMNode $node ): string {
	$html = '';
	foreach ( $node->childNodes as $child ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$html .= $node->ownerDocument->saveHTML( $child ); // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
	}
	return $html;
}
