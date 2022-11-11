/**
 * Accordion wrapper block.
 */

/**
 * WordPress dependencies
 */

import { InnerBlocks, useBlockProps, InspectorControls, useSetting } from '@wordpress/block-editor';
import { Panel, PanelBody, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import '../../../js/accordion/toggler';

export const name = 'shiro/accordion';

const CUSTOM_COLORS = [
	{
		color: '#f00',
		name: 'Red',
	},
	{
		color: '#fff',
		name: 'White',
	},
	{
		color: '#00f',
		name: 'Blue',
	},
];

export const settings = {
	apiVersion: 2,
	title: __( 'Accordion', 'shiro-admin' ),
	icon: 'menu',
	category: 'wikimedia',
	supports: {
		align: [ 'center', 'full' ],
	},
	attributes: {
		fontColor: {
			type: 'string',
		},
	},
	providesContext: {
		'accordion/fontColor': 'fontColor',
	},
	edit: ( { attributes, setAttributes } ) => {
		const blockProps = useBlockProps(); // eslint-disable-line react-hooks/rules-of-hooks
		const { fontColor } = attributes;
		return (
			<>
				<InspectorControls>
					<Panel header= { __( 'Set title font color:', 'shiro-admin' ) } >
						<PanelBody>
							<ColorPalette
								value={ fontColor }
								colors={ [ ...useSetting( 'color.palette' ) ] }
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
};
