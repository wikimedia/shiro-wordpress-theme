<?php
/**
 * Theme Customizer.
 *
 * @package shiro
 */

namespace WMF\Customizer;

/**
 * Bootstrap customizer functionality.
 */
function bootstrap() {
	add_action( 'init', '\\' . __NAMESPACE__ . '\load_customizer_classes' );
}

/**
 * Instantiates and loads the various customizer classes.
 */
function load_customizer_classes() {
	// Add customizer class name to list to instantiate.
	$customizers = array(
		'Identity',
		'Connect',
		'General',
		'Social',
		'Profile',
		'Page',
		'Post',
	);

	foreach ( $customizers as $customizer ) {
		$class          = __NAMESPACE__ . '\\' . $customizer;
		$customizer_obj = new $class();
		$customizer_obj->run();
	}
}
