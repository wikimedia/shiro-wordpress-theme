import Splide from '@splidejs/splide';

import { slideVisible, slideHidden } from './block-hero-home';

const carousels = [ ...document.querySelectorAll( '.shiro-carousel' ) ];

// Set default values for carousel options, which can be overridden by
// data-attributes on the DOM element itself.
const defaultOptions = {};

/**
 * Toggles the video state in a given slide between enabled and disabled.
 *
 * This function identifies a `<video>` or `<iframe>` element within the provided slide element,
 * along with any associated ambient controls, and adjusts their state and visibility based on
 * the `isEnabled` parameter. When the video is disabled, playback is paused, pointer events are disabled,
 * and ambient controls (if present) are hidden. Conversely, when enabled, the video is made interactive and the
 * ambient controls become visible.
 *
 * @param {Element} slide - The HTML element representing the slide containing the video or iframe.
 * @param {boolean} shouldEnable - Determines whether the video should be enabled or disabled.
 */
const toggleVideoState = ( slide, shouldEnable ) => {
	// Support youtube or videos
	const videos = slide.querySelectorAll( 'video' );
	const youtubes = slide.querySelectorAll( 'iframe' );
	const ambientControls = slide.querySelector( '.video-ambient-controls' );

	videos.forEach( video => {
		if ( shouldEnable ) {
			video.removeAttribute( 'disabled' );
			video.style.pointerEvents = '';
			if ( ambientControls ) {
				ambientControls.style.display = '';
			}
		} else {
			if ( video.tagName === 'VIDEO' ) {
				video.pause();
			}
			video.setAttribute( 'disabled', 'disabled' );
			video.style.pointerEvents = 'none';
			if ( ambientControls ) {
				ambientControls.style.display = 'none';
			}
		}
	} );
	youtubes.forEach( youtube => {
		if ( shouldEnable ) {
			youtube.removeAttribute( 'disabled' );
			youtube.style.pointerEvents = '';
		} else {
			if ( ! youtube.hasAttribute( 'disabled' ) ) {
				// Pause Youtube. @see https://stackoverflow.com/a/36313110
				let src = youtube.src;
				youtube.src = src;
			}
			youtube.setAttribute( 'disabled', 'disabled' );
			youtube.style.pointerEvents = 'none';
		}

	} );

};

/**
 * Initialize all carousels on page.
 */
const init = () => {
	carousels.forEach( domElement => {
		const [ track, list ] = [
			domElement.querySelector( '.shiro-carousel__track' ),
			domElement.querySelector( '.shiro-carousel__list' ),
		];

		// Don't initiate the carousel if there aren't at least 2 pages of slides.
		if ( [ ...list.children ].length < 2 ) {
			return;
		}

		// Add required classes for Splide markup; see
		// https://splidejs.com/guides/structure/.
		domElement.classList.add( 'splide' );
		track.classList.add( 'splide__track' );
		list.classList.add( 'splide__list' );

		[ ...list.children ].forEach( slide =>
			slide.classList.add( 'splide__slide' )
		);

		const perPage = JSON.parse( domElement.dataset.splide ).perPage || 1;
		const isPostCarousel = track.classList.contains( 'wp-block-query' );
		const isVideoCarousel = list.querySelectorAll( 'video' ).length > 0;
		if ( perPage > 1 ) {
			defaultOptions.mediaQuery = 'max';
			defaultOptions.breakpoints = {
				599: {
					destroy: isPostCarousel,
					perPage: 1,
				},
				781: {
					perPage: 2,
				},
			};
		}

		if ( isPostCarousel && perPage > 1 ) {
			defaultOptions.gap = '3.34%';
		}

		// Video Carousel
		if ( isVideoCarousel ) {
			defaultOptions.perMove = 1;
			defaultOptions.focus = 'center';

			// Initially disable all videos.
			list.querySelectorAll( 'video' ).forEach( video => {
				video.setAttribute( 'disabled', true );
				video.controls = false;
			} );
		}

		const textDirection = window
			.getComputedStyle( document.body )
			.getPropertyValue( 'direction' );
		if ( textDirection === 'rtl' ) {
			defaultOptions.direction = 'rtl';
		}

		const options = {
			...defaultOptions,
			...domElement.dataset,
		};

		domElement.carousel = new Splide( domElement, options ).mount();

		if ( isVideoCarousel ) {
			// Keep all videos as disabled apart from the active slide.
			domElement.carousel.Components.Slides.get().forEach( slide => {
				toggleVideoState( slide.slide, slide.slide.classList.contains( 'is-active' ) );
			} );
			domElement.carousel.on( 'active', ( slide ) => {
				toggleVideoState( slide.slide, true );
			} );
			domElement.carousel.on( 'inactive', ( slide ) => {
				toggleVideoState( slide.slide, false );
			} );

			// Progress listener for smooth scaling based on proximity to center
			domElement.carousel.on( 'move', ( newIndex ) => {
				const slides = domElement.carousel.Components.Slides.get();

				slides.forEach( ( slide ) => {
					const index = slide.index;
					// Calculate distance from center (0 = center, increases with distance)
					const distance = Math.abs( index - newIndex );

					console.debug( '[Carousel] Scaling slide:', {
						slideIndex: index,
						newIndex: newIndex,
						distance: distance
					} );

					// Calculate scale: 1.0 at center, decreasing to 0.8 for distant slides
					// Using a linear interpolation
					const maxDistance = 2; // Adjust based on how many slides you want to affect
					const minScale = 0.8;
					const maxScale = 1.0;
					const normalizedDistance = Math.min( distance / maxDistance, 1 );
					const scale = maxScale - (normalizedDistance * (maxScale - minScale));

					// Calculate opacity: 1.0 at center, decreasing to 0.6 for distant slides
					const minOpacity = 0.1;
					const maxOpacity = 1.0;
					const opacity = maxOpacity - (normalizedDistance * (maxOpacity - minOpacity));

					console.debug( '[Carousel] Scale calculation:', {
						normalizedDistance: normalizedDistance,
						calculatedScale: scale
					} );

					// Apply transform and opacity directly
					slide.slide.style.transform = `scale(${scale})`;
					slide.slide.style.opacity = "" + opacity;
				} );
			} );
		}

		// Start rotating headings on the first slide.
		slideVisible( domElement.carousel.Components.Slides.get()[0] );
		domElement.carousel.on( 'visible', slideVisible );
		domElement.carousel.on( 'hidden', slideHidden );
	} );
};

document.addEventListener( 'DOMContentLoaded', init );

if ( module.hot ) {
	module.hot.dispose( () => {
		carousels.forEach( domElement => domElement.carousel.destroy() );
	} );
	module.hot.accept();
	init();
}
