import { ReactNode } from 'react';
import {
	RichText,
	useBlockProps
} from '@wordpress/block-editor';

/**
 * Saves the block content for display on the frontend.
 *
 * @param {object} props Props
 * @param {object} props.attributes Attributes.
 * @returns {ReactNode} Formatted block.
 */
const Save = ( { attributes } ) => {
	const blockProps = useBlockProps.save();
	const { text } = attributes;

	return (
		<RichText.Content { ...blockProps } tagName="button" value={ text } />
	);
};

export default Save;
