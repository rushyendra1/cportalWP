<?php
session_start();

/** Load the configuration files **/
global $wpdb;
global $table_prefix;
$max_login_attempts = 0;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    include_once('../../../../../wp-includes/class-phpass.php');
}

$result = $wpdb->get_row("SELECT min_pass_len,max_pass_len,max_login_attempts"
                            . " FROM ".$table_prefix."settings"
                           . " WHERE id=1");



if(isset($result->max_login_attempts))

 $max_login_attempts = (int)$result->max_login_attempts ;
$max_login_attempts +=1;

if(!isset($_SESSION['forgot-times']))
{
    $_SESSION['forgot-times'] =1;
}  else {
    $_SESSION['forgot-times']+=1;
}
if($_SESSION['forgot-times'] >=$max_login_attempts)
{
    echo "If you forgot your password reset by click on"
    . " <a href='".get_site_url()."/forgot' class='forgot-link'>Forgot Password</a> link.";
    exit;
}
 $user = (isset($_POST['username']))?$_POST['username']: "";
$pass = (isset($_POST['password']))?$_POST['password']: "";

try{
/*** Check the username is present in wp users ***/
 $result = $wpdb->get_row( "SELECT ID,user_pass,user_nicename 
				FROM ".$table_prefix."users
				WHERE user_login='".$user."'");

if($result>=0)
{ //if data is there check password for given username
    $db_pass = $result->user_pass;
    //generate the password for given password field
	$pass_obj = new PasswordHash(16,true);
        //check the given password and database password
	$check =$pass_obj->CheckPassword($pass, $db_pass);
        //if both are not same raise the error
        if(!$check){
            echo "If you forgot your password reset by click on <a href='forgot.php' class='forgot-link'>Forgot Password</a> link.";
            exit;
        }
        
        //Store the user name and id in session
         /* session_start();
	  $_SESSION['user']= array( "name" =>$result->user_nicename,
                     'id' =>$result->ID);*/
        $login_array = array("Type" => "login","userId" => $result->ID,
                "inOutDate" => date("Y-m-d\TH:i:s",time() ));
     
        /** Integrate the salesforce **/
        list($access_token,$instance_url) = get_connection_sales();
        global $login_time_url;
        $url = $instance_url.$login_time_url;
        $json_response = post_request($url, $access_token, json_encode($login_array),$method);
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
            'remember' => true );

/*$secure_cookie = is_ssl();

$secure_cookie = apply_filters('secure_signon_cookie', $secure_cookie, $credentials);
add_filter('authenticate', 'wp_authenticate_cookie', 30, 3);

$user = wp_authenticate($credentials['user_login'], $credentials['user_password']);
wp_set_auth_cookie($user->ID, $credentials["remember"], $secure_cookie);*/
        $user = wp_signon( $credentials, false );
//         do_action('wp_login', $user->user_login, $user);
        wp_set_current_user($user->ID);
//do_action('wp_login', $user->user_login, $user);
    /*    $creds = array();
		$creds['user_login']    = $user;
		$creds['user_password'] = $pass;
		//$creds['remember']      = $rememberme;

		// Log in the user and get the user object.
		$user = wp_signon( $creds, false );
                if (  is_wp_error( $user ) ){
                    echo "Login failed";
                    exit;
                }
                do_action('wp_login', $user->user_login, $user);*/
               // wp_set_current_user($user->ID);
		 echo "";
		 exit;
                 
    
    
}

if(is_array($result) && count($result)>0)
{
  $max_login_attempts = $result['max_login_attempts'] ;
}
$max_login_attempts +=1;
if(!isset($_SESSION['forgot-times']))
{
    $_SESSION['forgot-times'] =1;
}  else {
    $_SESSION['forgot-times']+=1;
}
if($_SESSION['forgot-times'] >=$max_login_attempts)
{
    echo "your account is blocked";
    exit;
}
 $user = (isset($_POST['username']))?$_POST['username']: "";
$pass = (isset($_POST['password']))?$_POST['password']: "";
}  catch (Exception $e)
{
    echo "Internal server error";
}

?>