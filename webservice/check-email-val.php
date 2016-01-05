<?php
 echo $email = (isset($_POST['email']))?$_POST['email']: "";
 //$id = (isset($_POST['id']))?base64_decode($_POST['id']): 0;


$cond = "";
if($id){
    $cond = "and id!=".$id;
}
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../wp-config.php');
    include_once('../wp-load.php');
    include_once('../wp-includes/wp-db.php');
}
//Check the email existed or not 
$email_str = "SELECT ID FROM"
        . " ".$table_prefix."users WHERE user_email='".$email."'";
$user_exist_results = $wpdb->get_results($email_str);
if(is_array($user_exist_results) && count($user_exist_results)>0)
{
   echo json_encode(array("errorCode" => "Failure", "message" => "E-mail is already existed"));
   exit;

}
 echo json_encode(array("errorCode" => "Success", "message" => ""));
   exit;
?>