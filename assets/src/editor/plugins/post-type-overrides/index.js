import { select } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Assign a class name to the WritingFlow component, for use in styling content.
 */

/**
 * The name of this editor plugin. Required.
 */
export const name = 'post-type-override';

export const settings = {
	/**
	 * "Render" component for this plugin.
	 *
	 * Returns nothing, just adds a class name as a side effect.
	 */
	render: function Render() {
		const postType = select( 'core/editor' ).getCurrentPostType();

		useEffect( () => {
			const wrapperElement = document.querySelector( '.block-editor-writing-flow' );
			if ( wrapperElement ) {
				wrapperElement.classList.add( 'single', 'has-blocks', `single-${postType}` );
			}
		} );

		return null;
	},
};
