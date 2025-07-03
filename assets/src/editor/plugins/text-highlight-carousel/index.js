import { __ } from '@wordpress/i18n';
import { Icon, funnel as funnelIcon } from '@wordpress/icons';
import {
	registerFormatType,
	unregisterFormatType,
	toggleFormat,
} from '@wordpress/rich-text';

import { RichTextToolbarButton } from '@wordpress/block-editor';

const formatType = 'shiro/text-highlight-carousel';

/**
 * Render the button to toggle this format.
 *
 * @param {Object}   props          React component props.
 * @param {bool}     props.isActive Whether the format is currently applied.
 * @param {Function} props.onChange Callback to change the value.
 * @param {bool}     props.value    The format type.
 *
 * @return {React.ReactNode} Rendered toolbar button.
 */
const TextHighlightCarouselFormatButton = ( { isActive, onChange, value } ) => {
	return (
		<RichTextToolbarButton
			icon={ <Icon icon={ funnelIcon } /> }
			title={ __( 'Text Highlight Carousel', 'shiro-admin' ) }
			onClick={ () => {
				onChange(
					toggleFormat( value, {
						type: formatType,
					} )
				);
			} }
			isActive={ isActive }
		/>
	);
};

registerFormatType( formatType, {
	title: 'Text Highlight Carousel',
	tagName: 'span',
	className: 'text-highlight-carousel',
	edit: TextHighlightCarouselFormatButton,
} );

if ( module.hot ) {
	module.hot.accept();
	module.hot.dispose( () => {
		unregisterFormatType( formatType );
	} );
}
