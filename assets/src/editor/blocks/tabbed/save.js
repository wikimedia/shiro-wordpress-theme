import classNames from 'classnames';
import { ReactNode } from 'react';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Saves the block content for display on the frontend.
 *
 * @param {object} props Props
 * @param {object} props.attributes Attributes.
 * @returns {ReactNode} Formatted block.
 */
function Save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: 'shiro-tabs',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'shiro-tabs__content accordion-wrapper',
	} );

	let activeTab = null;

	return (
		<div { ...blockProps }>
			<ul className="shiro-tabs__nav" role="tablist">
				{ attributes.items.map( ( item, i ) => {
					if ( ! activeTab ) {
						activeTab = item.id;
					}

					return (
						<li
							key={ i }
							className={ classNames( 'shiro-tabs__nav-item ', {
								'shiro-tabs__nav-item--active': i === 0,
							} ) }
						>
							<button
								aria-controls={ `shiro-tabs-nav-${ item.id }` }
								aria-selected={ i === 0 ? 'true' : 'false' }
								className={ classNames(
									'shiro-tabs__nav-button',
									{
										'shiro-tabs__nav-button--active':
											activeTab === item.id,
									}
								) }
								id={ `shiro-tabs-nav-${ item.id }` }
								role="tab"
								tabIndex={ activeTab === item.id ? '0' : '-1' }
							>
								{ item.title }
							</button>
						</li>
					);
				} ) }
			</ul>
			<div { ...innerBlocksProps } />
		</div>
	);
}

export default Save;
