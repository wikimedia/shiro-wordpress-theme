/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { Spinner } from '@wordpress/components';
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import VideoPromoInspectorControls from './inspector-controls';
import { useMediaSrc } from './shared';
import { useEffect } from 'react';

function getInnerBlocksTemplate( attributes ) {
	return [
		[
			'core/paragraph',
			{
				align: 'center',
				placeholder: __( 'Write title…' ),
				...attributes,
			},
		],
	];
}

/**
 * Is the URL a temporary blob URL? A blob URL is one that is used temporarily while
 * the media (image or video) is being uploaded and will not have an id allocated yet.
 *
 * @param {number} id  The id of the media.
 * @param {string} url The url of the media.
 *
 * @return {boolean} Is the URL a Blob URL.
 */
const isTemporaryMedia = ( id, url ) => ! id && isBlobURL( url );

function VideoPromoEdit( {
	attributes,
	clientId,
	setAttributes,
} ) {
	const {
		videoId,
		mobileVideoId,
		allowedBlocks,
		templateLock,
		tagName: TagName = 'div',
		posterId,
		mobilePosterId,
		video,
		mobileVideo,
		poster,
		mobilePoster,
		enableProgressBar
	} = attributes;

	// Fetch the attachment sources.
	const _video = useMediaSrc( videoId ) ?? '';

	const _mobileVideo = useMediaSrc( mobileVideoId ) ?? '';
	const _poster = useMediaSrc( posterId ) ?? '';
	const _mobilePoster = useMediaSrc( mobilePosterId ) ?? '';

	// Update URL attributes if they don't match the freshly fetched attachment sources.
	useEffect( () => {
		// If the media was removed, also clear the stored URL.
		if ( ! videoId && video ) {
			setAttributes( { video: '' } );
			return;
		}
		if ( videoId && _video && _video !== video ) {
			setAttributes( { video: _video } );
		}
	}, [ _video, setAttributes, videoId, video ] );

	useEffect( () => {
		// If the media was removed, also clear the stored URL.
		if ( ! mobileVideoId && mobileVideo ) {
			setAttributes( { mobileVideo: '' } );
			return;
		}
		if ( mobileVideoId && _mobileVideo && _mobileVideo !== mobileVideo ) {
			setAttributes( { mobileVideo: _mobileVideo } );
		}
	}, [ _mobileVideo, setAttributes, mobileVideoId, mobileVideo ] );

	useEffect( () => {
		// If the media was removed, also clear the stored URL.
		if ( ! posterId && poster ) {
			setAttributes( { poster: '' } );
			return;
		}
		if ( posterId && _poster && _poster !== poster ) {
			setAttributes( { poster: _poster } );
		}
	}, [ setAttributes, posterId, _poster, poster ] );

	useEffect( () => {
		// If the media was removed, also clear the stored URL.
		if ( ! mobilePosterId && mobilePoster ) {
			setAttributes( { mobilePoster: '' } );
			return;
		}
		if ( mobilePosterId && _mobilePoster && _mobilePoster !== mobilePoster ) {
			setAttributes( { mobilePoster: _mobilePoster } );
		}
	}, [ setAttributes, _mobilePoster, mobilePoster, mobilePosterId ] );

	const isUploadingMedia = isTemporaryMedia( videoId, video ) ||
		isTemporaryMedia( mobileVideoId, mobileVideo );

	const mediaStyle = {
		objectPosition: 'center center',
		width: '100%',
	};

	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlock( clientId ).innerBlocks.length >
			0,
		[ clientId ]
	);

	const blockProps = useBlockProps();

	const innerBlocksTemplate = getInnerBlocksTemplate();

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-shiro-video-promo-container__inner-container--content',
		},
		{
			// Avoid template sync when the `templateLock` value is `all` or `contentOnly`.
			// See: https://github.com/WordPress/gutenberg/pull/45632
			template: ! hasInnerBlocks ? innerBlocksTemplate : undefined,
			templateInsertUpdatesSelection: true,
			allowedBlocks,
			templateLock,
		}
	);

	const currentSettings = {
		hasInnerBlocks,
	};

	const inspectorControls = (
		<VideoPromoInspectorControls
			attributes={attributes}
			setAttributes={setAttributes}
			clientId={clientId}
		/>
	);

	const classes = clsx(
		{
			'is-transient': isUploadingMedia,
		},
		'is-position-center-center'
	);

	return (
		<>
			{inspectorControls}
			<TagName
				{...blockProps}
				className={clsx( classes, blockProps.className )}
				style={{ ...blockProps.style }}
				data-url={video}
				data-enable-progress-bar={enableProgressBar}
			>
				<div className="wp-block-shiro-video-promo-container__inner-container">
					<div {...innerBlocksProps} />
				</div>
				{video && (
					<video
						className={clsx(
							'wp-block-shiro-video-promo-container-background__desktop',
							'intrinsic-ignore',
							'is-position-center-center'
						)}
						src={video}
						poster={poster}
						style={mediaStyle}
					/>
				)}{mobileVideo && (
				<video
					className={clsx(
						'wp-block-shiro-video-promo-container-background__mobile',
						'intrinsic-ignore',
						'is-position-center-center'
					)}
					loop
					muted
					autoPlay
					src={mobileVideo}
					poster={mobilePoster}
					style={mediaStyle}
				/>
			)}

				{isUploadingMedia && <Spinner/>}
			</TagName>
		</>
	);
}

export default VideoPromoEdit;
