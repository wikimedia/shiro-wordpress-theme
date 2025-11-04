import { __ } from '@wordpress/i18n';

const videos = [ ...document.querySelectorAll( '.wp-block-video' ) ];

const shouldShowPlayIcon = video => {
	if ( ! ( video instanceof HTMLVideoElement ) ) {
		return true; // default to play.
	}

	const isPlaying = ! video.paused && ! video.ended && video.readyState > 2;

	// Return true when we should show the play icon.
	return ! isPlaying;
}

/**
 * Initialize all carousels on page.
 */
const init = () => {
	if ( videos.length === 0 ) {
		return;
	}

	const prefersReducedMotion =
		window.matchMedia( `(prefers-reduced-motion: reduce)` ) === true ||
		window.matchMedia( `(prefers-reduced-motion: reduce)` ).matches ===
			true;

	if ( !! prefersReducedMotion ) {
		// DON'T use an animation here!
		return;
	}

	// DO use an animation here!
	videos.forEach( videoWrapper => {
		const iframe = videoWrapper.querySelector( 'iframe' );
		const video = videoWrapper.querySelector( 'video' );
		const pauseText = __( 'Pause ambient video', 'shiro-admin' );
		const playText = __( 'Play ambient video', 'shiro-admin' );

		if ( ! ( video || iframe ) ) {
			return;
		}

		const showPlayIcon = shouldShowPlayIcon( video ) ||
			( iframe && ( ! iframe.src.includes( 'autoPlay=1' ) ) );

		const addAmbientControls = document.createElement( 'button' );
		addAmbientControls.classList.add( 'video-ambient-controls' );

		videoWrapper.appendChild( addAmbientControls );

		const ambientControls = videoWrapper.querySelector(
			'.video-ambient-controls'
		);

		// If there are no controls skip.
		if ( ! ambientControls ) {
			return;
		}

		// Disable default controls to avoid duplication if it hasn't already.
		video.controls = false;

		const onPause = () => {
			addAmbientControls.setAttribute( 'aria-label', playText );
			addAmbientControls.classList.remove( 'pause' );
			if ( ! addAmbientControls.classList.contains( 'play' ) ) {
				addAmbientControls.classList.add( 'play' );
			}
		};

		const onPlay = () => {
			addAmbientControls.setAttribute( 'aria-label', pauseText );
			addAmbientControls.classList.remove( 'play' );

			if ( ! addAmbientControls.classList.contains( 'pause' ) ) {
				addAmbientControls.classList.add( 'pause' );
			}
		}

		const onButton = () => {
			// HTML5 Video.
			if ( video ) {
				if ( video.paused ) {
					video.play();
				} else {
					video.pause();
				}
				return;
			}

			// iframe/VideoPress.
			if ( ambientControls.classList.contains( 'play' ) ) {
				onPause();
				if (
					videoWrapper.classList.contains(
						'is-provider-videopress'
					)
				) {
					iframe?.contentWindow.postMessage(
						{
							event: 'videopress_action_pause',
						},
						'*'
					);
				} else {
					iframe?.contentWindow.postMessage(
						JSON.stringify( {
							event: 'command', // For YouTube.
							func: 'pauseVideo', // For YouTube.
							method: 'pause', // For vimeo.
						} ),
						'*'
					);
				}
			} else {
				onPlay();
				if (
					videoWrapper.classList.contains(
						'is-provider-videopress'
					)
				) {
					iframe?.contentWindow.postMessage(
						{
							event: 'videopress_action_play',
						},
						'*'
					);
				} else {
					iframe?.contentWindow.postMessage(
						JSON.stringify( {
							event: 'command', // For YouTube.
							func: 'playVideo', // For YouTube.
							method: 'play', // For vimeo.
						} ),
						'*'
					);
				}
			}
		};

		if ( showPlayIcon ) {
			onPause();
		} else {
			onPlay();
		}

		if ( video ) {

			// Here we use the player events to trigger the changing of the ambient control UI.
			// Without this external events such as key presses or clicking would desync the
			// control from the video state.
			video.addEventListener( 'canplay', () => {
				onPlay();
			} );

			video.addEventListener( 'play', () => {
				onPlay();
			} );

			video.addEventListener( 'playing', () => {
				onPlay();
			} );

			// Switch to play button for rewatch.
			video.addEventListener( 'ended', () => {
				onPause();
			} );

			video.addEventListener( 'pause', () => {
				onPause();
			} );
		}

		// Add click event listeners to play and pause the video.
		ambientControls.addEventListener( 'click', () => {
			onButton();
		}, false );
	} );
};

document.addEventListener( 'DOMContentLoaded', init );
