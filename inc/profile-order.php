<?php
/**
 * Handles custom field order for roles CTP.
 * 
 * @package shiro
 */

 namespace WMF\Profile_Order;

/**
 * Bootstrap post list filters functionality.
 */
function bootstrap() {
    add_action('add_meta_boxes', __NAMESPACE__ . '\\add_order_meta_box');
    add_action('save_post', __NAMESPACE__ . '\\save_order_meta_box_data');
    add_filter('manage_profile_posts_columns', __NAMESPACE__ . '\\add_order_column');
    add_action('manage_profile_posts_custom_column', __NAMESPACE__ . '\\fill_order_column', 10, 2);
    add_filter('manage_edit-profile_sortable_columns', __NAMESPACE__ . '\\make_order_column_sortable');
    add_action('pre_get_posts', __NAMESPACE__ . '\\order_posts_by_order');
    add_action('save_post', __NAMESPACE__ . '\\validate_unique_order');
    add_action('admin_notices', __NAMESPACE__ . '\\display_order_duplicate_notice');
    add_action( 'quick_edit_custom_box', __NAMESPACE__ . '\\order_profile_quick_edit', 10, 2 );
    add_action( 'save_post', __NAMESPACE__ . '\\save_order_quick_edit_data', 10, 2 );
    add_action( 'manage_profile_posts_custom_column', __NAMESPACE__ . '\\order_profile_column_content', 10, 2 );
    add_filter( 'manage_profile_posts_columns', __NAMESPACE__ . '\\order_profile_columns' );
}

 /**
 * Adds a meta box for the post order.
 */
function add_order_meta_box() {
    add_meta_box(
        'post_order',
        __('Profile Order', 'shiro-admin'),
         __NAMESPACE__ . '\\render_order_meta_box',
        'profile',
        'side',
        'high'
    );
}

/**
 * Renders the order meta box.
 *
 * @param WP_Post $post The current post object.
 */
function render_order_meta_box($post) {
    // Add a nonce field so we can check for it later.
    wp_nonce_field('save_order_meta_box_data', 'order_meta_box_nonce');

    $value = get_post_meta($post->ID, '_post_order', true);

    echo '<label for="post_order">';
    _e('Order', 'shiro-admin');
    echo '</label> ';
    echo '<input type="number" id="post_order" name="post_order" value="' . esc_attr($value) . '" size="25" />';
}

/**
 * Save the order meta box data.
 *
 * @param int $post_id The ID of the post being saved.
 */
function save_order_meta_box_data($post_id) {
    // Check if our nonce is set.
    if (!isset($_POST['order_meta_box_nonce'])) {
        return;
    }

    // Verify that the nonce is valid.
    if (!wp_verify_nonce($_POST['order_meta_box_nonce'], 'save_order_meta_box_data')) {
        return;
    }

    // If this is an autosave, our form has not been submitted, so we don't want to do anything.
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check the user's permissions.
    if (isset($_POST['post_type']) && 'page' == $_POST['post_type']) {
        if (!current_user_can('edit_page', $post_id)) {
            return;
        }
    } else {
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }

    // Make sure that it is set.
    if (!isset($_POST['post_order'])) {
        return;
    }

    // Sanitize user input.
    $order = sanitize_text_field($_POST['post_order']);

    // Update the meta field in the database.
    update_post_meta($post_id, '_post_order', $order);
}

/**
 * Adds custom columns to the post type admin list.
 *
 * @param array $columns The existing columns.
 * @return array The modified columns.
 */
function add_order_column($columns) {
    $columns['order'] = __('Order', 'shiro-admin');
    return $columns;
}

/**
 * Populates the custom order column.
 *
 * @param string $column The column name.
 * @param int $post_id The post ID.
 */
function fill_order_column($column, $post_id) {
    if ('order' === $column) {
        $order = get_post_meta($post_id, '_post_order', true);
        echo esc_html($order);
    }
}

/**
 * Makes the custom order column sortable.
 *
 * @param array $columns The existing sortable columns.
 * @return array The modified sortable columns.
 */
function make_order_column_sortable($columns) {
    $columns['order'] = 'order';
    return $columns;
}

/**
 * Adds orderby to the query.
 *
 * @param WP_Query $query The current query object.
 */
function order_posts_by_order($query) {
    if (!is_admin()) {
        return;
    }

    $orderby = $query->get('orderby');

    if ('order' === $orderby) {
        $query->set('meta_key', '_post_order');
        $query->set('orderby', 'meta_value_num');
    }
}

/**
 * Validate the order value to ensure uniqueness.
 *
 * @param int $post_id The ID of the post being saved.
 */
function validate_unique_order($post_id) {
    if (!isset($_POST['post_order'])) {
        return;
    }

    $new_order = intval($_POST['post_order']);
    $existing_posts = get_posts(array(
        'post_type' => 'profile',
        'meta_key' => '_post_order',
        'meta_value' => $new_order,
        'exclude' => $post_id
    ));

    if ($existing_posts) {
        // Set an admin notice for the user.
        add_filter('redirect_post_location', function($location) {
            return add_query_arg('order_duplicate', 'true', $location);
        });

        // Cancel the post save by returning false.
        return false;
    }
}

/**
 * Displays an admin notice if there was a duplicate order value.
 */
function display_order_duplicate_notice() {
    if (isset($_GET['order_duplicate']) && $_GET['order_duplicate'] === 'true') {
        ?>
        <div class="notice notice-error is-dismissible">
            <p><?php _e('The order value must be unique. Please choose a different number.', 'shiro-admin'); ?></p>
        </div>
        <?php
    }
}


/**
 * Add custom columns to profile list table.
 */ 
function order_profile_columns( $columns ) {
    $columns['profile_order'] = __('Order', 'shiro-admin');
    return $columns;
}

/**
 * Display order value in the custom column.
 */ 
function order_profile_column_content( $column, $post_id ) {
    if ( $column === 'profile_order' ) {
        echo get_post_meta( $post_id, 'profile_order', true );
    }
}

/**
 * Add fields to quick edit.
 */
function order_profile_quick_edit( $column_name, $post_type ) {
    if ( $column_name !== 'profile_order' ) {
        return;
    }
    ?>
    <fieldset class="inline-edit-col-right">
        <div class="inline-edit-col">
            <label>
                <span class="title"><?php esc_html_e( 'Order', 'shiro-admin' ); ?></span>
                <span class="input-text-wrap">
                    <input type="number" step="1" name="profile_order" class="profile_order" value="">
                </span>
            </label>
        </div>
    </fieldset>
    <?php
}

/**
 * Save quick edit data.
 */
function save_order_quick_edit_data( $post_id, $post ) {
    if ( $post->post_type !== 'profile' ) {
        return;
    }

    // Update profile order if provided and numeric.
    if ( isset( $_REQUEST['profile_order'] ) && is_numeric( $_REQUEST['profile_order'] ) ) {
        update_post_meta( $post_id, 'profile_order', intval( $_REQUEST['profile_order'] ) );
    }
}


