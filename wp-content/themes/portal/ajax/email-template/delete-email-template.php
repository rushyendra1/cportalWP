<?php
//session_start();
include_once("../../common.php");
global $root;
include_once $root.'/config.php'; 
include_once $root.'/init.php';
 $id = ($_POST['id'])?$_POST['id']: array();
 
 /*if(!is_array($id))
  $ids_array = explode( ",",$id);else */
  $ids_array =$id;
 
 if(is_array($ids_array) && count($ids_array)>0){
 foreach($ids_array as $each){
     $id = base64_decode($each);
     $email = array("id" =>$id);
   
         $q = @pg_delete($db, "email_template",  $email);
      
 }
 }
    $msg = " E-mail Template has been deleted successfully.";
    //$_SESSION['msg'] = $msg;
    echo json_encode(array("error" => 0, "msg" =>$msg));
    exit;
?>