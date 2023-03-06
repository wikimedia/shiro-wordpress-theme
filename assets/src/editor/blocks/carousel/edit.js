import React, { ReactNode } from 'react';

import {
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RadioControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InnerBlockSlider } from '../../components/inner-block-slider';

// Ensure a better user experience by child blocks to a limited subset.
const ALLOWED_BLOCK = 'shiro/home-page-hero';

// Ensure it is clear to users how to use the block by defining a template.
const TEMPLATE = [
	[ 'shiro/home-page-hero' ],
];

/**
 * Block edit view.
 *
 * This block has a mix of fixed elements (rich text) and flexible content using nested "inner blocks".
 *
 * @param {object} props - Block props.
 *
 * @returns {ReactNode} Component.
 */
function Edit( props ) {
	const { attributes, clientId, setAttributes } = props;

	const { title, navPosition, showCounter, showThumbnails, isMobileFullWidth } = attributes;

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
					<RadioControl
						label={ __( 'Arrow navigation position', 'shiro-admin' ) }
						options={ [
							{
								label: __( 'Top', 'shiro-admin' ),
								value: 'top',
							},
							{
								label: __( 'Bottom', 'shiro-admin' ),
								value: 'bottom',
							},
						] }
						selected={ navPosition }
						onChange={ ( navPosition ) => setAttributes( { navPosition } ) }
					/>
					<ToggleControl
						checked={ showCounter }
						label={ __( 'Show slide counter', 'shiro-admin' ) }
						onChange={ ( showCounter ) => setAttributes( { showCounter } ) }
					/>
					<ToggleControl
						checked={ showThumbnails }
						label={ __( 'Show thumbnails', 'shiro-admin' ) }
						onChange={ ( showThumbnails ) => setAttributes( { showThumbnails } ) }
					/>
					<ToggleControl
						checked={ isMobileFullWidth }
						label={ __( 'Stretch to edge of screen on mobile', 'shiro-admin' ) }
						onChange={ ( isMobileFullWidth ) => setAttributes( { isMobileFullWidth } ) }
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
}

export default Edit;
