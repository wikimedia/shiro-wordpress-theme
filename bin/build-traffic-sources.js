/**
 * Build the referrer lists the donate-link traffic source classifier uses.
 *
 * The data comes from the Matomo searchengine-and-social-list package (CC0).
 * The output is generated and git-ignored; `npm run build`, `start` and `test`
 * run this script first.
 */
const fs = require( 'fs' );
const path = require( 'path' );
const yaml = require( 'js-yaml' );

const packageDir = path.dirname( require.resolve( 'searchengine-and-social-list/package.json' ) );
const outFile = path.join( __dirname, '../assets/src/scripts/modules/traffic-sources.json' );

const load = file => yaml.safeLoad( fs.readFileSync( path.join( packageDir, file ), 'utf8' ) );
const clean = patterns => [ ...new Set( patterns.map( pattern => String( pattern ).toLowerCase() ) ) ].sort();

// AIAssistants.yml and Socials.yml map a name to a list of host patterns.
const hostLists = file => clean( Object.values( load( file ) ).flat() );

// SearchEngines.yml maps a name to a list of definitions, each with a `urls` list.
const searchUrls = clean(
	Object.values( load( 'SearchEngines.yml' ) ).flatMap( definitions => definitions.flatMap( definition => definition.urls ) )
);

const sources = {
	ai: hostLists( 'AIAssistants.yml' ),
	search: searchUrls,
	social: hostLists( 'Socials.yml' ),
};

fs.writeFileSync( outFile, JSON.stringify( sources ) + '\n' );
