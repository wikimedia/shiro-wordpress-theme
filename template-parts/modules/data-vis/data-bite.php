<?php
/**
 * Handles simple stat with explanatory text
 *
 * @package shiro
 */

$template_args = $args;

if ( empty( $template_args['heading'] ) ) {
	return;
}

$icon = ! empty( $template_args['image'] ) ? $template_args['image'] : '';
$icon = is_numeric( $icon ) ? wp_get_attachment_image_url( $icon ) : $icon;

$allowed_tags = array(
	'span'   => array(
		'class' => array(),
		'style' => array(),
	),
	'em'     => array(),
	'strong' => array(),
	'a'      => array(
		'href'  => array(),
		'class' => array(),
		'title' => array(),
		'rel'   => array(),
	),
	'p'      => array(),
	'br'     => array(),
	'sup'    => array(),
);

?>

<h2 class="h2">
	<?php if ( ! empty( $template_args['image'] ) ) { ?>
		<span class="icon-container" style="background-image: url(<?php echo esc_url( $icon ); ?>)"></span>
	<?php } ?>
	<?php echo esc_html( $template_args['heading'] ); ?>
</h2>
<?php echo wp_kses( $template_args['desc'], $allowed_tags ); ?>
