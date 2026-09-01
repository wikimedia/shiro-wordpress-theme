/**
 * ESLint flat config.
 *
 * wp-scripts 34 runs ESLint 9 in flat-config mode and ignores the legacy
 * `.eslintrc` / `.eslintignore`, so the theme's ignores and rule overrides
 * live here instead. Built on wp-scripts' own bundled config.
 */

const globals = require( 'globals' );
const wpConfig = require( '@wordpress/scripts/config/eslint.config.cjs' );

module.exports = [
	// Ignores (replaces .eslintignore). wp-scripts' base ignores build/ but this
	// theme builds to assets/dist/, which must be excluded or ESLint chokes on
	// the minified output.
	{
		ignores: [
			'assets/dist/**',
			'assets/src/libs/**',
			'assets/src/datavisjs/libraries/**',
			'**/vendor/**',
			'**/node_modules/**',
			'gulpfile.js',
		],
	},

	...wpConfig,

	{
		languageOptions: {
			globals: { ...globals.browser },
		},
		rules: {
			// wp-scripts externalises @wordpress/* and react at build time, so they
			// are not resolvable node modules — don't flag their imports.
			'import/no-unresolved': [ 'error', { ignore: [ '^@wordpress/', '^react$', '^react-dom' ] } ],
			'import/no-extraneous-dependencies': 'off',
			// Overrides carried over from the previous .eslintrc.
			'prettier/prettier': 'off',
			'jsdoc/no-undefined-types': 'off',
			'jsdoc/check-line-alignment': 'warn',
			'jsdoc/check-tag-names': 'warn',
			'jsdoc/check-types': 'warn',
		},
	},
];
