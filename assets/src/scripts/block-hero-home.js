/**
 * Functionality for rotating the rotating headings in the hero home
 */

/**
 * Bootstrap frontend functionality.
 *
 * - This file is loaded at the bottom of the body, so we don't need an onready.
 */
const NO_CYCLING_HEADING_COUNT = 1;
const CYCLE_TIME = 5000;
const OPACITY_TRANSITION_TIME = 750;
const BROWSER_PAINT_WAIT = 20;
const headings = document.querySelectorAll( '.hero-home__heading' );
let currentHeadingIndex = 0,
	previousHeadingIndex = 0;
let currentHeading = headings[ 0 ];
let previousHeading = headings[ 0 ];
let rotateHeadingsTimeout = null;
let rotateImagesTimeout = null;

const rotatingHeros = document.querySelectorAll( '.hero-home__rotator' );

/**
 * If a hero rotator block has more than one hero in it, set an interval to
 * cycle through them now.
 *
 * @param {HTMLElement} heroBlock Hero rotator block.
 */
function startRotatingImages( heroBlock ) {

	// Ensure there are child blocks to rotate through.
	const childBlocks = heroBlock.querySelectorAll( '.hero-home' );

	if ( ! childBlocks.length ) {
		return;
	}

	childBlocks[0].classList.add( 'hero-home--current' );

	if ( childBlocks.length > NO_CYCLING_HEADING_COUNT ) {
		rotateImagesTimeout = setTimeout( () => showNextImage( heroBlock ), CYCLE_TIME );
	}
}

/**
 * Show the next hero image in a rotating hero series.
 *
 * @param {HTMLElement} parent Div representing the hero-rotator block.
 */
function showNextImage( parent ) {
	const images = parent.querySelectorAll( '.hero-home:not(.hero-home--current)' );
	const nextImage = images[ Math.floor( Math.random() * images.length ) ];

	parent.querySelector( '.hero-home--current' ).classList.remove( 'hero-home--current' );
	nextImage.classList.add( 'hero-home--current' );

	rotateImagesTimeout = setTimeout( () => showNextImage( parent ), CYCLE_TIME );
}

const targetLink = document.querySelector( '.hero-home__link' );

/**
 * Setup variables for fading in and out.
 *
 * @returns {void}
 */
function cycleHeading() {
	if ( ! targetLink || targetLink !== document.activeElement ) {
		previousHeadingIndex = currentHeadingIndex;
		currentHeadingIndex = ++currentHeadingIndex % headings.length;

		currentHeading = headings[ currentHeadingIndex ];
		previousHeading = headings[ previousHeadingIndex ];

		if ( targetLink ) {
			const targetLinkScreenReaderText = targetLink.querySelector( '.screen-reader-text' );
			if ( targetLinkScreenReaderText ) {
				targetLinkScreenReaderText.textContent = currentHeading.textContent;
			}
		}

		fadeOutPreviousHeading();
	} else {
		// Setup the next cycle
		rotateHeadingsTimeout = setTimeout( cycleHeading, CYCLE_TIME );
	}
}

/**
 * Fade out previous heading.
 *
 * @returns {void}
 */
function fadeOutPreviousHeading() {
	previousHeading.classList.add( 'hero-home__heading--transparent' );
	rotateHeadingsTimeout = setTimeout( fadeInCurrentHeading, OPACITY_TRANSITION_TIME );
}

/**
 * Fade in the current heading and set display values.
 *
 * @returns {void}
 */
function fadeInCurrentHeading() {
	previousHeading.classList.add( 'hero-home__heading--hidden' );
	currentHeading.classList.remove( 'hero-home__heading--hidden' );

	// Allow the browser to display the element with opacity 0 before setting it to 1.
	setTimeout( function () {
		currentHeading.classList.remove( 'hero-home__heading--transparent' );
	}, BROWSER_PAINT_WAIT );

	// Setup the next cycle
	rotateHeadingsTimeout = setTimeout( cycleHeading, CYCLE_TIME );
}

if ( rotatingHeros.length ) {
	rotatingHeros.forEach( startRotatingImages );
}

if ( headings.length > NO_CYCLING_HEADING_COUNT ) {
	rotateHeadingsTimeout = setTimeout( cycleHeading, CYCLE_TIME );
}

if ( module.hot ) {
	module.hot.dispose( () => {
		rotateImagesTimeout && clearTimeout( rotateImagesTimeout );
		rotateHeadingsTimeout && clearTimeout( rotateHeadingsTimeout );
	} );
	module.hot.accept();
}
