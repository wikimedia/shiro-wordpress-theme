<?php
/**
 * Handles Support Module CTA.
 *
 * @package shiro
 */

$reusable_block = wmf_get_reusable_block_module( 'support' );

if ( ! $reusable_block || ! is_a( $reusable_block, \WP_Post::class ) ) {
	return;
}

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped, WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
echo apply_filters( 'the_content', $reusable_block->post_content );
