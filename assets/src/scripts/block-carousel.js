import Splide from '@splidejs/splide';

import '@splidejs/splide/css';

const carousels = [ ...document.querySelectorAll( '.shiro-carousel' ) ];

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

			domElement.classList.add( 'splide' );
			track.classList.add( 'splide__track' );
			list.classList.add( 'splide__list' );

			[ ...list.children ].forEach(
				slide => slide.classList.add( 'splide__slide' )
			);

			domElement.carousel = new Splide( domElement ).mount();
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

