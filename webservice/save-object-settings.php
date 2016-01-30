<?php
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../wp-config.php');
    include_once('../wp-load.php');
    include_once('../wp-includes/wp-db.php');
}
  $user_ID = (isset($_POST['id']))?check_nulls(trim($_POST['id'])): "";

$edit_permission = (isset($_POST['is_edit']))?check_nulls(trim($_POST['is_edit'])): "";
$delete_permission = (isset($_POST['is_delete']))?check_nulls(trim($_POST['is_delete'])): "";
$create_permission = (isset($_POST['is_dreate']))?check_nulls(trim($_POST['is_create'])): "";
$view_permission = (isset($_POST['is_view']))?check_nulls(trim($_POST['is_view'])): "";
/* $user_ID =15;
$Edit_Permission =1;
$delete_permission=1;
$create_permission=1;
$view_permission=1;
*/
if($user_ID == "")
{
     echo json_encode(array("errorCode" => "Failure", "message" => "user ID should not be empty"));
      exit;
}
else if(!is_numeric($user_ID))
{
    echo json_encode(array("errorCode" => "Failure", "message" => "ID should be valid"));
      exit;
}
$result = $wpdb->get_row( "SELECT ID FROM"
        . " ".$table_prefix."users "
        . " WHERE ID='".$user_ID."'");

if($result==0)
{
    
    echo json_encode(array("errorCode" => "Failure", "message" => "User is not existed"));
    exit;
}
 

//Update the operation
$wpdb->update($table_prefix.'users' , array('is_Edit' =>$edit_permission,'is_Delete' => $delete_permission,'is_Create' => $create_permission ,'is_View' => $view_permission),array( 'ID' => $user_ID ));
echo json_encode(array("errorCode" => "Success", "message" => ""));
    exit; 
?>
