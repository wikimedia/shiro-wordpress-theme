/**
 * Collect any "Donate" buttons on the page.
 */
const donationButtons = [ ...document.querySelectorAll( '[href^="https://donate.wikimedia.org"]' ) ];
const { object_id } = window.shiro;

/**
 * Searches for any links to donate.wikimedia.org, and replaces their hrefs to
 * include UTM parameters in the query strings.
 *
 * @returns {HTMLElement[]} Array of donation buttons.
 */
const init = () => donationButtons.forEach(
	link => {
		const { search } = link;
		const params = new URLSearchParams( search );
		params.set( 'utm_source', object_id );
		link.href = link.href.replace( search, params.toString() );
	}
);

document.addEventListener( 'DOMContentLoaded', init );

if ( module.hot ) {
	module.hot.accept();
	init();
}
