<?php
/**
 * Callback for server-side rendering for the blog-list block.
 *
 * @param array $attributes Parsed block attributes.
 *
 * @return string HTML markup.
 */

$enable_twitter = ( ! empty( $attributes['enableTwitter'] ) && ! empty( wmf_get_share_url( 'twitter' ) ) ) ? true : false;
$enable_bluesky = ( ! empty( $attributes['enableBluesky'] ) && ! empty( wmf_get_share_url( 'bluesky' ) ) ) ? true : false;
$enable_facebook = ( ! empty( $attributes['enableFacebook'] ) && wmf_get_share_url( 'facebook' ) ) ? true : false;
$enable_linkedin = ( ! empty( $attributes['enableLinkedIn'] ) && wmf_get_share_url( 'linkedin' ) ) ? true : false;
$enable_mail = $attributes['enableEmail'] ? true : false;
$enable_link = $attributes['enableCopyLink'] ? true : false;

if ( $enable_twitter || $enable_bluesky || $enable_facebook || $enable_linkedin || $enable_mail || $enable_link ) :
	?>
		<div class="share-button-container share-article">
			<button
				class="share-button"
				aria-expanded="false"
				aria-controls="shareOptionsList"
			>
				<span class="share-icon" aria-hidden="true">
				<?php wmf_show_icon( 'social-share-arrow' ); ?>
				</span>
				Share
			</button>
			<div
				class="share-options"
				role="menu"
				aria-labelledby="shareButton"
				hidden
			>
				<?php if ( $enable_facebook ) : ?>
				<a href="<?php echo esc_url( wmf_get_share_url( 'facebook' ) ); ?>" class="share-option" role="menuitem" tabindex="-1" data-platform="Facebook" target="_blank" rel="noreferrer noopener">
					<?php wmf_show_icon( 'social-facebook-round-blue' ); ?> Facebook
				</a>
				<?php endif; ?>
				<?php if ( $enable_twitter ) : ?>
				<a href="<?php echo esc_url( wmf_get_share_url( 'twitter' ) ); ?>" class="share-option" role="menuitem" tabindex="-1" data-platform="Twitter" target="_blank" rel="noreferrer noopener">
					<?php wmf_show_icon( 'social-twitter-blue' ); ?> Twitter
				</a>
				<?php endif; ?>
				<?php if ( $enable_bluesky ) : ?>
				<a href="<?php echo esc_url( wmf_get_share_url( 'bluesky' ) ); ?>" class="share-option" role="menuitem" tabindex="-1" data-platform="Bluesky" target="_blank" rel="noreferrer noopener">
					<?php wmf_show_icon( 'social-bluesky-blue' ); ?> Bluesky
				</a>
				<?php endif; ?>
				<?php if ( $enable_linkedin ) : ?>
				<a href="<?php echo esc_url( wmf_get_share_url( 'linkedin' ) ); ?>" class="share-option" role="menuitem" tabindex="-1" data-platform="LinkedIn" target="_blank" rel="noreferrer noopener">
					<?php wmf_show_icon( 'social-linkedin-blue' ); ?> LinkedIn
				</a>
				<?php endif; ?>
				<?php if ( $enable_mail ) : ?>
				<a href="<?php echo esc_url( wmf_get_share_url( 'email' ) ); ?>" class="share-option" role="menuitem" tabindex="-1" data-platform="Email" target="_blank" rel="noreferrer noopener">
					<?php wmf_show_icon( 'social-mail-blue' ); ?> Email
				</a>
				<?php endif; ?>
				<?php if ( $enable_link ) : ?>
					<button class="share-option copy-link" role="menuitem" tabindex="-1">
						<?php wmf_show_icon( 'social-link-blue' ); ?><?php echo esc_html__( 'Copy Link', 'shiro' ); ?>
					</button>
					<span class="copy-feedback" aria-live="polite" hidden><?php echo esc_html__( 'Link copied', 'shiro' ); ?></span>
				<?php endif; ?>
			</div>
		</div>
	<?php
endif;
