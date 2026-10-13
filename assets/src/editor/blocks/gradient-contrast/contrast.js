/**
 * Work out which text colour keeps WCAG AA contrast over a CSS gradient.
 *
 * Pure functions with no WordPress dependencies, so they can be unit tested.
 */

/** Minimum WCAG AA contrast ratio for normal-size text. */
export const MIN_CONTRAST = 4.5;

const WHITE_LUMINANCE = 1;
const BLACK_LUMINANCE = 0;

const HEX_COLOR = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const COLOR_FUNCTION = /^(rgba?|hsla?)\((.*)\)$/i;
const NUMBER = /^[-+]?(?:\d+\.?\d*|\.\d+)(%|[a-z]+)?$/i;

// Tokens that are lengths, angles or percentages rather than colours.
const POSITION = /^(?:[-+]?(?:\d+\.?\d*|\.\d+)[a-z%]*|calc\(.*\))$/i;

// Tokens that can appear in the optional first argument (direction, angle or
// shape) of a gradient function.
const GRADIENT_CONFIG = /^(?:to|from|at|in|circle|ellipse|closest-side|closest-corner|farthest-side|farthest-corner|left|right|top|bottom|center|[-+]?(?:\d+\.?\d*|\.\d+)[a-z%]*)$/i;

/**
 * Split a string on a separator that sits outside any parentheses.
 *
 * @param {string} value     String to split.
 * @param {RegExp} separator Test for a single separator character.
 * @return {string[]} Trimmed, non-empty parts.
 */
const splitTopLevel = ( value, separator ) => {
	const parts = [];
	let depth = 0;
	let current = '';

	for ( const char of value ) {
		if ( char === '(' ) {
			depth++;
		} else if ( char === ')' ) {
			depth--;
		}

		if ( depth === 0 && separator.test( char ) ) {
			parts.push( current );
			current = '';
		} else {
			current += char;
		}
	}
	parts.push( current );

	return parts.map( part => part.trim() ).filter( Boolean );
};

/**
 * Parse a number with an optional unit.
 *
 * @param {string} token Token such as "50%", "120deg" or "0.5".
 * @return {{value: number, unit: string}|null} Parsed number, or null.
 */
const parseNumber = token => {
	const match = NUMBER.exec( token );

	if ( ! match ) {
		return null;
	}

	return { value: parseFloat( token ), unit: ( match[ 1 ] || '' ).toLowerCase() };
};

const DEGREES_PER_UNIT = { '': 1, deg: 1, turn: 360, rad: 180 / Math.PI, grad: 0.9 };

const clamp = ( value, min, max ) => Math.min( max, Math.max( min, value ) );

/**
 * Convert HSL to RGB.
 *
 * @param {number} h Hue in degrees.
 * @param {number} s Saturation, 0 to 1.
 * @param {number} l Lightness, 0 to 1.
 * @return {number[]} Red, green and blue channels, 0 to 255.
 */
const hslToRgb = ( h, s, l ) => {
	const a = s * Math.min( l, 1 - l );
	const channel = n => {
		const k = ( n + h / 30 ) % 12;
		return 255 * ( l - a * Math.max( -1, Math.min( k - 3, 9 - k, 1 ) ) );
	};

	return [ channel( 0 ), channel( 8 ), channel( 4 ) ];
};

/**
 * Parse an alpha token.
 *
 * @param {string|undefined} token Alpha token, e.g. "0.5" or "50%".
 * @return {number|null} Alpha from 0 to 1, or null if invalid.
 */
const parseAlpha = token => {
	if ( token === undefined ) {
		return 1;
	}

	const alpha = parseNumber( token );

	if ( ! alpha || ( alpha.unit && alpha.unit !== '%' ) ) {
		return null;
	}

	return clamp( alpha.unit === '%' ? alpha.value / 100 : alpha.value, 0, 1 );
};

/**
 * Parse an rgb(), rgba(), hsl() or hsla() colour.
 *
 * @param {string} name Function name.
 * @param {string} args Text between the parentheses.
 * @return {{r: number, g: number, b: number, a: number}|null} Colour, or null.
 */
const parseColorFunction = ( name, args ) => {
	const tokens = args.split( /[\s,/]+/ ).filter( Boolean );

	if ( tokens.length < 3 || tokens.length > 4 ) {
		return null;
	}

	const numbers = tokens.slice( 0, 3 ).map( parseNumber );
	const a = parseAlpha( tokens[ 3 ] );

	if ( a === null || numbers.includes( null ) ) {
		return null;
	}

	let channels;

	if ( name.startsWith( 'rgb' ) ) {
		channels = numbers.map( ( { value, unit } ) => {
			if ( unit && unit !== '%' ) {
				return NaN;
			}
			return clamp( unit === '%' ? value * 2.55 : value, 0, 255 );
		} );
	} else {
		const [ hue, saturation, lightness ] = numbers;

		if (
			! Object.hasOwn( DEGREES_PER_UNIT, hue.unit ) ||
			[ saturation, lightness ].some( ( { unit } ) => unit && unit !== '%' )
		) {
			return null;
		}

		channels = hslToRgb(
			( ( ( hue.value * DEGREES_PER_UNIT[ hue.unit ] ) % 360 ) + 360 ) % 360,
			clamp( saturation.value, 0, 100 ) / 100,
			clamp( lightness.value, 0, 100 ) / 100
		);
	}

	if ( channels.some( Number.isNaN ) ) {
		return null;
	}

	const [ r, g, b ] = channels;

	return { r, g, b, a };
};

/**
 * Parse a single CSS colour token.
 *
 * @param {string} token Colour such as "#fff", "rgb(0 0 0 / 50%)" or "transparent".
 * @return {{r: number, g: number, b: number, a: number}|null} Colour, or null if unsupported.
 */
const parseColor = token => {
	const keyword = token.toLowerCase();

	if ( keyword === 'transparent' ) {
		return { r: 0, g: 0, b: 0, a: 0 };
	}
	if ( keyword === 'white' ) {
		return { r: 255, g: 255, b: 255, a: 1 };
	}
	if ( keyword === 'black' ) {
		return { r: 0, g: 0, b: 0, a: 1 };
	}

	if ( HEX_COLOR.test( token ) ) {
		let hex = token.slice( 1 );

		if ( hex.length <= 4 ) {
			hex = [ ...hex ].map( char => char + char ).join( '' );
		}

		const [ r, g, b, a = 255 ] = hex.match( /../g ).map( pair => parseInt( pair, 16 ) );

		return { r, g, b, a: a / 255 };
	}

	const fn = COLOR_FUNCTION.exec( token );

	return fn ? parseColorFunction( fn[ 1 ].toLowerCase(), fn[ 2 ] ) : null;
};

/**
 * Get the colour of each stop in a CSS gradient.
 *
 * @param {string} gradient CSS gradient, e.g. "linear-gradient(135deg, #fff 0%, #000 100%)".
 * @return {Array<{r: number, g: number, b: number, a: number}>|null} Stop colours, or null when
 *     the gradient has any stop that cannot be parsed (for example var() or color-mix()).
 */
export const parseStops = gradient => {
	const wrapper = /^[a-z-]*gradient\((.*)\)$/is.exec( typeof gradient === 'string' ? gradient.trim() : '' );

	if ( ! wrapper ) {
		return null;
	}

	const segments = splitTopLevel( wrapper[ 1 ], /,/ );

	// The first argument sets the direction or shape and has no colour.
	if ( segments.length && splitTopLevel( segments[ 0 ], /\s/ ).every( token => GRADIENT_CONFIG.test( token ) ) ) {
		segments.shift();
	}

	const stops = [];

	for ( const segment of segments ) {
		const colorTokens = splitTopLevel( segment, /\s/ ).filter( token => ! POSITION.test( token ) );

		// A segment with only a position is a colour hint, not a stop.
		if ( colorTokens.length === 0 ) {
			continue;
		}

		const color = colorTokens.length === 1 ? parseColor( colorTokens[ 0 ] ) : null;

		if ( ! color ) {
			return null;
		}

		stops.push( color );
	}

	return stops.length >= 2 ? stops : null;
};

/**
 * Get the WCAG relative luminance of a colour.
 *
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *
 * @param {{r: number, g: number, b: number}} color Colour with channels 0 to 255.
 * @return {number} Relative luminance, 0 to 1.
 */
export const getRelativeLuminance = ( { r, g, b } ) => {
	const [ red, green, blue ] = [ r, g, b ].map( channel => {
		const value = channel / 255;
		return value <= 0.03928 ? value / 12.92 : ( ( value + 0.055 ) / 1.055 ) ** 2.4;
	} );

	return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

/**
 * Get the WCAG contrast ratio between two relative luminances.
 *
 * @param {number} first  Relative luminance.
 * @param {number} second Relative luminance.
 * @return {number} Contrast ratio, 1 to 21.
 */
export const getContrastRatio = ( first, second ) => {
	const [ lighter, darker ] = first > second ? [ first, second ] : [ second, first ];

	return ( lighter + 0.05 ) / ( darker + 0.05 );
};

/**
 * Get the luminance of every stop and of 7 colours between each pair of stops.
 *
 * Colours between stops can be darker than both ends, e.g. red to green.
 *
 * @param {Array<{r: number, g: number, b: number}>} stops Stop colours.
 * @return {number[]} Relative luminances.
 */
const getSampleLuminances = stops => stops.flatMap( ( stop, index ) => {
	const next = stops[ index + 1 ];

	return ! next ? [ stop ] : [ stop, ...[ 1, 2, 3, 4, 5, 6, 7 ].map( step => ( {
		r: stop.r + ( ( next.r - stop.r ) * step ) / 8,
		g: stop.g + ( ( next.g - stop.g ) * step ) / 8,
		b: stop.b + ( ( next.b - stop.b ) * step ) / 8,
	} ) ) ];
} ).map( getRelativeLuminance );

const isReadableOn = ( luminances, textLuminance ) => luminances.every(
	luminance => getContrastRatio( textLuminance, luminance ) >= MIN_CONTRAST
);

/**
 * Decide which text colour is readable over every stop of a gradient.
 *
 * "dark" means the background is dark and needs white text; "light" means the
 * background is light and needs black text. White text wins when both pass.
 *
 * @param {string} gradient CSS gradient.
 * @return {{tone: 'dark'|'light'|null, reason: null|'unreadable'|'transparent'|'contrast'}} Tone,
 *     and why there is none when the tone is null.
 */
export const getGradientTone = gradient => {
	const stops = parseStops( gradient );

	if ( ! stops ) {
		return { tone: null, reason: 'unreadable' };
	}

	if ( stops.some( ( { a } ) => a < 1 ) ) {
		return { tone: null, reason: 'transparent' };
	}

	const luminances = getSampleLuminances( stops );

	if ( isReadableOn( luminances, WHITE_LUMINANCE ) ) {
		return { tone: 'dark', reason: null };
	}

	if ( isReadableOn( luminances, BLACK_LUMINANCE ) ) {
		return { tone: 'light', reason: null };
	}

	return { tone: null, reason: 'contrast' };
};

/**
 * Check that a text colour meets WCAG AA contrast on every sampled point of a gradient.
 *
 * @param {string} gradient CSS gradient.
 * @param {string} color    CSS text colour (hex, rgb() or hsl()).
 * @return {boolean} False when either value cannot be read, or the text colour is not opaque.
 */
export const textMeetsContrast = ( gradient, color ) => {
	const stops = parseStops( gradient );
	const text = typeof color === 'string' ? parseColor( color.trim() ) : null;

	if ( ! stops || ! text || text.a < 1 ) {
		return false;
	}

	return isReadableOn( getSampleLuminances( stops ), getRelativeLuminance( text ) );
};

/**
 * Resolve a preset slug or `var:preset|gradient|slug` reference to its CSS.
 *
 * @param {string}   value   Preset slug, preset reference or CSS gradient.
 * @param {object[]} presets Gradient presets.
 * @return {string} The preset CSS, or the input when no preset matches.
 */
export const resolvePresetReference = ( value, presets ) => {
	const slug = value.replace( /^var:preset\|gradient\|/, '' );

	return presets.find( preset => preset.slug === slug )?.gradient ?? value;
};

/**
 * Get the CSS of the text colour set on a block.
 *
 * @param {Object}   attributes Block attributes.
 * @param {object[]} palette    Colour palette from the block editor settings.
 * @return {string|undefined} Colour, or undefined when the block has none. An unknown
 *     slug is returned as it is, which counts as unreadable.
 */
export const resolveTextColor = ( attributes, palette ) => {
	const value = attributes.textColor || attributes.style?.color?.text;
	const slug = value?.replace( /^var:preset\|color\|/, '' );

	return palette.find( color => color.slug === slug )?.color ?? value;
};

/**
 * Get the resolved text colours of the descendants that sit on a block's background.
 *
 * A descendant with a background of its own is skipped with its whole subtree,
 * because its text is not on the ancestor's background.
 *
 * @param {Object[]} blocks  Inner blocks, each with `attributes` and `innerBlocks`.
 * @param {object[]} palette Colour palette from the block editor settings.
 * @return {string[]} Text colours, in document order.
 */
export const getDescendantTextColors = ( blocks, palette ) => blocks.flatMap( ( { attributes, innerBlocks } ) => {
	const { backgroundColor, gradient, style } = attributes;

	if ( backgroundColor || gradient || style?.color?.background || style?.color?.gradient || style?.background?.gradient ) {
		return [];
	}

	const color = resolveTextColor( attributes, palette );

	return [ ...( color ? [ color ] : [] ), ...getDescendantTextColors( innerBlocks, palette ) ];
} );
