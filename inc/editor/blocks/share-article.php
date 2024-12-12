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
	$enable_linkedin= $attributes['enableLinkedIn'] ?? true;
	$enable_mail = $attributes['enableMail'] ?? true;


	if ( ! $enable_twitter && ! $enable_facebook ) {
		return '';
	}

	ob_start()
	?>
		<div class="share-button-container">
			<button 
				class="share-button" 
				id="shareButton" 
				aria-expanded="false" 
				aria-controls="shareOptions"
			>
				<span class="share-icon" aria-hidden="true">
				<?php wmf_show_icon( 'social-share' ); ?>
				</span>
				<span class="share-text">
					Share
				</span>
			</button>
			<div 
				class="share-options" 
				id="shareOptions" 
				role="menu" 
				aria-labelledby="shareButton" 
				hidden
			>
				<a href="#" class="share-option" role="menuitem" tabindex="-1" data-platform="Facebook">
					<?php wmf_show_icon( 'social-facebook-blue' ); ?> Facebook
				</a>
				<a href="#" class="share-option" role="menuitem" tabindex="-1" data-platform="Twitter">
					<?php wmf_show_icon( 'social-twitter-blue' ); ?> Twitter
				</a>
				<a href="#" class="share-option" role="menuitem" tabindex="-1" data-platform="LinkedIn">
				<?php wmf_show_icon( 'social-linkedin-blue' ); ?> LinkedIn
				</a>
				<a href="#" class="share-option" role="menuitem" tabindex="-1" data-platform="Email">
					<?php wmf_show_icon( 'mail-blue' ); ?> Email
				</a>
				<button class="share-option copy-link" role="menuitem" tabindex="-1">
					<?php wmf_show_icon( 'social-link' ); ?> Copy Link
				</button>
				<span class="copy-feedback" aria-live="polite" hidden>Link copied!</span>
			</div>
		</div>

	<?php
	return ob_get_clean();
}
