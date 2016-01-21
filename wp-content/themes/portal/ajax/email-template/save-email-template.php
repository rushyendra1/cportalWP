<?php
include_once("../../common.php");
global $root;
include_once $root.'/config.php'; 
include_once $root.'/init.php';
global $db;
$changer = 0;
if(isset($_SESSION['admin']['id']))
    $changer = $_SESSION['admin']['id'];

 $email = array();
 $email['id'] = (isset($_POST['id']))?base64_decode($_POST['id']): 0;
 $email['name'] = (isset($_POST['name']))?$_POST['name']: "";
 $email['subject'] = (isset($_POST['subject']))?$_POST['subject']: "";
 $email['content'] = (isset($_POST['content']))?$_POST['content']: "";
 

$result_query = @pg_query($db,"SELECT name"
        . " FROM email_template"
        . " WHERE id=".$email['id']);
$result = @pg_fetch_assoc($result_query);
if(is_array($result) && count($result)>0)
{
     $q = @pg_update($db, "email_template", $email, array("id" => $email['id']));
   $msg = "Email Template has been updated successfully.";
}else{
    @pg_insert($db, "email_template",$email);
    $msg = "E-mail Template has been added successfully.";
    
        
}
 //$_SESSION['msg'] = $msg;
echo json_encode(array("error"=> 0, "msg" => $msg));
 
   
?>