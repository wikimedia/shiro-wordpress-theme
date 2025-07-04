import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * @param {object} props Block properties.
 *
 * @returns {WPElement} Card Icon save block component.
 */
const Save = ( props ) => {
	const { attributes } = props;
	const {
		headingTag,
		headingText,
		subHeadingText
	} = attributes;

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div>
				<RichText.Content
					className="interactive-card-heading"
					tagName={ headingTag }
					value={ headingText }
				/>

				<RichText.Content
					className="interactive-card-subheading"
					tagName='p'
					value={ subHeadingText }
				/>
			</div>
		</div>
	);
};

export default Save;
