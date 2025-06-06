/**
 * Frontend view logic for a functioning clock block.
 */
import wrapCharacters from './wrap-characters';

import './frontend.scss';

/**
 * A collection of all clock blocks on the page.
 *
 * @type {Element[]}
 * @private
 */
let _instances = [];

/**
 * A collection of all the timer intervals.
 *
 * @type {number[]}
 * @private
 */
let _timers = [];

/**
 * Activate all clock instances on the page.
 */
function setup() {
	// Clear all the existing intervals.
	_timers.forEach( ( timer ) => {
		clearInterval( timer );
	} );

	// Reset the timer collection.
	_timers = [];

	_instances = [ ...document.querySelectorAll( '[data-clock]' ) ];
	_instances.map( initializeClockBlock );
}

/**
 * Set up the clock that this element contains.
 *
 * @param {HTMLElement} element The wrapper for a clock
 */
function initializeClockBlock( element ) {
	const dateTime = element.dataset.clock ?? false,
		stopAtTime = element.dataset.stop ? ( element.dataset.stop === 'true' ) : false,
		countPlaceholder = element.querySelector(
			'.clock__contents__count-count'
		),
		display = element.dataset.display,
		padding = element.dataset.displaypadding;

	if ( dateTime === false ) {
		return;
	}

	const to = new Date( dateTime ).getTime(),
		secondsInMinute = 60 * 1000,
		secondsInHour = secondsInMinute * 60,
		secondsInDay = secondsInHour * 24;

	if ( stopAtTime ) {
		const current = Date.now();

		if ( current > to ) {
			let output = '';

			switch ( display ) {
				case 'd-nolabel' :
					output = '0'.padStart( parseInt( padding ), '0' );
					break;
				case 'd' :
					output = '0 Days';
					break;
				case 'dh' :
					output = '0 Days 0 Hours';
					break;
				case 'dhm' :
					output = '0 Days 0 Hours 0 Minutes';
					break;
				case 'dhms' :
				default :
					output = '0 Days 0 Hours 0 Minutes 0 Seconds';
					break;
			}

			countPlaceholder.innerHTML = wrapCharacters( output );
			return;
		}
	}

	/**
	 * Timer callback function.
	 */
	const timer = () => {
		const current = Date.now(),
			diff = Math.abs( current - to ),
			days = Math.floor( diff / ( secondsInDay ) ),
			hours = Math.floor( ( diff % ( secondsInDay ) ) / ( secondsInHour ) ),
			mins = Math.floor( ( ( diff % ( secondsInDay ) ) % ( secondsInHour ) ) / ( secondsInMinute ) ),
			secs = Math.floor( ( ( ( diff % ( secondsInDay ) ) % ( secondsInHour ) ) % ( secondsInMinute ) ) / 1000 );

		let output = '';

		switch ( display ) {
			case 'd-nolabel' :
				output = '' + days.toString().padStart( parseInt( padding ), '0' );
				break;
			case 'd' :
				output = days + ' Days';
				break;
			case 'dh' :
				output = days + ' Days ' + hours + ' Hours';
				break;
			case 'dhm' :
				output = days + ' Days ' + hours + ' Hours ' + mins + ' Minutes';
				break;
			case 'dhms' :
			default :
				output = days + ' Days ' + hours + ' Hours ' + mins + ' Minutes ' + secs + ' Seconds';
				break;
		}

		countPlaceholder.innerHTML = wrapCharacters( output );
	};

	_timers.push( setInterval( timer, 1000 ) );
}

export default setup;

// Initialize clocks.
setup();
