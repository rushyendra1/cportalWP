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
/*$msg = "Logout successfully.";
session_start();
 $_SESSION['msg'] = $msg;
 echo $msg;*/