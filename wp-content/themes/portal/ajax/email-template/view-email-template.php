<?php
include_once("../../common.php");
global $root;
include_once $root.'/config.php'; 
include_once $root.'/init.php';
global $db;

 $id = ($_POST['id'])?base64_decode($_POST['id']): 0;
 $email = @pg_query($db,"SELECT id,name,content,subject"
         . " FROM email_template"
         . " WHERE id=".$id);
 $email_info = @pg_fetch_assoc($email);
 echo json_encode(array("data" => $email_info));
   
?>