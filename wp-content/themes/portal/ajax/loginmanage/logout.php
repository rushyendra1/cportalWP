<?php
//session_start();
//session_destroy();
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
wp_logout();
 /** Integrate the salesforce **/
        list($access_token,$instance_url) = get_connection_sales();
        global $login_time_url;
        $url = $instance_url.$login_time_url;
         $logout_array = array("Type" => "logout","userId" => $result->ID,
                "inOutDate" => date("Y-m-d\TH:i:s",time() ));
        
        $json_response = post_request($url, $access_token, json_encode($logout_array),$method);
        
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
/*$msg = "Logout successfully.";
session_start();
 $_SESSION['msg'] = $msg;
 echo $msg;*/