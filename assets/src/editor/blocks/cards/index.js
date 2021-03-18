import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import './style.scss';

const template = [
	[ 'shiro/card' ],
	[ 'shiro/card' ],
	[ 'shiro/card' ],
	[ 'shiro/card' ],
];

export const
	name = 'shiro/cards',
	settings = {
		apiVersion: 2,
		title: __( 'Cards', 'shiro' ),
		attributes: {},

		/**
		 * Render edit of the card block.
		 */
		edit: function EditCardBlock() {
			const blockProps = useBlockProps();

			return (
				<div { ...blockProps }>
					<InnerBlocks
						allowedBlocks={ [ 'shiro/card' ] }
						template={ template }
					/>
				</div>
			);
		},

		/**
		 * Render save of the card block.
		 */
		save: function SaveCardBlock( { attributes } ) {
			const blockProps = useBlockProps.save();

			return (
				<div { ...blockProps }>
					<InnerBlocks.Content />
				</div>
			);
		},
	};
