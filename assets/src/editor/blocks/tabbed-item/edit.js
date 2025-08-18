import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
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

	// Check if child block is the first one.
	const checkFirstChild = useSelect(
		select => {
			const { getBlockParents, getBlocksByClientId } =
				select( 'core/block-editor' );
			const parentId = getBlockParents( clientId ).slice( -1 );
			const parentBlock = getBlocksByClientId( parentId )[ 0 ];
			const siblings = parentBlock?.innerBlocks;
			const isFirstChild =
				siblings.length > 0 && siblings[ 0 ].clientId === clientId;

			return isFirstChild;
		},
		[ clientId ]
	);

	useEffect( () => {
		// Update the block ID.
		// Always override saved value to ensure we never have duplicates.
		if ( attributes.id !== clientId ) {
			setAttributes( { id: clientId } );
		}

		// Update isFirstChild attribute.
		if ( attributes.isFirstChild !== checkFirstChild ) {
			setAttributes( { isFirstChild: checkFirstChild } );
		}
	}, [
		checkFirstChild,
		clientId,
		attributes.id,
		attributes.isFirstChild,
		setAttributes,
	] );

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

				<div className="accordion-item__content">{ children }</div>
			</div>
		</div>
	);
};

export default Edit;
