/**
 * Handle old versions of this block.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/
 */

import { InnerBlocks, RichText } from '@wordpress/block-editor';
import metadata from './block.json';
metadata.attributes.title.selector =
	'.accordion-item__title-text, .accordion-item__title-text strong';
metadata.attributes.title.source = 'html';

/**
 * Original version of accordion item block, which nested h3s inside of the button.
 */
const v1 = {
	...metadata,
	/**
	 * Render save of the original v1 accordion item block.
	 */
	save( { attributes, context } ) {
		const { fontColor, title } = attributes;

		return (
			<div className="accordion-item">
				<button
					className="accordion-item__title"
					style={ fontColor && { color: fontColor } }
				>
					<RichText.Content
						className="accordion-item__title-text"
						tagName="h3"
						value={ title }
					/>
				</button>

				<div className="accordion-item__content">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
	migrate( { title } ) {
		return {
			title: title.replace( /(<([^>]+)>)/gi, '' ),
		};
	},
};

export default [ v1 ];
