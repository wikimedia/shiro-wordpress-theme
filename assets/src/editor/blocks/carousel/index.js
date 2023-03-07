import classNames from 'classnames';
import React, { ReactNode } from 'react';

import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InnerBlockSlider } from '../../components/inner-block-slider';

import metadata from './block.json';
import './style.scss';

// Ensure a better user experience by child blocks to a limited subset.
const ALLOWED_BLOCK = 'shiro/home-page-hero';

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

		const { title } = attributes;

		const blockProps = useBlockProps( {
			className: 'shiro-carousel',
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
					</PanelBody>
				</InspectorControls>

				<InnerBlockSlider
					allowedBlock={ ALLOWED_BLOCK }
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