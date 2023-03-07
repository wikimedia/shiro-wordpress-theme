import Splide from '@splidejs/splide';

const carousels = [ ...document.querySelectorAll( '.shiro-carousel' ) ];

// Set default values for carousel options, which can be overridden by
// data-attributes on the DOM element itself.
const defaultOptions = {

};

/**
 * Initialize all carousels on page.
 */
const init = () => {
	carousels.forEach(
		domElement => {
			const [ track, list ] = [
				domElement.querySelector( '.shiro-carousel__track' ),
				domElement.querySelector( '.shiro-carousel__list' ),
			];

			// Add required classes for Splide markup; see
			// https://splidejs.com/guides/structure/.
			domElement.classList.add( 'splide' );
			track.classList.add( 'splide__track' );
			list.classList.add( 'splide__list' );

			[ ...list.children ].forEach(
				slide => slide.classList.add( 'splide__slide' )
			);

			const options = {
				...defaultOptions,
				...domElement.dataset,
			};

			domElement.carousel = new Splide( domElement, options ).mount();
		}
	);
};

document.addEventListener( 'DOMContentLoaded', init );

if ( module.hot ) {
	module.hot.dispose( () => {
		carousels.forEach( domElement => domElement.carousel.destroy() );
	} );
	module.hot.accept();
	init();
}

