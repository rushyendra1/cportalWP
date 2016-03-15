<?php
session_start();

/** Load the configuration files **/
global $wpdb;
global $table_prefix;

if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    include_once('../../../../../wp-includes/class-phpass.php');
}
$max_login_attempts = 0;
$result = $wpdb->get_row("SELECT min_pass_len,max_pass_len,max_login_attempts"
                            . " FROM ".$table_prefix."settings"
                           . " WHERE id=1");



if(isset($result->max_login_attempts))

 $max_login_attempts = (int)$result->max_login_attempts ;
$max_login_attempts +=1;
$max_login_attempts = (int) $max_login_attempts;
if(!isset($_SESSION['forgot-times']))
{
    $_SESSION['forgot-times'] =1;
}  else {
    $_SESSION['forgot-times']+=1;
}
//echo  $_SESSION['forgot-times'];
if($_SESSION['forgot-times']>= $max_login_attempts)
{
    echo "If you forgot your password reset by click on"
    . " <a href='".get_site_url()."/forgot' class='forgot-link'>Forgot Password</a> link.";
    exit;
}
 $user = (isset($_POST['username']))?$_POST['username']: "";
$pass = (isset($_POST['password']))?base64_decode(trim($_POST['password'])): "";

try{
/*** Check the username is present in wp users ***/
 $result = $wpdb->get_row( "SELECT ID,user_pass,user_nicename 
				FROM ".$table_prefix."users
				WHERE user_login='".$user."'");
 var_dump($result);
if(count($result) == 0)
{
    echo "Username/password doest not match";
}


    $db_pass = $result->user_pass;
    //generate the password for given password field
	$pass_obj = new PasswordHash(16,true);
        //check the given password and database password
	$check =$pass_obj->CheckPassword($pass, $db_pass);
        //if both are not same raise the error
        if(!$check){
            echo "Username/password does not match";
            exit;
        }
        
        $login_array = array( "method" => "LoginDetails",
            "Type" => "login","userId" => $result->ID,
                "inOutDate" => date("Y-m-d\TH:i:s",time() ));
    
        /** Integrate the salesforce **/
        list($access_token,$instance_url) = get_connection_sales();
        global $login_time_url;
        $url = $instance_url.$login_time_url;
        $json_response = post_request($url, $access_token, json_encode($login_array),"POST");
        
        $response_array = explode("chunked",$json_response);
    if(isset($response_array[1]))
    $json_response = $response_array[1];
 //}
 $response = json_decode($json_response); 
 
 if(isset($response[0]->errorCode))
    {
        //var_dump($response);
        $admin_email = get_option("admin_email");
        mail($admin_email,$response[0]->errorCode, $response[0]->message );
        echo  "Something event wrong. Please contact your system Administrator.";
        exit;
    }
    if($response == "There is no user in Salesforce")
    {
        echo $response; exit;
    }
    unset($_SESSION['forgot-times']);      
        $credentials = array( 'user_login' =>  $user,
            'user_password' => $pass,
            'remember' => false );

        $user = wp_signon( $credentials, false );
        wp_set_current_user($user->ID);
		 echo "";
		 exit;
}  catch (Exception $e)
{
    echo "Internal server error";
}

?>