import { InnerBlocksDisplaySingle } from '@humanmade/block-editor-components';
import classNames from 'classnames';
import { ReactNode } from 'react';

import {
	BlockControls,
	RichText,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const { ButtonBlockAppender } = InnerBlocks;

const TAB_LIMIT = 4;
const ALLOWED_BLOCK = 'shiro/tabbed-item';
const TEMPLATE = [ [ 'shiro/tabbed-item' ] ];

/**
 * Provide an interface for editing the block.
 *
 * @param {object} props Props
 * @param {object} props.attributes Attributes
 * @param {string} props.clientId Client ID.
 * @param {object} props.setAttributes Set Attributes
 * @returns {ReactNode} Formatted blocks.
 */
function Edit( { attributes, clientId, setAttributes } ) {
	const { items } = attributes;

	// Use state to store which tab is currently selected in the editor.
	const [ selectedItemIndex, setSelectedItemIndex ] = useState( 0 );

	const innerBlocks = useSelect(
		select => {
			return (
				select( 'core/block-editor' ).getBlock( clientId )
					?.innerBlocks || []
			);
		},
		[ clientId ]
	);

	// Get the ClientID of the selected tab's block.
	const selectedItemClientID = useMemo(
		() => innerBlocks?.[ selectedItemIndex ]?.clientId,
		[ innerBlocks, selectedItemIndex ]
	);

	// Memoize an array of tab titles to reduce computation within the effect.
	const itemList = useMemo( () => {
		return innerBlocks.map( block => ( {
			title: typeof block?.attributes?.title === 'string' ? block?.attributes?.title : block?.attributes?.title?.text,
			id: block?.attributes?.id || block.clientId,
		} ) );
	}, [ innerBlocks ] );

	const { moveBlockToPosition, removeBlock, updateBlockAttributes } =
		useDispatch( 'core/block-editor' );

	/**
	 * Remove the currently selected tab
	 */
	const removeTab = () => {
		removeBlock( selectedItemClientID );
		setSelectedItemIndex( 0 );
	};

	/**
	 * Move the currently selected tab left
	 */
	const moveTabLeft = () => {
		moveBlockToPosition(
			selectedItemClientID,
			clientId,
			clientId,
			selectedItemIndex - 1
		);
		setSelectedItemIndex( selectedItemIndex - 1 );
	};

	/**
	 * Move the currently selected tab right
	 */
	const moveTabRight = () => {
		moveBlockToPosition(
			selectedItemClientID,
			clientId,
			clientId,
			selectedItemIndex + 1
		);
		setSelectedItemIndex( selectedItemIndex + 1 );
	};

	/**
	 * Render tab controls
	 */
	const blockControls = (
		<BlockControls>
			<ToolbarGroup>
				{ innerBlocks.length > 1 && (
					<ToolbarButton
						icon="remove"
						label={ __( 'Remove tab', 'shiro-admin' ) }
						onClick={ removeTab }
					/>
				) }
				{ selectedItemIndex > 0 && (
					<ToolbarButton
						icon="arrow-left"
						label={ __( 'Move tab left', 'shiro-admin' ) }
						onClick={ moveTabLeft }
					/>
				) }
				{ selectedItemIndex < innerBlocks.length - 1 && (
					<ToolbarButton
						icon="arrow-right"
						label={ __( 'Move tab right', 'shiro-admin' ) }
						onClick={ moveTabRight }
					/>
				) }
			</ToolbarGroup>
		</BlockControls>
	);

	// Render clickable tab titles.
	const innerBlockTitleRender = useMemo( () => {
		return (
			<ul className="shiro-tabs__nav">
				{ innerBlocks.map( ( block, index ) => (
					<li key={ block.clientId } className="shiro-tabs__nav-item">
						<RichText
							// We can edit the tab title for innerBlocks from the top title display.
							allowedFormats={ [] }
							className={ classNames( 'shiro-tabs__nav-button', {
								'shiro-tabs__nav-button--active':
									selectedItemIndex === index,
							} ) }
							placeholder={ __( 'Tab Title', 'shiro-admin' ) }
							tagName={
								// A div must be used here even if inserting a button, or
								// else button default event handling will prevent typing
								// the "space" character.
								'div'
							}
							value={ block?.attributes?.title ?? null }
							onChange={ title =>
								updateBlockAttributes( block.clientId, {
									title,
								} )
							}
							onClick={ () => setSelectedItemIndex( index ) }
						/>
					</li>
				) ) }
				{ innerBlocks.length < TAB_LIMIT ? (
					<li key="add-tab" className="shiro-tabs__nav-item">
						<ButtonBlockAppender rootClientId={ clientId } />
					</li>
				) : null }
			</ul>
		);
	}, [
		clientId,
		innerBlocks,
		selectedItemIndex,
		setSelectedItemIndex,
		updateBlockAttributes,
	] );

	useEffect( () => {
		if ( itemList && itemList !== items ) {
			// Store tab title list as an attribute for frontend display.
			setAttributes( { items: itemList } );
		}
	}, [ itemList, items, setAttributes ] );

	const blockProps = useBlockProps( {
		className: 'shiro-tabs',
	} );

	return (
		<div { ...blockProps }>
			{ blockControls }
			{ innerBlockTitleRender }
			<InnerBlocksDisplaySingle
				allowedBlocks={ [ ALLOWED_BLOCK ] }
				captureToolbars={ false }
				className={ 'shiro-tabs__content' }
				currentItemIndex={ selectedItemIndex }
				parentBlockId={ clientId }
				template={ TEMPLATE }
			/>
		</div>
	);
}

export default Edit;
