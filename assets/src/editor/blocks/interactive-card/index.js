/**
 * Interactive Card block.
 */

import { registerBlockType } from '@wordpress/blocks';

import { ReactComponent as BlockIcon } from '../../../svg/blocks/card.svg';

import metadata from './block.json';
import Edit from './edit';
import Save from './save';

import './style.scss';

registerBlockType( metadata.name, {
	icon: BlockIcon,
	edit: Edit,
	save: Save,
} );

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
