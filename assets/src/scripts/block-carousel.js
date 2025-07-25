import Splide from '@splidejs/splide';

import { slideVisible, slideHidden } from './block-hero-home';

const carousels = [ ...document.querySelectorAll( '.shiro-carousel' ) ];

// Set default values for carousel options, which can be overridden by
// data-attributes on the DOM element itself.
const defaultOptions = {};

/**
 * Initialize all carousels on page.
 */
const init = () => {
	carousels.forEach( domElement => {
		const [ track, list ] = [
			domElement.querySelector( '.shiro-carousel__track' ),
			domElement.querySelector( '.shiro-carousel__list' ),
		];

		// Don't initiate the carousel if there aren't at least 2 slides.
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

		const options = {
			...defaultOptions,
			...domElement.dataset,
		};

		domElement.carousel = new Splide( domElement, options ).mount();

		// Start rotating headings on the first slide.
		slideVisible( domElement.carousel.Components.Slides.get()[ 0 ] );
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
