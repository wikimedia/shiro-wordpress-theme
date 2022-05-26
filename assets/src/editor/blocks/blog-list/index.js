/**
 * Block for implementing the blog-list component.
 */

/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, QueryControls } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

import './style.scss';

const parseLinkHeader = require( 'parse-link-header' );

export const name = 'shiro/blog-list';

export const settings = {
	title: __( 'Blog list', 'shiro-admin' ),

	category: 'wikimedia',

	apiVersion: 2,

	icon: 'list-view',

	description: __(
		'Dynamic list of recent posts',
		'shiro-admin'
	),

	attributes: {
		postsToShow: {
			type: 'integer',
			default: 2,
		},
		categories: {
			type: 'array',
			items: {
				type: 'object',
			},
		},
		order: {
			type: 'string',
			default: 'desc',
		},
		orderBy: {
			type: 'string',
			default: 'date',
		},
		selectedAuthor: {
			type: 'number',
		},
		fetchUrlBase: {
			type: 'string',
		},
	},

	/**
	 * Edit component used to manage featured image and page intro.
	 */
	edit: function BlockListEdit( { attributes, setAttributes } ) {
		const {
			postsToShow,
			categories,
			order,
			orderBy,
			selectedAuthor,
			fetchUrlBase,
		} = attributes;

		const blockProps = useBlockProps( {
			className: 'blog-list',
		} );

		const [ categoriesList, setCategoriesList ] = useState( [] );
		const [ authorList, setAuthorList ] = useState( [] );
		const categorySuggestions = categoriesList.reduce(
			( accumulator, category ) => ( {
				...accumulator,
				[ category.name ]: category,
			} ),
			{}
		);

		/**
		 * Handle selecting a category from the list.
		 *
		 * (Copied from the core/latest-posts block.)
		 */
		const selectCategories = tokens => {
			const hasNoSuggestion = tokens.some(
				token =>
					typeof token === 'string' && ! categorySuggestions[ token ]
			);
			if ( hasNoSuggestion ) {
				return;
			}
			// Categories that are already will be objects, while new additions will be strings (the name).
			// allCategories nomalizes the array so that they are all objects.
			const allCategories = tokens.map( token => {
				return typeof token === 'string'
					? categorySuggestions[ token ]
					: token;
			} );
			// We do nothing if the category is not selected
			// from suggestions.
			if ( allCategories.includes( null ) ) {
				return false;
			}
			setAttributes( { categories: allCategories } );
		};

		const isStillMounted = useRef();

		/**
		 * Build args for apiFetch, based on the presence of a remote url base.
		 */
		const fetchRemote = async ( path, args ) => {
			const params = new URLSearchParams( args );

			let test = 'http://wikimedia.local/wp-json';
			if ( test ) {
				path = `${test}${path}`;
			}
			const url = new URL( `${path}?${params}` );
			const response = await window.fetch( url );
			if ( response.ok ) {
				let extra = {};
				if ( response.headers && response.headers.get( 'Link' ) ) {
					const link = parseLinkHeader( response.headers.get( 'Link' ) );
					if ( link && link.next ) {
						extra = {
							...extra,
							next: link.next.url,
						};
					}
				}
				const jsonValue = await response.json();
				return Promise.resolve( {
					response: jsonValue,
					extra,
				} );
			} else {
				return Promise.reject( `Could not resolve ${path}` );
			}
		};

		/**
		 *
		 */
		const getAllFetched = ( path, args, setResultList ) => {
			fetchRemote( path, args )
				.then( ( { response, extra } )  => {
					if ( isStillMounted.current ) {
						setResultList( oldList => [ ...oldList, ...response ] );
						if ( extra.next ) {
							// If there are more categories, get them as well.
							const nextUrl = new URL( extra.next );
							getAllFetched( path, nextUrl.searchParams.entries(), setResultList );
						}
					}
				} )
				.catch( () => {
					if ( isStillMounted.current ) {
						setResultList( [] );
					}
				} );
		};

		/**
		 * Prepopulate the list of categories and users to select from.
		 *
		 * (Copied from the core/latest-posts block.)
		 */
		useEffect( () => {
			isStillMounted.current = true;
			getAllFetched( '/wp/v2/categories/', { per_page: 30 }, setCategoriesList );
			getAllFetched( '/wp/v2/users/', { per_page: 30 }, setAuthorList );

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
								value => setAttributes( {
									selectedAuthor: value !== '' ? Number( value ) : undefined,
								} )
							}
							onCategoryChange={ selectCategories }
							onNumberOfItemsChange={ postsToShow => setAttributes( { postsToShow } ) }
							onOrderByChange={ orderBy => setAttributes( { orderBy } ) }
							onOrderChange={ order => setAttributes( { order } ) }
						/>
					</PanelBody>

				</InspectorControls>
				<ServerSideRender
					attributes={ attributes }
					block={ name }
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
};
