import {
	RichText,
	useBlockProps
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { text } = attributes;
	const blockProps = useBlockProps();

	return (
		<RichText
			{ ...blockProps }
			tagName="a" // The tag here is the element output and editable in the admin
			value={ text } // Any existing content, either from the database or an attribute default
			allowedFormats={ [] } // Allow the content to be made bold or italic, but do not allow other formatting options
			onChange={ ( content ) => setAttributes( { text: content } ) } // Store updated content as a block attribute
			placeholder={ __( 'Play...' ) } // Display this text before any content has been added by the user
		/>
	);
}
