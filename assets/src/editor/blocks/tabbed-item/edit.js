import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { ReactNode } from 'react';

const TEMPLATE = [ [ 'core/paragraph' ] ];

/**
 * Provide an interface for editing the block.
 *
 * @param {object} props Props
 * @param {object} props.attributes Attributes
 * @param {string} props.clientId Client ID.
 * @param {object} props.setAttributes Set Attributes
 * @returns {ReactNode} Formatted blocks.
 */
const Edit = ( { attributes, clientId, setAttributes } ) => {
	const blockProps = useBlockProps( {
		className: 'shiro-tabs-item',
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
	} );

	// Update the block ID.
	// Always override saved value to ensure we never have duplicates.
	useEffect( () => {
		if ( attributes.id !== clientId ) {
			setAttributes( { id: clientId } );
		}
	}, [ clientId, attributes.id, setAttributes ] );

	return (
		<div { ...innerBlocksProps }>
			<div className="accordion-item">
				<div className="accordion-item__title">
					<RichText
						className="accordion-item__title-text"
						allowedFormats={ [] }
						placeholder={ __( 'Tab Title', 'shiro-admin' ) }
						tagName="h3"
						value={ attributes.title }
						onChange={ title => setAttributes( { title } ) }
					></RichText>
				</div>

				<div className="accordion-item__content">
					{ children }
				</div>
			</div>
		</div>
	);
}

export default Edit;
