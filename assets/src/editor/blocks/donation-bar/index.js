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

const supportedCurrencies = [
	{ label: 'USD ($)', value: 'USD' },
	{ label: 'CAD (CA$)', value: 'CAD' },
	{ label: 'AUD (A$)', value: 'AUD' },
	{ label: 'NZD (NZ$)', value: 'NZD' },
	{ label: 'GBP (£)', value: 'GBP' },
	{ label: 'EUR (€)', value: 'EUR' },
	{ label: 'AED (د.إ)', value: 'AED' },
	{ label: 'ANG (ƒ)', value: 'ANG' },
	{ label: 'ARS ($)', value: 'ARS' },
	{ label: 'AOA (Kz)', value: 'AOA' },
	{ label: 'BBD (Bds$)', value: 'BBD' },
	{ label: 'BDT (৳)', value: 'BDT' },
	{ label: 'BGN (лв)', value: 'BGN' },
	{ label: 'BHD (.د.ب)', value: 'BHD' },
	{ label: 'BMD ($)', value: 'BMD' },
	{ label: 'BOB (Bs.)', value: 'BOB' },
	{ label: 'BRL (R$)', value: 'BRL' },
	{ label: 'BZD (BZ$)', value: 'BZD' },
	{ label: 'CHF (Fr.)', value: 'CHF' },
	{ label: 'CLP ($)', value: 'CLP' },
	{ label: 'CNY (¥)', value: 'CNY' },
	{ label: 'COP ($)', value: 'COP' },
	{ label: 'CRC (₡)', value: 'CRC' },
	{ label: 'CZK (Kč)', value: 'CZK' },
	{ label: 'DKK (kr)', value: 'DKK' },
	{ label: 'DOP (RD$)', value: 'DOP' },
	{ label: 'DZD (دج)', value: 'DZD' },
	{ label: 'EGP (£)', value: 'EGP' },
	{ label: 'FJD (FJ$)', value: 'FJD' },
	{ label: 'GHS (₵)', value: 'GHS' },
	{ label: 'GTQ (Q)', value: 'GTQ' },
	{ label: 'HKD (HK$)', value: 'HKD' },
	{ label: 'HNL (L)', value: 'HNL' },
	{ label: 'HUF (Ft)', value: 'HUF' },
	{ label: 'IDR (Rp)', value: 'IDR' },
	{ label: 'ILS (₪)', value: 'ILS' },
	{ label: 'INR (₹)', value: 'INR' },
	{ label: 'JMD (J$)', value: 'JMD' },
	{ label: 'JOD (JD)', value: 'JOD' },
	{ label: 'JPY (¥)', value: 'JPY' },
	{ label: 'KES (KSh)', value: 'KES' },
	{ label: 'KHR (៛)', value: 'KHR' },
	{ label: 'KRW (₩)', value: 'KRW' },
	{ label: 'KWD (د.ك)', value: 'KWD' },
	{ label: 'KZT (₸)', value: 'KZT' },
	{ label: 'LBP (ل.ل)', value: 'LBP' },
	{ label: 'LKR (Rs)', value: 'LKR' },
	{ label: 'MAD (د.م.)', value: 'MAD' },
	{ label: 'MKD (ден)', value: 'MKD' },
	{ label: 'MXN ($)', value: 'MXN' },
	{ label: 'MYR (RM)', value: 'MYR' },
	{ label: 'MVR (Rf)', value: 'MVR' },
	{ label: 'NOK (kr)', value: 'NOK' },
	{ label: 'NPR (₨)', value: 'NPR' },
	{ label: 'OMR (ر.ع.)', value: 'OMR' },
	{ label: 'PAB (B/.)', value: 'PAB' },
	{ label: 'PEN (S/)', value: 'PEN' },
	{ label: 'PGK (K)', value: 'PGK' },
	{ label: 'PHP (₱)', value: 'PHP' },
	{ label: 'PKR (₨)', value: 'PKR' },
	{ label: 'PLN (zł)', value: 'PLN' },
	{ label: 'QAR (ر.ق)', value: 'QAR' },
	{ label: 'RON (lei)', value: 'RON' },
	{ label: 'RUB (₽)', value: 'RUB' },
	{ label: 'SAR (ر.س)', value: 'SAR' },
	{ label: 'SEK (kr)', value: 'SEK' },
	{ label: 'SGD (S$)', value: 'SGD' },
	{ label: 'THB (฿)', value: 'THB' },
	{ label: 'TRY (₺)', value: 'TRY' },
	{ label: 'TTD (TT$)', value: 'TTD' },
	{ label: 'TWD (NT$)', value: 'TWD' },
	{ label: 'UAH (₴)', value: 'UAH' },
	{ label: 'UYU ($U)', value: 'UYU' },
	{ label: 'UZS (soʻm)', value: 'UZS' },
	{ label: 'VND (₫)', value: 'VND' },
	{ label: 'XCD (EC$)', value: 'XCD' },
	{ label: 'ZAR (R)', value: 'ZAR' },
];

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
			const availableCurrencies = supportedCurrencies.filter(
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
							const availableCurrencies = supportedCurrencies.filter(
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
							disabled={ defaultCurrencyAmount.length >= supportedCurrencies.length }
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

	/**
	 * Save the share article block, it's a dynamic block.
	 */
	save: function Save( { attributes } ) {
		return null;
	},
} );

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
