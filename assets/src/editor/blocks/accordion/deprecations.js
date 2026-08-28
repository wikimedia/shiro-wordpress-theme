/**
 * Handle old versions of this block.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/
 */

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

/**
 * Original save, which interpolated an unset `fontColor` directly into the
 * class list and so serialised the literal string "undefined". Kept so that
 * existing accordions validate and migrate to the current, filtered save.
 */
const v1 = {
	...metadata,
	save: ( { attributes } ) => {
		const blockProps = useBlockProps.save();
		blockProps.className = `accordion-wrapper ${blockProps.className} ${attributes.fontColor}`;

		return (
			<div { ...blockProps } >
				<InnerBlocks.Content />
			</div>

		);
	},
};

export default [ v1 ];
