/**
 * An expandable "accordion item".
 *
 * Child block of the "shiro/accordion" wrapper block.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';

import './style.scss';

registerBlockType( metadata.name, {
	/**
	 * Edit the block.
	 */
	edit: ( {
		attributes,
		setAttributes,
		context,
	} ) => {
		const blockProps = useBlockProps(); // eslint-disable-line react-hooks/rules-of-hooks
		const fontColor = context['accordion/fontColor'];

		if ( fontColor !== attributes.fontColor ) {
			setTimeout( () => setAttributes( { fontColor } ) );
		}

		return (
			<div { ...blockProps }>
				<div className="accordion-item">
					<div className="accordion-item__title">
						<RichText
							className="accordion-item__title-text"
							allowedFormats={ [] }
							placeholder={ __( 'Add Accordion Title...', 'shiro-admin' ) }
							tagName="h3"
							value={ attributes.title }
							onChange={ ( title ) => setAttributes( { title } ) }
							style={ fontColor && { color: fontColor } }
						></RichText>
					</div>

					<div className="accordion-item__content">
						<InnerBlocks />
					</div>
				</div>
			</div>
		);
	},

	/**
	 * Save block markup.
	 */
	save: ( { attributes, context } ) => {
		const { fontColor, title } = attributes;

		return (
			<div className="accordion-item">
				<button className="accordion-item__title" style={ fontColor && { color: fontColor } } >
					<RichText.Content
						className="accordion-item__title-text"
						tagName="h3"
						value={ title }
					/>
				</button>

				<div className="accordion-item__content">
					<InnerBlocks.Content/>
				</div>
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
