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
 $result = $wpdb->get_row( "SELECT ID,user_pass,user_nicename,user_email,user_login 
				FROM ".$table_prefix."users
				WHERE ID='".$id."'");
 
			//echo wp_check_password( $old_pwd, $result->user_pass,$id);	
                        
        //check the given password and database password
	
				if(wp_check_password( $old_pwd, $result->user_pass, $id))
				{
					 wp_set_password($new_pwd ,$id);
					// $wpdb->update('users',$user_pass ,array("id"=> $id));
				}else{
					echo "Sorry. password is does not match. Please try another password.";
					}
                                        session_start();                                        
                                        $_SESSION['msg']='Your Password is Changed Successfully';
                                        
                                        unset($_SESSION['forgot-times']);      
        $credentials = array( 'user_login' =>  $result->user_login,
            'user_password' => $new_pwd,
            'remember' => true );
 $user = wp_signon( $credentials, false );
//         do_action('wp_login', $user->user_login, $user);
        wp_set_current_user($user->ID);
                                        $email_info = $wpdb->get_row("SELECT subject,content "
                                         . " FROM ".$table_prefix."email_template"
                                         . " WHERE name='change password email'");
                              
            
        $subject = $email_info->subject;
        $message  = $email_info->content;
        $message = str_replace("!!userName!!",$user_nicename,$message);
        $message = str_replace("!!uname!!",$result->user_email,$message);
        $message = str_replace("!!pwd!!", $new_pwd,$message);
	
       // if($type != "")  
        //$_SESSION['msg'] = $subject;
       
        $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  $headers  .= 'From: '.$admin_email."\r\n";
  
mail($user_email,$subject,$message,$headers);
   	
?>