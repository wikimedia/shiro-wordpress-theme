<?php
/**
 * The template for displaying search form.
 *
 * @package shiro
 */

$wmf_search_button      = get_theme_mod( 'wmf_search_button_copy', __( 'Search', 'shiro-admin' ) );
$wmf_search_placeholder = get_theme_mod( 'wmf_search_placeholder_copy', __( 'Search', 'shiro-admin' ) );
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="search-form__label">
		<span class="screen-reader-text"><?php echo esc_html_x( 'Search for:', 'label', 'shiro' ); ?></span>
		<input type="search"
			class="search-form__field"
			placeholder="<?php echo esc_attr( $wmf_search_placeholder ); ?>"
			value="<?php echo get_search_query(); ?>" name="s"
			title="<?php echo esc_attr_x( 'Search for:', 'label', 'shiro' ); ?>" />
	</label>
	<button type="submit" class="search-form__button">
		<span class="screen-reader-text"><?php echo esc_html( $wmf_search_button ); ?></span>
		<?php wmf_show_icon( 'search', 'search-form__icon' ); ?>
	</button>
</form>
