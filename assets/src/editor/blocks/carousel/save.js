import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Block output.
 *
 * @param {object} props - Block props.
 *
 * @returns {ReactNode} Component.
 */
function Save( props ) {
	const { attributes } = props;

	const { title, navPosition, showCounter, showThumbnails, isMobileFullWidth } = attributes;

	const blockProps = useBlockProps.save( {
		className: classNames( [
			'shiro-carousel',
			`shiro-carousel--nav-position-${ navPosition }`,
			{
				'shiro-carousel--show-numbers': showCounter,
				'shiro-carousel--show-thumbnails': showThumbnails,
				'shiro-carousel--mobile-full-width': isMobileFullWidth,
			},
		] ),
		'data-label': title,
		'data-show-numbers': showCounter ? 'true' : 'false',
		'data-show-thumbnails': showThumbnails ? 'true' : 'false',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'shiro-carousel__list',
	} );

	return (
		<div { ...blockProps }>
			<div className='shiro-carousel__track'>
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}

export default Save;
