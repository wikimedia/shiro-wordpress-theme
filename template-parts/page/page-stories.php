<?php
/**
 * Set up the stories module
 *
 * Pull stories meta and pass it along to template
 *
 * @package shiro
 */

$template_args = get_post_meta( get_the_ID(), 'stories', true );

if ( empty( $template_args ) || ! is_array( $template_args ) ) {
	$template_args = array();
}

$rand_translation = wmf_get_random_translation(
	'stories',
	array(
		'source' => 'meta',
	)
);

$template_args['rand_translation_title'] = is_array( $rand_translation )
	? $rand_translation['pre_heading'] ?? ''
	: '';

if ( ! empty( $template_args ) ) {
	get_template_part( 'template-parts/modules/stories/list', null, $template_args );
}
