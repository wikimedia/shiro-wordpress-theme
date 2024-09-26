/**
 * Editor control for setting the hero block on landing pages.
 */

/**
 * WordPress dependencies
 */
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { SelectControl, Panel, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Cta from '../../components/cta';
import ImageFilter, { DEFAULT_IMAGE_FILTER } from '../../components/image-filter';
import ImagePicker from '../../components/image-picker';
import blockStyles, { applyDefaultStyle } from '../../helpers/block-styles';
import './style.scss';

export const name = 'shiro/landing-page-hero';

export const styles = blockStyles;

export const settings = {
	apiVersion: 2,

	title: __( 'Landing page hero', 'shiro-admin' ),

	category: 'wikimedia',

	icon: 'superhero',

	description: __(
		'A hero image and text to be used on "subsite" landing pages',
		'shiro-admin'
	),

	example: {
		attributes: {
			kicker: __( 'Our Work', 'shiro-admin' ),
			title: __( 'We help everyone share in the sum of all knowledge', 'shiro-admin' ),
			description: __( 'People all over the world ask their voice-activated devices all sorts of questions, and search engines query Wikipedia knowledge to provide them with answers. That is why we are looking to co-create a sound logo that will be played each time a person is served an answer to a question that was responded with Wikimedia projects.', 'shiro-admin' ),
			pageIntro: __( 'We are the people who keep knowledge free. There is an amazing community of people around the world that makes great projects like Wikipedia. We help them do that work. We take care of the technical infrastructure, the legal challenges, and the growing pains.', 'shiro-admin' ),
			imageUrl: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg',
			buttonText: 'Learn More',
			buttonLink: 'https://wikimediafoundation.org/',
			ctaButtonAdditionalStyle: '',
			ctaOpenInNewTab: false,
		},
	},

	supports: {
		inserter: true,
		multiple: false,
		reusable: false,
	},

	attributes: {
		kicker: {
			type: 'string',
			source: 'html',
			selector: '.hero__kicker',
		},
		title: {
			type: 'string',
			source: 'html',
			selector: '.hero__title',
		},
		imageId: {
			type: 'integer',
		},
		imageUrl: {
			type: 'string',
			source: 'attribute',
			selector: '.hero__image',
			attribute: 'src',
		},
		imageFilter: {
			type: 'string',
			default: DEFAULT_IMAGE_FILTER,
		},
		buttonText: {
			type: 'string',
			source: 'html',
			selector: '.hero__call-to-action',
		},
		buttonLink: {
			type: 'string',
			source: 'attribute',
			selector: '.hero__call-to-action',
			attribute: 'href',
		},
		pageIntro: {
			type: 'string',
			source: 'html',
			selector: '.hero__intro',
		},
		description: {
			type: 'string',
			source: 'html',
			selector: '.hero__description',
		},
		ctaButtonAdditionalStyle: {
			type: 'string',
			default: '',
		},
		ctaOpenInNewTab: {
			type: 'boolean',
			default: false,
		},
	},

	/**
	 * Edit component used to manage featured image and page intro.
	 */
	edit: function Edit( { attributes, setAttributes } ) {
		const {
			kicker,
			title,
			imageId,
			imageUrl,
			buttonText,
			buttonLink,
			description,
			pageIntro,
			imageFilter,
			ctaButtonAdditionalStyle,
			ctaOpenInNewTab = false,
		} = attributes;

		const blockProps = useBlockProps( { className: 'hero' } );
		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'hero__intro' },
			{
				allowedBlocks: [ 'core/paragraph' ],
				template: [
					[
						'core/paragraph',
						{
							fontSize: 'large',
							placeholder: __( 'Introductory paragraph - some information about this page to guide the reader.', 'shiro-admin' ),
						},
					],
				],
			}
		);

		return (
			<div { ...applyDefaultStyle( blockProps ) } >
				<InspectorControls key="setting">
					<Panel>
						<PanelBody
							title={ __( 'Custom CTA styling', 'shiro-admin' ) }
							initialOpen
						>
							<SelectControl
								label={ __( 'Button style', 'shiro-admin' ) }
								value={ ctaButtonAdditionalStyle }
								options={ [
									{
										label: __( 'Theme default', 'shiro-admin' ),
										value: '',
									},
									{
										label: __( 'Gray background / Black info icon', 'shiro-admin' ),
										value: 'hero__cta-button--info-icon-gray-background',
									},
									{
										label: __( 'Transparent background / Black info icon', 'shiro-admin' ),
										value: 'hero__cta-button--info-icon-no-background',
									},
									{
										label: __( 'Gray background / Black down triangle icon', 'shiro-admin' ),
										value: 'hero__cta-button--expand-icon-gray-background',
									},
								] }
								onChange={ ( value ) => setAttributes( { ctaButtonAdditionalStyle: value } ) }
							/>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<header className="hero__header">
					<div className="hero__text-column">
						<RichText
							className="hero__kicker"
							placeholder={ __( 'Kicker', 'shiro-admin' ) }
							tagName="small"
							value={ kicker }
							onChange={ ( kicker ) => setAttributes( { kicker } ) }
						/>
						<RichText
							className="hero__title"
							placeholder={ __( 'Title for the page', 'shiro-admin' ) }
							tagName="h1"
							value={ title }
							onChange={ ( title ) => setAttributes( { title } ) }
						/>
						<RichText
							className="hero__description"
							placeholder={ __( 'Description text - some additional information on the hero header.', 'shiro-admin' ) }
							tagName="p"
							value={ description }
							onChange={ ( description ) => setAttributes( { description } ) }
						/>
						<Cta
							className={ `hero__call-to-action ${ ctaButtonAdditionalStyle }` }
							text={ buttonText }
							url={ buttonLink }
							openInNewTab={ ctaOpenInNewTab }
							onChangeLink={ ( buttonLink ) => setAttributes( { buttonLink } ) }
							onChangeText={ ( buttonText ) => setAttributes( { buttonText } ) }
							onChangeOpenInNewTab={ ( ctaOpenInNewTab ) => setAttributes( { ctaOpenInNewTab } ) }
						/>
					</div>
					<ImageFilter
						className="hero__image-container"
						value={ imageFilter }
						onChange={ ( imageFilter ) => setAttributes( { imageFilter } ) }
					>
						<ImagePicker
							className="hero__image"
							id={ imageId }
							imageSize="image_16x9_large"
							src={ imageUrl }
							onChange={
								( { id: imageId, src: imageUrl } ) => {
									setAttributes( {
										imageId,
										imageUrl,
									} );
								}
							}
						/>
					</ImageFilter>
				</header>
				<div { ...innerBlocksProps } />
			</div>
		);

	},

	/**
	 * Save markup for the hero block.
	 */
	save: function Save( { attributes, className } ) {
		const {
			kicker,
			title,
			imageUrl,
			buttonText,
			buttonLink,
			description,
			imageFilter,
			ctaButtonAdditionalStyle,
			ctaOpenInNewTab,
		} = attributes;

		const blockProps = useBlockProps.save( { className: 'hero' } );
		const innerBlocksProps = useInnerBlocksProps.save( { className: 'hero__intro' } );

		return (
			<div { ...applyDefaultStyle( blockProps ) }>
				<header className="hero__header">
					<div className="hero__text-column">
						<RichText.Content
							className="hero__kicker"
							tagName="small"
							value={ kicker }
						/>
						<RichText.Content
							className="hero__title"
							tagName="h1"
							value={ title }
						/>
						{ description && (
							<RichText.Content
								className="hero__description"
								tagName="div"
								value={ description }
							/>
						) }
						{ buttonLink && (
							<Cta.Content
								className={ ` hero__call-to-action ${ ctaButtonAdditionalStyle }` }
								url={ buttonLink }
								openInNewTab={ ctaOpenInNewTab }
								text={ buttonText }
							/>
						) }
					</div>
					<ImageFilter.Content
						className="hero__image-container"
						value={ imageFilter }>
						<img
							alt=""
							className="hero__image"
							src={ imageUrl }
						/>
					</ImageFilter.Content>
				</header>
				<div { ...innerBlocksProps } />
			</div>
		);
	},
};
