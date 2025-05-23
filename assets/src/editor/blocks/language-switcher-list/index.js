/**
 * Language list block to display the available translations for the current page.
 * Intended to be used inside the core navigation block, within an HM mega menu block.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,

	/**
	 * Edit the block.
	 */
	edit: function EditLanguageSwitcherListBlock( { attributes } ) {
		const blockProps = useBlockProps();

		return (
			<div { ...blockProps }>
				<ServerSideRender
					attributes={ {
						...attributes,
						isEditor: true,
					} }
					block={ metadata.name }
				/>
			</div>
		);
	},
	/**
	 * Save nothing, to allow for server-side rendering.
	 */
	save: function () {
		return null;
	},
} );

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
