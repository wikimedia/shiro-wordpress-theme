/**
 * Provide helper methods to dynamically reload & reregister blocks in hot-
 * reloading contexts. Inspired by "block-editor-hmr" NPM package.
 */
import { unregisterBlockType, unregisterBlockStyle } from '@wordpress/blocks';
import { removeFilter } from '@wordpress/hooks';
import { dispatch, select } from '@wordpress/data';

/**
 * Deregister a block that's being hot-swapped out, so that the updated version
 * can be registered afresh without "block already registered" errors.
 *
 * Also keeps track of the selected block client ID, which is needed because
 * we have to deselect a block before unregistering it to swap without error.
 * The active block will be reselected in the refresh function.
 *
 * @param {string} hotBlockName Name of block being hot-reloaded.
 * @param {Object} [variants]   Dictionary of { styles, filters } arrays to optionally unbind.
 * @return {(data: Object) => void} Callback for module.hot.dispose() to deregister the specified block.
 */
export const deregister =
	( hotBlockName, variants = {} ) =>
	( data ) => {
		unregisterBlockType( hotBlockName );

		if ( Array.isArray( variants?.styles ) ) {
			variants.styles.forEach( ( style ) =>
				unregisterBlockStyle( hotBlockName, style.name )
			);
		}

		if ( Array.isArray( variants?.filters ) ) {
			variants.filters.forEach( ( { hook, namespace } ) => {
				removeFilter( hook, namespace );
			} );
		}

		const selectedBlockId = select( 'core/block-editor' ).getSelectedBlockClientId();

		if ( selectedBlockId ) {
			dispatch( 'core/block-editor' ).clearSelectedBlock();
		}

		// Pass selected ID through hot-reload cycle.
		data.value = selectedBlockId;
	};

/**
 * Process an updated block module, refreshing the editor view as needed.
 *
 * @param {string}           hotBlockName Name of block being hot-reloaded.
 * @param {{value?: string}} [data]       module.hot.data object, if present.
 */
export const refresh = ( hotBlockName, data ) => {
	// Refresh all copies of our changed block by iteratively selecting them.
	select( 'core/block-editor' )
		.getBlocks()
		.forEach( ( { name, clientId } ) => {
			if ( name === hotBlockName ) {
				dispatch( 'core/block-editor' ).selectBlock( clientId );
			}
		} );

	// Reselect whatever block was selected in the beginning.
	if ( data?.value ) {
		// Reselect within a timeout to allow other hot-reloaded blocks to finish
		// processing before changing focus.
		setTimeout( () => {
			dispatch( 'core/block-editor' ).selectBlock( data.value );
		} );
	}
};
