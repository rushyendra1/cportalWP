<?php
//session_start();
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
}
 $id = ($_POST['id'])?$_POST['id']: array();
 
 /*if(!is_array($id))
  $ids_array = explode( ",",$id);else */
  $ids_array =$id;
 
 if(is_array($ids_array) && count($ids_array)>0){
 foreach($ids_array as $each){
     $id = $each;
     $email = array("id" =>$id);
   
         $q = $wpdb->delete($table_prefix."email_template",  $email);
      
 }
 }
    $msg = " E-mail Template has been deleted successfully.";
    //$_SESSION['msg'] = $msg;
    echo json_encode(array("error" => 0, "msg" =>$msg));
    exit;
?>