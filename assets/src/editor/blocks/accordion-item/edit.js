import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { select } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Provide an interface for editing the block.
 *
 * @param {object} props Props
 * @param {object} props.attributes Attributes
 * @param {string} props.clientId Client ID.
 * @param {string} props.context Block context.
 * @param {object} props.setAttributes Set Attributes
 * @returns {ReactNode} Formatted blocks.
 */
function Edit( { attributes, clientId, context, setAttributes } ) {
	const blockProps = useBlockProps(); // eslint-disable-line react-hooks/rules-of-hooks
	const fontColor = context[ 'accordion/fontColor' ];

	if ( fontColor !== attributes.fontColor ) {
		setTimeout( () => setAttributes( { fontColor } ) );
	}

	// Check if the parent block is the tabbed block.
	useEffect( () => {
		const parentId = select( 'core/block-editor' )
			.getBlockParents( clientId )
			.slice( -1 )
			.toString();
		const parentName =
			select( 'core/block-editor' ).getBlocksByClientId( parentId )[ 0 ]
				?.name;
		setAttributes( { isTabbed: parentName === 'shiro/tabbed' } );
	}, [ clientId, attributes.isTabbed, setAttributes ] );

	// Update the block ID.
	// Always override saved value to ensure we never have duplicates.
	useEffect( () => {
		if ( attributes.id !== clientId ) {
			setAttributes( { id: clientId } );
		}
	}, [ clientId, attributes.id, setAttributes ] );

	return (
		<div { ...blockProps }>
			<div className="accordion-item">
				<div className="accordion-item__title">
					<RichText
						className="accordion-item__title-text"
						allowedFormats={ [] }
						placeholder={ __(
							'Add Accordion Title...',
							'shiro-admin'
						) }
						tagName="h3"
						value={ attributes.title }
						onChange={ title => setAttributes( { title } ) }
						style={ fontColor && { color: fontColor } }
					></RichText>
				</div>

				<div className="accordion-item__content">
					<InnerBlocks />
				</div>
			</div>
		</div>
	);
}

export default Edit;
