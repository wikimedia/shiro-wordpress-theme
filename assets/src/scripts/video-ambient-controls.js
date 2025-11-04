import { __ } from '@wordpress/i18n';

const shouldShowPlayIcon = video => {
	if ( ! ( video instanceof HTMLVideoElement ) ) {
		return false;
	}

	const isPlaying = ! video.paused && ! video.ended && video.readyState > 2;

	// Return true when we should show the play icon.
	return ! isPlaying;
}

/**
 * Initialize all videos on page.
 */
const init = () => {
	const videos = [ ...document.querySelectorAll( '.wp-block-video' ) ];
	if ( videos.length === 0 ) {
		return;
	}

	// DO use an animation here!
	videos.forEach( videoWrapper => {
		const iframe = videoWrapper.querySelector( 'iframe' );
		const video = videoWrapper.querySelector( 'video' );

		if ( ! ( video || iframe ) ) {
			return;
		}

		// Don't reprocess the same videos.
		if ( videoWrapper.querySelector('.video-ambient-controls') ) {
			return;
		}

		const showPlayIcon = ( video && shouldShowPlayIcon( video ) ) ||
			( iframe && ( ! iframe.src.includes( 'autoPlay=1' ) ) );

		const ambientControls = document.createElement( 'button' );
		ambientControls.classList.add( 'video-ambient-controls' );

		videoWrapper.appendChild( ambientControls );

		const pauseText = __( 'Pause ambient video', 'shiro-admin' );
		const playText = __( 'Play ambient video', 'shiro-admin' );

		const showPlayButton = () => {
			ambientControls.setAttribute( 'aria-label', playText );
			ambientControls.classList.remove( 'pause' );
			if ( ! ambientControls.classList.contains( 'play' ) ) {
				ambientControls.classList.add( 'play' );
			}
		};

		const showPauseButton = () => {
			ambientControls.setAttribute( 'aria-label', pauseText );
			ambientControls.classList.remove( 'play' );

			if ( ! ambientControls.classList.contains( 'pause' ) ) {
				ambientControls.classList.add( 'pause' );
			}
		}

		// HTML5 Video.
		const onVideoButton = () => {
			if ( video.paused ) {
				video.play();
			} else {
				video.pause();
			}
		};

		// iframe/VideoPress.
		const onIframeButton = () => {
			const isPlaying = ambientControls.classList.contains('play');

			if (isPlaying) {
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
				if (videoWrapper.classList.contains('is-provider-videopress')) {
					iframe?.contentWindow.postMessage(
						{
							event: isPlaying
								? 'videopress_action_play'
								: 'videopress_action_pause',
						},
						'*'
					);
				} else {
					iframe?.contentWindow.postMessage(JSON.stringify(message), '*');
				}
			} catch (err) {
				console.error('iframe message error:', err);
			}
		};;

		if ( showPlayIcon ) {
			showPlayButton();
		} else {
			showPauseButton();
		}

		if ( video ) {
			// Disable default controls to avoid duplication if it hasn't already.
			video.controls = false;

			// Here we use the player events to trigger the changing of the ambient control UI.
			// Without this external events such as key presses or clicking would desync the
			// control from the video state.
			const update = () => {
				const isPlaying = !video.paused && !video.ended;
				ambientControls.setAttribute('aria-pressed', isPlaying);
				if ( isPlaying ) {
					showPauseButton();
					return;
				}
				showPlayButton();
			};

			// Fire once metadata is ready
			video.addEventListener('loadedmetadata', update);

			// Detect actual playback transitions
			video.addEventListener('playing', update);
			video.addEventListener('pause', update);
			video.addEventListener('ended', update);
			video.addEventListener('error', update);
			video.addEventListener( 'click', () => {
				onVideoButton();
			}, false );

			// Add click event listeners to play and pause the video.
			ambientControls.addEventListener( 'click', () => {
				onVideoButton();
			}, false );

		}

		if ( iframe ) {
			// Add click event listeners to play and pause the video.
			ambientControls.addEventListener( 'click', () => {
				onIframeButton();
			}, false );
		}
	} );
};

if (document.readyState === 'loading') {
	document.addEventListener('readystatechange', () => {
		if (document.readyState === 'interactive') init();
	});
} else {
	init();
}
