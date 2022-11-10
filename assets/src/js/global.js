/* eslint-disable one-var */
/**
 * Generic site JavaScript.
 */

/**
 * Search for Donation Button and add parameter link.
 */

function search_donation_links() {
	'use strict';

	var page_id = window.post_id;
	var donation_button = document.querySelectorAll('[href^="https://donate.wikimedia.org"]');

	function add_parameter( item ) {
		var current_url = item.getAttribute( 'href' );

		if ( ! current_url.includes('utm_source=') ) {
			item.href = current_url + '&utm_source=' + page_id;
		}

		//TODO remove wrong utm_source added in the links by the editor
	}

	donation_button.forEach(add_parameter);
}

search_donation_links();