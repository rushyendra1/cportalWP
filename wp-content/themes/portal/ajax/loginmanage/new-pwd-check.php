<?php

global $table_prefix;

global $wpdb;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    include_once('../../../../../wp-includes/class-phpass.php');
}
$id  = 0;
 $randno = (isset($_POST['randno']))?$_POST['randno']:"" ;
// var_dump($randno);
$new_pwd = (isset($_POST['new_pwd']))?$_POST['new_pwd']: "";
 $result = $wpdb->get_row( "SELECT ID,user_pass,user_nicename,user_forgot_pass 
				FROM ".$table_prefix."users
				WHERE forgotpwd_activation_code='".$randno."'");
 //var_dump($result);
 //echo $result;
                            if(isset($result->ID))
                            $id = $result->ID;
                        //var_dump($id);
                         // if(!$id) { echo "no data available"; exit;}   
			 $user_status = wp_check_password( $new_pwd, $result->user_forgot_pass,$id);	
                         //var_dump($user_status);
        //check the given password and database password
	
				if($user_status )
				{
					echo "Your Old and New Passwords should not match . Please enter another password.";
                                }    
                                                               

?>