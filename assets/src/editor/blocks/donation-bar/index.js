/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * Block for sharing an article on Twitter, Facebook, LinkedIn, or via Email, with a Copy Link option.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
	Flex,
	FlexItem,
	SelectControl
} from '@wordpress/components';

import metadata from './block.json';

import './index.css';

const SUPPORTED_CURRENCIES = Object.entries( DONATION_FORM_CURRENCIES )
	.map( ( [ code, symbol ] ) => ( {
		label: `${code} (${symbol})`,
		value: code
	} ) );

registerBlockType( metadata.name, {
	...metadata,

	/**
	 * Edit component for managing social share settings.
	 */
	edit: function DonationFormBlock( { attributes, setAttributes } ) {
		const {
			defaultAmount,
			defaultCurrencyAmount = [],
			showAnnual,
			medium,
			campaign,
			source
		} = attributes;

		const blockProps = useBlockProps( {
			className: 'donation-portal-form',
		} );

		// Handlers for currency/amount pairs
		const updateCurrencyAmount = ( idx, field, value ) => {
			const updated = defaultCurrencyAmount.map( ( item, i ) =>
				i === idx ? { ...item, [field]: value } : item
			);
			setAttributes( { defaultCurrencyAmount: updated } );
		};

		const addCurrencyAmount = () => {
			const usedCurrencies = defaultCurrencyAmount.map( item => item.currency );
			const availableCurrencies = SUPPORTED_CURRENCIES.filter(
				(supported) => ! usedCurrencies.includes( supported.value )
			);
			setAttributes( { defaultCurrencyAmount: [ ...defaultCurrencyAmount, { currency: availableCurrencies[0].value, amount: 10 } ] } );
		};

		const removeCurrencyAmount = ( idx ) => {
			const updated = defaultCurrencyAmount.filter( ( _, i ) => i !== idx );
			setAttributes( { defaultCurrencyAmount: updated } );
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Donation Bar Settings', 'shiro' ) }>
						<TextControl
							label={ __( 'Default Donation Amount', 'shiro' ) }
							type="number"
							min="1"
							value={ defaultAmount }
							onChange={ ( value ) => setAttributes( { defaultAmount: value } ) }
						/>
						<ToggleControl
							label={ __( 'Show Annual Option', 'shiro' ) }
							checked={ showAnnual }
							onChange={ () => setAttributes( { showAnnual: ! showAnnual } ) }
						/>
						<TextControl
							label={ __( 'UTM Medium', 'shiro' ) }
							value={ medium }
							onChange={ ( value ) => setAttributes( { medium: value } ) }
						/>
						<TextControl
							label={ __( 'UTM Campaign', 'shiro' ) }
							value={ campaign }
							onChange={ ( value ) => setAttributes( { campaign: value } ) }
						/>
						<TextControl
							label={ __( 'UTM Source', 'shiro' ) }
							value={ source }
							onChange={ ( value ) => setAttributes( { source: value } ) }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Default Amounts by Currency', 'shiro' ) } initialOpen={ false }>
						{ defaultCurrencyAmount.map( ( item, idx ) => {
							const usedCurrencies = defaultCurrencyAmount
								.filter( ( _, i ) => i !== idx )
								.map( ( entry ) => entry.currency );
							const availableCurrencies = SUPPORTED_CURRENCIES.filter(
								(opt) => ! usedCurrencies.includes( opt.value ) || opt.value === item.currency
							);
							return (
								<Flex key={ idx } align="center" style={ { marginBottom: 8 } }>
									<FlexItem>
										<SelectControl
											label={ idx === 0 ? __( 'Currency', 'shiro' ) : '' }
											value={ item.currency }
											options={ availableCurrencies }
											onChange={ ( value ) => updateCurrencyAmount( idx, 'currency', value ) }
											style={ { width: 120 } }
										/>
									</FlexItem>
									<FlexItem>
										<TextControl
											label={ idx === 0 ? __( 'Amount', 'shiro' ) : '' }
											type="number"
											min="1"
											value={ item.amount }
											onChange={ ( value ) => updateCurrencyAmount( idx, 'amount', Number( value ) ) }
											placeholder="10"
											style={ { width: 80 } }
										/>
									</FlexItem>
									<FlexItem>
										<Button
											isDestructive
											icon="no-alt"
											label={ __( 'Remove', 'shiro' ) }
											onClick={ () => removeCurrencyAmount( idx ) }
										/>
									</FlexItem>
								</Flex>
							);
						} ) }
						<Button
							variant="secondary"
							onClick={ addCurrencyAmount }
							disabled={ defaultCurrencyAmount.length >= SUPPORTED_CURRENCIES.length }
						>
							{ __( 'Add Currency Amount', 'shiro' ) }
						</Button>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<ServerSideRender
						block={ metadata.name }
						attributes={ attributes }
					/>
				</div>
			</>
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
