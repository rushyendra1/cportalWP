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

/*if($pages == "login" && is_user_logged_in()){
    
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
    
    <!doctype html>

<html lang="en-US">
<head>
<meta charset="UTF-8" />
<title>Customer Portal</title>

<!--<link href="style.css" rel="stylesheet" type="text/css">
<link href="styles/print/main.css" rel="stylesheet" type="text/css" media="print">-->
<!--[if IE]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<!--[if IE 6]>
<script src="js/belatedPNG.js"></script>
<script>
	DD_belatedPNG.fix('*');
</script>
<![endif]-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript">

function Openeditcourse(a)
{
	var links = "courseinsert.php?slid=" + a + "&view=course";
  var ReturnedValue = showModalDialog(links,"Passed String","dialogWidth:450px; dialogHeight:400px; status:no; center:yes");
	//alert("Modal Dialog returned '" + ReturnValued + "'");
}

</script>
</head>
 <div id="wrap">
	
	   <div >
               <div id="logo">
                  <img src="<?php echo get_template_directory_uri() ?>/images/cportal/logo.png" />
                   </div>
                                <h1 id="name" class="header">
					<a href="<?php echo get_site_url() ?>">Customer Portal</a>
				</h1>
               
               
               <div id="Login">
     <?php
         // if(isset($_SESSION['user']['name']) && isset($_SESSION['user']['lname']) ){ 
     if(is_user_logged_in()){
         
         $result = wp_get_current_user();    
         if(isset($result->user_nicename))
         $name = $result->user_nicename;
         if($name == "")
             $name = $result->user_login;
        
     ?>
          <!--<div class="headerDiv">
              Hello <a href="<?php echo get_site_url() ?>/profile"> <?php echo $name; ?></a>
               <a   class="logouts logoutHeader logms">LOGOUT</a>
          </div>-->
          <?php } ?>
</div>
             <?php
             
             $msg = (isset($_SESSION['msg']))?$_SESSION['msg']: "";
             unset($_SESSION['msg']);
             ?>
             <input type="hidden" id="msg" value="<?php echo $msg ?>" >
               
                  
	 	</div>


    
      <!--<div id="nav_area"> -->
      <nav class="top-bar" data-topbar>
      <ul class="title-area">
    <li  class="name"> <a href="#">&nbsp;</a></li>
    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
      </ul>
           <section class="top-bar-section">
                <ul class="left">
               <?php 
               $active_class = '';
           if($pages=="portal" || $pages=="home" )
           {
            $active_class = 'active';
           } ?>
                     <li ><a href="<?php echo get_site_url() ?>" class="<?php  echo $active_class; ?>" >Home</a></li>
    <?php if(!is_user_logged_in()) {
        $active_class = '';
           if($pages=="login")
           {
            $active_class = 'active';
           }
        ?>
<li><a href="<?php echo get_site_url() ?>/login" class="<?php echo $active_class; ?>"><span>Login</span></a></li>
<?php }  

if(is_user_logged_in()){

    /*** Connects to salesforce **/
   
 $response_array = get_tabs_from_sales();
   if(count($response_array)>0)
   { 
       //var_dump($response_array);
       $tab_array = $response_array['TabList'];
       //var_dump($tab_array);
       $api_array = $response_array['ApiList'];
       $i =0; $j= 0;
       foreach($tab_array as $each_tab)
       {
           $tabs=$_GET['obj_name'];
           $active_class = '';
           if($pages=="object-list" && $each_tab ==$tabs )
           {
            $active_class = 'active';
           }
       ?>
<li><a href="<?php echo get_site_url() ?>/object-list/?id=<?php echo $api_array[$i] ?>&obj_name=<?php echo $each_tab; ?>" class="<?php echo $active_class  ?>"><span><?php echo $each_tab; ?></span></a></li>
 
    <?php  if($j == 15){
        //echo "</ul><ul>"; $j =0;
    }
    $i++; $j++;

   } //for loop
   } //if of response array
} // is user logged in  ?>
<!--<li ><a href="<?php echo get_site_url() ?>/logout">Logout</a></li> -->
<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>
<!--<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>
<li><a href="#"><span>fghhghfg</span></a></li>-->
      <!--</ul></div><div id="nav_area" ><ul>-->
      <li class="has-dropdown"><a href="#" > +</a>
          <ul class="submenu dropdown">
                <li><a href="<?php echo get_site_url() ?>"><span>fghhghfg</span></a></li>
      
                <li><a href="#"><span>fghhghfg</span></a></li> 

          </ul>
      </li>
      </ul> <!--</div>-->
           </section>
      </nav>

     

</div>    
  
<p class="hide-for-medium-down">&nbsp;</p>

<!--<a href="<?php echo get_site_url() ?>" id="home" >Home</a>

<a href="<?php echo get_site_url() ?>" id="homeSite" >Login</a> -->

<input type="hidden" value="<?php echo get_template_directory_uri() ?>" id="rootTheme" >
            <input type="hidden" value="<?php echo get_site_url() ?>" id="siteTheme" >
             <input type="hidden" value="<?php echo $pages; ?>" id="path" >
             <div id="home">
                
                 </div>

             
             