import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
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
	const { id, isFirstChild, title } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'shiro-tabs-item accordion-item',
		id: `accordion-item-${ id }`,
		role: 'tabpanel',
		'aria-labelledby': `shiro-tabs-nav-${ id }`,
		...( ! isFirstChild && {
			hidden: 'true',
		} ),
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'accordion-item__content',
	} );

	return (
		<div { ...blockProps }>
			<h3 className="accordion-item__title-wrap">
				<button className="accordion-item__title">
					<RichText.Content
						className="accordion-item__title-text"
						tagName="span"
						value={ title }
					/>
				</button>
			</h3>

			<div { ...innerBlocksProps } />
		</div>
	);
};

export default Save;
