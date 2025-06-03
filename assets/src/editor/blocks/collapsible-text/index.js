/**
 * Block for inserting collapsible text.
 */
import { ReactNode } from 'react';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, InspectorControls, useSettings } from '@wordpress/block-editor';
import { Panel, PanelBody, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import './style.scss';

registerBlockType(metadata.name, {
	...metadata,

	/**
	 * Render the editor UI for the block.
	 *
	 * @param {object}   props               React component props.
	 * @param {object}   props.attributes    Block attrs.
	 * @param {Function} props.setAttributes Block attribute setter.
	 * @returns {ReactNode} Rendered edit note.
	 */
	edit: function Edit( { attributes, setAttributes } ) {
		const { fontColor, readMore, readLess } = attributes;
		const [ colorSettings ] = useSettings( 'color.palette' );

		return (
			<>
				<InspectorControls>
					<Panel header= { __( 'Set button text color:', 'shiro-admin' ) } >
						<PanelBody>
							<ColorPalette
								value={ fontColor }
								colors={ colorSettings }
								onChange={ ( fontColor ) => setAttributes( { fontColor } ) }
							/>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<div className="collapsible-text expanded">
					<div className="collapsible-text__content">
						<InnerBlocks />
						<div className="collapsible-text__button-settings" style={ fontColor && { color: fontColor } }>
							<div className="collapsible-text__toggle">
								<label>
									{ __( 'Text of "Read More" button state', 'shiro-admin' )  }
								</label>
								<RichText
									className="expand"
									onChange={ ( readMore ) => setAttributes( { readMore } ) }
									value={ readMore }
								/>
							</div>
							<div className="collapsible-text__toggle">
								<label>
									{ __( 'Text of "Read Less" button state', 'shiro-admin' ) }
								</label>
								<RichText
									className="collapse"
									onChange={ ( readLess ) => setAttributes( { readLess } ) }
									value={ readLess }
								/>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		const { fontColor, readMore, readLess } = attributes;

		return (
			<div className="collapsible-text">
				<div className="collapsible-text__content">
					<InnerBlocks.Content />
				</div>
				<button type="button" className="collapsible-text__toggle" style={ fontColor && { color: fontColor } }>
					<RichText.Content
						className="expand"
						tagName="span"
						value={ readMore }
					/>
					<RichText.Content
						className="collapse"
						tagName="span"
						value={ readLess }
					/>
				</button>
			</div>
		);
	},
});

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
