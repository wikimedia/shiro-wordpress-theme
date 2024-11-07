/**
 * Card block that makes a call to action with an image and text.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { ReactComponent as BlockIcon } from '../../../svg/blocks/card.svg';
import CallToActionPicker from '../../components/cta';
import ImagePicker from '../../components/image-picker';
import sharedStyles from '../../helpers/block-styles';

import metadata from './block.json';

/**
 * Internal dependencies
 */
import './style.scss';

registerBlockType( metadata.name, {
	...metadata,

	icon: BlockIcon,

	/**
	 * Edit component used to manage featured image and page intro.
	 */
	edit: function CardBlock( { attributes, setAttributes } ) {
		const blockProps = useBlockProps( { className: 'content-card' } );
		const {
			imageId,
			imageSrc,
			heading,
			body,
			linkText,
			linkUrl,
			imageWidth,
			imageHeight,
		} = attributes;

		const onSelectImage = useCallback( ( { id, src, alt, width, height } ) => {
			setAttributes( {
				imageId: id,
				imageSrc: src,
				imageAlt: alt,
				imageWidth: width,
				imageHeight: height,
			} );
		}, [ setAttributes ] );

		return (
			<div { ...blockProps }>
				<div className="content-card__contents">
					<RichText
						className="content-card__heading is-style-h3"
						placeholder={ __( 'Heading of the card', 'shiro-admin' ) }
						tagName="h2"
						value={ heading }
						onChange={ ( heading ) => setAttributes( { heading } ) }
					/>
					<RichText
						className="content-card__body has-small-font-size"
						placeholder={ __( 'Body of the card', 'shiro-admin' ) }
						tagName="p"
						value={ body }
						onChange={ ( body ) => setAttributes( { body } ) }
					/>
					<CallToActionPicker
						className="content-card__call-to-action arrow-link"
						text={ linkText }
						url={ linkUrl }
						onChangeLink={ ( linkUrl ) => setAttributes( { linkUrl } ) }
						onChangeText={ ( linkText ) => setAttributes( { linkText } ) }
					/>
				</div>
				<ImagePicker
					className="content-card__image"
					height={ imageHeight }
					id={ imageId }
					imageSize="image_16x9_small"
					src={ imageSrc }
					width={ imageWidth }
					onChange={ onSelectImage }
				/>
			</div>
		);
	},

	/**
	 * Render the frontend representation of the card block.
	 */
	save: function Save( { attributes } ) {
		const blockProps = useBlockProps.save( { className: 'content-card click-to-call-to-action' } );
		const {
			imageId,
			imageSrc,
			heading,
			body,
			linkText,
			linkUrl,
			imageWidth,
			imageHeight,
		} = attributes;

		return (
			<div { ...blockProps }>
				<div className="content-card__contents">
					<RichText.Content
						className="content-card__heading is-style-h3"
						tagName="h2"
						value={ heading }
					/>
					<RichText.Content
						className="content-card__body has-small-font-size"
						tagName="p"
						value={ body }
					/>
					<CallToActionPicker.Content
						className="content-card__call-to-action call-to-action"
						text={ linkText }
						url={ linkUrl }
					/>
				</div>
				<ImagePicker.Content
					className="content-card__image"
					height={ imageHeight }
					id={ imageId }
					imageSize="image_16x9_small"
					src={ imageSrc }
					width={ imageWidth }
				/>
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
