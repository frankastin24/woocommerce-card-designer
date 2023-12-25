<?php

/**
 * Plugin Name: WooCommerce Card Designer
 * Plugin URI: http://frankastin.com/portfolio/woocommerce-card-designer
 * Author: Frank Astin
 * Author URI: http://frankastin.com/
 * Version: 1.0.0
 */

define('FACARDDESIGNER_URL', plugin_dir_url(__FILE__));
define('FACARDDESIGNER_DIR', plugin_dir_path(__FILE__));

include FACARDDESIGNER_DIR . '/card-designer/card-designer.php';
include FACARDDESIGNER_DIR . '/card-personaliser/card-personaliser.php';

use FrankAstin\WooCommerceCardDesigner\CardDesigner;
use FrankAstin\WooCommerceCardDesigner\CardPersonaliser;

add_action('init', 'load_product_type_class');

function load_product_type_class()
{
    class WC_Product_Card extends WC_Product
    {
        public function get_type()
        {
            return 'card';
        }
    }
}

new CardPersonaliser();
new CardDesigner();
