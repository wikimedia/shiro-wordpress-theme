import classNames from 'classnames';
import React, { ReactNode } from 'react';

import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	registerBlockStyle,
	registerBlockType,
} from '@wordpress/blocks';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InnerBlockSlider } from '../../components/inner-block-slider';
import sharedStyles from '../../helpers/block-styles';

import metadata from './block.json';
import './style.scss';

// Ensure it is clear to users how to use the block by defining a template.
const TEMPLATE = [
	[ 'core/group',
		{
			metadata: {
				name: 'Carousel Slide'
			}
		}
	],
];

registerBlockType( metadata.name, {
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

		const {
			title,
			perPage,
			arrows,
			pagination,
			loop,
			autoplay,
			interval,
		} = attributes;

		const blockProps = useBlockProps( {
			className: 'shiro-carousel',
		} );

		return (
			<div { ...blockProps }>
				<InspectorControls>
					<PanelBody title={ __( 'Carousel settings', 'shiro-admin' ) }>
						<TextControl
							help={ __( 'Sets ARIA label', 'shiro-admin' ) }
							label={ __( 'Carousel name', 'shiro-admin' ) }
							value={ title }
							onChange={ ( title ) => setAttributes( { title } ) }
						/>
						<RangeControl
							label={ __( 'Slides per page', 'shiro-admin' ) }
							value={ perPage }
							onChange={ ( perPage ) => setAttributes( { perPage } ) }
							min={ 1 }
							max={ 4 }
						/>
						<ToggleControl
							label={ __( 'Show navigation arrows?', 'shiro-admin' ) }
							checked={ arrows }
							onChange={ ( arrows ) => setAttributes( { arrows } ) }
						/>
						<ToggleControl
							label={ __( 'Show pagination dots?', 'shiro-admin' ) }
							checked={ pagination }
							onChange={ ( pagination ) => setAttributes( { pagination } ) }
						/>
						<ToggleControl
							label={ __( 'Loop carousel?', 'shiro-admin' ) }
							checked={ loop }
							onChange={ ( loop ) => setAttributes( { loop } ) }
						/>
						<ToggleControl
							label={ __( 'Enable autoplay?', 'shiro-admin' ) }
							checked={ autoplay }
							onChange={ ( autoplay ) => setAttributes( { autoplay } ) }
						/>
						<RangeControl
							disabled={ ! autoplay }
							label={ __( 'Interval between autoplaying slides', 'shiro-admin' ) }
							value={ interval }
							onChange={ ( interval ) => setAttributes( { interval } ) }
							min={ 0 }
							max={ 10000 }
							marks={ [
								/* eslint-disable object-property-newline */
								/* eslint-disable object-curly-newline */
								{ 'label': '1s', 'value': 1000 },
								{ 'label': '2s', 'value': 2000 },
								{ 'label': '3s', 'value': 3000 },
								{ 'label': '4s', 'value': 4000 },
								{ 'label': '5s', 'value': 5000 },
								{ 'label': '6s', 'value': 6000 },
								{ 'label': '7s', 'value': 7000 },
								{ 'label': '8s', 'value': 8000 },
								{ 'label': '9s', 'value': 9000 },
								/* eslint-enable object-property-newline */
								/* eslint-enable object-curly-newline */
							] }
						/>
					</PanelBody>
				</InspectorControls>

				<InnerBlockSlider
					allowedBlocks={ [ 'core/group' ] }
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

		const {
			title,
			perPage,
			arrows,
			pagination,
			loop,
			autoplay,
			interval,
		} = attributes;

		const dataSplide = {
			label: title,
			perPage: perPage,
			arrows: arrows,
			pagination: pagination,
			type: loop ? 'loop' : 'slide',
			autoplay: autoplay,
			interval: interval,
			arrowPath: 'M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0Zm0 8.87-1.962 1.975 7.764 7.764H8.87v2.782h16.932l-7.764 7.778L20 31.13 31.13 20 20 8.87Z',
		};

		const blockProps = useBlockProps.save( {
			className: classNames( [
				'shiro-carousel',
			] ),
			'data-splide': JSON.stringify( dataSplide ),
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
} );

sharedStyles.forEach( ( style ) => registerBlockStyle( metadata.name, style ) );

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name, { styles: sharedStyles } ) );
	refresh( metadata.name, module.hot.data );
}
