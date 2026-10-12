/**
 * Keep text readable on blocks with a gradient background.
 *
 * Palette backgrounds get their text colour from a `.has-{slug}-background-color`
 * class. A gradient has no such class, so this adds `has-dark-background` or
 * `has-light-background` after checking the gradient meets WCAG AA contrast,
 * and blocks saving when it cannot.
 */
import { InspectorControls, useSettings } from '@wordpress/block-editor';
import { Notice } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { getGradientTone, resolvePresetReference } from './contrast';

const TONE_CLASSES = {
	dark: 'has-dark-background',
	light: 'has-light-background',
};

const BACKGROUND_IMAGE_REASON = 'background-image';

const getMessages = () => ( {
	contrast: __( 'No text colour meets WCAG AA contrast (4.5:1) on every colour of this gradient. Choose a gradient with colours that are all darker or all lighter. The post cannot be saved until this is fixed.', 'shiro-admin' ),
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

const withGradientContrast = createHigherOrderComponent( ( BlockEdit ) => {
	return function WithGradientContrast( props ) {
		const { attributes, clientId, setAttributes } = props;

		const presets = useSettings(
			'color.gradients.theme',
			'color.gradients.default',
			'color.gradients.custom'
		).flatMap( gradients => gradients ?? [] );

		const gradient = resolveGradient( attributes, presets );
		const { tone, reason } = gradient ? getGradientTone( gradient ) : { tone: null, reason: null };
		const hasBackgroundImage = !! attributes.style?.background?.backgroundImage;
		const blockedReason = gradient && hasBackgroundImage ? BACKGROUND_IMAGE_REASON : reason;
		const isBlocked = !! blockedReason;

		const classes = ( attributes.className ?? '' ).split( /\s+/ ).filter( Boolean );
		const nextClassName = withToneClass( classes, isBlocked ? null : tone ).join( ' ' );
		const shouldUpdateClassName = nextClassName !== classes.join( ' ' );

		useEffect( () => {
			if ( shouldUpdateClassName ) {
				setAttributes( { className: nextClassName || undefined } );
			}
		}, [ shouldUpdateClassName, nextClassName, setAttributes ] );

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
				{ isBlocked && (
					<InspectorControls group="styles">
						<Notice status="warning" isDismissible={ false }>
							{ getMessages()[ blockedReason ] }
						</Notice>
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
