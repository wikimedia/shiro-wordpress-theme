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
	$role            = get_the_terms( get_the_ID(), 'role' );
	$default_heading = get_theme_mod( 'wmf_related_profiles_heading', __( 'Other members of ', 'shiro' ) );
	$team_name       = '';
	$parent_name     = $role[0]->name;
	$parent_link     = get_term_link( $role[0] );
    $connected_user = get_post_meta( get_the_ID(), 'connected_user', true );

	if ( ! empty( $role ) && ! is_wp_error( $role ) ) {
		$team_name = $role[0]->name;
		$ancestors = get_ancestors( $role[0]->term_id, 'role' );
		$parent_id = is_array( $ancestors ) ? end( $ancestors ) : false;

		if ( $parent_id ) {
			$parent_term = get_term( $parent_id );
			$parent_name = $parent_term->name;
			$parent_link = get_term_link( $parent_id );
		}
	}

	wmf_get_template_part(
		'template-parts/header/profile-single',
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

	<div class="mw-980 mar-bottom">
		<div class="flex flex-medium flex-space-between mar-bottom_lg">
			<div class="w-48p">
				<?php
				wmf_get_template_part(
					'template-parts/thumbnail-framed',
					array(
						'inner_image'     => get_post_thumbnail_id( get_the_ID() ),
						'container_class' => '',
					)
				);
				?>
				<?php if ( ! empty( $share_links ) || ! empty( connected_user ) ) : ?>
				<div class="rise-up side-list">
				<?php if ( ! empty( $share_links ) ) : ?>
					<?php
					foreach ( $share_links as $link ) :

						?>
					<span class="link-list mar-right">
						<?php
						$img = "";
						if ( is_int(strpos($link['link'],'meta.wikimedia.org') ) ) {
							$img = "/wp-content/themes/shiro/assets/src/svg/globe.svg";
						}
						if ( is_int(strpos($link['link'],'mailto')) ) {
							$img = "/wp-content/themes/shiro/assets/src/svg/email.svg";
						}
						if ( is_int(strpos($link['link'],'wikipedia.org')) ) {
							$img = "/wp-content/themes/shiro/assets/src/svg/individual/wikipedia.svg";
						}
						if ( is_int(strpos($link['link'],'/news/')) ) {
							$img = "/wp-content/themes/shiro/assets/src/svg/individual/wikimedia-blue.svg";
						}
						?>
						<p class="bold profile-contacts"><a href="<?php echo strpos( $link['link'], 'mailto' ) !== false ? esc_url( 'mailto:' . antispambot( str_replace( 'mailto:', '', $link['link'] ) ) ) : esc_url( $link['link'] ); ?>">
							<img src="<?php echo esc_url($img); ?>" alt="">
							<?php echo esc_html( $link['title'] ); ?>
						</a></p>
					</span>
					<?php endforeach; ?>
				<?php endif; ?>
				<?php if ( ! empty( $connected_user ) ) : ?>
                    <?php
						$authorimg = "/wp-content/themes/shiro/assets/src/svg/edit-ltr.svg";
						if ( is_rtl() ) {
							$authorimg = "/wp-content/themes/shiro/assets/src/svg/edit-rtl.svg";
						}
                        $authorlink = wmf_get_author_link( $connected_user );
                        $authorlinkcopy = sprintf( __( 'Posts by %s', 'shiro' ), get_the_title() );
                    ?>
                    <span class="link-list mar-right">
                    <p class="bold profile-contacts"><a href="/news/author/<?php echo esc_attr( $authorlink ); ?>">
							<img src="<?php echo esc_url($authorimg); ?>" alt="">
							<?php echo esc_html( $authorlinkcopy ); ?>
						</a></p>
                    </span>
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
	$template_args                  = get_post_meta( get_the_ID(), 'profiles', true );
	$template_args['profiles_list'] = wmf_get_related_profiles( get_the_ID() );
	$template_args['headline']      = ! empty( $template_args['headline'] ) ? $template_args['headline'] : $default_heading . $team_name;
	wmf_get_template_part( 'template-parts/modules/profiles/list', $template_args );
endwhile;
Credits::get_instance()->resume();

get_template_part( 'template-parts/page/page', 'listings' );

get_template_part( 'template-parts/profiles/related-posts' );

get_footer();
