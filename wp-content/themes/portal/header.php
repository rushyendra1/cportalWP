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
$blogname = get_option('blogname');
$blogdescription = get_option('blogdescription');
$blog = $blogname . "|" . $blogdescription;
?>
<!DOCTYPE html>
<html>
    <head>
        <?php wp_head(); ?>
    </head>
    <body>

        <div class="row-fluid">
            <div id="wrapHome" class="row-fluid"  >

                <div  class="row">
                <div id="logo" class="medium-3 columns">
                    <a href="<?php echo get_site_url() ?>"><img src="<?php echo get_template_directory_uri() ?>/images/cportal/logo.png" /></a>
                </div>
                <div class="medium-9 columns mainTitleH1">
                <h1 id="name" class="header">
                    <a href="<?php echo get_site_url() ?>">Customer Portal</a>
                </h1>
                </div>
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
                    <div id="Login" class="row">
                        <div class="columns-4 nameDisp">
                            Hello <a href="<?php echo get_site_url() ?>/profile"> <?php echo $name; ?></a>
                            <a   class="logouts logoutHeader logms">LOGOUT</a>
                        </div></div>
<?php } ?>

                <?php
                $msg = (isset($_SESSION['msg'])) ? $_SESSION['msg'] : "";
                unset($_SESSION['msg']);
                ?>
                <input type="hidden" id="msg" value="<?php echo $msg ?>" >
                <input type="hidden" id="blogname" value="<?php echo $blog ?>" >





            </div>      
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

                            /*                             * * Connects to salesforce * */

                            $response_array = get_tabs_from_sales();

                            if (count($response_array) > 0) {

                                $tab_array = $response_array['TabList'];
                                $tab_array = array("link1", "link2","link3","link4","link5","link1", "link2","link3","link4","link5","link1", "link2","link3","link4","link5","link1", "link2","link3","link4","link5");

                                $api_array = $response_array['ApiList'];
                                $api_array = array("link1", "link2","link3","link4","link5","link1", "link2","link3","link4","link5","link1", "link2","link3","link4","link5","link1", "link2","link3","link4","link5");
                                $i = 0;
                                $j = 0;
                                for ($i = 0; $i <= 14; $i++) {
                                //foreach($tab_array as $each_tab)
                                    $tabs = $_GET['obj_name'];
                                    $active_class = '';
                                    $each_tab = $tab_array[$i];
                                    if ($pages == "object-list" && $each_tab == $tabs) {
                                        $active_class = 'active';
                                    }
                                    if ($j < 14) {
                                        ?>
                                        <li><a href="<?php echo get_site_url() ?>/object-list/?id=<?php echo $api_array[$i] ?>&obj_name=<?php echo $each_tab; ?>" class="<?php echo $active_class ?>"><span><?php echo $each_tab; ?></span></a></li>
                                    <?php } if ($j == 14 && count($tab_array) >= 14) { ?>
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


<!--<p class="hide-for-medium-down">&nbsp;</p>-->
            <div class="clear"></div>

            <input type="hidden" value="<?php echo get_template_directory_uri() ?>" id="rootTheme" >
            <input type="hidden" value="<?php echo get_site_url() ?>" id="siteTheme" >
            <input type="hidden" value="<?php echo $pages; ?>" id="path" >
