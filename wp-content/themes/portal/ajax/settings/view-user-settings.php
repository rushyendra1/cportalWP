<?php
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    
}
$id = (isset($_POST['id']))?$_POST['id']: 0;
 $user_settings_array = array();
  $user_settings_array = $wpdb->get_row(" SELECT id,attribute,form_element,
      title_placeholder,searchable,options,order_by,placeholder,
      class_name,style_name,is_required,is_visible_reg,is_visible_user
                                    FROM  user_settings  
                                    WHERE id ='".$id."'
                                     ORDER BY id asc"
                        );
  
  $records_total =  count($user_settings_array);
 $records_filter = 0;
 //$records_total = 15;

echo json_encode(array("data" => $user_settings_array));
?>