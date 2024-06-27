<?php
/**
 * Adds a list of Roles
 *
 * @package shiro
 */

$post_list = $args;

if ( empty( $post_list ) ) {
	return;
}

foreach ( $post_list as $term_id => $term_data ) {
	$name        = ! empty( $term_data['name'] ) ? $term_data['name'] : '';
	$description = term_description( $term_id, 'role' );
	$button      = get_term_meta( $term_id, 'role_button', true );
	$executives  = get_term_meta( $term_id, 'role_executive', true );
	$experts     = get_term_meta( $term_id, 'role_experts', true );
	$term        = get_term( $term_id, 'role' );
	$term_slug   = $term->slug;
	$name        = ( is_wp_error( $term ) || empty( $term->parent ) ) ? '' : $name;
	$class       = 'role__section wysiwyg';

	// Avoided using short ternaries
	$executives_title = get_term_meta( $term_id, 'role_executive_title_override', true );
	if ( ! $executives_title ) {
		$executives_title = __( 'Department Executive', 'shiro' );
	}

	$experts_title = get_term_meta( $term_id, 'role_experts_title_override', true );
	if ( ! $experts_title ) {
		$experts_title = __( 'Department Experts', 'shiro' );
	}

	// If there is only one executive, it needs to be an array, not a string.
	if ( is_string( $executives ) && ! empty( $executives ) ) {
		$executives = [ $executives ];
	}

	if ( ! empty( $name ) && ! is_tax( 'role', $term_id ) ) {
		$class = $class . ' has-h2';
	}
	?>

<section class="<?php echo esc_attr( $class ); ?>">

	<?php if ( ! empty( $name ) && ! is_tax( 'role', $term_id ) ) : ?>
	<h2 class="role__heading" id="<?php echo esc_attr( $term_slug ); ?>">
		<?php echo esc_html( $name ); ?>
	</h2>
	<?php endif; ?>

	<?php
	if ( ! empty( $description ) ) {
		echo wp_kses_post( $description );
	}
	?>

	<?php
	if ( is_tax( 'role', 'staff-contractors' ) && ! ( empty( $executives ) && empty( $experts ) ) ) {
		if ( ! empty( $executives ) ) {
			?>
		<h3 class="role__staff-title__executive is-style-h4">
			<?php echo esc_html( $executives_title ); ?>
		</h3>
		<ul class="role__staff-list">
			<?php
			// Sort $executives based on $profile_order.
			usort( $executives, function( $a, $b ) {
				$order_a = get_post_meta( $a, '_post_order', true );
				$order_b = get_post_meta( $b, '_post_order', true );

				// If `_post_order` is not set or empty, set a very large number, so they stay at the end.
				$order_a = empty( $order_a ) ? PHP_INT_MAX : intval( $order_a );
				$order_b = empty( $order_b ) ? PHP_INT_MAX : intval( $order_b );

				// Compare the order values.
				if ( $order_a === $order_b ) {
					return 0;
				}

				// Compare numeric values
				return ( $order_a < $order_b ) ? -1 : 1;
			});

			foreach ( $executives as $executive_id ) {
				get_template_part(
					'template-parts/profiles/role',
					'item',
					array(
						'id'   => $executive_id,
						'role' => 'executive',
					)
				);
			}
			?>
		</ul>
			<?php
		}

		if ( ! empty( $experts ) ) {
			?>
		<h3 class="role__staff-title__experts is-style-h4">
			<?php echo esc_html( $experts_title ); ?>
		</h3>
		<ul class="role__staff-list">
			<?php
			// Sort $executives based on $profile_order.
			usort( $executives, function( $a, $b ) {
				$order_a = get_post_meta( $a, '_post_order', true );
				$order_b = get_post_meta( $b, '_post_order', true );

				// If `_post_order` is not set or empty, set a very large number, so they stay at the end.
				$order_a = empty( $order_a ) ? PHP_INT_MAX : intval( $order_a );
				$order_b = empty( $order_b ) ? PHP_INT_MAX : intval( $order_b );

				// Compare the order values.
				if ( $order_a === $order_b ) {
					return 0;
				}

				// Compare numeric values
				return ( $order_a < $order_b ) ? -1 : 1;
			});

			foreach ( $experts as $expert_id ) {
				get_template_part(
					'template-parts/profiles/role',
					'item',
					array(
						'id'   => $expert_id,
						'role' => 'expert',
					)
				);
			}
			?>
		</ul>
			<?php
		}
	} else {
		if ( ! empty( $term_data ) ) {

			// Sort term_data['posts'] based on $profile_order.
			usort( $term_data['posts'], function( $a, $b ) {
				$order_a = get_post_meta( $a, '_post_order', true );
				$order_b = get_post_meta( $b, '_post_order', true );

				// If `_post_order` is not set or empty, set a very large number, so they stay at the end.
				$order_a = empty( $order_a ) ? PHP_INT_MAX : intval( $order_a );
				$order_b = empty( $order_b ) ? PHP_INT_MAX : intval( $order_b );

				// Compare the order values.
				if ( $order_a === $order_b ) {
					return 0;
				}

				// Compare numeric values.
				return ( $order_a < $order_b ) ? -1 : 1;
			});
			?>
		<ul class="role__staff-list">
			<?php
			foreach ( $term_data['posts'] as $term_data_post_id ) {
				get_template_part(
					'template-parts/profiles/role',
					'item',
					array(
						'id' => $term_data_post_id,
					)
				);
			}
			?>
		</ul>
			<?php
		}

		if ( ! empty( $term_data['children'] ) ) {
			?>
			<div>
				<?php
				foreach ( $term_data['children'] as $child_term_id => $child_term_data ) {
					$name        = ! empty( $child_term_data['name'] ) ? $child_term_data['name'] : '';
					$description = term_description( $child_term_id, 'role' );

					if ( empty( $child_term_data['posts'] ) ) {
						continue;
					}

					if ( ! empty( $name ) ) : ?>
					<h3 class="role__staff-title__nested">
						<?php echo esc_html( $name ); ?>
					</h3>
					<?php endif; ?>

					<?php
					if ( ! empty( $description ) ) {
						echo wp_kses_post( $description );
					}
					?>

					<ul class="role__staff-list">
						<?php
						foreach ( $child_term_data['posts'] as $post_id ) {
							get_template_part(
								'template-parts/profiles/role',
								'item',
								array(
									'id' => $post_id,
								)
							);
						}
						?>
					</ul>

					<?php
				}
				?>
			</div>
			<?php
		}
	}
	?>

	<?php
	if ( ! empty( $button['link_to_archive'] ) && ! is_tax( 'role', $term_id ) ) {
		$link_text = ! empty( $button['text'] )
			? $button['text']
			: sprintf(
				/* translators: The name of the current taxonomy. */
				__( 'View full %s team', 'shiro' ),
				$name
			);
		$link_url  = ! empty( $button['link'] ) ? $button['link'] : get_term_link( $term_id, 'role' );
		?>
		<div class="role__read-more">
			<a href="<?php echo esc_url( $link_url ); ?>" class="arrow-link">
				<?php echo esc_html( $link_text ); ?>
			</a>
		</div>
		<?php
	}
	?>

</section>
	<?php
}
?>
