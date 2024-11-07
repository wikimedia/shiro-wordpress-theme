/**
 * Autoload and require all block editor functionality.
 */
import { autoloadPlugins } from 'block-editor-hmr';
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

// List of non-autoloaded blocks.
import * as collapsibleText from './blocks/collapsible-text';
import * as contact from './blocks/contact';
import * as coreButton from './blocks/core-button';
import * as coreColumns from './blocks/core-columns';
import * as coreGroup from './blocks/core-group';
import * as coreHeading from './blocks/core-heading';
import * as coreParagraph from './blocks/core-paragraph';
import * as coreQuote from './blocks/core-quote';
import * as doubleHeading from './blocks/double-heading';
import * as externalLink from './blocks/external-link';
import * as filterColorSupport from './blocks/filter-color-support';
import * as homePageHero from './blocks/home-page-hero';
import * as inlineLanguages from './blocks/inline-languages';
import * as landingPageHero from './blocks/landing-page-hero';
import * as linkedTableOfContents from './blocks/linked-table-of-contents';
import * as linkedTocColumns from './blocks/linked-toc-columns';
import * as linkedTocItem from './blocks/linked-toc-item';
import * as mailchimpSubscribe from './blocks/mailchimp-subscribe';
import * as profile from './blocks/profile';
import * as profileList from './blocks/profile-list';
import * as readMoreCategories from './blocks/read-more-categories';
import * as reportLandingHero from './blocks/report-landing-hero';
import * as shareArticle from './blocks/share-article';
import * as spotlight from './blocks/spotlight';
import * as stair from './blocks/stair';
import * as stairs from './blocks/stairs';
import * as tableOfContents from './blocks/table-of-contents';
import * as tocColumns from './blocks/toc-columns';
import * as tweetThis from './blocks/tweet-this';
import * as unseenArtist from './blocks/unseen-artist';
import * as unseenFacts from './blocks/unseen-facts';
import * as unseenFooter from './blocks/unseen-footer';
import * as unseenIntro from './blocks/unseen-intro';

import './style.scss';

const blocks = [
	collapsibleText,
	contact,
	coreButton,
	coreColumns,
	coreGroup,
	coreHeading,
	coreParagraph,
	coreQuote,
	doubleHeading,
	externalLink,
	filterColorSupport,
	homePageHero,
	inlineLanguages,
	landingPageHero,
	linkedTableOfContents,
	linkedTocColumns,
	linkedTocItem,
	mailchimpSubscribe,
	profile,
	profileList,
	readMoreCategories,
	reportLandingHero,
	shareArticle,
	spotlight,
	stair,
	stairs,
	tableOfContents,
	tocColumns,
	tweetThis,
	unseenArtist,
	unseenFacts,
	unseenFooter,
	unseenIntro,
];

for ( const blockModule of blocks ) {
	const { name, settings, filters, styles } = blockModule;

	if ( ( name || settings?.name ) && settings ) {
		registerBlockType( ( name || settings?.name ), settings );
	}

	if ( filters && Array.isArray( filters ) ) {
		filters.forEach( ( { hook, namespace, callback } ) => {
			addFilter( hook, namespace, callback );
		} );
	}

	if ( styles && Array.isArray( styles ) ) {
		styles.forEach( ( style ) => registerBlockStyle( name, style ) );
	}
}

// Load all plugin index files.
autoloadPlugins(
	{ getContext: () => require.context( './plugins', true, /index\.js$/ ) },
	( context, loadModules ) => {
		if ( module.hot ) {
			module.hot.accept( context.id, loadModules );
		}
	}
);
