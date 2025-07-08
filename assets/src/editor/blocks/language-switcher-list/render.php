<?php
/**
 * The language switcher list in the primary nav.
 *
 * @link    https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package shiro
 */

$is_editor = $attributes['isEditor'] ?? false;

$translations = array_filter( wmf_get_translations(), function ( $translation ) {
	return ! empty( $translation['uri'] );
} );

if ( empty( $translations ) && ! $is_editor ) {
	return '';
}
?>

<ul class="language-switcher__content">
	<?php foreach ( $translations as $translation ) : ?>
		<li class="language-switcher__language <?php echo $translation['selected'] ? 'language-switcher__language--selected' : ''; ?>" lang="<?php echo esc_attr( $translation['shortname'] ); ?>">
			<a href="<?php echo esc_url( $translation['uri'] ); ?>">
				<span class="language-switcher__language-name">
					<?php echo esc_html( $translation['name'] ); ?>
				</span>
			</a>
		</li>
	<?php endforeach ?>
</ul>

<?php
