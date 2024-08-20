/**
 * This Webpack config augments the default wp-scripts "build" command with
 * custom logic to properly process all of Shiro's existing code modules.
 *
 * It is focused on maintaining filename parity with the existing build where
 * possible, while combining as many build processes into one Webpack command
 * as we possibly can.
 */
const { resolve, basename, dirname } = require( 'path' );
const { globSync } = require( 'glob' );
const { optimize } = require( 'webpack' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' );
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const { WebpackManifestPlugin } = require( 'webpack-manifest-plugin' );

// Import the original config from the @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Import the helper to find and generate the entry points in the src directory
const { getWebpackEntryPoints } = require( '@wordpress/scripts/utils/config' );

const isProduction = process.env.NODE_ENV === 'production';

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

// Build four different sets of entries, which get different filename treatment.

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

const themeStylesheets = {
	style: './assets/src/sass/style.scss',
	'editor-style': './assets/src/sass/editor-style.scss',
};

// Targeted adjustment to disable some problematic filename alteration.
// Altering style imports to be `[group]-[chunkName]` (e.g. style-editor.css)
// is unnecessarily magic and breaks existing code.
defaultConfig.optimization.splitChunks.cacheGroups.style.name =  ( _, chunks, cacheGroupKey ) => {
	return chunks[ 0 ].name;
};

// Do not process some url() imports in SCSS: The files are not located
// properly for relative import the way the css-loader expects, and it
// would slow down the build too much if they were.
// Iterate through rules until we find one that applies to SCSS, to avoid
// hard-coding WP config index specificity into our override.
defaultConfig.module.rules.forEach( ( rule ) => {
	if ( ! rule.test.test( 'file.scss' ) ) {
		return;
	}
	// We've isolated SCSS build.
	rule.use.forEach( ( loader ) => {
		if ( ! /\/css-loader/.test( loader.loader ) ) {
			return;
		}
		// We've found the CSS loader itself. Options should be defined,
		// but let's ensure it is, just in case.
		loader.options = {
			...loader.options,
			url: {
				/**
				 * Do not process url() statements for assets used in the legacy CSS files.
				 *
				 * @see https://webpack.js.org/loaders/css-loader/#url
				 *
				 * @param {string} url Path to asset referenced via url().
				 * @returns {boolean} Whether to process with loader.
				 */
				filter( url ) {
					return ! /assets\/(dist|src|fonts)/.test( url );
				},
			},
		};
	} );
} );

/**
 * Map each entry to the correct filename format.
 *
 * (We upgraded the build process without wanting to completely re-wire the
 * entire asset loading throughout the theme; this is the "comapat layer".)
 *
 * @param {PathData} pathData Webpack pathData object.
 * @returns {string} Filename string format.
 */
const setConditionalOutputFilename = ( { chunk } ) => {
	if ( Object.keys( legacyEntries ).includes( chunk.name ) ) {
		return '[name].min.js';
	}

	if ( Object.keys( hashedEntries ).includes( chunk.name ) ) {
		return '[name]-[chunkhash].js';
	}

	// WP-Scripts default is to use asset.php for hash string, not filename.
	return '[name].js';
};

/**
 * Generate the CSS version of each contextually-appropriate output filename.
 *
 * @param {PathData} pathData Webpack pathData object.
 * @returns {string} Filename string format.
 */
const setExtractedCssFilename = ( pathData ) => {
	return setConditionalOutputFilename( pathData ).replace( /\.js$/, '.css' );
};

// Extend webpack config to add entrypoints.
module.exports = {
	...defaultConfig,
	entry: {
		...blockEntries,
		...legacyEntries,
		...hashedEntries,
		...themeStylesheets,
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
		filename: setConditionalOutputFilename,
		chunkFilename: '[name]-[contenthash].js',
		// See https://webpack.js.org/migrate/5/#run-a-single-build-and-follow-advice
		publicPath: '',
	},
	// Customize plugins to better control generated CSS filenames.
	plugins: [
		new WebpackManifestPlugin( {
			fileName: `${ isProduction ? 'production' : 'development' }-asset-manifest.json`,
			writeToFileEmit: true,
			map: ( file ) => {
				// Work around an issue  https://github.com/romainberger/webpack-rtl-plugin/issues/14
				// to make sure an RTL file has a separate entry in the manifest.
				if ( ( /-rtl\.css$/ ).test( file.path ) ) {
					file.name = file.name.replace( '.css', '-rtl.css' );
				}
				return file;
			},
		} ),
		...defaultConfig.plugins.map( ( plugin ) => {
			// Use our own versions of the MiniCSSExtract and RtlCSS plugins to
			// control generation of output filenames more closely.
			if ( plugin instanceof MiniCSSExtractPlugin ) {
				return new MiniCSSExtractPlugin( {
					filename: setExtractedCssFilename,
					chunkFilename: setExtractedCssFilename,
				} );
			}
			if ( plugin instanceof RtlCssPlugin ) {
				return new RtlCssPlugin( {
					filename: ( pathData ) => setExtractedCssFilename( pathData )
						.replace( /\.css$/, '-rtl.css' ),
				} );
			}
			return plugin;
		} ),
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

if (
	process.env.WEBPACK_SERVE === 'true' &&
	process.argv.includes( '--hot' )
) {
	// Running in hot-reloading mode: customize the exported configuration
	// to set a single runtime chunk (necessary for HMR to work across multiple
	// block / theme bundles at once) and allow devServer access from all hosts.
	// YOU MAY ALSO NEED TO INSTALL AND ACTIVATE THE GUTENBERG PLUGIN.
	module.exports.devServer = {
		...module.exports.devServer,
		allowedHosts: 'all',
		proxy: { '/assets/dist': { pathRewrite: { '^/assets/dist': '' } } }
	};
	module.exports.optimization = {
		...module.exports.optimization,
		runtimeChunk: 'single',
	};
}
