import { ReactNode } from 'react';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * V1 of the accordion block, which had the h3 nested inside the button element.
 *
 * @param {object} props - Component props.
 * @param {object} props.attributes - Block attributes
 *
 * @returns {ReactNode} Component.
 */
const Save = ( { attributes, context } ) => {
	const { fontColor, title } = attributes;

	return (
		<div className="accordion-item">
			<h3 className="accordion-item__title-wrap">
				<button
					className="accordion-item__title"
					style={ fontColor && { color: fontColor } }
				>
					<RichText.Content
						className="accordion-item__title-text"
						tagName="span"
						value={ title }
					/>
				</button>
			</h3>

			<div className="accordion-item__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
