<?php
session_start();
ob_start();
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */

$pages = get_current_files();
/*
if($pages == "login" && is_user_logged_in()){
    
        wp_redirect(get_site_url());
        exit;
}*/

?>
<!doctype html>
<html class="no-js" lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<title><?php echo $title; ?> </title>

<link rel="icon" href="<?php  echo get_template_directory_uri(); ?>/img/favicon.ico" />
<link rel="apple-touch-icon" href="<?php  echo get_template_directory_uri(); ?>/img/touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="<?php  echo get_template_directory_uri(); ?>/img/touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="<?php  echo get_template_directory_uri(); ?>/img/touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="<?php  echo get_template_directory_uri(); ?>/img/touch-icon-ipad-retina.png">
<link rel="apple-touch-icon" sizes="180x180" href="<?php  echo get_template_directory_uri(); ?>/img/touch-icon-iphone6-retina.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Creative Brief">
<?php wp_head(); ?>
</head>
<body>
<!--<a id="toggle_full_width" href="#" class="button tiny fixed hide-for-medium-down"><i class="fi-arrows-out"></i>&nbsp;&nbsp;Toggle Wide Screen</a>-->
<p class="hide-for-medium-down">&nbsp;</p>
<a href="<?php echo get_site_url() ?>" id="homeSite" >Home</a>
<input type="hidden" value="<?php echo get_template_directory_uri() ?>" id="rootTheme" >
            <input type="hidden" value="<?php echo get_site_url() ?>" id="siteTheme" >
             <input type="hidden" value="<?php echo $pages; ?>" id="path" >
<div>
     <?php
   
         // if(isset($_SESSION['user']['name']) && isset($_SESSION['user']['lname']) ){ 
     if(is_user_logged_in()){
         $result = wp_get_current_user();
         
         if(isset($result->user_nicename))
         $name = $result->user_nicename;
         if($name == "")
             $name = $result->user_login;
         
     ?>
          <div class="headerDiv">
              Hello <a href="<?php echo get_site_url() ?>/profile"> <?php echo $name; ?></a>
               <a   class="logouts logoutHeader logms">LOGOUT</a>
          </div>
          <?php } ?>
</div>
            