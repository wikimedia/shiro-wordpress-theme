/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

import {
	BlockControls,
	__experimentalBlockFullHeightAligmentControl as FullHeightAlignmentControl,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function CoverBlockControls( {
	attributes,
	setAttributes,
	currentSettings,
} ) {
	const { minHeight, minHeightUnit } = attributes;
	const { hasInnerBlocks } = currentSettings;

	const [ prevMinHeightValue, setPrevMinHeightValue ] = useState( minHeight );
	const [ prevMinHeightUnit, setPrevMinHeightUnit ] =
		useState( minHeightUnit );
	const isMinFullHeight =
		minHeightUnit === 'vh' &&
		minHeight === 100;

	const toggleMinFullHeight = () => {
		if ( isMinFullHeight ) {
			// If there aren't previous values, take the default ones.
			if ( prevMinHeightUnit === 'vh' && prevMinHeightValue === 100 ) {
				return setAttributes( {
					minHeight: undefined,
					minHeightUnit: undefined,
				} );
			}

			// Set the previous values of height.
			return setAttributes( {
				minHeight: prevMinHeightValue,
				minHeightUnit: prevMinHeightUnit,
			} );
		}

		setPrevMinHeightValue( minHeight );
		setPrevMinHeightUnit( minHeightUnit );

		// Set full height, and clear any aspect ratio value.
		return setAttributes( {
			minHeight: 100,
			minHeightUnit: 'vh',
			style: {
				...attributes?.style,
				dimensions: {
					...attributes?.style?.dimensions,
				},
			},
		} );
	};

	return (
		<>
			<BlockControls group="block">
				<FullHeightAlignmentControl
					isActive={ isMinFullHeight }
					onToggle={ toggleMinFullHeight }
					isDisabled={ ! hasInnerBlocks }
				/>
			</BlockControls>
		</>
	);
}
