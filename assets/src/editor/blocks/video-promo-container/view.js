/**
 * Video Promo Container View Script
 */

const fitVideo = ( video ) => {
	video.style.objectFit = 'contain';
};

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
			const headerOffset = header ? header.getBoundingClientRect().height : 0;

			const videoTopOnPage = video.getBoundingClientRect().top + window.pageYOffset;

			window.scrollTo( {
				top: Math.max( 0, videoTopOnPage - headerOffset ),
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
	const headerHeight = header ? header.getBoundingClientRect().height : 0;

	// We ignore the admin bar because it is positioned "above" the document.
	const availableHeight = Math.max( 0, window.innerHeight - headerHeight );

	// We want the element box to match the rendered video size (no letterboxing),
	// so we size height from width using the intrinsic video aspect ratio.
	video.style.objectFit = 'cover';
	video.style.maxHeight = `${availableHeight}px`;

	/**
	 * Adjusts the height of a video element to maintain its intrinsic aspect ratio
	 * while ensuring it fits within the available height of its container.
	 *
	 * This function calculates an ideal height based on the video's intrinsic
	 * dimensions (`videoWidth` and `videoHeight`) and the current display width of
	 * the video. It then applies the smaller value between the calculated ideal
	 * height and the maximum available height to the video element's height.
	 *
	 * If the video's intrinsic dimensions are unavailable (e.g., video metadata
	 * has not yet been loaded) or if the video's width cannot be determined, the
	 * function will exit without modifying the height.
	 *
	 * Preconditions:
	 * - The video element's metadata must be loaded (`loadedmetadata` event) to
	 *   ensure its `videoWidth` and `videoHeight` properties are populated.
	 * - The video element must have a measurable width through its bounding client
	 *   rectangle.
	 *
	 * Side Effects:
	 * - Updates the `style.height` property of the referenced video element.
	 *
	 * Edge Cases:
	 * - No height modification is applied if the `videoWidth` and `videoHeight`
	 *   values are unavailable.
	 * - No height modification is applied if the video's bounding client width is
	 *   zero or undefined.
	 */
	const applyIntrinsicHeight = () => {
		// videoWidth/videoHeight are available after `loadedmetadata`.
		if ( ! video.videoWidth || ! video.videoHeight ) {
			return;
		}

		const width = video.getBoundingClientRect().width;
		if ( ! width ) {
			return;
		}

		const idealHeight = width * (video.videoHeight / video.videoWidth);
		const finalHeight = Math.min( idealHeight, availableHeight );

		video.style.height = `${finalHeight}px`;
	};

	// If metadata is already available (cached), apply immediately.
	applyIntrinsicHeight();

	// Otherwise wait for it once.
	if ( ! video.videoWidth || ! video.videoHeight ) {
		video.addEventListener( 'loadedmetadata', applyIntrinsicHeight, { once: true } );
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
	video.style.objectFit = 'cover';
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
	const duration = video.duration;

	// Mobile Safari (and some stream scenarios) can report duration as 0/NaN/Infinity.
	// If duration isn't a usable finite number, we can't compute progress reliably yet.
	if ( ! Number.isFinite( duration ) || duration <= 0 ) {
		return;
	}

	const progress = (video.currentTime / duration) * 100;
	progressBar.style.width = `${Math.min( 100, Math.max( 0, progress ) )}%`;
};

document.addEventListener( 'DOMContentLoaded', () => {
	const containers = document.querySelectorAll( '.wp-block-shiro-video-promo-container' );

	containers.forEach( container => {
		// Desktop or mobile videos
		const videos = container.querySelectorAll( 'video' );

		videos.forEach( video => {
			if ( ! video ) {
				return;
			}

			setVideoHeight( video );
			window.addEventListener( 'resize', () => setVideoHeight( video ) );

			video.addEventListener( 'play', () => scrollVideoIntoView( video, container ) );
			video.addEventListener( 'play', () => fitVideo( video ) );
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
} );
