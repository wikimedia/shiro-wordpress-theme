/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'shiro/carousel-posts',
		title: __( 'News carousel' ),
		description: __(
			'Carousel block containing a query loop of news posts.'
		),
		attributes: {
			align: 'wide',
			layout: 'carousel-posts',
			perPage: 3,
		},
		isActive: blockAttributes =>
			blockAttributes.layout === 'carousel-posts',
	},
];

export default variations;
