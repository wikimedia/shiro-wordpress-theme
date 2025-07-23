import Splide from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';

const carousels = [
	...document.querySelectorAll( '.text-highlight-carousel' ),
];

/**
 * Initialize all carousels on page.
 */
const init = () => {
	const prefersReducedMotion =
		window.matchMedia( `(prefers-reduced-motion: reduce)` ) === true ||
		window.matchMedia( `(prefers-reduced-motion: reduce)` ).matches ===
			true;

	if ( !! prefersReducedMotion ) {
		// DON'T use an amination here!
		return;
	}

	// DO use an animation here!
	carousels.forEach( domElement => {
		// Add all required classnames and elements for splide.
		domElement.classList.add( 'splide' );
		const children = [ ...domElement.querySelectorAll( 'mark' ) ];
		children.forEach( child => {
			child.classList.add( 'splide__slide' );
		} );

		const carouselContents = domElement.innerHTML;
		const newCarouselContents =
			"<span class='text-highlight-carousel__track splide__track'>" +
			"<span class='text-highlight-carousel__list splide__list'>" +
			carouselContents +
			'</span></span>';
		domElement.innerHTML = newCarouselContents;

		const options = {
			arrows: false,
			autoplay: 'pause',
			intersection: {
				inView: {
					autoplay: true,
				},
				outView: {
					autoplay: false,
				},
			},
			direction: 'ttb',
			height: 'calc(1.333em + 8px)',
			pagination: false,
			type: 'loop',
		};

		domElement.carousel = new Splide( domElement, options ).mount( {
			Intersection,
		} );
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
