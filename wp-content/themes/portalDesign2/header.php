<?php
session_start();
ob_start();
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage portalDesign2
 * @since portalDesign2 1.0
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

        <div class="row-fluid ">
            <div class=" row-fluid autoheighthm">
            <!--<div id="wrapHome" class="row-fluid"  >-->

                <div  class="row headerrow">
                <div id="logo" class="medium-2 columns" >
                    <a href="<?php echo get_site_url() ?>"><img src="<?php echo get_template_directory_uri() ?>/images/cportal/logods.png" /></a>
                </div>
                <div class="medium-10 columns " >
                    <div class="medium-6 columns mainTitleH1">
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
                            <b>You are logged in as:</b> <br> <a href="<?php echo get_site_url() ?>/profile"> <?php echo $name; ?></a>
                            </div>
                            <div>
                            <a   class="logouts logoutHeader logms logoutalign">LOGOUT</a>
                            </div>
                        </div>
               

                
                    
<?php }  ?>
                    </div>
                </div>
                    
               
 </div>
                <!--</div>-->
          
                                     
<!--<li ><a href="<?php echo get_site_url() ?>/logout">Logout</a></li> -->
                    </ul> <!--</div>-->
                </section>
            </nav>
          </div>
  </div>     
<!--<p class="hide-for-medium-down">&nbsp;</p>-->
            <div class="clear"></div>

            <input type="hidden" value="<?php echo get_template_directory_uri() ?>" id="rootTheme" >
            <input type="hidden" value="<?php echo get_site_url() ?>" id="siteTheme" >
            <input type="hidden" value="<?php echo $pages; ?>" id="path" >
