const WebpackRTLPlugin = require( '@automattic/webpack-rtl-plugin' );
const { helpers, externals, plugins, presets } = require( '@humanmade/webpack-helpers' );
const { filePath } = helpers;
const { copy, clean, miniCssExtract } = plugins;

const { addSvgr } = require( './shared' );

module.exports = [
	addSvgr( presets.production( {
		name: 'editor',
		externals,
		entry: {
			editor: filePath( 'assets/src/editor/index.js' ),
			// Include these standalone block view.js files in the editor build
			// configuration so they may use the block editor's externals.
			'blocks/clock': filePath( 'assets/src/editor/blocks/clock/view.js' ),
		},
		output: {
			chunkFormat: 'array-push',
			chunkLoading: false,
			wasmLoading: false,
			path: filePath( 'assets/dist' ),
			filename: './[name]-[chunkhash].js',
		},
		plugins: [
			clean( {
				cleanOnceBeforeBuildPatterns: [ 'editor-*' ],
			} ),
			miniCssExtract( {
				filename: './[name]-[chunkhash].css',
			} ),
			new WebpackRTLPlugin(),
			copy( {
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
				],
			} ),
		],
		resolve: {
			alias: {
				'sass-lib': filePath( 'assets/src/sass/' ),
			},
		},
	} ) ),
	presets.production( {
		name: 'theme',
		entry: {
			shiro: filePath( 'assets/src/scripts/shiro.js' ),
		},
		output: {
			chunkFormat: 'array-push',
			chunkLoading: false,
			wasmLoading: false,
			path: filePath( 'assets/dist' ),
			filename: './[name]-[chunkhash].js',
		},
		plugins: [
			clean( {
				cleanOnceBeforeBuildPatterns: [ 'shiro-*' ],
			} ),
			miniCssExtract( {
				filename: './[name]-[chunkhash].css',
			} ),
			new WebpackRTLPlugin(),
		],
	} ),
];
