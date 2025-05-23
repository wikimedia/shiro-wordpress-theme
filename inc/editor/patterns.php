<?php
/**
 * Block patterns for content editors to quickly create content.
 */

namespace WMF\Editor\Patterns;

/**
 * The slug for the block pattern category to group these into.
 *
 * @var string
 */
const MAIN_CATEGORY_NAME = 'wikimedia';

/**
 * The slug for patterns that are meant for migration to populate based on a template.
 *
 * @var string
 */
const TEMPLATE_CATEGORY_NAME = 'wikimedia-templates';

/**
 * Hook into WordPress
 */
function bootstrap() {
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\register_pattern' );
}

/**
 * Register our patterns and their pattern categories.
 *
 * @return void
 */
function register_pattern() {
	register_block_pattern_category( MAIN_CATEGORY_NAME, [
		'label' => __( 'Wikimedia', 'shiro-admin' ),
	] );

	register_block_pattern_category( TEMPLATE_CATEGORY_NAME, [
		'label' => __( 'Wikimedia templates', 'shiro-admin' ),
	] );

	register_block_pattern( FactColumns\NAME, [
		'title' => __( 'Numbered fact columns', 'shiro-admin' ),
		'categories' => [ MAIN_CATEGORY_NAME ],
		'content' => FactColumns\PATTERN,
	] );

	register_block_pattern( TweetColumns\NAME, [
		'title' => __( 'Tweet this columns', 'shiro-admin' ),
		'categories' => [ MAIN_CATEGORY_NAME ],
		'content' => TweetColumns\pattern(),
	] );

	register_block_pattern( LinkColumns\NAME, [
		'title' => __( 'External link columns', 'shiro-admin' ),
		'categories' => [ MAIN_CATEGORY_NAME ],
		'content' => LinkColumns\PATTERN,
	] );

	register_block_pattern( CardColumns\NAME, [
		'title' => __( 'Cards', 'shiro-admin' ),
		'categories' => [ MAIN_CATEGORY_NAME ],
		'content' => CardColumns\PATTERN,
	] );

	register_block_pattern( BlogList\NAME, [
		'title' => __( 'Blog list section', 'shiro-admin' ),
		'categories' => [ MAIN_CATEGORY_NAME ],
		'content' => BlogList\PATTERN,
	] );

	register_block_pattern( CommunicationModule\NAME, [
		'title' => __( 'Communication module', 'shiro-admin' ),
		'categories' => [ MAIN_CATEGORY_NAME ],
		'content' => CommunicationModule\PATTERN,
	] );

	register_block_pattern( EmailSubscriptionForm\NAME, [
		'title' => __( 'Email subscription form', 'shiro-admin' ),
		'categories' => [ MAIN_CATEGORY_NAME ],
		'content' => EmailSubscriptionForm\PATTERN,
	] );

	register_block_pattern( DonationBar\NAME, [
		'title' => __( 'Donation bar template', 'shiro-admin' ),
		'categories' => [ MAIN_CATEGORY_NAME ],
		'content' => DonationBar\PATTERN,
	] );

	register_block_pattern( TemplateDefault\NAME, [
		'title' => __( 'Default Template', 'shiro-admin' ),
		'categories' => [ TEMPLATE_CATEGORY_NAME ],
		'content' => TemplateDefault\pattern(),
	] );

	register_block_pattern( TemplateLanding\NAME, [
		'title' => __( 'Landing page template', 'shiro-admin' ),
		'categories' => [ TEMPLATE_CATEGORY_NAME ],
		'content' => TemplateLanding\pattern(),
	] );

	register_block_pattern( TemplateList\NAME, [
		'title' => __( 'List page template', 'shiro-admin' ),
		'categories' => [ TEMPLATE_CATEGORY_NAME ],
		'content' => TemplateList\pattern(),
	] );

	register_block_pattern( TemplateReportLanding\NAME, [
		'title' => __( 'Report landing page template', 'shiro-admin' ),
		'categories' => [ TEMPLATE_CATEGORY_NAME ],
		'content' => TemplateReportLanding\pattern(),
	] );

	register_block_pattern( TemplateReportSection\NAME, [
		'title' => __( 'Report section page template', 'shiro-admin' ),
		'categories' => [ TEMPLATE_CATEGORY_NAME ],
		'content' => TemplateReportSection\pattern(),
	] );
}
