<?php
/**
 * Fieldmanager Fields for Profile Post Type
 *
 * @package shiro
 */

/**
 * Add fields to profile post type.
 */
function wmf_profile_fields() {
	$last_name = new Fieldmanager_Textfield(
		array(
			'label'       => __( 'Sort Name', 'shiro-admin' ),
			'description' => __( 'Profiles are sorted on staff pages in alphabetical order based on this field.', 'shiro-admin' ),
			'name'        => 'last_name',
		)
	);

	$last_name->add_meta_box( __( 'Sorting', 'shiro-admin' ), 'profile', 'normal', 'high' );

	$contact_links = new Fieldmanager_Group(
		array(
			'label'          => __( 'Contact Link', 'shiro-admin' ),
			'name'           => 'contact_links',
			'add_more_label' => __( 'Add Contact Link', 'shiro-admin' ),
			'sortable'       => true,
			'limit'          => 0,
			'children'       => array(
				'title' => new Fieldmanager_Textfield( __( 'Link Title', 'shiro-admin' ) ),
				'link'  => new Fieldmanager_Link( __( 'Link', 'shiro-admin' ) ),
			),
		)
	);

	$contact_links->add_meta_box( __( 'List of Contact Links', 'shiro-admin' ), 'profile' );

	$info = new Fieldmanager_Group(
		array(
			'name'           => 'profile_info',
			'label'          => __( 'Profile Info', 'shiro-admin' ),
			'serialize_data' => false,
			'add_to_prefix'  => false,
			'children'       => array(
				'profile_role'     => new Fieldmanager_Textfield( __( 'Role', 'shiro-admin' ) ),
				'profile_featured' => new Fieldmanager_Checkbox( __( 'Featured?', 'shiro-admin' ) ),
			),
		)
	);
	$info->add_meta_box( __( 'Profile Info', 'shiro-admin' ), 'profile' );

	$user = new Fieldmanager_Autocomplete(
		array(
			'name'       => 'connected_user',
			'datasource' => new Fieldmanager_Datasource_Post(
				array(
					'query_args' => array(
						'post_type' => 'guest-author',
					),
				)
			),
		)
	);
	$user->add_meta_box( __( 'Connected User', 'shiro-admin' ), 'profile' );
}
add_action( 'fm_post_profile', 'wmf_profile_fields' );

/**
 * Add fields for the role taxonomy
 */
function wmf_role_fields() {
	$display_intro = new Fieldmanager_Checkbox(
		array(
			'name'        => 'display_intro',
			'description' => __( 'Should the archive for this role display an intro section? This uses the text from Appearance > Customize > Profile Pages > Profiles List Page Text', 'shiro-admin' ),
		)
	);

	$display_intro->add_term_meta_box( __( 'Display Intro?', 'shiro-admin' ), 'role' );


	$featured_term = new Fieldmanager_Checkbox(
		array(
			'name'        => 'featured_term',
			'description' => __( 'Should this role be featured at the top of the parent archive page?', 'shiro-admin' ),
		)
	);

	$featured_term->add_term_meta_box( __( 'Featured Term?', 'shiro-admin' ), 'role' );


	$role_order = new Fieldmanager_TextField(
		array(
			'name'          => 'role_order',
			'input_type'    => 'number',
			'default_value' => 0,
			'description'   => __( 'In what position should this role display on the archive page?', 'shiro-admin' ),
		)
	);

	$role_order->add_term_meta_box( __( 'Role Order', 'shiro-admin' ), 'role' );


	// Get the current term ID.
	// We don't need to validate this because we're only using it if it exists and providing a fallback if not.
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended,WordPress.Security.ValidatedSanitizedInput.InputNotValidated
	$current_term_id = absint( $_GET['tag_ID'] ?? 0 );


	// New WP_Query for posts with this role assigned.
	$current_term_args  = array(
		'post_type' => 'profile',
		// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
		'tax_query' => array(
			array(
				'taxonomy'         => 'role',
				'terms'            => $current_term_id,
				'include_children' => false,
			),
		), // WPCS: Slow query okay.
	);
	$current_term_query = new WP_Query( $current_term_args );
	$current_term_posts = array();

	// Create array for profile selector.
	while ( $current_term_query->have_posts() ) {
		$current_term_query->the_post();
		$current_term_posts[ get_the_ID() ] = get_the_title();
	}

	$no_posts_args = empty( $current_term_posts )
		? array(
			'attributes'  => array(
				'disabled' => 'disabled',
			),
			'description' => __( 'There are no profiles assigned to this role.', 'shiro-admin' ),
		)
		: array();

	// Create checkbox group for executive profiles.
	$executive = new Fieldmanager_Checkboxes(
		wp_parse_args(
			$no_posts_args,
			array(
				'name'        => 'role_executive',
				'description' => __( 'Select multiple profiles to feature as the department executives on the Staff & Contractors page.', 'shiro-admin' ),
				'options'     => $current_term_posts,
			)
		)
	);

	$executive->add_term_meta_box( __( 'Department Executive(s)', 'shiro-admin' ), 'role' );

	$executive_title_override = new Fieldmanager_TextField(
		array(
			'name'        => 'role_executive_title_override',
			'description' => __( 'If desired, enter a phrase to be used in place of "Department Executive." If this field is empty, "Department Executive" will be used.', 'shiro-admin' ),
		)
	);

	$executive_title_override->add_term_meta_box( __( 'Department Executive Title Override', 'shiro-admin' ), 'role' );

	// Create checkbox group for expert profiles.
	$experts = new Fieldmanager_Checkboxes(
		wp_parse_args(
			$no_posts_args,
			array(
				'name'        => 'role_experts',
				'description' => __( 'Select multiple profiles to feature as the department experts on the Staff & Contractors page.', 'shiro-admin' ),
				'options'     => $current_term_posts,
			)
		)
	);

	$experts->add_term_meta_box( __( 'Department Experts', 'shiro-admin' ), 'role' );

	$experts_title_override = new Fieldmanager_TextField(
		array(
			'name'        => 'role_experts_title_override',
			'description' => __( 'If desired, enter a phrase to be used in place of "Department Experts." If this field is empty, "Department Experts" will be used.', 'shiro-admin' ),
		)
	);

	$experts_title_override->add_term_meta_box( __( 'Department Experts Title Override', 'shiro-admin' ), 'role' );


	$button = new Fieldmanager_Group(
		array(
			'name'     => 'role_button',
			'label'    => __( 'Role read more link', 'shiro-admin' ),
			'children' => array(
				'link_to_archive' => new Fieldmanager_Checkbox(
					array(
						'label'       => __( 'Link to archive?', 'shiro-admin' ),
						'description' => __( 'Select this option to display a link to this role archive on the parent archive page.', 'shiro-admin' ),
					),
				),
				'text'            => new Fieldmanager_Textfield( __( 'Override link text for archive link', 'shiro-admin' ) ),
				'link'            => new Fieldmanager_Link( __( 'Override link URL for archive link', 'shiro-admin' ) ),
			),
		)
	);

	$button->add_term_meta_box( __( 'Output Read More Link?', 'shiro-admin' ), 'role' );
}
add_action( 'fm_term_role', 'wmf_role_fields' );

/**
 * Save User profile to author meta, so it can be filtered later.
 *
 * @param int    $meta_id    ID of meta key.
 * @param int    $post_id    ID of attached post.
 * @param string $meta_key   Meta key value, connected_user.
 * @param string $meta_value Value of Meta key.
 */
function wmf_save_user_profile( $meta_id, $post_id, $meta_key, $meta_value ) {
	if ( 'connected_user' !== $meta_key ) {
		return;
	}

	$current_user = get_metadata( 'post', $post_id, 'connected_user', true );
	if ( ! empty( $current_user ) ) {
		delete_user_meta( absint( $current_user ), 'profile_id' );
	}

	$user = get_user_by( 'ID', absint( $meta_value ) );
	if ( $user ) {
		update_user_meta( $user->ID, 'profile_id', $post_id );
	}
}
add_action( 'update_postmeta', 'wmf_save_user_profile', 10, 4 );

/**
 * Show the configured row-order meta value in the term list table.
 *
 * @param ?string $string      Column contents.
 * @param string  $column_name Name of column.
 * @param int     $term_id     ID of term being rendered.
 * @return ?string Filtered contents string.
 */
function wmf_render_role_order_list_table_column( ?string $string, string $column_name, int $term_id ) {
	if ( $column_name === 'role_order' ) {
		$parent_term_id = wp_get_term_taxonomy_parent_id( $term_id, 'role' );
		if ( empty( $parent_term_id ) ) {
			return __( 'N/A (Top level)', 'shiro-admin' );
		}

		$role_order = get_term_meta( $term_id, 'role_order', true );
		if ( ! empty( $role_order ) ) {
			return sprintf( '<strong>%d</strong>', $role_order );
		}
	}
	return $string;
}
add_filter( 'manage_role_custom_column', 'wmf_render_role_order_list_table_column', 10, 3 );

/**
 * Add a column to the Edit Roles term list screen to show the term's Role Order value.
 *
 * @param array $columns Associative array of registered columns.
 */
function wmf_add_role_order_list_table_column( array $columns ) : array {
	$columns['role_order'] = __( 'Role Order', 'shiro-admin' );
	return $columns;
}
add_filter( 'manage_edit-role_columns', 'wmf_add_role_order_list_table_column' );

/**
 * Make the column sortable
 *
 * @param array $sortable_columns Array of sortable columns.
 * @return array Filtered array, with our column added.
 */
function wmf_make_role_order_column_sortable( array $sortable_columns ) : array {
	$sortable_columns['role_order'] = 'role_order';
	return $sortable_columns;
}
add_filter( 'manage_edit-role_sortable_columns', 'wmf_make_role_order_column_sortable' );

/**
 * Define how to sort by role_order.
 *
 * @param WP_Term_Query $query Term query.
 */
function wmf_sort_role_order_column( $query ) {
	if ( ! is_admin() ) {
		return;
	}

	if ( $query->query_vars['orderby'] === 'role_order' ) {
		$query->query_vars['orderby'] = 'meta_value_num';
		$query->query_vars['meta_key'] = 'role_order';
	}
}
add_action( 'pre_get_terms', 'wmf_sort_role_order_column' );
