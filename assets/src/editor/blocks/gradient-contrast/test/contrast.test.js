import theme from '../../../../../../theme.json';
import { getGradientTone, parseStops } from '../contrast';

const solid = color => `linear-gradient(90deg,${ color } 0%,${ color } 100%)`;

// Keep in sync with $color-palette-dark and $color-palette-light in
// assets/src/sass/utilities/_theme-supports.scss.
const DARK_PALETTE = [
	'blue',
	'blue-aaa',
	'green',
	'green-aaa',
	'purple',
	'red',
	'red-aaa',
	'main',
	'black-75',
];
const LIGHT_PALETTE = [
	'orange',
	'yellow',
	'pink',
	'bright-blue',
	'bright-green',
	'bright-yellow',
	'light-pink',
	'light-purple',
	'light-bright-blue',
	'light-bright-green',
	'lightest-pink',
	'mid-bright-yellow',
	'light-bright-yellow',
	'lightest-yellow',
	'lightest-purple',
	'lightest-blue',
	'lightest-green',
	'base',
	'black-50',
	'black-25',
	'black-10',
	'black-05',
	'border-light',
	'border-base',
];

describe( 'parseStops', () => {
	it.each( [
		[ '#fff', { r: 255, g: 255, b: 255, a: 1 } ],
		[ '#0f08', { r: 0, g: 255, b: 0, a: 136 / 255 } ],
		[ '#0063BF', { r: 0, g: 99, b: 191, a: 1 } ],
		[ '#0063BF80', { r: 0, g: 99, b: 191, a: 128 / 255 } ],
		[ 'rgb(0, 99, 191)', { r: 0, g: 99, b: 191, a: 1 } ],
		[ 'rgba(0,99,191,0.5)', { r: 0, g: 99, b: 191, a: 0.5 } ],
		[ 'rgb(0 99 191 / 50%)', { r: 0, g: 99, b: 191, a: 0.5 } ],
		[ 'rgb(100% 0% 0%)', { r: 255, g: 0, b: 0, a: 1 } ],
		[ 'hsl(120, 100%, 50%)', { r: 0, g: 255, b: 0, a: 1 } ],
		[ 'hsla(240deg 100% 50% / 0.25)', { r: 0, g: 0, b: 255, a: 0.25 } ],
		[ 'transparent', { r: 0, g: 0, b: 0, a: 0 } ],
		[ 'white', { r: 255, g: 255, b: 255, a: 1 } ],
		[ 'black', { r: 0, g: 0, b: 0, a: 1 } ],
	] )( 'reads %s', ( color, expected ) => {
		const [ stop ] = parseStops( solid( color ) );

		expect( stop.r ).toBeCloseTo( expected.r, 0 );
		expect( stop.g ).toBeCloseTo( expected.g, 0 );
		expect( stop.b ).toBeCloseTo( expected.b, 0 );
		expect( stop.a ).toBeCloseTo( expected.a, 2 );
	} );

	it( 'does not read angles, positions or shapes as colours', () => {
		expect( parseStops( 'linear-gradient(135deg, #000 0%, #fff 100%)' ) ).toHaveLength( 2 );
		expect( parseStops( 'linear-gradient(to right, #000, #fff)' ) ).toHaveLength( 2 );
		expect( parseStops( 'radial-gradient(circle at center, #000 10%, #fff 90%)' ) ).toHaveLength( 2 );
		expect( parseStops( 'conic-gradient(from 90deg at 50% 50%, #000 0deg, #fff 360deg)' ) ).toHaveLength( 2 );
		expect( parseStops( 'linear-gradient(#000 0%, 50%, #fff 100%)' ) ).toHaveLength( 2 );
		expect( parseStops( 'linear-gradient(0.25turn, #000 5px 10px, #fff 100%)' ) ).toHaveLength( 2 );
	} );

	it( 'reads every stop when a colour contains commas', () => {
		const stops = parseStops( 'linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)' );

		expect( stops ).toHaveLength( 2 );
		expect( stops[ 1 ] ).toMatchObject( { r: 155, g: 81, b: 224, a: 1 } );
	} );

	it.each( [
		[ 'var()', 'linear-gradient(90deg, var(--wp--preset--color--blue) 0%, #fff 100%)' ],
		[ 'color-mix()', 'linear-gradient(90deg, color-mix(in srgb, #000 50%, #fff) 0%, #fff 100%)' ],
		[ 'named colour', 'linear-gradient(90deg, red 0%, #fff 100%)' ],
		[ 'invalid hex', 'linear-gradient(90deg, #12 0%, #fff 100%)' ],
		[ 'empty string', '' ],
		[ 'not a gradient', '#fff' ],
		[ 'a single stop', 'linear-gradient(90deg, #fff 0%)' ],
	] )( 'returns null for %s', ( label, gradient ) => {
		expect( parseStops( gradient ) ).toBeNull();
	} );
} );

describe( 'getGradientTone', () => {
	it( 'returns "dark" for a gradient that white text can read', () => {
		expect( getGradientTone( 'linear-gradient(135deg,#000000 0%,#0063BF 100%)' ) )
			.toEqual( { tone: 'dark', reason: null } );
	} );

	it( 'returns "light" for a gradient that black text can read', () => {
		expect( getGradientTone( 'linear-gradient(135deg,#FFFFFF 0%,#F0BC00 100%)' ) )
			.toEqual( { tone: 'light', reason: null } );
	} );

	it( 'prefers "dark" when white and black text are both readable', () => {
		expect( getGradientTone( solid( '#308557' ) ) ).toEqual( { tone: 'dark', reason: null } );
	} );

	it( 'returns null when neither text colour reads on every stop', () => {
		expect( getGradientTone( 'linear-gradient(135deg,#0063BF 0%,#F0BC00 100%)' ) )
			.toEqual( { tone: null, reason: 'contrast' } );
	} );

	it( 'returns null when only a colour between two readable stops fails', () => {
		// Black text: #FF0000 is 5.25:1 and #00A000 is 6.03:1, but the midpoint is about 3.1:1.
		expect( getGradientTone( 'linear-gradient(90deg,#FF0000 0%,#00A000 100%)' ) )
			.toEqual( { tone: null, reason: 'contrast' } );
	} );

	it.each( [
		'linear-gradient(90deg, transparent 0%, #000 100%)',
		'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, #000 100%)',
		'linear-gradient(90deg, #000000e6 0%, #000 100%)',
	] )( 'returns null for a transparent stop in %s', gradient => {
		expect( getGradientTone( gradient ) ).toEqual( { tone: null, reason: 'transparent' } );
	} );

	it.each( [
		'linear-gradient(90deg, var(--wp--preset--color--main) 0%, #000 100%)',
		'linear-gradient(90deg, color-mix(in srgb, #000, #fff) 0%, #000 100%)',
		'some-slug',
	] )( 'returns null for the unreadable gradient %s', gradient => {
		expect( getGradientTone( gradient ) ).toEqual( { tone: null, reason: 'unreadable' } );
	} );

	describe( 'theme palette', () => {
		const palette = Object.fromEntries(
			theme.settings.color.palette.map( ( { slug, color } ) => [ slug, color ] )
		);
		const resolve = color => {
			const reference = /^var:preset\|color\|(.+)$/.exec( color );
			return reference ? palette[ reference[ 1 ] ] : color;
		};

		it( 'lists every palette colour as dark or light', () => {
			expect( [ ...DARK_PALETTE, ...LIGHT_PALETTE ].sort() ).toEqual( Object.keys( palette ).sort() );
		} );

		it.each( DARK_PALETTE )( 'treats %s as dark', slug => {
			expect( getGradientTone( solid( resolve( palette[ slug ] ) ) ).tone ).toBe( 'dark' );
		} );

		it.each( LIGHT_PALETTE )( 'treats %s as light', slug => {
			expect( getGradientTone( solid( resolve( palette[ slug ] ) ) ).tone ).toBe( 'light' );
		} );
	} );
} );
