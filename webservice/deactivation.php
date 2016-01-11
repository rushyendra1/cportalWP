<?php
  

global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../wp-config.php');
    include_once('../wp-load.php');
    include_once('../wp-includes/wp-db.php');
}
    
$user_id = (isset($_POST['user_id']))?$_POST['user_id']: "";
  $type = (isset($_POST['type']))?$_POST['type']: "";
  $cond = '';
  if($type == "deactivate")
  $cond = 'and is_deactive != 1';
  if($type == "activate")
  $cond = 'and is_deactive != 0';
  
//Check the user id is  existed or not 
   $user_str = "SELECT ID FROM "
        . $table_prefix."users "
        . "WHERE ID = '".$user_id."'";
$user_exist_results = $wpdb->get_results($user_str);
//var_dump($user_exist_results);
if(!is_array($user_exist_results) || (is_array($user_exist_results) && count($user_exist_results)==0))
{
   echo json_encode(array("errorCode" => "Failure", "message" => "This User Id is not existed"));
   exit;

}else {
    $user_str = "SELECT ID FROM "
        . $table_prefix."users "
        . "WHERE ID = '".$user_id."'".$cond;
$user_exist_results = $wpdb->get_results($user_str);
if(!is_array($user_exist_results) || (is_array($user_exist_results) && count($user_exist_results)==0))
{
    $msg = "This user is already in deactive mode";
    if($type == "activate")
        $msg = "This user is already in active mode";
   echo json_encode(array("errorCode" => "Failure", "message" => $msg));
   exit;

}
}
if($type == "delete")
/*** Delete the user **/
$res = $wpdb->delete( $table_prefix."users",array("ID" =>$user_id));
else if($type == "deactivate")
{
    $wpdb->update($table_prefix."users", array("is_deactive" =>1),array("ID" =>$user_id));
}else if($type == "activate")
{
    $wpdb->update($table_prefix."users", array("is_deactive" =>0),array("ID" =>$user_id));
}
 echo json_encode(array("errorCode" => "Success", "message" => ""));
   exit;
?>