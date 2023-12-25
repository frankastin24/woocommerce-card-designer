<?php

namespace FrankAstin\WooCommerceCardDesigner;

class CardDesigner
{
    public function __construct()
    {
        $this->save_post();
        $this->wp_ajax();
        $this->add_metaboxes();
        $this->woocommerce_setup();
    }




    public function wp_ajax()
    {
        add_action('wp_ajax_upload_card_image', array($this, 'upload_card_image'));
        add_action('wp_ajax_add_new_font', array($this, 'add_new_font'));
        add_action('wp_ajax_add_new_color', array($this, 'add_new_color'));
        add_action('wp_ajax_delete_font', array($this, 'delete_font'));
        add_action('wp_ajax_delete_color', array($this, 'delete_color'));
        add_action('wp_ajax_delete_card_size', array($this, 'delete_card_size'));
        add_action('wp_ajax_add_new_card_size', array($this, 'add_new_card_size'));
    }
    function add_new_font()
    {
        if (!wp_verify_nonce($_POST['nonce'], 'add-font-nonce')) {
            die('Nonce not supplied');
        }
        $fonts = get_option('FA_Card_Designer_Fonts', []);
        if ($_POST['type'] == 'google') {
            $new_font = array('Google Font', $_POST['fontfamily'], $_POST['fontweights']);
        } else {
            require_once(ABSPATH . 'wp-admin/includes/file.php');


            $upload_overrides = array('test_form' => false);

            $file_data = wp_handle_upload($_FILES['font_file'], $upload_overrides);
            $new_font = array('Uploaded Font', $_POST['fontfamily'], $_POST['fontweights'], $file_data['url']);
        }

        array_push($fonts, $new_font);
        update_option('FA_Card_Designer_Fonts', $fonts);
        echo json_encode($fonts);


        wp_die(); // this is required to terminate immediately and return a proper response
    }
    function add_new_card_size()
    {
        if (!wp_verify_nonce($_POST['nonce'], 'add-font-nonce')) {
            die('Nonce not supplied');
        }
        $card_sizes = get_option('FA_Card_Designer_Card_Sizes', []);

        $card_size = array($_POST['card_size'], $_POST['price']);


        array_push($card_sizes, $card_size);
        update_option('FA_Card_Designer_Card_Sizes', $card_sizes);
        echo json_encode($card_sizes);


        wp_die(); // this is required to terminate immediately and return a proper response
    }
    function add_new_color()
    {
        if (!wp_verify_nonce($_POST['nonce'], 'add-font-nonce')) {
            die('Nonce not supplied');
        }
        $colors = get_option('FA_Card_Designer_Colors', []);

        $new_color = array($_POST['color-name'], $_POST['color']);


        array_push($colors, $new_color);
        update_option('FA_Card_Designer_Colors', $colors);
        echo json_encode($colors);


        wp_die(); // this is required to terminate immediately and return a proper response
    }
    function delete_font()
    {
        if (!wp_verify_nonce($_POST['nonce'], 'add-font-nonce')) {
            die('Nonce not supplied');
        }
        $fonts = get_option('FA_Card_Designer_Fonts', []);

        array_splice($fonts, $_POST['index'], 1);

        update_option('FA_Card_Designer_Fonts', $fonts);
        echo json_encode($fonts);


        wp_die(); // this is required to terminate immediately and return a proper response
    }
    function delete_color()
    {
        if (!wp_verify_nonce($_POST['nonce'], 'add-font-nonce')) {
            die('Nonce not supplied');
        }
        $colors = get_option('FA_Card_Designer_Colors', []);

        array_splice($colors, $_POST['index'], 1);

        update_option('FA_Card_Designer_Colors', $colors);
        echo json_encode($colors);


        wp_die(); // this is required to terminate immediately and return a proper response
    }
    function delete_card_size()
    {
        if (!wp_verify_nonce($_POST['nonce'], 'add-font-nonce')) {
            die('Nonce not supplied');
        }
        $card_sizes = get_option('FA_Card_Designer_Card_Sizes', []);

        array_splice($card_sizes, $_POST['index'], 1);

        update_option('FA_Card_Designer_Card_Sizes', $card_sizes);
        echo json_encode($card_sizes);


        wp_die(); // this is required to terminate immediately and return a proper response
    }


    public function add_metaboxes()
    {
        add_action('dbx_post_sidebar', array($this, 'add_metaboxs_callback'));
    }

    public function save_post()
    {
        add_action('save_post', array($this, 'save_post_callback'));
    }

    public function woocommerce_setup()
    {
        add_filter('product_type_selector', array($this, 'add_type'));
        add_filter('woocommerce_product_class', array($this, 'woocommerce_product_class'), 10, 2);
        add_action('woocommerce_product_options_general_product_data', array($this, 'add_inline_scripts'));
        add_filter('woocommerce_enable_setup_wizard', array($this, 'disable_setup_wizard_callback'));
        add_action("woocommerce_card_add_to_cart", array($this, 'woocommerce_add_to_cart_callback'));
        add_action('admin_menu', array($this, 'register_card_options_page'));
        add_filter('wp_get_attachment_image', array($this, 'remove_caching'));
        add_filter('woocommerce_product_class', array($this, 'woocommerce_product_class'), 10, 2);
    }

    public function remove_caching($html)
    {
        $array = array();
        preg_match('/src="([^"]*)"/i', $html, $array);
        return str_replace($array[1], $array[1] . '?nocache=' . time(), $html);
    }

    public function register_card_options_page()
    {
        add_submenu_page(
            'woocommerce',
            __('Card Designer', 'textdomain'),
            __('Card Designer', 'textdomain'),
            'manage_options',
            'card-designer-options',
            array($this, 'card_designer_options')
        );
    }
    public function card_designer_options()
    {
        include 'card-designer-options.php';
    }


    public function  disable_setup_wizard_callback()
    {
        return false;
    }

    public function woocommerce_add_to_cart_callback()
    {
        do_action('woocommerce_simple_add_to_cart');
    }

    public function add_inline_scripts()
    {
        global $post;
        global $product_object;
        $card_sizes_json = get_post_meta($post->ID, 'card_sizes', true)  ? get_post_meta($post->ID, 'card_sizes', true) : '[]';

        wc_enqueue_js(
            <<<END
            let cardSizes = $card_sizes_json;
            const populateCardSizesTable = () => {
                let HTML = cardSizes.length > 0  ? '<tr><th>Card Size</th><th>Size Price</th><th></th></tr>' : '';
                cardSizes.forEach((cardSize) => {
                    HTML += '<tr><td style="padding:10px 5px;text-align:center;border:1px solid #CCC;">'+cardSize[0]+'</td><td style="padding:10px 5px;text-align:center;border:1px solid #CCC;">'+cardSize[1]+'</td><td style="padding:10px 5px;text-align:center;border:1px solid #CCC;"><button class="delete-card-size">Delete</button></td></tr>';
                });
                $('.card-sizes tbody').html(HTML);
                $('.card-sizes-input').val(JSON.stringify(cardSizes));
            }
            const cardSizesHTML = `<h3 style="margin-left:9px; margin-top:9px;">Card Sizes</h3>
            <table class="card-sizes" style="margin-left:9px; margin-top:9px;">
            <tbody>
            </tbody>
            </table>
            <button style="margin-left:9px; margin-top:9px;" class="add-card-size">Add Card Size</button>
            <div style="display:none;margin-left:9px; margin-top:9px; border: 1px solid #CCC;padding-bottom: 9px;" class="add_card_size_box">
                <div style="margin-top:9px; display:flex;align-items:center;">
                    <p>Card Size</p>
                    <input style="height:20px;" placeholder="100 x 100mm" class="card-size" type="text" />
                </div>
                <div style="margin-top:9px; display:flex;align-items:center;">
                    <p>Size Price</p>
                    <input style="height:20px;"class="size-price" type="number" />
                </div>
                <button style="margin-left:9px; margin-top:9px;" class="add-new-card-size">Add Card Size</button>
                
            </div>
            <p>If no sizes are added the global sizes will be used </br>   You must hit the Update button after editing card sizes for them to be saved</p>
            <input type="hidden" class="card-sizes-input" name="card_sizes"/>
         
            `;
            
            const pricingHTML = `<p class="form-field _regular_price_field ">
            <label for="_regular_price">Regular price (£)</label><input type="text" class="short wc_input_price" style="" name="_regular_price" id="_regular_price" value="10" placeholder=""> </p>`;
            jQuery('#product-type').on('change', function(event) {
                if(event.target.value == 'card') {
                    jQuery('#fa-card-designer').show();
                    jQuery('.product_data_tabs .general_tab').show();
                    jQuery('.pricing').show();
                    jQuery('.show_if_downloadable,#postdivrich,#postexcerpt,#postimagediv,#woocommerce-product-images').hide()
                    jQuery('#fa-card-designer').detach().insertAfter('#postbox-container-1');
                    jQuery('.pricing').html(cardSizesHTML);
                } else {
                    jQuery('#fa-card-designer').hide();
                    jQuery('.show_if_downloadable,#postdivrich,#postexcerpt,#postimagediv,#woocommerce-product-images').show()
                    jQuery('.pricing').html(pricingHTML);
                }
            })

            jQuery('body').on('click','.add-card-size', (e) => {
                e.preventDefault();
                jQuery('.add_card_size_box').show();
                jQuery('.add-card-size').hide();
            });
            
            jQuery('body').on('click','.add-new-card-size', (e) => {
                e.preventDefault();

                if (jQuery('.card-size').val().trim() == '') return alert('Please card size');
                if (jQuery('.size-price').val().trim() == '') return alert('Please enter a price');
                
                const newSize = [jQuery('.card-size').val(),jQuery('.size-price').val()];
                cardSizes.push(newSize);
                populateCardSizesTable();
                jQuery('.add_card_size_box').hide();
                jQuery('.add-card-size').show();
                jQuery('.size-price').val('');
                jQuery('.card-size').val('')  
            });

            jQuery('body').on('click','.delete-card-size', (e) => {
                e.preventDefault();

                const index = jQuery(this).parent().parent().index() - 1;
                
                cardSizes.splice(index,1);
               
                populateCardSizesTable();
               
            });
       
            setTimeout(()=> {
            populateCardSizesTable();
            },2000)
            END
        );


        if ($product_object && 'card' === $product_object->get_type()) {
            wc_enqueue_js(
                <<<'EOD'
                jQuery('.product_data_tabs .general_tab').show();
                jQuery('.pricing').show();
                jQuery('.show_if_downloadable,#postdivrich,#postexcerpt,#postimagediv,#woocommerce-product-images').hide()
                jQuery('#fa-card-designer').detach().insertAfter('#postbox-container-1');
                jQuery('.pricing').html(cardSizesHTML);
            EOD
            );
        }
    }

    public function woocommerce_product_class($classname, $product_type)
    {
        if ($product_type == 'card') {
            $classname = 'WC_Product_Card';
        }
        return $classname;
    }




    public function add_type($types)
    {
        $types['card'] = __('Card', 'FA_CARD_DESIGNER');

        return $types;
    }


    public function add_metaboxs_callback()
    {
        global $post, $product_object;
        $this->add_fonts();
        if ($post->post_type != 'product') return;
        $display_metaboxes =  ($product_object && 'card' === $product_object->get_type());

        $fonts = get_option('FA_Card_Designer_Fonts', []);

        wp_enqueue_script('facd-card-designer-script', FACARDDESIGNER_URL . 'card-designer/dist/main.js', null, rand());
        $JSONData = get_post_meta($post->ID, 'JSONData', true) ? get_post_meta($post->ID, 'JSONData', true) : '';

        wp_localize_script('facd-card-designer-script', 'FACardDesigner', array('ajaxurl' => admin_url('admin-ajax.php'), 'assetsURL' => FACARDDESIGNER_URL . 'card-designer/assets', 'jsonData' => $JSONData, 'fonts' =>  $fonts, 'nonce' => wp_create_nonce('ajax-nonce')));
        echo '<div id="fa-card-designer" class="postbox-container" style="display:' . ($display_metaboxes ? 'block' : 'none') . '"></div>';
    }
    function upload_card_image()
    {
        if (!wp_verify_nonce($_POST['nonce'], 'ajax-nonce')) {
            die('Nonce not supplied');
        }
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        if ($_POST['isFeatured'] == 'true') {
            $upload_overrides = array('test_form' => false, 'unique_filename_callback' => array($this, 'file_name_callback'));
        } else {
            $upload_overrides = array('test_form' => false);
        }
        $file_data = wp_handle_upload($_FILES['image'], $upload_overrides);
        echo json_encode($file_data);
        wp_die(); // this is required to terminate immediately and return a proper response
    }
    function file_name_callback($dir, $name, $ext)
    {
        return $name;
    }

    public function add_fonts()
    {
        $fonts = get_option('FA_Card_Designer_Fonts', []);
        $google_fonts = "@import url('https://fonts.googleapis.com/css2?";
        $upload_fonts = '';
        foreach ($fonts as $index => $font) {
            if ($font[0] == 'Google Font') {
                $google_fonts .= "family=" . str_replace(' ', '+', $font[1]) . (($font[2] != '400' && $font[2] != '') ? ':wght@' . $font[2] : '') . ((count($fonts) > 1 && $index != (count($fonts) - 1)) ? '&' : '');
            } else {
                $splitFileName = explode('.', $font[3]);
                $format = end($splitFileName);
                if ($format == 'ttf') {
                    $format = 'truetype';
                }

                $upload_fonts .= "@font-face {font-family: '" . $font[1] . "'; src: url('" . $font[3] . "') format('" . $format . "');\r\n";
            }
        }
        echo '<style>';
        echo $google_fonts . "&display=swap');\r\n";
        echo $upload_fonts;
        echo '</style>';
    }

    function save_post_callback($post_id)
    {
        global $post;

        if (!$post || $post->post_type != 'product') {
            return;
        }
        if (!has_post_thumbnail($post_id)) {
            $featured_id = get_post_thumbnail_id($post_id);
            wp_delete_attachment($featured_id, true);
        }
        $filename = $_POST['featuredImageURL'];

        // the ID of the post to which we are attaching.
        $parent_post_id = $post_id;

        // Check the post type that we use in the 'post_mime_type' field.
        $filetype = wp_check_filetype(basename($filename), null);

        // Get the path to the uploads directory.
        $wp_upload_dir = wp_upload_dir();

        // Prepare the array with the necessary data for the nesting.
        $attachment = array(
            'guid'           => $wp_upload_dir['url'] . '/' . basename($filename),
            'post_mime_type' => $filetype['type'],
            'post_title'     => preg_replace('/\.[^.]+$/', '', basename($filename)),
            'post_content'   => '',
            'post_status'    => 'inherit'
        );

        // Insert the attachment into the database.
        $attach_id = wp_insert_attachment($attachment, $filename, $parent_post_id);

        // Connect the desired file, if it is not already connected
        // wp_generate_attachment_metadata() depends on this file.


        // Create metadata for the attachment and update the post in the database.
        $attach_data = wp_generate_attachment_metadata($attach_id, $wp_upload_dir['path'] . '/' . basename($filename));
        wp_update_attachment_metadata($attach_id, $attach_data);
        set_post_thumbnail($post_id, $attach_id);

        update_post_meta($post_id, 'JSONData', $_POST['JSON_data']);
        update_post_meta($post_id, 'card_sizes', $_POST['card_sizes']);
    }
}
