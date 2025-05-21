import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';

import { Button } from '@wordpress/components';

/**
 * Inner Block Slider Navigation component.
 *
 * @param {object} props Props
 * @param {number} props.totalPages Total pages.
 * @param {number} props.currentPage Current pages.
 * @param {Function} props.setCurrentPage Set current page.
 * @param {boolean} props.prevEnabled Is previous page enabled.
 * @param {boolean} props.nextEnabled Is Next button enabled.
 * @param {Function} props.addSlide Add slide callback.
 * @param {boolean} props.addSlideEnabled Is add slide button enabled.
 * @returns {ReactNode} Component.
 */
function Navigation( {
	totalPages,
	currentPage,
	setCurrentPage,
	prevEnabled,
	nextEnabled,
	addSlide = () => {},
	addSlideEnabled = false,
} ) {
	return (
		<div className="inner-block-slider__navigation">
			<Button
				disabled={ ! prevEnabled }
				icon="arrow-left-alt2"
				variant="secondary"
				size="small"
				onClick={ () => {
					if ( prevEnabled ) {
						setCurrentPage( currentPage - 1 );
					}
				} }
			/>
			{ [ ...Array( totalPages ).keys() ].map( ( i ) => (
				<Button
					key={ i + 1 }
					aria-label={ `Slide ${i + 1}` }
					className={ classNames( 'components-button', 'is-not-small', {
						'is-primary': currentPage === i + 1,
						'is-secondary': currentPage !== i + 1,
					} ) }
					type="button"
					onClick={ () => {
						setCurrentPage( i + 1 );
					} }
				>{ i + 1 }</Button>
			) ) }
			<Button
				disabled={ ! nextEnabled }
				icon="arrow-right-alt2"
				variant="secondary"
				size="small"
				onClick={ () => {
					if ( nextEnabled ) {
						setCurrentPage( currentPage + 1 );
					}
				} }
			/>
			<Button
				disabled={ ! addSlideEnabled }
				icon="plus-alt2"
				variant="secondary"
				size="small"
				onClick={ () => addSlide() }
			/>
		</div>
	);
}

Navigation.propTypes = {
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	setCurrentPage: PropTypes.func.isRequired,
	prevEnabled: PropTypes.bool.isRequired,
	nextEnabled: PropTypes.bool.isRequired,
	addSlide: PropTypes.func,
	addSlideEnabled: PropTypes.bool,
};

export default Navigation;
