<?php
/**
 * Handles custom field order for roles CTP.
 * 
 * @package shiro
 */

 namespace WMF\Roles_Order;

/**
 * Bootstrap post list filters functionality.
 */
function bootstrap() {
    add_action('role_edit_form_fields', __NAMESPACE__ . '\\wmf_edit_role_order_field', 10, 2);
    add_action('role_add_form_fields', __NAMESPACE__ . '\\wmf_add_role_order_field', 10, 1);
    add_filter('manage_edit-role_columns', __NAMESPACE__ . '\\wmf_order_role_columns');
    add_action('manage_role_custom_column', __NAMESPACE__ . '\\wmf_order_role_column_content', 10, 3);
    add_action('admin_notices', __NAMESPACE__ . '\\wmf_display_admin_notice');
    add_action('created_role', __NAMESPACE__ . '\\wmf_validate_role_order', 10, 2);
    add_action('edited_role', __NAMESPACE__ . '\\wmf_validate_role_order', 10, 2);
    add_action('created_role', __NAMESPACE__ . '\\wmf_save_role_order', 10, 2);
    add_action('edited_role', __NAMESPACE__ . '\\wmf_save_role_order', 10, 2);

}

 /**
 * Add term meta field for order
 */
function wmf_add_role_order_field($taxonomy) {
    ?>
    <div class="form-field term-order-wrap">
        <label for="term_order"><?php _e('Order', 'textdomain'); ?></label>
        <input name="term_order" id="term_order" type="number" step="1" min="0" value="" size="40" />
        <p><?php _e('Enter a unique number to order the roles.', 'textdomain'); ?></p>
    </div>
    <?php
}

/**
 * Edit term meta field for order
 */
function wmf_edit_role_order_field($term, $taxonomy) {
    $term_order = get_term_meta($term->term_id, 'term_order', true);
    ?>
    <tr class="form-field term-order-wrap">
        <th scope="row"><label for="term_order"><?php _e('Order', 'textdomain'); ?></label></th>
        <td>
            <input name="term_order" id="term_order" type="number" step="1" min="0" value="<?php echo esc_attr($term_order); ?>" size="40" />
            <p class="description"><?php _e('Enter a unique number to order the roles.', 'textdomain'); ?></p>
        </td>
    </tr>
    <?php
}


/**
 * Add "Order" column to the role taxonomy admin table
 */
function wmf_order_role_columns($columns) {
    $columns['order'] = __('Order', 'text-domain');
    return $columns;
}

/**
 * Populate the "Order" column with term_order meta data
 */
function wmf_order_role_column_content($content, $column_name, $term_id) {
    if ('order' === $column_name) {
        $term_order = get_term_meta($term_id, 'term_order', true);
        $content = esc_html($term_order);
    }
    return $content;
}

/**
 * Validate and save term meta field
 */
function wmf_validate_role_order($term_id) {
    if (isset($_POST['term_order']) && '' !== $_POST['term_order']) {
        $term_order = intval($_POST['term_order']);
        $existing_term = get_terms(array(
            'taxonomy' => 'role',
            'meta_query' => array(
                array(
                    'key' => 'term_order',
                    'value' => $term_order,
                    'compare' => '='
                )
            )
        ));
        if (!empty($existing_term) && $existing_term[0]->term_id != $term_id) {
            add_admin_notice(__('The order number must be unique. Please choose a different number.', 'textdomain'));
            return;
        }
    }
}


/**
 * Save term meta field
 */
function wmf_save_role_order($term_id) {
    if (isset($_POST['term_order']) && '' !== $_POST['term_order']) {
        $term_order = intval($_POST['term_order']);
        update_term_meta($term_id, 'term_order', $term_order);
    } else {
        delete_term_meta($term_id, 'term_order');
    }
}

/**
 * Helper function to add admin notices
 */
function add_admin_notice($message, $type = 'error') {
    set_transient('order_admin_notice', ['message' => $message, 'type' => $type], 30);
}

/**
 * Display admin notices
 */
function wmf_display_admin_notice() {
    if ($notice = get_transient('order_admin_notice')) {
        ?>
        <div class="<?php echo esc_attr($notice['type']); ?> notice">
            <p><?php echo esc_html($notice['message']); ?></p>
        </div>
        <?php
        delete_transient('order_admin_notice');
    }
}
