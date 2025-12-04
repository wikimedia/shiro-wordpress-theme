/**
 * WordPress dependencies
 */
import {
	PanelBody,
	PanelRow,
	SelectControl,
} from '@wordpress/components';
import {
	InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ImageControl } from '@humanmade/block-editor-components';

/**
 * Internal dependencies
 */
import VideoControl from './video-control';

export default function VideoPromoInspectorControls( {
	attributes,
	setAttributes,
} ) {
	const {
		tagName,
		posterId,
		videoId,
		mobileVideoId,
		mobilePosterId,
	} = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Desktop Video" initialOpen={ true }>
					<PanelRow>
						<VideoControl
							value={ videoId }
							onChange={ ( media ) => setAttributes( {
								videoId: media?.id,
							} ) }
						/>
					</PanelRow>
					<PanelRow>
						<ImageControl
							size="thumbnail"
							value={ posterId }
							onChange={ ( media ) => setAttributes( {
								posterId: media?.id,
							} ) }
							buttonText="Select Poster"
							modalTitle="Select Poster"
							removeButtonText="Remove Poster"
							replaceButtonText="Replace Poster"
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title="Mobile Video" initialOpen={ true }>
					<PanelRow>
						<VideoControl
							value={ mobileVideoId }
							onChange={ ( media ) => setAttributes( {
								mobileVideoId: media?.id,
							} ) }
							buttonText="Select Mobile Video"
							modalTitle="Select Mobile Video"
							removeButtonText="Remove Mobile Video"
							replaceButtonText="Replace Mobile Video"
						/>
					</PanelRow>
					<PanelRow>
						<hr/>
					</PanelRow>
					<PanelRow>
						<ImageControl
							size="thumbnail"
							value={ mobilePosterId }
							onChange={ ( media ) => setAttributes( {
								mobilePosterId: media?.id,
							} ) }
							buttonText="Select Mobile Poster"
							modalTitle="Select Mobile Poster"
							removeButtonText="Remove Mobile Poster"
							replaceButtonText="Replace Mobile Poster"
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="advanced">
				<SelectControl
					label={ __( 'HTML element' ) }
					value={ tagName }
					onChange={ ( newValue ) => setAttributes( { tagName: newValue } ) }
					options={ [
						{ label: __( 'Default (<div>)' ), value: 'div' },
						{ label: '<header>', value: 'header' },
						{ label: '<main>', value: 'main' },
						{ label: '<section>', value: 'section' },
						{ label: '<article>', value: 'article' },
						{ label: '<aside>', value: 'aside' },
						{ label: '<footer>', value: 'footer' },
					] }
					help={
						tagName === 'hr'
							? __(
									'Only select <hr> if the separator conveys important information and should be announced by screen readers.'
							)
							: __(
									'The <div> element should only be used if the block is a design element with no semantic meaning.'
							)
					}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</InspectorControls>
		</>
	);
}
