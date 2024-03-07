/**
 * Wrap all of the characters in the string with a span tag.
 *
 * Removes any HTML elements in the string before performing operation.
 *
 * @param {string} string String to wrap.
 * @returns {string} String of wrapped characters.
 */
const wrapCharacters = ( string ) => {
	return string
		// Strip html.
		.replace( /(<([^>]+)>)/gi, '' )
		// Split up the characters.
		.split( '' )
		// Add a <span> around the characters
		.map( ( char ) => '<span>' + char + '</span>' )
		// Re-construct.
		.join( '' );
};

export default wrapCharacters;
