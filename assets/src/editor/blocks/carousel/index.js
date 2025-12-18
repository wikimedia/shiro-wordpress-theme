import classNames from 'classnames';
import React, { ReactNode } from 'react';

import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InnerBlockSlider } from '../../components/inner-block-slider';

import metadata from './block.json';
import variations from './variations';
import deprecated from './deprecated';
import './style.scss';

// Ensure it is clear to users how to use the block by defining a template.
const GROUP_TEMPLATE = [
	[
		'core/group',
		{
			metadata: {
				name: 'Carousel Slide',
			},
		},
	],
];

const NEWS_TEMPLATE = [
	[
		'core/query',
		{
			className: 'shiro-carousel__track',
			query: {
				perPage: 6,
				pages: 0,
				offset: 0,
				postType: 'post',
				order: 'desc',
				orderBy: 'date',
			},
		},
		[
			[
				'core/post-template',
				{
					className: 'shiro-carousel__list',
					layout: {
						type: 'grid',
						columnCount: null,
						minimumColumnWidth: '18rem',
					},
					style: {
						spacing: { blockGap: 'var:preset|spacing|40' },
					},
				},
				[
					[ 'core/post-featured-image', { sizeSlug: 'medium' } ],
					[
						'core/group',
						{},
						[
							[ 'core/post-terms', { term: 'category' } ],
							[ 'core/post-title', { isLink: true, level: 4 } ],
						],
					],
				],
			],
		],
	],
];

const VIDEO_TEMPLATE = [
	[
		'core/video',
		{
			metadata: {
				name: 'Video Slide',
			},
		},
	],
	[
		'core/embed',
		{
			providerNameSlug: 'youtube',
			metadata: {
				name: 'YouTube Video Slide',
			},
		},
	],
];
const TEMPLATES = {
	'carousel-groups': GROUP_TEMPLATE,
	'carousel-news': NEWS_TEMPLATE,
	'carousel-video': VIDEO_TEMPLATE,
};

const ALLOWED_LAYOUT_BLOCKS = {
	'carousel-groups': [ 'core/group' ],
	'carousel-news': [ 'core/query' ],
	'carousel-video': [ 'core/video', 'core/embed' ],
};

registerBlockType( metadata.name, {
	...metadata,

	/**
	 * Block edit view.
	 *
	 * This block has a mix of fixed elements (rich text) and flexible content using nested "inner blocks".
	 *
	 * @param {object} props - Block props.
	 *
	 * @returns {ReactNode} Component.
	 */
	edit: function Edit( props ) {
		const { attributes, clientId, setAttributes } = props;

		const {
			title,
			perPage,
			arrows,
			pagination,
			layout,
			loop,
			autoplay,
			interval,
		} = attributes;

		// Ensure it is clear to users how to use the block by defining a template.

		const TEMPLATE = TEMPLATES[layout];

		const ALLOWED_BLOCKS = ALLOWED_LAYOUT_BLOCKS[layout];

		const blockProps = useBlockProps( {
			className: classNames( 'shiro-carousel', `shiro-layout-${layout}` ),
		} );

		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
		} );

		return (
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody
						title={__( 'Carousel settings', 'shiro-admin' )}
					>
						<TextControl
							help={__( 'Sets ARIA label', 'shiro-admin' )}
							label={__( 'Carousel name', 'shiro-admin' )}
							value={title}
							onChange={title => setAttributes( { title } )}
						/>
						<RangeControl
							disabled={layout === 'carousel-video'}
							label={__( 'Slides per page', 'shiro-admin' )}
							value={perPage}
							onChange={perPage => setAttributes( { perPage } )}
							min={1}
							max={4}
						/>
						<ToggleControl
							label={__(
								'Show navigation arrows?',
								'shiro-admin'
							)}
							checked={arrows}
							onChange={arrows => setAttributes( { arrows } )}
						/>
						<ToggleControl
							label={__(
								'Show pagination dots?',
								'shiro-admin'
							)}
							checked={pagination}
							onChange={pagination =>
								setAttributes( { pagination } )
							}
						/>
						<ToggleControl
							label={__( 'Loop carousel?', 'shiro-admin' )}
							disabled={layout === 'carousel-video'}
							checked={loop}
							onChange={loop => setAttributes( { loop } )}
						/>
						<ToggleControl
							label={__( 'Enable autoplay?', 'shiro-admin' )}
							checked={autoplay}
							onChange={autoplay =>
								setAttributes( { autoplay } )
							}
						/>
						<RangeControl
							disabled={! autoplay}
							label={__(
								'Interval between autoplaying slides',
								'shiro-admin'
							)}
							value={interval}
							onChange={interval =>
								setAttributes( { interval } )
							}
							min={0}
							max={10000}
							marks={[
								/* eslint-disable object-property-newline */
								/* eslint-disable object-curly-newline */
								{ label: '1s', value: 1000 },
								{ label: '2s', value: 2000 },
								{ label: '3s', value: 3000 },
								{ label: '4s', value: 4000 },
								{ label: '5s', value: 5000 },
								{ label: '6s', value: 6000 },
								{ label: '7s', value: 7000 },
								{ label: '8s', value: 8000 },
								{ label: '9s', value: 9000 },
								/* eslint-enable object-property-newline */
								/* eslint-enable object-curly-newline */
							]}
						/>
					</PanelBody>
				</InspectorControls>

				{layout === ('carousel-groups' || 'carousel-video') ? (
					<InnerBlockSlider
						allowedBlocks={ALLOWED_BLOCKS}
						parentBlockId={clientId}
						slidesPerPage={1}
						template={TEMPLATE}
					/>
				) : (
					<div {...innerBlocksProps} />
				)}
			</div>
		);
	},

	/**
	 * Block output.
	 *
	 * @param {object} props - Block props.
	 *
	 * @returns {ReactNode} Component.
	 */
	save: function Save( props ) {
		const { attributes } = props;

		const {
			title,
			perPage,
			arrows,
			pagination,
			layout,
			loop,
			autoplay,
			interval,
		} = attributes;

		let dataSplide = {
			label: title,
			perPage: perPage,
			arrows: arrows,
			pagination: pagination,
			type: loop ? 'loop' : 'slide',
			autoplay: autoplay,
			interval: interval,
			arrowPath:
				'M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0Zm0 8.87-1.962 1.975 7.764 7.764H8.87v2.782h16.932l-7.764 7.778L20 31.13 31.13 20 20 8.87Z',
		};

		const blockGapArr =
			attributes?.style?.spacing?.blockGap?.split( '|' ) || [];
		const blockGap = blockGapArr[blockGapArr.length - 1];

		if ( blockGap ) {
			dataSplide.gap = `var(--wp--preset--spacing--${blockGap})`;
		}

		const blockProps = useBlockProps.save( {
			className: classNames( [ 'shiro-carousel' ] ),
			'data-splide': JSON.stringify( dataSplide ),
		} );

		const innerBlocksProps = useInnerBlocksProps.save( {
			className: 'shiro-carousel__list',
		} );

		return (
			<div {...blockProps}>
				{(layout === 'carousel-groups' || layout === 'carousel-video') ? (
					<div className="shiro-carousel__track">
						<div {...innerBlocksProps} />
					</div>
				) : (
					innerBlocksProps.children
				)}
			</div>
		);
	},
	deprecated,
	variations,
} );

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
