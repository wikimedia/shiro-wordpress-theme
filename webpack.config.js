/**
 * This Webpack config augments the default wp-scripts "build" command with
 * custom logic to properly process all of Shiro's existing code modules.
 */
const { resolve, basename } = require( 'path' );
const { globSync } = require( 'glob' );
const CopyPlugin = require( 'copy-webpack-plugin' );

// Import the original config from the @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Import the helper to find and generate the entry points in the src directory
const { getWebpackEntryPoints } = require( '@wordpress/scripts/utils/config' );

/**
 * Generate an absolute file system path relative to the working dir.
 *
 * @param {string} relPath Relative path.
 * @returns {string} Absolute path.
 */
const filePath = ( relPath ) => resolve( process.cwd(), relPath );

/**
 * Get a list of valid source files within the provided directory path.
 *
 * @param {string} globPath Project-relative glob path string.
 * @returns {string[]} Array of full file paths.
 */
const listFilesFrom = ( globPath ) => globSync( globPath )
	// Limit to JS and CSS files.
	.filter( ( relPath ) => /\.(jsx?|s?css)/.test( relPath) )
	.map( ( relPath ) => resolve( process.cwd(), relPath ) );

// Build three different sets of entries, which get different filename treatment.

/** Block entries generated by wp-scripts helper. */
const blockEntries = getWebpackEntryPoints();

/** Bundles migrated from Shiro legacy Gulp build. */
const legacyEntries = {
	datavis: listFilesFrom( 'assets/src/datavisjs/*' ),
	// Render each shortcode to individual file.
	...listFilesFrom( 'assets/src/shortcodejs/*' )
		.reduce( ( entries, path ) => ( {
			...entries,
			[ basename( path ).replace( /\.(.*)$/, '' ) ]: path,
		} ), {} ),
	scripts: listFilesFrom( 'assets/src/js/**/*.js' ),
};

/** Bundles migrated from 1st-gen Shiro Webpack build. */
const hashedEntries = {
	shiro: './assets/src/scripts/shiro.js',
	editor: './assets/src/editor/index.js',
	'blocks/clock': './assets/src/editor/blocks/clock/view.js',
};

// Extend webpack config to add entrypoints.
module.exports = {
	...defaultConfig,
	entry: {
		...blockEntries,
		...legacyEntries,
		...hashedEntries,
   	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			// Mapping for files used within migrated Webpack bundles.
			'sass-lib': filePath( 'assets/src/sass' ),
		},
	},
	output: {
		...defaultConfig.output,
		/**
		 * Map each entry to the correct filename format.
		 *
		 * (We upgraded the build process without wanting to completely re-wire the
		 * entire asset loading throughout the theme; this is the "comapat layer".)
		 *
		 * @param {PathData} pathData Webpack pathData object.
		 * @returns {string} Filename string format.
		 */
		filename( { chunk } ) {
			if ( Object.keys( legacyEntries ).includes( chunk.name ) ) {
				return '[name].min.js';
			}

			if ( Object.keys( hashedEntries ).includes( chunk.name ) ) {
				return '[name]-[chunkhash].js';
			}

			// WP-Scripts default is to use asset.php for hash string, not filename.
			return '[name].js';
		},
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin( {
			patterns: [
				{
					from: filePath( 'assets/src/fonts' ),
					to: filePath( 'assets/dist/fonts' ),
				},
				{
					from: filePath( 'assets/src/admin-copy' ),
					to: filePath( 'assets/dist/admin' ),
				},
				{
					from: filePath( 'assets/src/images' ),
					to: filePath( 'assets/dist/images' ),
				},
				{
					from: filePath( 'assets/src/libs' ),
					to: filePath( 'assets/dist' ),
				},
				{
					from: filePath( 'assets/src/svg/spritesheet' ),
					to: filePath( 'assets/dist' ),
				},
			],
		} ),
	],
};