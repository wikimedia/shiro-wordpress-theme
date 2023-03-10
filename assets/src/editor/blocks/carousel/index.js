import classNames from 'classnames';
import React, { ReactNode } from 'react';

import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { getBlockTypes } from '@wordpress/blocks';
import {
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InnerBlockSlider } from '../../components/inner-block-slider';

import metadata from './block.json';
import './style.scss';

// Ensure a better user experience by child blocks to a limited subset.
const ALLOWED_BLOCKS = [
	'shiro/home-page-hero',
	'shiro/landing-page-hero',
	'shiro/report-landing-hero',
	'shiro/card',
	'shiro/profile',
	'shiro/spotlight',
	'shiro/stairs',
	'core/paragraph',
	'core/heading',
	'core/quote',
	'core/freeform',
	'core/image',
	'core/audio',
	'core/video',
	'core/columns',
	'core/group',
];

// Ensure it is clear to users how to use the block by defining a template.
const TEMPLATE = [
	[ 'shiro/home-page-hero' ],
];

export const { name } = metadata;

export const settings = {
	...metadata,

	/**
	 * Block edit view.
	 *
	 * This block has a mix of fixed elements (rich text) and flexible content using nested "inner blocks".
	 *
	 * @param {object} props - Block props.
	 *
	 * @returns {ReactNode} Component.
	 */
	edit: function Edit( props ) {
		const { attributes, clientId, setAttributes } = props;

		const { title, currentBlock } = attributes;

		const blockProps = useBlockProps( {
			className: 'shiro-carousel',
		} );

		// Build options for currentBlock select controller.
		const allBlocksAvailable = getBlockTypes();

		const blockTypeOptions = ALLOWED_BLOCKS
			.map( ( blockName ) => {
				const registeredBlock = allBlocksAvailable.find( ( block ) => block.name === blockName );

				if ( registeredBlock !== 'undefined' ) {
					return {
						label: registeredBlock.title,
						value: registeredBlock.name,
					};
				} else {
					return null;
				}
			} );

		return (
			<div { ...blockProps }>
				<InspectorControls>
					<PanelBody title={ __( 'Carousel settings', 'shiro-admin' ) }>
						<TextControl
							label={ __( 'Carousel name', 'shiro-admin' ) }
							value={ title }
							onChange={ ( title ) => setAttributes( { title } ) }
						/>
						<SelectControl
							label={ __( 'Block type to use as template', 'shiro-admin' ) }
							value={ currentBlock }
							options={ blockTypeOptions }
							onChange={ ( currentBlock ) => setAttributes( { currentBlock } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<InnerBlockSlider
					allowedBlocks={ ALLOWED_BLOCKS }
					currentBlock={ currentBlock }
					parentBlockId={ clientId }
					slidesPerPage={ 1 }
					template={ TEMPLATE }
				/>
			</div>
		);
	},

	/**
	 * Block output.
	 *
	 * @param {object} props - Block props.
	 *
	 * @returns {ReactNode} Component.
	 */
	save: function Save( props ) {
		const { attributes } = props;

		const { title } = attributes;

		const blockProps = useBlockProps.save( {
			className: classNames( [
				'shiro-carousel',
			] ),
			'data-label': title,
		} );

		const innerBlocksProps = useInnerBlocksProps.save( {
			className: 'shiro-carousel__list',
		} );

		return (
			<div { ...blockProps }>
				<div className='shiro-carousel__track'>
					<div { ...innerBlocksProps } />
				</div>
			</div>
		);
	},
};
