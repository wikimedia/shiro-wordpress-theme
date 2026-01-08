import { __ } from '@wordpress/i18n';

/**
 * Updates the position of the ambient controls relative to the video element.
 *
 * The function calculates the position of the ambient controls based on the width of the
 * contained video and its parent's container size. If the video has ended, the position
 * is reset. If the video is not available, the function exits early.
 */
const updateAmbientControlsPosition = ( video, ambientControls ) => {
	if ( ! video ) {
		return;
	}

	// Reset position if video has ended
	if ( video.ended ) {
		ambientControls.style.removeProperty( 'right' );
		ambientControls.style.removeProperty( 'bottom' );
		return;
	}

	const { width, height } = getContainedVideoSize( video );
	const containerRect = video.parentElement.getBoundingClientRect();

	// Calculate the offset to center the video within its container
	const leftOffset = (containerRect.width - video.clientWidth) / 2;
	const bottomOffset = (containerRect.height - video.clientHeight) / 2;

	ambientControls.style.right = `${leftOffset}px`;
	ambientControls.style.bottom = `${bottomOffset}px`;
};

/**
 * Calculates the dimensions of a video element that is fully contained
 * within its parent container while maintaining the video's aspect ratio.
 *
 * This function determines the appropriate width and height for the video
 * element to ensure that it fits within the bounds of its parent's dimensions
 * without distortion.
 *
 * @param {HTMLVideoElement} video - The video element for which the contained size is determined.
 *                                   It should be a valid HTML video element.
 * @returns {{width: number, height: number}} An object containing the calculated width and height
 *                                            of the video element that fits fully within its parent.
 */
const getContainedVideoSize = video => {
	const { videoWidth, videoHeight } = video;
	const { width: cw, height: ch } = video.parentElement.getBoundingClientRect();

	const videoAspect = videoWidth / videoHeight;
	const containerAspect = cw / ch;

	if ( videoAspect > containerAspect ) {
		return { width: cw, height: cw / videoAspect };
	} else {
		return { width: ch * videoAspect, height: ch };
	}
};


const shouldShowPlayIcon = video => {
	if ( ! (video instanceof HTMLVideoElement) ) {
		return false;
	}

	const isPlaying = ! video.paused && ! video.ended && video.readyState > 2;

	// Return true when we should show the play icon.
	return ! isPlaying;
};

const initialiseVideo = videoWrapper => {
	// Don't reprocess the same videos.
	if ( Array.from( videoWrapper.children ).some(
		el => el.classList.contains( 'video-ambient-controls' )
	) ) {
		return;
	}

	const iframe = videoWrapper.querySelector( 'iframe' );

	let videoSelector = 'video';

	// If this is the Promo block, there will be 2 videos, figure out which one to use.
	if ( videoWrapper.classList.contains( 'wp-block-shiro-video-promo-container' ) ) {
		// Do we want the mobile or the desktop version?
		videoSelector = '.wp-block-shiro-video-promo-container-background__desktop';
		if ( window.matchMedia( '(max-width: 700px)' ).matches ) {
			videoSelector = '.wp-block-shiro-video-promo-container-background__mobile';
		}
	}

	const video = videoWrapper.querySelector( videoSelector );

	if ( ! (video || iframe) ) {
		return;
	}

	const showPlayIcon = (video && shouldShowPlayIcon( video )) ||
		(iframe && (! iframe.src.includes( 'autoPlay=1' )));

	const promo_play_block = videoWrapper.querySelector( '.wp-block-shiro-video-promo-play' );

	const ambientControls = document.createElement( 'button' );
	ambientControls.classList.add( 'video-ambient-controls' );

	videoWrapper.appendChild( ambientControls );

	// Initial position update
	updateAmbientControlsPosition( video, ambientControls );

	const pauseText = __( 'Pause video', 'shiro-admin' );
	const playText = __( 'Play video', 'shiro-admin' );

	const showPlayButton = () => {
		ambientControls.setAttribute( 'aria-label', playText );
		ambientControls.classList.remove( 'pause' );
		videoWrapper.classList.remove( 'ambient-video-pause' );

		if ( ! ambientControls.classList.contains( 'play' ) ) {
			ambientControls.classList.add( 'play' );
			videoWrapper.classList.add( 'ambient-video-play' );
		}
	};

	const showPauseButton = () => {
		ambientControls.setAttribute( 'aria-label', pauseText );
		ambientControls.classList.remove( 'play' );
		videoWrapper.classList.remove( 'ambient-video-play' );

		if ( ! ambientControls.classList.contains( 'pause' ) ) {
			ambientControls.classList.add( 'pause' );
			videoWrapper.classList.add( 'ambient-video-pause' );
		}
	};

	// HTML5 Video.
	const onVideoButton = () => {
		if ( video.paused ) {
			video.play().catch( err => {
				// If iOS prevents playback, don't break the application.
			} );
		} else {
			video.pause();
		}
	};

	// iframe/VideoPress.
	const onIframeButton = () => {
		const isPlaying = ambientControls.classList.contains( 'play' );

		if ( isPlaying ) {
			showPauseButton();
		} else {
			showPlayButton();
		}

		const message = isPlaying
			? {
				event: 'command',
				func: 'playVideo',
				method: 'play',
			}
			: {
				event: 'command',
				func: 'pauseVideo',
				method: 'pause',
			};

		try {
			if ( videoWrapper.classList.contains( 'is-provider-videopress' ) ) {
				iframe?.contentWindow.postMessage(
					{
						event: isPlaying
							? 'videopress_action_play'
							: 'videopress_action_pause',
					},
					'*'
				);
			} else {
				iframe?.contentWindow.postMessage( JSON.stringify( message ), '*' );
			}
		} catch ( err ) {
			// no-op.
		}
	};

	if ( showPlayIcon ) {
		showPlayButton();
	} else {
		showPauseButton();
	}

	if ( video ) {
		// Disable default controls to avoid duplication if it hasn't already.
		video.controls = false;

		// Ensure videos don't take over fullscreen on iOS.
		if ( ! video.hasAttribute( 'playsinline' ) ) {
			video.setAttribute( 'playsinline', '' );
		}

		// Improve metadata loading.
		if ( ! video.hasAttribute( 'preload' ) ) {
			video.setAttribute( 'preload', 'metadata' );
		}

		// Here we use the player events to trigger the changing of the ambient control UI.
		// Without this external events such as key presses or clicking would desync the
		// control from the video state.
		const update = ( shouldUpdateAmbient = true ) => {
			if ( shouldUpdateAmbient ) {
				updateAmbientControlsPosition( video, ambientControls );
			}
			const isPlaying = ! video.paused && ! video.ended;
			ambientControls.setAttribute( 'aria-pressed', isPlaying );
			if ( promo_play_block ) {
				promo_play_block.setAttribute( 'aria-pressed', isPlaying );
			}
			if ( isPlaying ) {
				showPauseButton();
				return;
			}
			showPlayButton();
		};

		// Fire once metadata is ready
		video.addEventListener( 'loadedmetadata', () => {
			update( false );
		} );

		// Observe CSS transforms
		const observer = new MutationObserver( () => {
			updateAmbientControlsPosition( video, ambientControls );

		} );

		observer.observe( video, { attributes: true, attributeFilter: [ 'style', 'class' ] } );

		// Update position using ResizeObserver for more robust handling
		const resizeObserver = new ResizeObserver( () => {
			updateAmbientControlsPosition( video, ambientControls );
		} );
		resizeObserver.observe( video );

		// Detect actual playback transitions
		video.addEventListener( 'playing', update );
		video.addEventListener( 'pause', update );
		video.addEventListener( 'ended', update );
		video.addEventListener( 'error', update );
		video.addEventListener( 'canplayThrough', () => updateAmbientControlsPosition( video, ambientControls ) );
		video.addEventListener( 'waiting', () => updateAmbientControlsPosition( video, ambientControls ) );
		video.addEventListener( 'stalled', () => updateAmbientControlsPosition( video, ambientControls ) );

		// Fallbacks for older iOS devices.
		video.addEventListener( 'webkitbeginfullscreen', update );
		video.addEventListener( 'webkitendfullscreen', update );

		// Add click event listeners to play and pause the video.
		video.addEventListener( 'click', onVideoButton, false );
		ambientControls.addEventListener( 'click', onVideoButton, false );
		if ( promo_play_block ) {
			promo_play_block.addEventListener( 'click', onVideoButton, false );
		}

	}

	if ( iframe ) {
		// Add click event listeners to play and pause the video.
		ambientControls.addEventListener( 'click', onIframeButton, false );
		if ( promo_play_block ) {
			promo_play_block.addEventListener( 'click', onIframeButton, false );
		}
	}
	//
};

/**
 * Initialize all videos on page.
 */
const init = () => {
	const videos = [ ...document.querySelectorAll( '.wp-block-video' ) ];
	if ( videos.length !== 0 ) {
		videos.forEach( initialiseVideo );
	}

	const promoBlocks = [ ...document.querySelectorAll( '.wp-block-shiro-video-promo-container' ) ];
	if ( promoBlocks.length !== 0 ) {
		promoBlocks.forEach( initialiseVideo );
	}
};

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'readystatechange', () => {
		if ( document.readyState === 'interactive' ) {
			init();
		}
	} );
} else {
	init();
}
