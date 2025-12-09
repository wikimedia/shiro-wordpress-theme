/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from './block.json';

const deprecated = [
	{
		attributes: metadata.attributes,
		supports: metadata.supports,
		save: ( { attributes } ) => {
			const {
				tagName: Tag,
				video,
				mobileVideo,
				poster,
				mobilePoster,
			} = attributes;

			return (
				<Tag { ...useBlockProps.save() }>
					<div className="wp-block-shiro-video-promo-container__inner-container">
						<div
							{ ...useInnerBlocksProps.save( {
								className: 'wp-block-shiro-video-promo-container__inner-container--content',
							} ) }
						/>
					</div>
					{ video && ( <video
						className={ clsx(
							'wp-block-shiro-video-promo-container-background__desktop',
							'intrinsic-ignore',
							'is-position-center-center'
						) }
						src={ video }
						poster={ poster }
					/> ) }{ mobileVideo && ( <video
						className={ clsx(
							'wp-block-shiro-video-promo-container-background__mobile',
							'intrinsic-ignore',
							'is-position-center-center'
						) }
						src={ mobileVideo }
						poster={ mobilePoster }
					/> ) }
				</Tag>
			);
		},
	},
];

export default deprecated;
