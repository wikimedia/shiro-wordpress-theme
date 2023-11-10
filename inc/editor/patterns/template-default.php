<?php
/**
 * Block pattern for converting from the "default" template
 *
 * @package shiro
 */

namespace WMF\Editor\Patterns\TemplateDefault;

const NAME = 'shiro/template-default';

/**
 * Converts content from "default" template.
 */
function pattern(): string {
	$support_module        = wmf_get_reusable_block_module_insert( 'support' );
	$communications_module = wmf_get_reusable_block_module_insert( 'connect' );

	return <<<CONTENT
$support_module
$communications_module
CONTENT;
}
