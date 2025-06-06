/**
 * Clock block that provides statistics and a count down/up timer.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText, InnerBlocks } from '@wordpress/block-editor';
import { DateTimePicker, PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import initializeClock from './view';
import './style.scss';

const displayOptions = [
	{
		value: 'd-nolabel',
		label: 'Days (No Label)',
	},
	{
		value: 'd',
		label: 'Days',
	},
	{
		value: 'dh',
		label: 'Days Hours',
	},
	{
		value: 'dhm',
		label: 'Days Hours Minutes',
	},
	{
		value: 'dhms',
		label: 'Days Hours Minutes Seconds',
	},
];

registerBlockType( metadata.name, {
	...metadata,

	/**
	 * Edit component used to manage the clock block.
	 */
	edit: function ClockBlock( { attributes, setAttributes } ) {
		const blockProps = useBlockProps( { className: 'clock' } );
		const {
			countTitle,
			date,
			disclaimer,
			display,
			displayPadding,
			stopAtTime,
			title,
		} = attributes;

		const ALLOWED_BLOCKS = [
			'core/paragraph',
			'shiro/clock-stat',
		];

		const labeledCounter = ( display !== 'd-nolabel' );

		// Setup or re-initialize the counter.
		useEffect( initializeClock, [ date, stopAtTime, display, displayPadding ] );

		return (
			<div { ...blockProps }>
				<RichText
					className="clock__title is-style-h2"
					placeholder={ __( 'Title of the clock', 'shiro-admin' ) }
					tagName="h2"
					value={ title }
					onChange={ ( title ) => setAttributes( { title } ) }
				/>
				<div
					className="clock__contents"
					data-clock={ date }
					data-display={ display }
					data-displaypadding={ displayPadding }
					data-stop={ stopAtTime ?? false }
				>
					{ labeledCounter
						? (
							<div className="clock__contents__count">
								<div className="clock__contents__count-count has-label">
								</div>
							</div>
						)
						: (
							<div className="clock__contents__count wp-block-columns">
								<div className="clock__contents__count-left-column wp-block-column">
									<div className="clock__contents__count-count">
										{ wrappedPlaceholder( displayPadding ) }
									</div>
								</div>
								<span className="clock__contents__count-divider">:</span>
								<div className="clock__contents__count-right-column wp-block-column">
									<RichText
										className="clock__contents__count-label"
										placeholder={ __( 'Label for Counter', 'shiro-admin' ) }
										tagName="div"
										value={ countTitle }
										onChange={ ( countTitle ) => setAttributes( { countTitle } ) }
									/>
								</div>
							</div>
						) }
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
					<RichText
						className="clock__contents__disclaimer"
						placeholder={ __( 'Disclaimers', 'shiro-admin' ) }
						tagName="div"
						value={ disclaimer }
						onChange={ ( disclaimer ) => setAttributes( { disclaimer } ) }
					/>
				</div>
				<InspectorControls>
					<PanelBody initialOpen title={ __( 'Clock settings', 'shiro-admin' ) }>
						<p>{ __( 'Chose the date and time to count up/down to:', 'shiro-admin' ) }</p>
						<DateTimePicker
							__nextRemoveHelpButton
							__nextRemoveResetButton
							currentDate={ date }
							is12Hour={ false }
							onChange={ ( date ) => setAttributes( { date } ) }
						/>
						<ToggleControl
							checked={ stopAtTime }
							label={ __( 'Stop clock at the time above', 'shiro-admin' ) }
							onChange={ ( stopAtTime ) => setAttributes( { stopAtTime } ) }
						/>
						<SelectControl
							help={ __( 'Units to display in clock', 'shiro-admin' ) }
							label={ __( 'Clock Display', 'shiro' ) }
							options={ displayOptions }
							value={ display }
							onChange={ ( display ) => setAttributes( { display } ) }
						/>
						<TextControl
							help={ __( 'Minimum values before a unit. Minimum 0 and Maximum 5', 'shiro-admin' ) }
							label={ __( 'Minimum length of display', 'shiro-admin' ) }
							value={ displayPadding }
							onChange={ ( displayPadding ) => {
								let padding = ( displayPadding ) ? parseInt( displayPadding ) : 0;
								if ( padding > 5 || padding < 0 ) {
									padding = 0;
								}
								setAttributes( { displayPadding: padding.toString() } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</div>
		);
	},

	/**
	 * Render the frontend representation of the clock block.
	 */
	save: function Save( { attributes } ) {
		const blockProps = useBlockProps.save( { className: 'clock' } );
		const {
			countTitle,
			date,
			disclaimer,
			display,
			displayPadding,
			stopAtTime,
			title,
		} = attributes;

		const labeledCounter = ( display !== 'd-nolabel' );

		return (
			<div { ...blockProps }>
				<RichText.Content
					className="clock__title is-style-h3"
					tagName="h2"
					value={ title }
				/>
				<div
					className="clock__contents"
					data-clock={ date }
					data-display={ display }
					data-displaypadding={ displayPadding }
					data-stop={ stopAtTime }
				>
					{ labeledCounter ? (
						<div className="clock__contents__count">
							<div className="clock__contents__count-count has-label">
							</div>
						</div>
					) : (
						<div className="clock__contents__count wp-block-columns">
							<div className="clock__contents__count-left-column wp-block-column">
								<div className="clock__contents__count-count">
									{ wrappedPlaceholder( displayPadding ) }
								</div>
							</div>
							<span className="clock__contents__count-divider">:</span>
							<div className="clock__contents__count-right-column wp-block-column">
								<RichText.Content
									className="clock__contents__count-label"
									tagName="div"
									value={ countTitle }
								/>
							</div>
						</div>
					) }
					<InnerBlocks.Content />
				</div>
				{ disclaimer && (
					<RichText.Content
						className="clock__contents__disclaimer"
						tagName="div"
						value={ disclaimer }
					/>
				) }
			</div>
		);
	},
} );

/**
 * Create a placeholder value that is wrapped in span.
 *
 * @param {number} padding Number of characters to pad.
 */
const wrappedPlaceholder = ( padding ) => {
	const days = '0'.padStart( padding, '0' );

	let daysArray = days.split( '' );
	daysArray = daysArray.map( ( placeholder, idx ) => (
		<span key={ placeholder }>{ placeholder }</span>
	) );

	return daysArray;
};

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
