/**
 * Remove specific Appearance Tools settings.
 *
 * This filter removes settings added through add_theme_support( 'appearance-tools' ).
 * We remove all settings with the exception of background image.
 *
 * @param {Object} settings     The block settings object.
 * @param {string} settingsName The name of the settings being modified.
 * @param {string} clientId     The block id.
 * @param {string} blockName    The block name.
 *
 * @returns {object} The updated block settings object.
 */
const filterAppearanceSettings = ( settings, settingsName, clientId, blockName ) => {
	// Disable these Appearance Tools settings.
	const disabledBlockSettings = [
		'border.color',
		'border.radius',
		'border.style',
		'border.width',
		'color.link',
		'dimensions.minHeight',
		'position.sticky',
		'spacing.blockGap',
		'spacing.margin',
		'spacing.padding',
		'typography.lineHeight',
	];

	if ( disabledBlockSettings.includes( settingsName ) ) {
		return false;
	}

	return settings;
};

export const filters = [
	{
		hook: 'blockEditor.useSetting.before',
		namespace: 'shiro/filter-appearance-settings',
		callback: filterAppearanceSettings,
	},
];
