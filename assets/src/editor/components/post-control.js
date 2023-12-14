import { __ } from '@wordpress/i18n';

/**
 * Fallback component to render if the PostControl is not found.
 *
 * This prevents other bundled blocks from failing to initialize if the HM
 * Gutenberg Tools plugin is not active.
 */
const FallbackComponent = () => (
	<p>{ __( 'HM Gutenberg Tools not found', 'shiro' ) }</p>
);

const PostControl = hm?.controls?.PostControl || FallbackComponent;

export default PostControl;
