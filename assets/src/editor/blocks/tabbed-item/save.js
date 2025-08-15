import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { ReactNode } from 'react';

/**
 * Saves the block content for display on the frontend.
 *
 * @param {object} props Props
 * @param {object} props.attributes Attributes.
 * @returns {ReactNode} Formatted block.
 */
const Save = ( { attributes } ) => {
	const { id, title } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'shiro-tabs-item accordion-item',
		id: `accordion-item-${ id }`,
		role: 'tabpanel',
		'aria-labelledby': `shiro-tabs-nav-${ id }`,
		tabIndex: 0,
		//hidden: true,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'accordion-item__content',
	} );

	return (
		<div { ...blockProps }>
			<button
				className="accordion-item__title"
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
