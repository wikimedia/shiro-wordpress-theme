import {
	headingLevel2,
	headingLevel3,
	headingLevel4,
	headingLevel5,
	headingLevel6
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

export const headingIcons = {
	h2: headingLevel2,
	h3: headingLevel3,
	h4: headingLevel4,
	h5: headingLevel5,
	h6: headingLevel6,
};

export const controls = [
	{
		tag: 'h2',
		label: __( 'Heading 2', 'shiro-admin' ),
	},
	{
		tag: 'h3',
		label: __( 'Heading 3', 'shiro-admin' ),
	},
	{
		tag: 'h4',
		label: __( 'Heading 4', 'shiro-admin' ),
	},
	{
		tag: 'h5',
		label: __( 'Heading 5', 'shiro-admin' ),
	},
	{
		tag: 'h6',
		label: __( 'Heading 6', 'shiro-admin' ),
	}
];
