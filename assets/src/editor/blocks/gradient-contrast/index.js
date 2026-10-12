/**
 * Keep text readable on blocks with a gradient background.
 *
 * Palette backgrounds get their text colour from a `.has-{slug}-background-color`
 * class. A gradient has no such class, so this adds `has-dark-background` or
 * `has-light-background` after checking the gradient meets WCAG AA contrast.
 * A text colour set on the block wins: no tone class is added, and that colour
 * is checked against the gradient instead. Low contrast only warns. Gradients
 * whose contrast cannot be checked block saving.
 */
import { InspectorControls, useSettings } from '@wordpress/block-editor';
import { Notice } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { dispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { getGradientTone, resolvePresetReference, textMeetsContrast } from './contrast';

const TONE_CLASSES = {
	dark: 'has-dark-background',
	light: 'has-light-background',
};

const BACKGROUND_IMAGE_REASON = 'background-image';

const getMessages = () => ( {
	contrast: __( 'The text on this gradient may not meet accessibility contrast (WCAG AA). Choose another gradient or text colour.', 'shiro-admin' ),
	transparent: __( 'This gradient has a transparent colour stop, so text contrast cannot be checked. Use fully opaque colours. The post cannot be saved until this is fixed.', 'shiro-admin' ),
	[ BACKGROUND_IMAGE_REASON ]: __( 'A gradient cannot be combined with a background image, because text contrast cannot be checked. Remove one of them. The post cannot be saved until this is fixed.', 'shiro-admin' ),
	unreadable: __( 'The editor cannot read a colour in this gradient, such as a CSS variable or color-mix(). Use hex, rgb() or hsl() colours. The post cannot be saved until this is fixed.', 'shiro-admin' ),
} );

/**
 * Get the CSS of the gradient set on a block.
 *
 * @param {Object}   attributes Block attributes.
 * @param {object[]} presets    Gradient presets from the block editor settings.
 * @return {string|undefined} CSS gradient, or undefined when the block has none.
 */
const resolveGradient = ( attributes, presets ) => {
	const { gradient, style } = attributes;
	const value = gradient || style?.color?.gradient || style?.background?.gradient;

	// An unknown slug is returned as it is, which counts as unreadable.
	return value && resolvePresetReference( value, presets );
};

/**
 * Get the CSS of the text colour set on a block.
 *
 * @param {Object}   attributes Block attributes.
 * @param {object[]} palette    Colour palette from the block editor settings.
 * @return {string|undefined} Colour, or undefined when the block has none. An unknown
 *     slug is returned as it is, which counts as unreadable.
 */
const resolveTextColor = ( attributes, palette ) => {
	const value = attributes.textColor || attributes.style?.color?.text;
	const slug = value?.replace( /^var:preset\|color\|/, '' );

	return palette.find( color => color.slug === slug )?.color ?? value;
};

/**
 * Get the class list with the tone class this block should have.
 *
 * Other classes keep their order, so editing the additional CSS classes field
 * does not reshuffle what the editor is typing.
 *
 * @param {string[]}    classes Current classes.
 * @param {string|null} tone    "dark", "light" or null for none.
 * @return {string[]} Classes with only the wanted tone class.
 */
const withToneClass = ( classes, tone ) => {
	const wanted = TONE_CLASSES[ tone ];
	const next = classes.filter( name => name === wanted || ! Object.values( TONE_CLASSES ).includes( name ) );

	if ( wanted && ! next.includes( wanted ) ) {
		next.push( wanted );
	}

	return next;
};

/**
 * Show a contrast message inside the Background panel.
 *
 * Both the colour and the background gradient pickers live in that panel, which
 * can sit below the fold, so the notice scrolls itself into view.
 *
 * @param {Object} props          Component props.
 * @param {string} props.children Message text.
 */
const ContrastNotice = ( { children } ) => {
	const ref = useRef();

	// Wait a frame so the panel's own controls render above the notice first.
	useEffect( () => {
		const frame = requestAnimationFrame( () => ref.current?.scrollIntoView( { block: 'nearest' } ) );

		return () => cancelAnimationFrame( frame );
	}, [] );

	return (
		<div ref={ ref } style={ { gridColumn: '1 / -1', marginTop: 16, scrollMarginBottom: 16 } }>
			<Notice status="warning" isDismissible={ false }>{ children }</Notice>
		</div>
	);
};

const withGradientContrast = createHigherOrderComponent( ( BlockEdit ) => {
	return function WithGradientContrast( props ) {
		const { attributes, clientId, setAttributes } = props;

		const presets = useSettings(
			'color.gradients.theme',
			'color.gradients.default',
			'color.gradients.custom'
		).flatMap( gradients => gradients ?? [] );

		const palette = useSettings(
			'color.palette.theme',
			'color.palette.default',
			'color.palette.custom'
		).flatMap( colors => colors ?? [] );

		const gradient = resolveGradient( attributes, presets );
		const textColor = resolveTextColor( attributes, palette );
		const { tone, reason } = gradient ? getGradientTone( gradient ) : { tone: null, reason: null };
		const hasBackgroundImage = !! attributes.style?.background?.backgroundImage;
		const problem = gradient && hasBackgroundImage ? BACKGROUND_IMAGE_REASON : reason;
		// Low contrast only warns. Every other problem blocks saving.
		const isBlocked = !! problem && problem !== 'contrast';
		const hasLowContrast = !! gradient && ! isBlocked && (
			textColor ? ! textMeetsContrast( gradient, textColor ) : problem === 'contrast'
		);
		const noticeReason = hasLowContrast ? 'contrast' : isBlocked && problem;

		const classes = ( attributes.className ?? '' ).split( /\s+/ ).filter( Boolean );
		const nextClassName = withToneClass( classes, isBlocked || textColor ? null : tone ).join( ' ' );
		const shouldUpdateClassName = nextClassName !== classes.join( ' ' );

		useEffect( () => {
			if ( shouldUpdateClassName ) {
				setAttributes( { className: nextClassName || undefined } );
			}
		}, [ shouldUpdateClassName, nextClassName, setAttributes ] );

		const hasBackgroundColor = !! ( attributes.backgroundColor || attributes.style?.color?.background );

		useEffect( () => {
			// Gradients must be opaque, so a colour under one is never visible and its palette class would override the tone class.
			if ( ! gradient || ! hasBackgroundColor ) {
				return;
			}

			const { background, ...color } = attributes.style?.color ?? {};
			const { color: ignored, ...style } = attributes.style ?? {};

			if ( Object.keys( color ).length ) {
				style.color = color;
			}

			setAttributes( {
				backgroundColor: undefined,
				style: Object.keys( style ).length ? style : undefined,
			} );
		}, [ gradient, hasBackgroundColor ] ); // eslint-disable-line react-hooks/exhaustive-deps

		useEffect( () => {
			if ( ! isBlocked ) {
				return undefined;
			}

			const lock = `shiro-gradient-contrast-${ clientId }`;

			dispatch( 'core/editor' )?.lockPostSaving( lock );

			return () => dispatch( 'core/editor' )?.unlockPostSaving( lock );
		}, [ isBlocked, clientId ] );

		return (
			<>
				<BlockEdit { ...props } />
				{ noticeReason && (
					<InspectorControls group="background">
						<ContrastNotice>{ getMessages()[ noticeReason ] }</ContrastNotice>
					</InspectorControls>
				) }
			</>
		);
	};
}, 'withGradientContrast' );

export const filters = [
	{
		hook: 'editor.BlockEdit',
		namespace: 'shiro/gradient-contrast',
		callback: withGradientContrast,
	},
];
