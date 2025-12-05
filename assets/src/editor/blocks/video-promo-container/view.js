/**
 * Video Promo Container View Script
 */
document.addEventListener( 'DOMContentLoaded', () => {
	const containers = document.querySelectorAll( '.wp-block-shiro-video-promo-container' );

	containers.forEach( container => {
		const video = container.querySelector( 'video' );

		if ( ! video ) {
			return;
		}

		/**
		 * Adjusts the height of a video element dynamically to fit within the viewport,
		 * accounting for the height of the global site header and, if present, the WordPress admin bar.
		 *
		 * This function calculates the available vertical space by subtracting the combined
		 * heights of the header and admin bar (if it exists) from the viewport height (100vh).
		 * It then sets this value as the height of the video element, ensuring the video fills
		 * the remaining space. Additionally, the `object-fit` style is set to "cover" to maintain
		 * the video aspect ratio while filling the adjusted height.
		 */
		const setVideoHeight = () => {
			const header = document.querySelector( '.global-header' ) || document.querySelector( 'header' );
			if ( header ) {
				const headerHeight = header.getBoundingClientRect().height;
				const adminBar = document.getElementById( 'wpadminbar' );
				const adminBarHeight = adminBar ? adminBar.getBoundingClientRect().height : 0;
				video.style.height = `calc(100vh - ${headerHeight + adminBarHeight}px)`;
				video.style.objectFit = 'cover';
			}
		};

		setVideoHeight();
		window.addEventListener( 'resize', setVideoHeight );


		/**
		 * Scrolls the specified video element into view if it is not set to autoplay.
		 * The method takes into account the height of a global header or WordPress admin bar if present,
		 * ensuring the video is properly positioned below these elements when scrolled.
		 *
		 * @return {void} This method does not return any value.
		 */
		function scrollVideoIntoView() {
			if ( ! video.autoplay ) {
				// Scroll the top of the video into view.
				setTimeout( () => {
					const header = document.querySelector( '.global-header' ) || document.querySelector( 'header' );
					const headerOffset = (header ? header.getBoundingClientRect().height : 0);

					window.scrollTo( {
						top: container.offsetTop - headerOffset,
						behavior: 'smooth'
					} );
				}, 100 );
			}
		}
		video.addEventListener( 'play', scrollVideoIntoView );

	} );
} );
