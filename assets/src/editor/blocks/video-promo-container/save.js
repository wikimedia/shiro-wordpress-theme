/**
 * External dependencies
 */
import clsx from 'clsx';

import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { ReactNode } from 'react';

/**
 * Saves the block content for display on the frontend.
 *
 * @param {object} props Props
 * @param {object} props.attributes Attributes.
 * @returns {ReactNode} Formatted block.
 */
const Save = ( { attributes } ) => {
	const {
		tagName: Tag,
		video,
		mobileVideo,
		poster,
		mobilePoster,
		enableProgressBar,
	} = attributes;

	return (
		<Tag { ...useBlockProps.save() } data-enable-progress-bar={ enableProgressBar }>
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
};

export default Save;
