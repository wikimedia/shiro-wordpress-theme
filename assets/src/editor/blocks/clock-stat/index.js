/**
 * Block used internally in the clock block for stats.
 */
import React from 'react';

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import wrapCharacters from '../clock/wrap-characters';

import './style.scss';

registerBlockType( metadata.name, {
	...metadata,

	/**
	 * Edit component used to manage the clock block.
	 */
	edit: function ClockBlock( { attributes, setAttributes } ) {
		const blockProps = useBlockProps( { className: 'clock-stat' } );
		const {
			label,
			stat,
		} = attributes;

		return (
			<div { ...blockProps }>
				<div className="clock-stat wp-block-columns">
					<div className="clock-stat__left-column wp-block-column">
						<RichText
							className="clock-stat__stat"
							placeholder={ 'Stat' }
							tagName="div"
							value={ stat }
							onChange={ ( value ) => setAttributes( { stat: wrapCharacters( value ) } ) }
						/>
					</div>
					<span className="clock-stat__divider">:</span>
					<div className="clock-stat__right-column wp-block-column">
						<RichText
							className="clock-stat__label"
							placeholder={ __( 'Label', 'shiro-admin' ) }
							tagName="div"
							value={ label }
							onChange={ ( label ) => setAttributes( { label } ) }
						/>
					</div>
				</div>
			</div>
		);
	},

	/**
	 * Render the frontend representation of the clock block.
	 */
	save: function Save( { attributes } ) {
		const blockProps = useBlockProps.save( { className: 'clock-stat' } );
		const {
			label,
			stat,
		} = attributes;

		return (
			<div { ...blockProps }>
				<div className="clock__contents wp-block-columns">
					<div className="clock-stat__left-column wp-block-column">
						<RichText.Content
							className="clock-stat__stat"
							tagName="div"
							value={ stat }
						/>
					</div>
					<span className="clock-stat__divider">:</span>
					<div className="clock-stat__right-column wp-block-column">
						<RichText.Content
							className="clock-stat__label"
							tagName="div"
							value={ label }
						/>
					</div>
				</div>
			</div>
		);
	},
} );

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
