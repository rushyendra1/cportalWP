<?php
include_once("../../common.php");
global $root;
include_once $root.'/config.php'; 
include_once $root.'/init.php';
global $db;

 $settings['salesforce_username'] = (isset($_POST['username']))?$_POST['username']: "";
 $settings['salesforce_password'] = (isset($_POST['password']))?$_POST['password']: "";
 $settings['salesforce_token'] = (isset($_POST['token']))?$_POST['token']: "";
 $settings['salesforce_integrate_sales'] = (isset($_POST['is_integrate']))?$_POST['is_integrate']: 0;
 $settings['salesforce_lead'] = (isset($_POST['is_lead']))?$_POST['is_lead']: 0;
 $settings['salesforce_account'] = (isset($_POST['is_account']))?$_POST['is_account']: 0;
 
 

$result_query = @pg_query($db,"SELECT salesforce_username,salesforce_password,"
        . "salesforce_token,salesforce_integrate_sales,salesforce_lead,salesforce_account"
        . " FROM settings"
        . " WHERE id=1");
$result = @pg_fetch_assoc($result_query);
if(is_array($result) && count($result)>0)
{
    
     $q = @pg_update($db, "settings", $settings, array("id" => 1));
     if(!$settings['salesforce_integrate_sales'])
     {
        unset($_SESSION['session_id_salesforce']);
         unset($_SESSION['location']);
     }
   $msg = "Your Settings has been updated successfully.";
}else{
    @pg_insert($db, "settings",$settings);
    $msg = "Your Settings has been added successfully.";
    
}
/*$set_token =0;
if(isset($_SESSION['access_token']))
    $set_token =1;
   //$_SESSION['msg'] = $msg;*/
    echo json_encode(array("error" =>0, "msg" =>$msg /*, "token" => $set_token*/ 
            ));
   
?>