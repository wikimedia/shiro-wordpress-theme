/**
 * Functionality for the Tab block.
 *
 * Adapted from the code provided on https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
 */

/**
 * Change to tabs.
 *
 * @param {HTMLElement} tab Tab element.
 */
function activateTab( tab ) {
	const blockElement = tab.closest( '.shiro-tabs' );
	const panel = document.getElementById(
		tab.getAttribute( 'aria-controls' )
	);
	const tabPanels = blockElement.querySelectorAll( '[role="tabpanel"]' );

	// Remove all current selected tabs
	blockElement
		.querySelectorAll( '[role="tab"][aria-selected="true"]' )
		.forEach( ( t ) => {
			t.setAttribute( 'aria-selected', false );
			t.setAttribute( 'tabindex', -1 );
			t.classList.remove( 'shiro-tabs__nav-button--active' );
		} );

	blockElement
		.querySelectorAll( '.shiro-tabs__nav-item' )
		.forEach( ( t ) => {
			t.classList.remove( 'shiro-tabs__nav-item--active' );
		} );

	// Set this tab as selected
	tab.setAttribute( 'aria-selected', true );
	tab.setAttribute( 'tabindex', 0 );
	tab.classList.add( 'shiro-tabs__nav-button--active' );
	tab.closest( '.shiro-tabs__nav-item' ).classList.add(
		'shiro-tabs__nav-item--active'
	);

	// Hide all tab panels
	tabPanels.forEach( ( p ) => {
		if ( p.getAttribute( 'aria-labelledby' ) === panel.getAttribute( 'id' ) ) {
			p.removeAttribute( 'hidden' );
		} else {
			p.setAttribute( 'hidden', true );
		}
	} );
}

/**
 * Handle click event on tab.
 *
 * @param {object} e Event
 */
function handleTabClick( e ) {
	activateTab( e.target );
}

/**
 * Handle key navigation on tab element.
 *
 * @param {object} e Event
 */
function handleKeydown( e ) {
	if ( ! ( e.keyCode === 39 || e.keyCode === 37 ) ) {
		return;
	}

	const blockElement = e.target.closest( '.shiro-tabs' );
	const tab = blockElement.querySelector(
		'[role="tab"][aria-selected="true"]'
	);
	const tabs = blockElement.querySelectorAll( '[role="tab"]' );

	const currentTabIndex = Array.from( tabs ).findIndex(
		( t ) => tab.getAttribute( 'id' ) === t.getAttribute( 'id' )
	);

	// Work out the next tab.
	let nextTabIndex =
		e.keyCode === 37 ? currentTabIndex - 1 : currentTabIndex + 1;
	nextTabIndex = Math.min( Math.max( nextTabIndex, 0 ), tabs.length );

	if ( nextTabIndex === currentTabIndex ) {
		return;
	}

	activateTab( tabs[ nextTabIndex ] );
	tabs[ currentTabIndex ].blur();
	tabs[ nextTabIndex ].focus();
}

/**
 * Initialize tab block.
 *
 * Ensure initial state is correct.
 *
 * @param {HTMLElement} blockElement Tab block.
 */
const initTabBlock = ( blockElement ) => {
	const tabs = blockElement.querySelectorAll( '[role="tab"]' );
	const tabList = blockElement.querySelector( '[role="tablist"]' );
	//const tabPanels = blockElement.querySelectorAll( '[role="tabpanel"]' );

	// Add a click event handler to each tab
	tabs.forEach( ( tab ) => {
		// Use a scoped QS instead of getElementById to guard against malformed
		// situations where same block instance renders twice on page.
		const panel = blockElement.querySelector(
			`#${ tab.getAttribute( 'aria-controls' ) }`
		);
		const isActive = tab.classList.contains(
			'shiro-tabs__nav-button--active'
		);

		if ( isActive ) {
			panel.removeAttribute( 'hidden' );
		} else {
			panel.setAttribute( 'hidden', true );
		}

		// Hide all tab panels
		/* tabPanels.forEach( ( p ) => {
			if ( p.getAttribute( 'aria-labelledby' ) === panel.getAttribute( 'id' ) ) {
				p.removeAttribute( 'hidden' );
			} else {
				p.setAttribute( 'hidden', true );
			}
		} ); */

		tab.addEventListener( 'click', handleTabClick );
	} );

	tabList.addEventListener( 'keydown', handleKeydown );
};

/**
 * Kick it all off.
 */
const bootstrap = () => {
	document
		.querySelectorAll( '.shiro-tabs' )
		.forEach( ( el ) => initTabBlock( el ) );
};

bootstrap();
