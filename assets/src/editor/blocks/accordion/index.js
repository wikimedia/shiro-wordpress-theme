/**
 * Accordion wrapper block.
 */

/**
 * WordPress dependencies
 */

import { ReactNode } from 'react';

import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, InspectorControls, useSettings } from '@wordpress/block-editor';
import { Panel, PanelBody, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import metadata from './block.json';

import '../../helpers/accordion/toggler';

registerBlockType( metadata.name, {
	/**
	 * Render the editor UI for the block.
	 *
	 * @param {object}   props               React component props.
	 * @param {object}   props.attributes    Block attrs.
	 * @param {Function} props.setAttributes Block attribute setter.
	 * @returns {ReactNode} Rendered edit note.
	 */
	edit: function Edit( { attributes, setAttributes,  } ) {
		const blockProps = useBlockProps();
		const { fontColor } = attributes;
		const [ colorSettings ] = useSettings( 'color.palette' );
		return (
			<>
				<InspectorControls>
					<Panel header= { __( 'Set title font color:', 'shiro-admin' ) } >
						<PanelBody>
							<ColorPalette
								value={ fontColor }
								colors={ [ ...colorSettings ] }
								onChange={ ( fontColor ) => setAttributes( { fontColor } ) }
							/>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<div { ...blockProps }>
					<div className="accordion-wrapper">
						<InnerBlocks
							allowedBlocks={ [ 'shiro/accordion-item' ] }
						/>
					</div>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		const blockProps = useBlockProps.save();
		blockProps.className = `accordion-wrapper ${blockProps.className} ${attributes.fontColor}`;

		return (
			<div { ...blockProps } >
				<InnerBlocks.Content />
			</div>

		);
	},
} );

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
