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
		videoUrl,
		mobileVideoUrl,
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
			{ videoUrl && ( <video
				className={ clsx(
					'wp-block-shiro-video-promo-container-background__desktop',
					'intrinsic-ignore',
					'is-position-center-center'
				) }
				src={ videoUrl }
				poster={ poster }
				data-object-fit="cover"
			/> ) }{ mobileVideoUrl && ( <video
				className={ clsx(
					'wp-block-shiro-video-promo-container-background__mobile',
					'intrinsic-ignore',
					'is-position-center-center'
				) }
				src={ mobileVideoUrl }
				poster={ mobilePoster }
				data-object-fit="cover"
			/> ) }
		</Tag>
	);
};

export default Save;
