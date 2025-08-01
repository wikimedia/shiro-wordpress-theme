import { __ } from '@wordpress/i18n';

// Register a new align-buttons-bottom block style for the column block.
export const name = 'core/columns',
	styles = [
		{
			name: 'align-buttons-bottom',
			label: __( 'Align buttons bottom', 'shiro' ),
		},
		{
			name: 'separators-between',
			label: __( 'Separators between', 'shiro' ),
		},
	];
