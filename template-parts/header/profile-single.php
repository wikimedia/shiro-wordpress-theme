<?php
/**
 * Adds Header for single profile pages.
 *
 * @package shiro
 */

$profile_header_data = $args;

$back_to_link = ! empty( $profile_header_data['back_to_link'] ) ? $profile_header_data['back_to_link'] : '';
$staff_name   = ! empty( $profile_header_data['back_to_label'] ) ? $profile_header_data['back_to_label'] : '';
$team_name    = ! empty( $profile_header_data['team_name'] ) ? $profile_header_data['team_name'] : false;
$role_name    = ! empty( $profile_header_data['role'] ) ? $profile_header_data['role'] : false;
$share_links  = ! empty( $profile_header_data['share_links'] ) ? $profile_header_data['share_links'] : '';
$team_url     = get_term_link( $team_name[0]->term_id, $team_name[0]->taxonomy );
$team_link    = is_string( $team_url ) ? '<a href="' . esc_url( $team_url ) . '">' . esc_html( $team_name[0]->name ) . '</a>' : '';
$role_desc    = join( ', ', array_filter( array( $role_name, $team_link ) ) );

if ( is_countable( $team_name ) && count( $team_name ) > 1 ) {
	$role_array = array();

	foreach ( $team_name as $team ) {
		$url = get_term_link( $team->term_id, $team->taxonomy );
		if ( is_string( $url ) ) {
			$role_array[] = '<a href="' . esc_url( $url ) . '">' . esc_html( $team->name ) . '</a>';
		}
	}

	$role_desc = $role_name;
	$role_team = join( ', ', $role_array );
}

?>

<div class="header-main header-role">
	<div class="header-content">
		<h2 class="h4 eyebrow">
			<?php if ( ! empty( $back_to_link ) && is_string( $back_to_link ) ) : ?>
			<a class="back-arrow-link" href="<?php echo esc_url( $back_to_link ); ?>">
			<?php endif; ?>
				<?php echo esc_html( $staff_name ); ?>
			<?php if ( ! empty( $back_to_link ) && is_string( $back_to_link ) ) : ?>
			</a>
			<?php endif; ?>
		</h2>

		<h1><?php the_title(); ?></h1>

		<p class="post-meta">
			<?php echo wp_kses_post( $role_desc ); ?>

			<?php if ( is_countable( $team_name ) && count( $team_name ) > 1 ) : ?>
			<span class="post-meta-team">
				<?php echo wp_kses_post( $role_team ); ?>
			</span>
			<?php endif; ?>
		</p>
	</div>
</div>

</div>
</div><!-- Close out the secondary header. -->

<main id="content" class="module-area is-layout-constrained has-global-padding">
