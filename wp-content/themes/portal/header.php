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
global $table_prefix;
global $wpdb;
$pages = get_current_files();
$blogname = get_option('blogname');
$blogdescription = get_option('blogdescription');
$blog = $blogname . " | " . $blogdescription;

 
 $result = $wpdb->get_row("SELECT title"
                            . " FROM ".$table_prefix."settings"
                           . " WHERE id=1");
                $title='';
                if(isset($result) && count($result)>0)
                {
                    $portal = $result->title;
                }
?>

<!DOCTYPE html>
<html>
    <head>
        <?php wp_head(); ?>
    </head>
    <body>

        <div class="row-fluid autoheighthm">
            <!--<div class=" row-fluid">-->
            <!--<div id="wrapHome" class="row-fluid"  >-->

                <div  class="row headerrow">
                <div id="logo" class="medium-2 columns" >
                    <a href="<?php echo get_site_url() ?>"><img src="<?php echo get_template_directory_uri() ?>/images/cportal/logo.png" /></a>
                </div>
                <div class="medium-6 columns mainTitleH1" >
                <h1 id="name" class="header">
                    <a href="<?php echo get_site_url() ?>"><?php echo $portal; ?></a>
                </h1>
                </div>
                    <?php
                // if(isset($_SESSION['user']['name']) && isset($_SESSION['user']['lname']) ){ 
                if (is_user_logged_in()) {

                    $result = wp_get_current_user();
                    if (isset($result->user_nicename))
                        $name = $result->user_nicename;
                    if ($name == "")
                        $name = $result->user_login;
                    ?>
                    
                    <div class="medium-4 columns nameDisp "   >
                            <div class="loggin">
                            <b>You are logged in as:</b> <a href="<?php echo get_site_url() ?>/profile"> <?php echo $name; ?></a>
                            </div>
                            <div>
                            <a   class="logouts logoutHeader logms logoutalign">LOGOUT</a>
                            </div>
                        </div>
               

                
                    
<?php }  ?>
               
 </div>
                <!--</div>-->
          <?php
                 $msg = (isset($_SESSION['msg'])) ? $_SESSION['msg'] : "";
                unset($_SESSION['msg']);
                ?>
                <input type="hidden" id="msg" value="<?php echo $msg ?>" >
                <input type="hidden" id="blogname" value="<?php echo $blog ?>" >
          <!--  </div>-->
          <div class="row-fluid">
            <nav class="top-bar" data-topbar>
                <ul class="title-area">
                    <li  class="name"> <a href="#">&nbsp;</a></li>
                    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
                </ul>
                <section class="top-bar-section">
                    <ul class="left">
<?php
$active_class = '';
if ($pages == "" || $pages == "home") {
    $active_class = 'active';
}
?>
                        <li ><a href="<?php echo get_site_url() ?>" class="<?php echo $active_class; ?>" >Home</a></li>
                        <?php
                        if (!is_user_logged_in()) {
                            $active_class = '';
                            if ($pages == "login") {
                                $active_class = 'active';
                            }
                            ?>
                            <li><a href="<?php echo get_site_url() ?>/login" class="<?php echo $active_class; ?>"><span>Login</span></a></li>
                        <?php
                        }

                        if (is_user_logged_in()) {

                            /** * Connects to salesforce * */

                            $response_array = get_tabs_from_sales();
                            $res_array = json_encode($response_array);
                            define("RESARRAY",$res_array);
                            if (count($response_array) > 0) {

                                $tab_array = $response_array['TabList'];

                               //$tab_array = array("link1dfdfd dfdfd dfdfdsfsdf ", "link2dfdfdfdfsdfdfdf","link3","link4","link5","link6","link7","link8","link9","link10","link11");

                                $api_array = $response_array['ApiList'];
                                //$api_array = array("link1cvcvcvcvcvcvcvxc", "link2cvxcvcv ccvcvc","link3","link4","link5","link6","link7","link8","link9","link10","link11");
                                $i = 0;
                                $j = 0;
                                $limit =5;
                                for ($i = 0; $i <= $limit; $i++) {
                                //foreach($tab_array as $each_tab)
                                    $tabs = '';
                                    if(isset($_GET['obj_name']))
                                    $tabs = $_GET['obj_name'];
                                    $active_class = '';
                                    $each_tab = $tab_array[$i];
                                    if ($pages == "object-list" && $each_tab == $tabs) {
                                        $active_class = 'active';
                                    }
                                    if ($j < $limit) {
                                        ?>
                                        <li><a href="<?php echo get_site_url() ?>/object-list/?id=<?php echo $api_array[$i] ?>&obj_name=<?php echo $each_tab; ?>" class="<?php echo $active_class ?>"><span><?php echo $each_tab; ?></span></a></li>
                                    <?php } if ($j == $limit && count($tab_array) > $limit) { ?>
                                        <li class="has-dropdown"><a href="#" > +</a><ul class="dropdown">
                                        <?php
                                        for ($k = $j; $k < count($tab_array); $k++) {
                                            $each_tab = $tab_array[$k];
                                            ?>
                                                    <li>
                                                        <a href="<?php echo get_site_url() ?>/object-list/?id=<?php echo $api_array[$k] ?>&obj_name=<?php echo $each_tab; ?>" class="<?php echo $active_class ?>">
                                                            <span><?php echo $each_tab; ?></span>
                                                        </a></li>
                <?php } ?>
                                            </ul>
                                        </li>
                                            <?php } ?>



            <?php
            $j++;
        } //for loop
    } //if of response array
} // is user logged in  
?>
                                     
<!--<li ><a href="<?php echo get_site_url() ?>/logout">Logout</a></li> -->
                    </ul> <!--</div>-->
                </section>
            </nav>
          </div>
  <!--</div>     -->
<!--<p class="hide-for-medium-down">&nbsp;</p>-->
            <div class="clear"></div>

            <input type="hidden" value="<?php echo get_template_directory_uri() ?>" id="rootTheme" >
            <input type="hidden" value="<?php echo get_site_url() ?>" id="siteTheme" >
            <input type="hidden" value="<?php echo $pages; ?>" id="path" >
