/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * Block for sharing an article on Twitter, Facebook, LinkedIn, or via Email, with a Copy Link option.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { ReactComponent as FacebookIcon } from '../../../svg/individual/social-facebook-blue.svg';
import { ReactComponent as TwitterIcon } from '../../../svg/individual/social-twitter-blue.svg';
import { ReactComponent as BlueskyIcon } from '../../../svg/individual/social-bluesky-blue.svg';
import { ReactComponent as LinkedInIcon } from '../../../svg/individual/social-linkedin-blue.svg';
import { ReactComponent as EmailIcon } from '../../../svg/individual/mail-blue.svg';
import { ReactComponent as LinkIcon } from '../../../svg/individual/social-link.svg';
import { ReactComponent as ShareIcon } from '../../../svg/individual/social-share.svg';

import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,

	/**
	 * Edit component for managing social share settings.
	 */
	edit: function ShareArticleBlock( { attributes, setAttributes } ) {
		const {
			enableTwitter,
			enableBluesky,
			enableFacebook,
			enableLinkedIn,
			enableEmail,
			enableCopyLink,
		} = attributes;

		const blockProps = useBlockProps( {
			className: 'share-article',
		} );

		return (
			<div { ...blockProps }>
				{ ( ! enableTwitter && ! enableBluesky && ! enableFacebook && ! enableLinkedIn && ! enableEmail && ! enableCopyLink ) && (
					<small>{ __( '(No social share will be shown)', 'shiro-admin' ) }</small>
				) }
				<div className="share-button-container share-article">
					<button
						className="share-button"
						aria-expanded="false"
						aria-controls="shareOptionsList"
					>
						<span className="share-icon" aria-hidden="true">
							<ShareIcon /> { __( 'Share', 'shiro-admin') }
						</span>
					</button>
					<Disabled>
						<div
							className="share-options"
							role="menu"
							aria-labelledby="shareButton"
							hidden
						>
							{ enableTwitter && (
								<div className="share-article__link">
									<a
										href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<TwitterIcon />
									</a>
								</div>
							) }

							{ enableBluesky && (
								<div className="share-article__link">
									<a
										href={`https://bsky.app/intent/compose?text=${encodeURIComponent(window.location.href)}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<BlueskyIcon />
									</a>
								</div>
							) }

							{ enableFacebook && (
								<div className="share-article__link">
									<a
										href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<FacebookIcon />
									</a>
								</div>
							) }

							{ enableLinkedIn && (
								<div className="share-article__link">
									<a
										href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<LinkedInIcon />
									</a>
								</div>
							) }

							{ enableEmail && (
								<div className="share-article__link">
									<a
										href={`mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(window.location.href)}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<EmailIcon />
									</a>
								</div>
							) }

							{ enableCopyLink && (
								<div
									className="share-article__link share-article__copy-link"
									role="button"
									tabIndex="0"
								>
									<LinkIcon />
									<span className="screen-reader-text">
										{ __( 'Copy Link', 'shiro-admin' ) }
									</span>
								</div>
							) }
						</div>
				</Disabled>
				</div>
				<InspectorControls>
					<PanelBody initialOpen title={ __( 'Social settings', 'shiro-admin' ) }>
						<ToggleControl
							checked={ enableTwitter }
							label={ __( 'Enable Twitter share', 'shiro-admin' ) }
							onChange={ ( enableTwitter ) => setAttributes( { enableTwitter } ) }
						/>
						<ToggleControl
							checked={ enableBluesky }
							label={ __( 'Enable Bluesky share', 'shiro-admin' ) }
							onChange={ ( enableBluesky ) => setAttributes( { enableBluesky } ) }
						/>
						<ToggleControl
							checked={ enableFacebook }
							label={ __( 'Enable Facebook share', 'shiro-admin' ) }
							onChange={ ( enableFacebook ) => setAttributes( { enableFacebook } ) }
						/>
						<ToggleControl
							checked={ enableLinkedIn }
							label={ __( 'Enable LinkedIn share', 'shiro-admin' ) }
							onChange={ ( enableLinkedIn ) => setAttributes( { enableLinkedIn } ) }
						/>
						<ToggleControl
							checked={ enableEmail }
							label={ __( 'Enable Email share', 'shiro-admin' ) }
							onChange={ ( enableEmail ) => setAttributes( { enableEmail } ) }
						/>
						<ToggleControl
							checked={ enableCopyLink }
							label={ __( 'Enable Copy Link', 'shiro-admin' ) }
							onChange={ ( enableCopyLink ) => setAttributes( { enableCopyLink } ) }
						/>
					</PanelBody>
				</InspectorControls>
			</div>
		);
	},

	/**
	 * Save the share article block, it's a dynamic block.
	 */
	save: function Save( { attributes } ) {
		return null;
	},
} );

// Block HMR boilerplate.
if ( module.hot ) {
	module.hot.accept();
	const { deregister, refresh } = require( '../../helpers/hot-blocks.js' );
	module.hot.dispose( deregister( metadata.name ) );
	refresh( metadata.name, module.hot.data );
}
