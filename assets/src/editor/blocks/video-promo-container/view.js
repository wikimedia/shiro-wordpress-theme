/**
 * Video Promo Container View Script
 */

/**
 * Creates and initializes a progress bar element for a given context.
 * The function dynamically generates a container with an embedded progress bar.
 * Once created, the progress bar container is appended to the DOM immediately following the specified video element.
 *
 * @function
 * @returns {HTMLElement} The created progress bar element.
 */
const initializeProgressBar = ( video, container ) => {
	if ( container.dataset.enableProgressBar !== 'true' ) {
		return null;
	}
	const progressBarContainer = document.createElement( 'div' );
	progressBarContainer.className = 'progress-bar-container';
	const progressBar = document.createElement( 'div' );
	progressBar.className = 'progress-bar';
	progressBarContainer.appendChild( progressBar );
	video.after( progressBarContainer );
	return progressBar;
};

/**
 * Pauses the progress bar's transition effect immediately.
 *
 * This function halts any ongoing CSS transition animation for the specified
 * progress bar by setting its `transition` style property to 'none'. This
 * can be useful to temporarily freeze progress bar updates without interfering
 * with its current state or value.
 *
 * @param {HTMLElement} progressBar - The progress bar element whose transition
 *                                     effect needs to be paused.
 */
const pauseProgressBar = ( progressBar ) => {
	progressBar.style.transition = 'none';
};

/**
 * Scrolls the specified video element into view if it is not set to autoplay.
 * The method takes into account the height of a global header or WordPress admin bar if present,
 * ensuring the video is properly positioned below these elements when scrolled.
 *
 * @return {void} This method does not return any value.
 */
const scrollVideoIntoView = ( video, container ) => {
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
};

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
const setVideoHeight = ( video ) => {
	const header = document.querySelector( '.global-header' ) || document.querySelector( 'header' );
	if ( header ) {
		const headerHeight = header.getBoundingClientRect().height;
		const adminBar = document.getElementById( 'wpadminbar' );
		const adminBarHeight = adminBar ? adminBar.getBoundingClientRect().height : 0;
		video.style.height = `calc(100vh - ${headerHeight + adminBarHeight}px)`;
		video.style.objectFit = 'cover';
	}
};

/**
 * Resets the poster of a video element by reassigning its `src` property.
 * This can be used to refresh the video element and ensure its poster frame is updated.
 *
 * @param {HTMLVideoElement} video - The video element whose poster is to be reset.
 */
const setVideoPoster = ( video ) => {
	video.src = '';
	video.src = video.currentSrc;
};

/**
 * Resets the progress bar's width to 0%.
 *
 * @param {HTMLElement} progressBar - The progress bar element to reset.
 */
const resetProgressBar = ( progressBar ) => {
	progressBar.style.width = '0%';
};

/**
 * Updates the transition style of a progress bar element to apply a smooth width animation.
 *
 * @param {HTMLElement} progressBar - The target progress bar element whose transition style will be updated.
 */
const transitionProgressBar = ( progressBar ) => {
	progressBar.style.transition = 'width 0.5s linear';
};
/**
 * Updates the width of a progress bar element based on the current playback time of a video.
 *
 * @param {HTMLVideoElement} video - The video element whose playback progress is being tracked.
 * @param {HTMLElement} progressBar - The element representing the visual progress bar to be updated.
 */
const updateProgressBar = ( video, progressBar ) => {
	const progress = (video.currentTime / video.duration) * 100;
	progressBar.style.width = progress + '%';
};


document.addEventListener( 'DOMContentLoaded', () => {
	const containers = document.querySelectorAll( '.wp-block-shiro-video-promo-container' );

	containers.forEach( container => {
		const video = container.querySelector( 'video' );

		if ( ! video ) {
			return;
		}

		setVideoHeight( video );
		window.addEventListener( 'resize', () => setVideoHeight( video ) );

		video.addEventListener( 'play', () => scrollVideoIntoView( video, container ) );
		video.addEventListener( 'ended', () => setVideoPoster( video ) );

		const progressBar = initializeProgressBar( video, container );

		if ( progressBar ) {
			video.addEventListener( 'timeupdate', () => updateProgressBar( video, progressBar ) );
			video.addEventListener( 'ended', () => resetProgressBar( progressBar ) );
			video.addEventListener( 'play', () => transitionProgressBar( progressBar ) );
			video.addEventListener( 'pause', () => pauseProgressBar( progressBar ) );
		}
	} );
} );
