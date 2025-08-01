<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package shiro
 */

use WMF\Images\Credits;

get_header();

while ( have_posts() ) :
	the_post();

	?>

	<?php
	$roles           = get_the_terms( get_the_ID(), 'role' );
	$default_heading = get_theme_mod( 'wmf_related_profiles_heading', __( 'Other members of ', 'shiro-admin' ) );
	$team_name       = '';
	$parent_name    = $roles[0]->name;
	$parent_link    = get_term_link( $roles[0] );
	$connected_user = get_post_meta( get_the_ID(), 'connected_user', true );

	if ( ! empty( $roles ) && ! is_wp_error( $roles ) ) {
		$team_name  = $roles;
		$ancestors  = get_ancestors( $roles[0]->term_id, 'role' );

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$referer_id = isset( $_GET['referer'] ) ? absint( $_GET['referer'] ) : null;
		$referer_link = get_term_link( $referer_id );

		// Check if referer query parameter is set to determine $parent_id before lookup for ancestors.
		if ( ! empty( $referer_link ) && ! is_wp_error( $referer_link ) ) {
			$parent_id = $referer_id;
		} else {
			$parent_id = is_array( $ancestors ) ? end( $ancestors ) : false;
		}

		if ( $parent_id ) {
			$parent_term = get_term( $parent_id );
			$parent_name = $parent_term->name;
			$parent_link = get_term_link( $parent_id );
		}
	}

	get_template_part(
		'template-parts/header/profile',
		'single',
		array(
			'back_to_link'  => $parent_link,
			'back_to_label' => $parent_name,
			'role'          => get_post_meta( get_the_ID(), 'profile_role', true ),
			'team_name'     => $team_name,
			'share_links'   => get_post_meta( get_the_ID(), 'contact_links', true ),
		)
	);

	$share_links = get_post_meta( get_the_ID(), 'contact_links', true );
	?>

	<div class="alignwide mar-bottom">
		<div class="flex flex-medium flex-space-between mar-bottom_lg">
			<div class="w-48p">
				<?php
				get_template_part(
					'template-parts/thumbnail',
					'framed',
					array(
						'inner_image'     => get_post_thumbnail_id( get_the_ID() ),
						'container_class' => '',
					)
				);
				?>
				<?php if ( ! empty( $share_links ) || ! empty( $connected_user ) ) : ?>
				<div class="rise-up side-list">
					<?php if ( ! empty( $share_links ) ) : ?>
						<?php
						foreach ( $share_links as $link ) :
							if ( empty( $link['link'] ) ) {
								continue;
							}
							?>
					<div class="link-list mar-right">
							<?php
							// Avoid undefined array index warnings.
							$link['link']  = $link['link'] ?? '';
							$link['title'] = $link['title'] ?? '';

							$img = '';
							if ( is_int( strpos( $link['link'], 'meta.wikimedia.org' ) ) ) {
								$img = get_template_directory_uri() . '/assets/src/svg/globe.svg';
							}
							if ( is_int( strpos( $link['link'], 'mailto' ) ) ) {
								$img = get_template_directory_uri() . '/assets/src/svg/email.svg';
							}
							if ( is_int( strpos( $link['link'], 'wikipedia.org' ) ) ) {
								$img = get_template_directory_uri() . '/assets/src/svg/individual/wikipedia.svg';
							}
							if ( is_int( strpos( $link['link'], '/news/' ) ) ) {
								$img = get_template_directory_uri() . '/assets/src/svg/individual/wikimedia-blue.svg';
							}
							?>
						<div class="bold profile-contacts">
							<?php if ( isset( $link['link'] ) ) : ?>
							<a href="<?php echo strpos( $link['link'], 'mailto' ) !== false ? esc_url( 'mailto:' . antispambot( str_replace( 'mailto:', '', $link['link'] ) ) ) : esc_url( $link['link'] ); ?>">
							<?php endif; ?>
								<img src="<?php echo esc_url( $img ); ?>" alt="">
								<?php echo esc_html( $link['title'] ); ?>
							<?php if ( isset( $link['link'] ) ) : ?>
							</a>
							<?php endif; ?>
						</div>
					</div>
						<?php endforeach; ?>
				<?php endif; ?>
					<?php if ( ! empty( $connected_user ) ) : ?>
						<?php
						$authorimg = get_template_directory_uri() . '/assets/src/svg/edit-ltr.svg';
						if ( is_rtl() ) {
							$authorimg = get_template_directory_uri() . '/assets/src/svg/edit-rtl.svg';
						}
						$authorlink = wmf_get_author_link( $connected_user );
						$authorlinkcopy = sprintf( /* translators: 1. post title */ __( 'Posts by %s', 'shiro' ), get_the_title() );
						?>
					<div class="link-list mar-right">
						<div class="bold profile-contacts">
							<a href="/news/author/<?php echo esc_attr( $authorlink ); ?>">
							<img src="<?php echo esc_url( $authorimg ); ?>" alt="">
							<?php echo esc_html( $authorlinkcopy ); ?>
							</a>
						</div>
					</div>
				<?php endif; ?>
				</div>
				<?php endif; ?>
			</div>
			<div class="w-50p">
				<div class="article-main mod-margin-bottom wysiwyg">
					<?php the_content(); ?>
				</div>
			</div>
		</div>
	</div>

	<?php

	get_template_part( 'template-parts/page/page', 'offsite-links' );

	Credits::get_instance()->pause();

	$template_args = get_post_meta( get_the_ID(), 'profiles', true );
	if ( ! is_array( $template_args ) ) {
		$template_args = [];
	}

	$template_args['profiles_list'] = wmf_get_related_profiles( get_the_ID() );
	$template_args['headline']      = ! empty( $template_args['headline'] ) ? $template_args['headline'] : $default_heading . $roles[0]->name;
	get_template_part( 'template-parts/modules/profiles/list', null, $template_args );
endwhile;
Credits::get_instance()->resume();

get_template_part( 'template-parts/page/page', 'listings' );

get_template_part( 'template-parts/profiles/related-posts' );

get_footer();
