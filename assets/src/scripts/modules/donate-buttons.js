import { classifyVisit } from './traffic-source';

const STORAGE_KEY = 'wmf_traffic_source';

/**
 * Work out how the visitor reached the site this browser session.
 *
 * A page reached from another page of this site, or by typing the address,
 * keeps the source stored by the first page. sessionStorage throws in some
 * privacy modes, in which case each page reports its own source.
 *
 * @return {string} The traffic source.
 */
const getTrafficSource = () => {
	const current = classifyVisit( {
		referrer: document.referrer,
		search: window.location.search,
		host: window.location.host,
	} );

	if ( current && current !== 'direct' ) {
		try {
			window.sessionStorage.setItem( STORAGE_KEY, current );
		} catch {
			// Fall through to the per-page value.
		}
		return current;
	}

	try {
		return window.sessionStorage.getItem( STORAGE_KEY ) || 'direct';
	} catch {
		return current || 'direct';
	}
};

/**
 * Collect any "Donate" buttons on the page and set their wmf_source and
 * wmf_traffic_source.
 *
 * Searches for any links to donate.wikimedia.org, and replaces their hrefs to
 * include those parameters in the query strings.
 */
const init = () => {
	const donationButtons = [ ...document.querySelectorAll( '[href^="https://donate.wikimedia.org"]' ) ];
	const { object_id: objectId } = window.shiro;
	const trafficSource = getTrafficSource();

	donationButtons.forEach( link => {
		const url = new URL( link.href );
		url.searchParams.set( 'wmf_source', objectId );
		url.searchParams.set( 'wmf_traffic_source', trafficSource );
		link.href = url.toString();
	} );
};

document.addEventListener( 'DOMContentLoaded', init );

if ( module.hot ) {
	module.hot.accept();
	init();
}
