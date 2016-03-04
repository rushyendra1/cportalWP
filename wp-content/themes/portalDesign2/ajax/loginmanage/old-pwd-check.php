<?php
$old_pwd = (isset($_POST['old_pwd']))?$_POST['old_pwd']: "";
$status = (isset($_POST['status']))?$_POST['status']: 0;
$new_pwd = (isset($_POST['new_pwd']))?$_POST['new_pwd']: "";

global $table_prefix;

global $wpdb;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
   // include_once('../../../../../wp-includes/class-phpass.php');
}
//$id = (isset($_POST['id']))?$_POST['id']: "";
global $user_ID;
$id = $user_ID;
 $result = $wpdb->get_row( "SELECT ID,user_pass,user_nicename 
				FROM ".$table_prefix."users
				WHERE ID='".$id."'");

			 $user_status = wp_check_password( $old_pwd, $result->user_pass,$id);	
                        // var_dump($user_status);
                    
        //check the given password and database password
	
				if(!$user_status )
				{
					echo "Sorry. password is does not match. Please try another password.";
                                }    
                                                               

?>