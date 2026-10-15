import { classifyVisit } from '../traffic-source';

const HOST = 'wikimediafoundation.org';

describe( 'classifyVisit', () => {
	it.each( [
		[ 'Google', 'https://www.google.com/', '', 'search' ],
		[ 'Google with a country TLD', 'https://www.google.co.uk/search?q=x', '', 'search' ],
		[ 'Bing', 'https://www.bing.com/', '', 'search' ],
		[ 'DuckDuckGo', 'https://duckduckgo.com/', '', 'search' ],
		[ 'Facebook mobile', 'https://m.facebook.com/', '', 'social' ],
		[ 'Facebook web', 'https://www.facebook.com/', '', 'social' ],
		[ 'LinkedIn', 'https://www.linkedin.com/', '', 'social' ],
		[ 'ChatGPT', 'https://chatgpt.com/', '', 'ai' ],
		[ 'Gemini, which also lives on a Google host', 'https://gemini.google.com/app', '', 'ai' ],
		[ 'Grok, which also lives on a social host', 'https://x.com/i/grok', '', 'ai' ],
		[ 'Wikipedia', 'https://en.wikipedia.org/wiki/Foo', '', 'wikimedia' ],
		[ 'another site', 'https://example.org/post', '', 'referral' ],
		[ 'no referrer', '', '', 'direct' ],
		[ 'this site', `https://${ HOST }/about/`, '', null ],
		[ 'paid medium over a search referrer', 'https://www.google.com/', '?utm_medium=CPC', 'paid' ],
		[ 'email medium', '', '?utm_medium=email', 'email' ],
		[ 'AI utm_source without a referrer', '', '?utm_source=chatgpt.com', 'ai' ],
	] )( '%s', ( name, referrer, search, expected ) => {
		expect( classifyVisit( { referrer, search, host: HOST } ) ).toBe( expected );
	} );
} );
