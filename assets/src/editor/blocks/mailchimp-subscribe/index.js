import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import './style.scss';

import { ReactComponent as BlockIcon } from '../../../svg/blocks/mailchimp.svg';

const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph' ];
const BLOCKS_TEMPLATE = [
	[
		'core/heading',
		{
			content: __( 'Subscribe for news', 'shiro' ),
			level: 2,
		},
	],
	[
		'core/paragraph',
		{
			content: __(
				'Get the latest updates about the Wikimedia Foundation directly to your inbox.',
				'shiro'
			),
		},
	],
];

export const name = 'shiro/mailchimp-subscribe',
	settings = {
		apiVersion: 2,

		icon: BlockIcon,

		title: __( 'Mailchimp subscription form', 'shiro-admin' ),

		category: 'wikimedia',

		attributes: {
			description: {
				source: 'html',
				type: 'string',
				default: __(
					'By signing up you agree to our Privacy Policy. You may unsubscribe at any time by clicking on the provided link on any marketing message.',
					'shiro'
				),
				selector: '.mailchimp-subscribe__description',
			},
			buttonText: {
				source: 'html',
				type: 'string',
				default: __( 'Subscribe', 'shiro' ),
				selector: '.wp-block-shiro-button',
			},
			inputPlaceholder: {
				type: 'string',
				default: __( 'Enter your email', 'shiro' ),
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
			color: {
				__experimentalDefaultControls: {
					background: true,
				},
			},
		},

		/**
		 * Render mailchimp subscribe for the editor
		 */
		edit: function MailChimpSubscribeEdit( { attributes, setAttributes } ) {
			const blockProps = useBlockProps( {
				className: 'mailchimp-subscribe',
			} );
			const { description, buttonText, inputPlaceholder } = attributes;

			return (
				<>
					<aside { ...blockProps }>
						<header className="mailchimp-subscribe__header">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ BLOCKS_TEMPLATE }
								templateLock={ false }
							/>
						</header>
						<div className="mailchimp-subscribe__input-container">
							<div className="mailchimp-subscribe__column-input">
								<RichText
									allowedFormats={ [] }
									className="mailchimp-subscribe__input-field"
									tagName="div"
									value={ inputPlaceholder }
									onChange={ inputPlaceholder =>
										setAttributes( { inputPlaceholder } )
									}
								/>
							</div>
							<div className="mailchimp-subscribe__column-button">
								<RichText
									allowedFormats={ [
										'core/bold',
										'core/italic',
										'core/image',
									] }
									className="wp-block-shiro-button"
									tagName="div"
									value={ buttonText }
									onChange={ buttonText =>
										setAttributes( { buttonText } )
									}
								/>
							</div>
							<RichText
								className="has-small-font-size"
								tagName="p"
								value={ description }
								onChange={ description =>
									setAttributes( { description } )
								}
							/>
						</div>
					</aside>
				</>
			);
		},

		/**
		 * Render mailchimp subscribe for the frontend
		 */
		save: function MailChimpSubscribeSave( { attributes } ) {
			const blockProps = useBlockProps.save( {
				className: 'mailchimp-subscribe',
			} );
			const { description, buttonText } = attributes;

			return (
				<aside { ...blockProps }>
					<header className="mailchimp-subscribe__header">
						<InnerBlocks.Content />
					</header>
					<div className="mailchimp-subscribe__input-container">
						<div className="mailchimp-subscribe__column-input">
							<RawHTML>{ '<!-- input_field -->' }</RawHTML>
						</div>
						<div className="mailchimp-subscribe__column-button">
							<RichText.Content
								className="wp-block-shiro-button"
								tagName="button"
								type="submit"
								value={ buttonText }
							/>
						</div>
						<RichText.Content
							className="mailchimp-subscribe__description has-small-font-size"
							tagName="p"
							value={ description }
						/>
					</div>
				</aside>
			);
		},
	};
