import { __ } from '@wordpress/i18n';

const videos = [ ...document.querySelectorAll( '.wp-block-video' ) ];

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
		// DON'T use an amination here!
		return;
	}

	// DO use an animation here!
	videos.forEach( videoWrapper => {
		const iframe = videoWrapper.querySelector( 'iframe' );
		const video = videoWrapper.querySelector( 'video' );
		const addAmbientControls = document.createElement( 'button' );
		const pauseText = __( 'Pause ambient video', 'shiro-admin' );
		const playText = __( 'Play ambient video', 'shiro-admin' );
		addAmbientControls.setAttribute( 'aria-label', pauseText );
		addAmbientControls.classList.add( 'video-ambient-controls', 'pause' );
		videoWrapper.appendChild( addAmbientControls );

		const ambientControls = videoWrapper.querySelector(
			'.video-ambient-controls'
		);

		if (
			! ( video || iframe ) ||
			( video && ! video.hasAttribute( 'autoplay' ) ) ||
			( iframe && ! iframe.src.includes( 'autoPlay=1' ) ) ||
			! ambientControls
		) {
			return;
		}

		// Add click event listeners to play and pause the video.
		ambientControls.addEventListener(
			'click',
			function () {
				if ( ambientControls.classList.contains( 'play' ) ) {
					video?.play();
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
					addAmbientControls.setAttribute( 'aria-label', pauseText );
				} else {
					video?.pause();
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
					ambientControls.setAttribute( 'aria-label', playText );
				}
				ambientControls.classList.toggle( 'play' );
				ambientControls.classList.toggle( 'pause' );
			},
			false
		);
	} );
};

document.addEventListener( 'DOMContentLoaded', init );
