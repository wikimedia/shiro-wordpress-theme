const { helpers, externals, plugins, presets } = require( '@humanmade/webpack-helpers' );
const { filePath } = helpers;
const { copy, clean, manifest, miniCssExtract } = plugins;
const WebpackRTLPlugin = require( 'webpack-rtl-plugin' );

module.exports = [
	presets.production( {
		name: 'editor',
		externals: {
			'shiro_theme_dir_uri': 'shiro_theme_dir_uri',
			...externals,
		},
		entry: {
			editor: filePath( 'assets/src/editor/index.js' ),
		},
		output: {
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
					{ from: filePath( 'assets/src/fonts' ), to: filePath( 'assets/dist/fonts' ) },
					{ from: filePath( 'assets/src/admin-copy' ), to: filePath( 'assets/dist/admin' ) },
					{ from: filePath( 'assets/src/images' ), to: filePath( 'assets/dist/images' ) },
					{ from: filePath( 'assets/src/libs' ), to: filePath( 'assets/dist' ) }
				]
			} ),
		],
		resolve: {
			alias: {
				"sass-lib": filePath('assets/src/sass/css/scss/')
			}
		}
	} ),
	presets.production({
		name: 'theme',
		entry: {
			shiro: filePath( 'assets/src/scripts/shiro.js' ),
		},
		output: {
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
		]
	})
]
