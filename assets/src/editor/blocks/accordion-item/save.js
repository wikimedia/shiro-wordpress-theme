import {
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
	const { fontColor, id, isTabbed, title } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'accordion-item',
		id: `accordion-item-${ id }`,
		role: isTabbed ? 'tabpanel' : '',
		'aria-labelledby': isTabbed ? `shiro-tabs-nav-${ id }` : '',
		tabIndex: isTabbed ? 0 : '',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'accordion-item__content',
	} );

	return (
		<div { ...blockProps }>
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
