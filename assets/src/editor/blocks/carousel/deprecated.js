/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import classNames from "classnames";

/**
 * Internal dependencies
 */
import metadata from './block.json';


console.log( '🚀 Carousel deprecated.js is loading!' );

// Before classname changes
const v1 = {
	attributes: metadata.attributes,
	supports: metadata.supports,
	save: ( { attributes } ) => {
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
};
const deprecated = [
	v1
];

export default deprecated;
