import Splide from '@splidejs/splide';

const carousels = [
	...document.querySelectorAll( '.text-highlight-carousel' ),
];

/**
 * Initialize all carousels on page.
 */
const init = () => {
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
			autoplay: true,
			direction: 'ttb',
			height: 'calc(1.333em + 8px)',
			pagination: false,
			type: 'loop',
		};

		domElement.carousel = new Splide( domElement, options ).mount();
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
