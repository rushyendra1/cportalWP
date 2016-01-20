<?php
$old_pwd = (isset($_POST['old_pwd']))?$_POST['old_pwd']: "";
$new_pwd = (isset($_POST['new_pwd']))?$_POST['new_pwd']: "";
$type = (isset($_POST['type']))?$_POST['type']: "";

$status = (isset($_POST['status']))?$_POST['status']: 0;
$id = (isset($_POST['id']))?base64_decode($_POST['id']): "";
$pwd_cond = '';
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
     include_once('../../../../../wp-includes/class-phpass.php');   
     include_once('../../functions.php');
}
if(!$status){
    $pwd_cond = " and password='".md5($old_pwd)."'";
}

 $result = $wpdb->get_row( "SELECT id,user_nicename,user_pass,user_email
                             FROM ".$table_prefix."cusers
                             WHERE id='".$id."' ".$pwd_cond);

 if( $result && count($result)>0){
         insert_history("password",md5($old_pwd),md5($new_pwd),$id);
      
         
        $wpdb->update('users',$user_pass ,array("id"=> $id));
        
       
        
        
        
          
}else{
    if($pwd_cond == "")
        //echo "Username/E-mail does not exists.";
        echo json_encode(array("error" =>1, "msg" =>"Username/E-mail does not exists."));
    else    
  //echo "Old password is incorrect.";
    echo json_encode(array("error" =>1, "msg" =>"Old password is incorrect."));
}
					
?>
