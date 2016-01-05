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
/* do after words $max_login_attempts = 0;
$result_query = @pg_query($db,"SELECT min_pass_len,max_pass_len,max_login_attempts"
                            . " FROM settings"
                           . " WHERE id=1");
$result = @pg_fetch_assoc($result_query);
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
    echo "If you forgot your password reset by click on <a href='forgot.php' class='forgot-link'>Forgot Password</a> link.";
    exit;
}*/
 $user = (isset($_POST['username']))?$_POST['username']: "";
$pass = (isset($_POST['password']))?$_POST['password']: "";
try{

/*** Check the username is present in wp users ***/
 $result = $wpdb->get_row( "SELECT ID,user_pass,user_nicename 
				FROM ".$table_prefix."users
				WHERE user_login='".$user."'");


if($result>0)
{ //if data is there check password for given username
    $db_pass = $result->user_pass;
    //generate the password for given password field
	$pass_obj = new PasswordHash(16,true);
        //check the given password and database password
	$check =$pass_obj->CheckPassword($pass, $db_pass);
        //if both are not same raise the error
        if(!$check){
            echo "Username/E-mail or Password is incorrect.";
            exit;
        }
        //Store the user name and id in session
         /* session_start();
	  $_SESSION['user']= array( "name" =>$result->user_nicename,
                     'id' =>$result->ID);*/
        
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
    
    
}else{
    echo "Username/E-mail or Password is incorrect.";
}
}  catch (Exception $e)
{
    echo "Internal server error";
}
?>