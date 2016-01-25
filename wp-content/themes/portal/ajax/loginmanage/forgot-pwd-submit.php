<?php
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

//$id = $user_ID;
$user_email = (isset($_POST['username']))?$_POST['username']: "";
$status = (isset($_POST['status']))?$_POST['status']: 0;

 $result = $wpdb->get_row( "SELECT ID,is_deactive,user_email
				FROM ".$table_prefix."users
				WHERE user_email='".$user_email."'");
			//echo wp_check_password( $old_pwd, $result->user_pass,$id);	
                      //check the given password and database password
                      
 if(count($result)>0)
{
     if($result->is_deactive==1)
				{
                                       echo "You are in inactive state, please contact with admin"; exit;
				}
                                else
                                {
                                    
                                      $admin_email = get_option("admin_email");
                                       $rand = wp_generate_strong_password(8);
<<<<<<< HEAD
                                    $update_array = array("forgotpwd_activation_code" => $rand,"user_pass"=> "");
=======
                                    $update_array = array("forgotpwd_activation_code" => $rand, "is_deactive" => 0);
>>>>>>> 194ef040711bc45109668a7e35614e5da18974b6
                                    $wpdb->update( $table_prefix."users", $update_array, array("ID" => $result->ID));
                                    
                                  $link = get_site_url().'/set-password?id='.base64_encode($rand);
                                 
                                      $email_info = $wpdb->get_row("SELECT subject,content "
                                                                         . " FROM " .$table_prefix."email_template"
                                                                         . " WHERE name='forgot email'");
                                                                // var_dump($email_info);
           
                                             $subject = $email_info->subject;
                                             $message  = $email_info->content;
                                             $message = str_replace("!!userName!!",$result->user_nicename,$message);
                                             $message = str_replace("!!link!!", $link,$message);
                                             $headers  = 'MIME-Version: 1.0' . "\r\n";
                                             $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
                                             $headers  .= 'From: '.$admin_email."\r\n";
                                   mail($user_email,$subject,nl2br($message),$headers);
                                 //var_dump($message);
        session_start();
    $_SESSION['msg'] =  "Thank you,your Password details has been sent to your E-mail address.";
                                }
                                
}else {
     echo "Email does not match kindly re-enter correctly"; 
}
?>