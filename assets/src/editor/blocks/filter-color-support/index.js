/**
 * Remove text color selection ability from all blocks with color pickers.
 *
 * Enforces that all content created uses the theme-defined color combinations,
 * so that editors can't select a clashing or unreadable combination of text
 * and background colors.
 *
 * The text color in all cases should be set intelligently based on the
 * background color to preserve WCAG AA contrast requirements for accessibility.
 */

/**
 * Remove the "text" property from the block supports for all blocks that
 * support the color picker.
 *
 * @param {Object} settings Block registration settings.
 */
const removeTextColorSelection = ( settings ) => {

	if ( ! settings.supports?.color ) {
		return settings;
	}

	return {
		...settings,

		supports: {
			...settings.supports,

			color: {
				...settings.supports.color,

				text: false,
			},
		},
	};
};

export const filters = [
	{
		hook: 'blocks.registerBlockType',
		namespace: 'shiro/color-supports',
		callback: removeTextColorSelection,
	},
];
