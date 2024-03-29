const { helpers, externals, presets } = require( '@humanmade/webpack-helpers' );

const { choosePort, cleanOnExit, filePath } = helpers;
const { addSvgr } = require( './shared' );

// Clean up manifests on exit.
cleanOnExit( [
	filePath( 'assets/dist/asset-manifest.json' ),
] );

module.exports = choosePort( 8080 ).then( ( port ) => [
	addSvgr( presets.development( {
		name: 'editor',
		externals,
		devServer: {
			port,
		},
		entry: {
			editor: filePath( 'assets/src/editor/index.js' ),
			// Include these standalone block view.js files in the editor build
			// configuration so they may use the block editor's externals.
			'blocks/clock': filePath( 'assets/src/editor/blocks/clock/view.js' ),
		},
		output: {
			chunkFormat: 'array-push',
			path: filePath( 'assets/dist' ),
			publicPath: `http://localhost:${port}/shiro-blocks/`,
		},
		resolve: {
			alias: {
				'sass-lib': filePath( 'assets/src/sass/' ),
			},
		},
	} ) ),
	presets.development( {
		name: 'theme',
		devServer: {
			port,
		},
		entry: {
			shiro: filePath( 'assets/src/scripts/shiro.js' ),
		},
		output: {
			chunkFormat: 'array-push',
			path: filePath( 'assets/dist' ),
			publicPath: `http://localhost:${port}/shiro-theme/`,
		},
	} ),
]
);
