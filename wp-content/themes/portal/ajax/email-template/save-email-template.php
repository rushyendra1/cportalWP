<?php
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
}
global $user_ID;
$changer = $user_ID;

 $email = array();
 $email['id'] = (isset($_POST['id']))?$_POST['id']: 0;
 $email['name'] = (isset($_POST['name']))?$_POST['name']: "";
 $email['subject'] = (isset($_POST['subject']))?$_POST['subject']: "";
 $email['content'] = (isset($_POST['content']))?$_POST['content']: "";
 

$result = $wpdb->get_row("SELECT name"
        . " FROM ".$table_prefix."email_template"
        . " WHERE id=".$email['id']);

if(isset($result) && count($result)>0)
{
    $wpdb->update( $table_prefix."email_template", $email, array("id" => $email['id']));
   $msg = "Email Template has been updated successfully.";
}else{
    $wpdb->insert( $table_prefix."email_template",$email);
    $msg = "E-mail Template has been added successfully.";
}
 //$_SESSION['msg'] = $msg;
echo json_encode(array("error"=> 0, "msg" => $msg));
 
   
?>