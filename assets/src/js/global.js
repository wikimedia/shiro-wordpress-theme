/* eslint-env es6 */
/* eslint-disable */

/**
 * Generic site JavaScript.
 */

/**
 * Search for Donation Button and add parameter link Op1.
 * This function is mainting all the parameters and adding 'utm_source' to it.
 */

function search_donation_links() {
	'use strict';

	var page_id = window.post_id;
	var donation_button = document.querySelectorAll('[href^="https://donate.wikimedia.org"]');

	function add_parameter( item ) {
		var current_url = item.getAttribute( 'href' );

		if ( current_url.includes('utm_source') ) {
			item.href = current_url.replace( /utm_source=0*[1-9][0-9]*/, 'utm_source=' + page_id );
		} else {
			item.href = current_url + '&utm_source=' + page_id;
		}
	}

	donation_button.forEach(add_parameter);
}

// 

/**
 * Search for Donation Button and add parameter link Op1.
 * This function is removing all the parameters and adding 'utm_source' to it.
 */

document.querySelectorAll('[href^="https://donate.wikimedia.org"]').forEach( function( item ) {
	'use strict';
	var page_id = window.post_id;
	var url = item.href;
	var params = new URLSearchParams( url.search );
	params.set( 'utm_source', page_id );
	item.href = url.replace( /\?.*/, '?utm_source=' + page_id );
}
);
