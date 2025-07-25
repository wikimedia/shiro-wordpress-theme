import {
	InnerBlocks,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Saves the block content for display on the frontend.
 *
 * @param {object} props Props
 * @param {object} props.attributes Attributes.
 * @returns {ReactNode} Formatted block.
 */
function Save( { attributes } ) {
	const { fontColor, id, title } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'accordion-item__content',
		id: `accordion-item-${ id }`,
		role: 'tabpanel',
		'aria-labelledby': `shiro-tabs-nav-${ id }`,
		tabIndex: 0,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

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

			<div { ...innerBlocksProps } />
		</div>
	);
}

export default Save;
