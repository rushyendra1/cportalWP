<?php
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    
}

 $settings['min_pass_len'] = (isset($_POST['min_pass_len']))?$_POST['min_pass_len']: 0;
 $settings['max_pass_len'] = (isset($_POST['max_pass_len']))?$_POST['max_pass_len']: 0;
 $settings['max_login_attempts'] = (isset($_POST['max_login_attempts']))?$_POST['max_login_attempts']: 0;
 $settings['allow_edit'] = (isset($_POST['is_edit']))?$_POST['is_edit']: 0;
 $settings['title'] = (isset($_POST['title']))?$_POST['title']: '';

$result = $wpdb->get_row("SELECT title,min_pass_len,max_pass_len,max_login_attempts,allow_edit"
                            . " FROM ".$table_prefix."settings"
                           . " WHERE id=1");

if(isset($result) && count($result)>0)
{
    
    $wpdb->update($table_prefix."settings", $settings, array("id" => 1));
   $msg = "Your Settings has been updated successfully.";
}else{
    $wpdb->insert($table_prefix."settings",$settings);
    $msg = "Your Settings has been added successfully.";
    
}
   echo json_encode(array("error" =>0, "msg" =>$msg));
   
?>