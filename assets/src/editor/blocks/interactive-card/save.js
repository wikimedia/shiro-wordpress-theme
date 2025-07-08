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
			<div className="interactive-card-content">
				<RichText.Content
					className="interactive-card-heading is-style-h2"
					tagName={ headingTag }
					value={ headingText }
				/>

				<div className="interactive-card-subheading">
					<RichText.Content
						tagName='p'
						value={ subHeadingText }
					/>
				</div>
			</div>
		</div>
	);
};

export default Save;
