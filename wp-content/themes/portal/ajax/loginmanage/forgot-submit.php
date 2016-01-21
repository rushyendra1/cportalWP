<?php
$user = (isset($_POST['username']))?$_POST['username']: "";
$is_admin = (isset($_POST['is_admin']))?$_POST['is_admin']: 0;

include_once 'functions.php';
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
$user_info = $wpdb->get_row(" SELECT id,user_nicename,user_email"
        . " FROM ".$table_prefix."users"
        . " WHERE email='".$id."'");
 $name = $user_info['name']. " ".$user_info['lname'];

if(is_array($user_info) && count($user_info)>0)
{
     if($user_info['admin_inactive'])
     {
         if($is_admin && !$user_info['allow_admin'] && $user_info['allow_login'] )
              echo "Username/E-mail does not exists.";
         else
          echo "Your Account is Deactive. Please contact Admin.";
           exit;
     }
     if( $is_admin && !$user_info['allow_admin'] && $user_info['allow_login'] ){
           echo "You should have admin priviliges.";
           exit;
      }/*else if(!$is_admin && $user_info['allow_admin']){
          echo "You should have site priviliges.";
           exit;
      }*/
    if(!$user_info['status'])
    {
        echo "Your account is Deactive Please check you mail.";
        $rand_no = generate_strong_password();
        $wpdb->update( "user", array("activation_rand" => $rand_no), array("id" => $user_info['id']));
       
        $link = SITE_URL.'active-account.php?id='.base64_encode($rand_no);
         /** Get the Email **/
        $email_info = $wpdb->get_row("SELECT subject,content "
        . " FROM ".$table_prefix." email_template"
        . " WHERE name='activation email'");
        
        
        $subject = $email_info['subject'];
        $message  = $email_info['content'];
        $message = str_replace("!!userName!!", $name,$message);
        $message = str_replace("!!link!!", $link,$message);
    global $smtp_user;
    global $smtp_user_name;
    mail_sends($smtp_user,$smtp_user_name,$user,$user_info['name']." " .$user_info['lname'] ,$subject,nl2br($message));
        exit;
    }
    $rand_no = generate_strong_password(8);
    $update_array = array("pwd_activation_code" => $rand_no,'status' => 1);
    if($user_info['allow_login'])
    {
        $update_array['allow_login'] = 0;
        $update_array['role_changes'] = "site";
    }
    if($user_info['allow_admin'])
    {
        $update_array['allow_admin'] = 0;
        $update_array['role_changes'] = "admin";
    }
    @pg_update($db, "contacts", $update_array, array("id" => $user_info['id']));
     $admin_str  = '';
        if($is_admin)
            $admin_str  = '&a=1';
    $link = SITE_URL.'change-pwd.php?s=1&id='.  base64_encode($rand_no).$admin_str;
   
     /** Get the Email **/
        $email_info = $wpdb->get_row("SELECT subject,content "
        . " FROM ".$table_prefix."email_template"
        . " WHERE name='forgot email'");
       
        $subject = $email_info['subject'];
        $message  = $email_info['content'];
        $message = str_replace("!!userName!!", $name,$message);
        $message = str_replace("!!link!!", $link,$message);
      global $smtp_user;
    global $smtp_user_name;
    mail_sends($smtp_user,$smtp_user_name,$user,$name ,$subject,nl2br($message));
    session_start();
    $_SESSION['msg'] =  "Thank you,your Password details has been sent to your E-mail address.";
}else{
    echo "Username/E-mail does not exists.";
}
?>