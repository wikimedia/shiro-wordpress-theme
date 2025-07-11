import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * @param {object} props Block properties.
 *
 * @returns {WPElement} Interactive Card block save component.
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
			<div className="interactive-card__content">
				<RichText.Content
					className="interactive-card__heading"
					tagName={ headingTag }
					value={ headingText }
				/>

				<div className="interactive-card__subheading">
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
