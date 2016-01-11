<?php
include_once("../../common.php");
global $root;
include_once $root.'/config.php'; 
include_once $root.'/init.php';
global $db;

 $settings['min_pass_len'] = (isset($_POST['min_pass_len']))?$_POST['min_pass_len']: 0;
 $settings['max_pass_len'] = (isset($_POST['max_pass_len']))?$_POST['max_pass_len']: 0;
 $settings['max_login_attempts'] = (isset($_POST['max_login_attempts']))?$_POST['max_login_attempts']: 0;
 
  $settings['is_edit'] = (isset($_POST['is_edit']))?$_POST['is_edit']: 0;


$result_query = @pg_query($db,"SELECT min_pass_len,max_pass_len,max_login_attempts,is_edit"
                            . " FROM settings"
                           . " WHERE id=1");
$result = @pg_fetch_assoc($result_query);
if(is_array($result) && count($result)>0)
{
    
     $q = @pg_update($db, "settings", $settings, array("id" => 1));
   $msg = "Your Settings has been updated successfully.";
}else{
    @pg_insert($db, "settings",$settings);
    $msg = "Your Settings has been added successfully.";
    
}
   //$_SESSION['msg'] = $msg;
    echo json_encode(array("error" =>0, "msg" =>$msg));
   
?>