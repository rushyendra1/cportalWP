<?php

$old_pwd = (isset($_POST['old_pwd'])) ? $_POST['old_pwd'] : "";
$status = (isset($_POST['status'])) ? $_POST['status'] : 0;
$new_pwd = (isset($_POST['new_pwd'])) ? $_POST['new_pwd'] : "";

global $table_prefix;

global $wpdb;
if (!isset($wpdb)) {
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    // include_once('../../../../../wp-includes/class-phpass.php');
}
//$id = (isset($_POST['id']))?$_POST['id']: "";
global $user_ID;
$id = $user_ID;

$rand = (isset($_POST['rand'])) ? trim($_POST['rand']) : "";


if ($status == 1) {


    $rel = $wpdb->get_row("SELECT ID
                           FROM " . $table_prefix . "users
                           WHERE forgotpwd_activation_code='" . $rand . "'");
    $id = $rel->ID;

    //  var_dump($forgotpwd_activation_code);
}

$result = $wpdb->get_row("SELECT ID,user_pass,user_nicename,user_email,user_login,is_Deactive 
				FROM " . $table_prefix . "users
				WHERE ID='" . $id . "'");

//echo wp_check_password( $old_pwd, $result->user_pass,$id);	
$is_fun = 0;
//check the given password and database password
if ($status == 1) {
    $rand = wp_generate_strong_password(8);
    $update_array = array("forgotpwd_activation_code" => "");
    $wpdb->update($table_prefix . "users", $update_array, array("ID" => $id));
    $is_fun = 1;
} else {


    if (wp_check_password($old_pwd, $result->user_pass, $id)) {
        $is_fun = 1;

        // $wpdb->update('users',$user_pass ,array("id"=> $id));
    } else {
        echo "Sorry. password is does not match. Please try another password.";
        exit;
    }
}
if ($is_fun) {
    wp_set_password($new_pwd, $id);
    session_start();
    $_SESSION['msg'] = 'Your Password is Changed Successfully';
      $admin_email = get_option("admin_email");
    unset($_SESSION['forgot-times']);

    if(!$status)
    {



    $credentials = array('user_login' => $result->user_login,
        'user_password' => $new_pwd,
        'remember' => true);
    $user = wp_signon($credentials, false);
//         do_action('wp_login', $user->user_login, $user);
    wp_set_current_user($user->ID);

    }

    

    $email_info = $wpdb->get_row("SELECT subject,content "
            . " FROM " . $table_prefix . "email_template"
            . " WHERE name='change password email'");


    $subject = $email_info->subject;
    $message = $email_info->content;
    $message = str_replace("!!userName!!", $user_nicename, $message);
    $message = str_replace("!!uname!!", $result->user_email, $message);
    $message = str_replace("!!pwd!!", $new_pwd, $message);

    // if($type != "")  
    //$_SESSION['msg'] = $subject;

    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: ' . $admin_email . "\r\n";


    mail($user_email, $subject, nl2br($message), $headers);
}
?>