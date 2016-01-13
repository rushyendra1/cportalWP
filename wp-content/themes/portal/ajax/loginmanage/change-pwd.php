<?php
$old_pwd = (isset($_POST['old_pwd']))?$_POST['old_pwd']: "";
$new_pwd = (isset($_POST['new_pwd']))?$_POST['new_pwd']: "";
$id = (isset($_POST['id']))?$_POST['id']: "";
global $table_prefix;
 if(!isset($table_prefix))
    include_once('../../../../../wp-config.php');
global $wpdb;
if(!isset($wpdb))
{
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
     include_once('../../../../../../../wp-includes/class-phpass.php');
}
 $result = $wpdb->get_row( "SELECT ID,user_pass,user_nicename 
				FROM ".$table_prefix."users
				WHERE ID='".$id."'");
				
				if(wp_check_password( $old_pwd, $result->user_pass, $id))
				{
					 wp_set_password($new_pwd ,$id);
					 
				}else{
					echo "Sorry. password is does not match. Please try another password.";
					}
?>