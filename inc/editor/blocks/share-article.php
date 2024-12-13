<?php
/**
 * Server-side registration for the shiro/share-article block.
 */

namespace WMF\Editor\Blocks\ShareArticle;

const BLOCK_NAME = 'shiro/share-article';

/**
 * Bootstrap this block functionality.
 */
function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

/**
 * Register the block here.
 */
function register_block() {
	register_block_type(
		BLOCK_NAME,
		[
			'apiVersion'      => 2,
			'render_callback' => __NAMESPACE__ . '\\render_block',
		]
	);
}

/**
 * Render this block, given its attributes.
 *
 * @param [] $attributes Block attributes.
 * @return string HTML markup.
 */
function render_block( $attributes ) {
	$enable_twitter = $attributes['enableTwitter'] ?? true;
	$enable_facebook = $attributes['enableFacebook'] ?? true;
	$enable_linkedin = $attributes['enableLinkedIn'] ?? true;
	$enable_mail = $attributes['enableMail'] ?? true;


	if ( ! $enable_twitter && ! $enable_facebook && ! $enable_linkedin && ! $enable_mail ) {
		return '';
	}

	ob_start()
	?>
		<div class="share-button-container share-article">
			<button 
				class="share-button"  
				aria-expanded="false" 
				aria-controls="shareOptionsList"
			>
				<span class="share-icon" aria-hidden="true">
				<?php wmf_show_icon( 'social-share' ); ?> Share
				</span>
			</button>
			<div 
				class="share-options"  
				role="menu" 
				aria-labelledby="shareButton" 
				hidden
			>
				<?php if ( $enable_facebook ) : ?>
				<a href="<?php echo esc_url( wmf_get_share_url( 'facebook' ) ); ?>" class="share-option" role="menuitem" tabindex="-1" data-platform="Facebook" target="_blank" rel="noreferrer noopener">
					<?php wmf_show_icon( 'social-facebook-blue' ); ?> Facebook
				</a>
				<?php endif; ?>
				<?php if ( $enable_twitter ) : ?>
				<a href="<?php echo esc_url( wmf_get_share_url( 'twitter' ) ); ?>" class="share-option" role="menuitem" tabindex="-1" data-platform="Twitter" target="_blank" rel="noreferrer noopener">
					<?php wmf_show_icon( 'social-twitter-blue' ); ?> Twitter
				</a>
				<?php endif; ?>
				<?php if ( $enable_linkedin ) : ?>
				<a href="<?php echo esc_url( wmf_get_share_url( 'linkedin' ) ); ?>" class="share-option" role="menuitem" tabindex="-1" data-platform="LinkedIn" target="_blank" rel="noreferrer noopener">
					<?php wmf_show_icon( 'social-linkedin-blue' ); ?> LinkedIn
				</a>
				<?php endif; ?>
				<?php if ( $enable_mail ) : ?>
				<a href="<?php echo esc_url( wmf_get_share_url( 'email' ) ); ?>" class="share-option" role="menuitem" tabindex="-1" data-platform="Email" target="_blank" rel="noreferrer noopener">
					<?php wmf_show_icon( 'mail-blue' ); ?> Email
				</a>
				<?php endif; ?>
				<button class="share-option copy-link" role="menuitem" tabindex="-1">
					<?php wmf_show_icon( 'social-link' ); ?><?php echo esc_html__( 'Copy Link', 'shiro-admin' );?>
				</button>
				<span class="copy-feedback" aria-live="polite" hidden><?php echo esc_html__( 'Link copied!', 'shiro-admin' );?></span>
			</div>
		</div>

	<?php
	return ob_get_clean();
}
