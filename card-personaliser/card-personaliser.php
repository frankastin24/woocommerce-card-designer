<?php

namespace FrankAstin\WooCommerceCardDesigner;


class CardPersonaliser
{
   public function __construct()
   {

      $this->woocommerce_setup();

      $this->wp_cron_setup();
      add_action("wp_ajax_upload_images", array($this, 'upload_images'));
      add_action("wp_ajax_nopriv_upload_images", array($this, 'upload_images'));
      add_action("wp_ajax_delete_image", array($this, 'delete_image'));
      add_action("wp_ajax_nopriv_delete_image", array($this, 'delete_image'));
      add_action("wp_body", function () {
?>
         <div id="fa-card-personaliser"></div>
<?php
      });
   }
   public function wp_cron_setup()
   {
      add_action('bl_delete_temporary_image_files_cron', array($this, 'bl_delete_temporary_images_file'));
      if (!wp_next_scheduled('bl_delete_temporary_image_files_cron')) {
         wp_schedule_event(time(), 'daily', 'bl_delete_temporary_image_files_cron');
      }
   }

   public function bl_delete_temporary_images_file()
   {
      $image_dir = wp_upload_dir()['basedir'] . '/temporary_images';
      $images = scandir($image_dir);
      foreach ($images as $image) {
         if ($image == '.' || $image == '..') continue;

         $split_image_file_name = explode('.', $image);

         $time = $split_image_file_name = explode('@', $split_image_file_name[0])[1];

         if (intval($time) < strtotime('-10 days')) {
         }
         unlink($image_dir . '/' . $image);
      }
   }
   public function delete_image()
   {
      $image_dir = wp_upload_dir()['basedir'] . '/temporary_images/';
      $image_file = basename($_POST['image_url']);
      unlink($image_dir . $image_file);
   }
   public function woocommerce_setup()
   {

      add_action('after_setup_theme', array($this, 'override_woocommerce_hooks'));

      add_action('woocommerce_before_single_product', array($this, 'override_woocommerce_template'), 10, 3);

      if (isset($_GET['preview'])) {
         session_start();
         $_SESSION['preview_urls'] = $_POST['previewURLs'];
      }
   }
   public function override_woocommerce_hooks()
   {


      if (isset($_GET['preview'])) {
      } else {

         remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);
         remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10);
         remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);
         remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20);
         remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30);
         remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40);
         remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_sharing', 50);
         remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart');
         remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0);
         remove_action('woocommerce_get_sidebar', 'woocommerce_sidebar', 10);
      }
   }
   function override_woocommerce_template()
   {



      $path = FACARDDESIGNER_DIR . '/card-personaliser/template.php';
      $this->add_scripts();
      $this->add_fonts();
   }
   public function add_scripts()
   {

      wp_enqueue_script('facd-card-personaliser-script', FACARDDESIGNER_URL . 'card-personaliser/dist/main.js', null, rand());

      $JSONData = get_post_meta($post->ID, 'JSONData', true) ? get_post_meta($post->ID, 'JSONData', true) : '';
      $shop_page_url = get_permalink(wc_get_page_id('shop'));
      $colors = get_option('FA_Card_Designer_Colors', []);
      $fonts = get_option('FA_Card_Designer_Fonts', []);

      wp_localize_script('facd-card-personaliser-script', 'FACardDesigner', array('assetsURL' => FACARDDESIGNER_URL . 'card-personaliser/assets', 'JSONData' => $JSONData, 'nonce' => wp_create_nonce('ajax-nonce'), 'ajaxurl' => admin_url('admin-ajax.php'), 'shoppageurl' => $shop_page_url, 'colors' => $colors, 'fonts' => $fonts));
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
   public  function upload_dir($dirs)
   {
      $dirs['subdir'] = '/temporary_images';
      $dirs['path'] = $dirs['basedir'] . '/temporary_images';
      $dirs['url'] = $dirs['baseurl'] . '/temporary_images';

      return $dirs;
   }
   function image_name($filename, $ext)
   {
      $splitFileName = explode('.', $filename);

      return $splitFileName[0] . '@' . time() . '.' . $splitFileName[1];
   }
   public function upload_images()
   {
      if (!wp_verify_nonce($_POST['nonce'], 'ajax-nonce')) {
         die('Nonce not supplied');
      }
      require_once(ABSPATH . 'wp-admin/includes/file.php');

      add_filter('upload_dir', array($this, 'upload_dir'));

      add_filter('wp_unique_filename', array($this, 'image_name'), 10, 2);



      $upload_overrides = array('test_form' => false);
      $file_data = wp_handle_upload($_FILES['image'], $upload_overrides);

      remove_filter('wp_unique_filename', array($this, 'image_name'), 10, 2);

      remove_filter('upload_dir', array($this, 'upload_dir'));

      echo json_encode($file_data);

      wp_die(); // this is required to terminate immediately and return a proper response
   }
}
