<?php
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    
}
$start = (isset($_POST['page']))?$_POST['page']:1;
$length = (isset($_POST['length']))?$_POST['length']:10;
$search = (isset($_POST['search']))?$_POST['search']:"";
$sort = (isset($_POST['sort']))?$_POST['sort']:"id";
$sort_by = (isset($_POST['sort_by']))?$_POST['sort_by']:"desc";
$start_1 = abs(paginate_support($start,$length));

   $cond = '';
  if($search != "")
      $cond = " WHERE  attribute  LIKE '%".$search."%'";
 
  $user_settings_res = $wpdb->get_results(" SELECT id
                                    FROM  ".$table_prefix."user_settings "
                                    .$cond. 
                                    " ORDER BY " . $sort . " " . $sort_by
                        );
  $user_settings_data = array();
  $records_total =  count($user_settings_res);
 $records_filter = 0;
 //$records_total = 15;
if($records_total>0){
   
     $user_settings_res_f = $wpdb->get_results(" SELECT id,attribute,form_element,
         title_placeholder,searchable,options,order_by,placeholder,class_name,
         style_name,is_required,is_visible_reg,is_visible_user
		       FROM  ".$table_prefix."user_settings ".$cond. 
                       "ORDER BY " . $sort . " " . $sort_by
                  . " LIMIT ".$length. " OFFSET ".$start_1);
     $records_filter = count($user_settings_res_f);
    
 foreach($user_settings_res_f as $user_settings_array)
 {
      array_push($user_settings_data,$user_settings_array);                  
 }
}
echo json_encode(array("draw" =>1,
               "recordsTotal" =>  $records_total,
  "recordsFiltered" => $records_total,
  "data" => $user_settings_data));
?>