/**
 * Block for implementing the blog-list component.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import apiFetch from '@wordpress/api-fetch';
import { InspectorControls, InspectorAdvancedControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, QueryControls, FormTokenField } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';
import { addQueryArgs } from '@wordpress/url';

import metadata from './block.json';

import './style.scss';

registerBlockType( metadata.name, {
	...metadata,

	/**
	 * Edit component used to manage featured image and page intro.
	 */
	edit: function BlockListEdit( { attributes, setAttributes } ) {
		const {
			postsToShow,
			categories,
			excludedCategories,
			order,
			orderBy,
			selectedAuthor,
		} = attributes;

		const blockProps = useBlockProps( {
			className: 'blog-list',
		} );

		const [ authorList, setAuthorList ] = useState( [] );
		const [ categoriesList, setCategoriesList ] = useState( [] );
		const categorySuggestions = categoriesList.reduce(
			( accumulator, category ) => ( {
				...accumulator,
				[ category.name ]: category,
			} ),
			{}
		);
		const [ excludedCategoriesList, setExcludedCategoriesList ] = useState( [] );
		const excludedCategorySuggestions = excludedCategoriesList.reduce(
			( accumulator, category ) => ( {
				...accumulator,
				[ category.name ]: category,
			} ),
			{}
		);

		/**
		 * Return a function for selecting categories.
		 */
		const createSelectCategories = ( suggestions, setter ) => {
			return ( tokens ) => {
				const hasNoSuggestion = tokens.some(
					( token ) =>
						typeof token === 'string' && ! suggestions[ token ]
				);
				if ( hasNoSuggestion ) {
					return;
				}
				// Categories that are already will be objects, while new additions will be strings (the name).
				// allCategories normalizes the array so that they are all objects.
				const allCategories = tokens.map( ( token ) => {
					return typeof token === 'string'
						? suggestions[ token ]
						: token;
				} );
				// We do nothing if the category is not selected
				// from suggestions.
				if ( allCategories.includes( null ) ) {
					return false;
				}
				setter( allCategories );
			};
		};

		const isStillMounted = useRef();

		/**
		 * Prepopulate the list of categories and users to select from.
		 *
		 * (Copied from the core/latest-posts block.)
		 */
		useEffect( () => {
			isStillMounted.current = true;

			apiFetch( {
				path: addQueryArgs( '/wp/v2/categories', { per_page: -1 } ),
			} )
				.then( ( data ) => {
					if ( isStillMounted.current ) {
						setCategoriesList( data );
						setExcludedCategoriesList( data );
					}
				} )
				.catch( () => {
					if ( isStillMounted.current ) {
						setCategoriesList( [] );
						setExcludedCategoriesList( [] );
					}
				} );
			apiFetch( {
				path: addQueryArgs( '/wp/v2/users', { per_page: -1 } ),
			} )
				.then( ( data ) => {
					if ( isStillMounted.current ) {
						setAuthorList( data );
					}
				} )
				.catch( () => {
					if ( isStillMounted.current ) {
						setAuthorList( [] );
					}
				} );

			return () => {
				isStillMounted.current = false;
			};
		}, [] );

		return (
			<div { ...blockProps } >
				<InspectorControls>
					<PanelBody title={ __( 'Sorting and filtering' ) }>
						<QueryControls
							{ ...{
								order,
								orderBy,
							} }
							authorList={ authorList }
							categorySuggestions={ categorySuggestions }
							numberOfItems={ postsToShow }
							selectedAuthorId={ selectedAuthor }
							selectedCategories={ categories }
							onAuthorChange={
								( value ) => setAttributes( {
									selectedAuthor: value !== '' ? Number( value ) : undefined,
								} )
							}
							onCategoryChange={ createSelectCategories( categorySuggestions, ( allCategories ) => setAttributes( { categories: allCategories } ) ) }
							onNumberOfItemsChange={ ( postsToShow ) => setAttributes( { postsToShow } ) }
							onOrderByChange={ ( orderBy ) => setAttributes( { orderBy } ) }
							onOrderChange={ ( order ) => setAttributes( { order } ) }
						/>
					</PanelBody>

				</InspectorControls>
				<InspectorAdvancedControls>
					<FormTokenField
						key="query-controls-categories-select"
						label={ __( 'Excluded Categories' ) }
						maxSuggestions={ 20 }
						suggestions={ Object.keys( excludedCategorySuggestions ) }
						value={ excludedCategories &&
							excludedCategories.map( ( item ) => ( {
								id: item.id,
								value: item.name || item.value,
							} ) ) }
						onChange={ createSelectCategories( excludedCategorySuggestions, ( allCategories ) => setAttributes( { excludedCategories: allCategories } ) ) }
					/>
				</InspectorAdvancedControls>
				<ServerSideRender
					attributes={ attributes }
					block={ metadata.name }
				/>
			</div>
		);
	},

	/**
	 * Save nothing, to allow for server-side rendering.
	 */
	save: function () {
		return null;
	},
} );

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
