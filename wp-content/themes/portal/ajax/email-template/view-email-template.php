<?php
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
}
$id = ($_POST['id'])?$_POST['id']: 0;
$email_info = $wpdb->get_row("SELECT id,name,content,subject"
         . " FROM ".$table_prefix."email_template"
         . " WHERE id=".$id);
 
 echo json_encode(array("data" => $email_info));
   
?>