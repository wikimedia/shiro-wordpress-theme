<?php
/**
 * Display the three menus that appear in the footer.
 *
 * @package shiro
 */

$default_args = array(
	'menu_class' => 'site-footer__navmenu',
	'container'  => '',
	'items_wrap' => '<nav class="%2$s"><ul>%3$s</ul></nav>',
);

$menus = array(
	array(
		'label'    => \WMF\Customizer\Footer::defaults( 'wmf_projects_menu_label' ),
		'location' => 'footer-projects',
		'args'     => array(
			'theme_location' => 'footer-projects',
		),
	),
	array(
		'label'    => \WMF\Customizer\Footer::defaults( 'wmf_movement_affiliates_menu_label' ),
		'location' => 'footer-affiliates',
		'args'     => array(
			'theme_location' => 'footer-affiliates',
		),
	),
	array(
		'label'    => \WMF\Customizer\Footer::defaults( 'wmf_other_links_menu_label' ),
		'location' => 'footer-legal',
		'args'     => array(
			'theme_location' => 'footer-legal',
		),
	),
); ?>

<div class="site-footer__navigation">

	<?php 
	foreach ( $menus as $menu ) {
		if ( has_nav_menu( $menu['location'] ?? '' ) ) {
			$args = array_merge( $default_args, $menu['args'] ?? array() );
			?>
			<div class="site-footer__navigation-section site-footer__navigation-section--<?php echo esc_attr( $menu['location'] ); ?>">
				<h2><?php echo esc_html( $menu['label'] ); ?></h2>
				<?php wp_nav_menu( $args ); ?>
			</div>
			<?php
		}
	}
	?>

</div>
