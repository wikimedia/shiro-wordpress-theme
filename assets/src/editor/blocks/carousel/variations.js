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
	{
		name: 'shiro/carousel-video',
		title: __( 'Video carousel' ),
		description: __(
			'Carousel block containing videos.'
		),
		attributes: {
			align: 'wide',
			layout: 'carousel-video',
			loop: true,
			perPage: 3,
		},
		isActive: blockAttributes =>
			blockAttributes.layout === 'carousel-video',
	}
];

export default variations;
