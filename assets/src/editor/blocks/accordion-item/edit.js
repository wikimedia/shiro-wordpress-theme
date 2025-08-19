import { ReactNode } from 'react';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * V1 of the accordion block, which had the h3 nested inside the button element.
 *
 * @param {object} props - Component props.
 * @param {object} props.attributes - Block attributes
 *
 * @returns {ReactNode} Component.
 */
const Edit = ( { attributes, setAttributes, context } ) => {
	const blockProps = useBlockProps(); // eslint-disable-line react-hooks/rules-of-hooks
	const fontColor = context[ 'accordion/fontColor' ];

	if ( fontColor !== attributes.fontColor ) {
		setTimeout( () => setAttributes( { fontColor } ) );
	}

	return (
		<div { ...blockProps }>
			<div className="accordion-item">
				<h3 className="accordion-item__title-wrap">
					<div className="accordion-item__title">
						<RichText
							className="accordion-item__title-text"
							allowedFormats={ [] }
							placeholder={ __(
								'Add Accordion Title...',
								'shiro-admin'
							) }
							tagName="span"
							value={ attributes.title }
							onChange={ title => setAttributes( { title } ) }
							style={ fontColor && { color: fontColor } }
						></RichText>
					</div>
				</h3>

				<div className="accordion-item__content">
					<InnerBlocks />
				</div>
			</div>
		</div>
	);
};

export default Edit;
