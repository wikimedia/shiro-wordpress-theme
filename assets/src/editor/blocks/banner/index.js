/**
 * Block for implementing the banner component.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { ReactComponent as BlockIcon } from '../../../svg/blocks/banner.svg';
import Cta from '../../components/cta/index';
import ImageFilter, { DEFAULT_IMAGE_FILTER } from '../../components/image-filter';
import ImagePicker from '../../components/image-picker/index.js';
import sharedStyles, { applyDefaultStyle } from '../../helpers/block-styles';

import metadata from './block.json';

import './style.scss';

registerBlockType( metadata.name, {
	...metadata,

	icon: BlockIcon,

	// Inject the imported default into a specific attribute.
	attributes: {
		...metadata.attributes,
		imageFilter: {
			...metadata.attributes.imageFilter,
			default: DEFAULT_IMAGE_FILTER,
		},
	},

	/**
	 * Edit component used to manage featured image and page intro.
	 */
	edit: function BannerEdit( { attributes, setAttributes } ) {
		const {
			heading,
			text,
			buttonText,
			url,
			imageID,
			imageSrc,
			imageFilter,
		} = attributes;

		const blockProps = useBlockProps( {
			className: 'banner',
		} );

		const onImageChange = useCallback( ( { id, src, alt } ) => {
			setAttributes( {
				imageID: id,
				imageSrc: src,
				imageAlt: alt,
			} );
		}, [ setAttributes ] );

		const onChangeLink = useCallback( ( url ) => {
			setAttributes( {
				url,
			} );
		}, [ setAttributes ] );

		const onChangeText = useCallback( ( text ) => {
			setAttributes( {
				buttonText: text,
			} );
		}, [ setAttributes ] );

		return (
			<div { ...applyDefaultStyle( blockProps ) } >
				<div className="banner__content">
					<RichText
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						className="banner__heading is-style-h4"
						placeholder={ __( 'Heading for banner', 'shiro-admin' ) }
						tagName="h2"
						value={ heading }
						onChange={ ( heading ) => setAttributes( { heading } ) }
					/>
					<RichText
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						className="banner__text"
						placeholder={ __( 'Enter the message for this banner.', 'shiro-admin' ) }
						tagName="p"
						value={ text }
						onChange={ ( text ) => setAttributes( { text } ) }
					/>
					<Cta
						className="banner__cta"
						text={ buttonText }
						url={ url }
						onChangeLink={ onChangeLink }
						onChangeText={ onChangeText }
					/>
				</div>
				<ImageFilter
					className="banner__image-wrapper"
					value={ imageFilter }
					onChange={ ( imageFilter ) => setAttributes( { imageFilter } ) }>
					<ImagePicker
						className="banner__image"
						id={ imageID }
						imageSize={ 'medium_large' }
						src={ imageSrc }
						onChange={ onImageChange }
					/>
				</ImageFilter>
			</div>
		);
	},

	/**
	 * Save the banner
	 */
	save: function BannerSave( { attributes } ) {
		const {
			heading,
			text,
			buttonText,
			url,
			imageSrc,
			imageAlt,
			imageID,
			imageFilter,
		} = attributes;

		const blockProps = useBlockProps.save( {
			className: 'banner',
		} );

		return (
			<div { ...applyDefaultStyle( blockProps ) } >
				<div className="banner__content">
					<RichText.Content
						className="banner__heading"
						tagName="h4"
						value={ heading }
					/>
					<RichText.Content
						className="banner__text"
						tagName="p"
						value={ text }
					/>
					<Cta.Content
						className="banner__cta"
						text={ buttonText }
						url={ url }
					/>
				</div>
				<ImageFilter.Content
					className="banner__image-wrapper"
					value={ imageFilter }>
					<ImagePicker.Content
						alt={ imageAlt }
						className="banner__image"
						id={ imageID }
						imageSize={ 'medium_large' }
						src={ imageSrc }
					/>
				</ImageFilter.Content>
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
