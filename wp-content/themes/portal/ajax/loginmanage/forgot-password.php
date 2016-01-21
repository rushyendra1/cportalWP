<?php
echo $user_email = (isset($_POST['user_email']))?$_POST['user_email']: "";
$status = (isset($_POST['status']))?$_POST['status']: 0;


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
global $user_email;
$email = $user_email;
 $result = $wpdb->get_row( "SELECT ID,user_nicename,user_email
				FROM ".$table_prefix."users
				WHERE user_email='".$email."'");
			//echo wp_check_password( $old_pwd, $result->user_pass,$id);	
                        
        //check the given password and database password
	
                             if($result)
				{
					 
					echo "email exists try to change password";
				}else{
					echo "Sorry. password is does not match. Please try another password.";
					}

				    			

?>