<?php
include_once("../../common.php");
global $root;
include_once $root.'/config.php'; 
include_once $root.'/init.php';
global $db;
$name = (isset($_POST['name']))?$_POST['name']: "";
$element_type = (isset($_POST['element_type']))?$_POST['element_type']: "";
$place_holder = (isset($_POST['place_holder']))?$_POST['place_holder']: "";
$title_place_holder = (isset($_POST['title_place_holder']))?$_POST['title_place_holder']: "";

$class_name = (isset($_POST['class_name']))?$_POST['class_name']: "";
$style_name = (isset($_POST['style_name']))?$_POST['style_name']: "";
$options = (isset($_POST['options']))?$_POST['options']: "";
$is_search = (isset($_POST['is_search']))?$_POST['is_search']: 0;
$is_required = (isset($_POST['is_required']))?$_POST['is_required']: 0;
$is_visible_user = (isset($_POST['is_visible_user']))?$_POST['is_visible_user']: 0;
$is_visible_reg= (isset($_POST['is_visible_reg']))?$_POST['is_visible_reg']: 0;

$id = (isset($_POST['id']))?$_POST['id']: 0;


$insert_data = array("attribute" => $name,
                    "form_element" => $element_type,
                    "options"=> $options,
                    "searchable" => $is_search,
                    "placeholder" =>$place_holder,
                    "class_name" =>$class_name,
                    "style_name" => $style_name,
                    "is_required" => $is_required,
                    "title_placeholder" => $title_place_holder,
                    "is_visible_reg" => $is_visible_reg,
                    "is_visible_user" =>$is_visible_user
                     );
if($id){
   
	@pg_update($db,"user_settings", $insert_data, array("id" => $id));
        
}else{
    
  $max_info_q = @pg_query($db,"SELECT max(order_by) as max_order "
          . " FROM user_settings"); 
  
  $max_info = @pg_fetch_assoc($max_info_q);
  $max = 0;
  if($max_info['max_order'] != NULL)
    $max = $max_info['max_order'];
  $max+=1;
  $insert_data['order_by'] = $max;
@pg_insert($db,"user_settings", $insert_data);
//$id = pg_last_oid($res);
}
//echo $id;

?>
