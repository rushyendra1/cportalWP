<?php
                 $msg = (isset($_SESSION['msg'])) ? $_SESSION['msg'] : "";
                unset($_SESSION['msg']);
?>
                
          <!--  </div>-->
          <div class="widthresponse" style="">
          <div class="row-fluid menualign ">
              <input type="hidden" id="msg" value="<?php echo $msg ?>" >
                <input type="hidden" id="blogname" value="<?php echo $blog ?>" >
            <nav class="top-bar" data-topbar>
                
                <section class="">
                    <ul class="menu vertical">
<?php
$active_class = '';
$pages = get_current_files();

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

                               //$tab_array = array("link1dfdfd dfdfd dfdfdsfsdf ", "link2dfdfdfdfsdfdfdf","link3","link4","link5","link6","link7","link8","link9","link10","link11","link1dfdfd dfdfd dfdfdsfsdf ", "link2dfdfdfdfsdfdfdf","link3","link4","link5","link6","link7","link8","link9","link10","link11");

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
                                    }else  if ($pages == "view-object" && $each_tab == $tabs) {
                                        $active_class = 'active';
                                    }else  if ($pages == "add-object" && $each_tab == $tabs) {
                                        $active_class = 'active';
                                    }
                                    if ($j < $limit) {
                                        ?>
                                        <li><a href="<?php echo get_site_url() ?>/object-list/?id=<?php echo $api_array[$i] ?>&obj_name=<?php echo $each_tab; ?>" class="<?php echo $active_class ?>"><span><?php echo $each_tab; ?></span></a></li>
                                    <?php } if ($j == $limit && count($tab_array) > $limit) { ?>
                                   
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
                                        </nav>
    </div>
              </div>
          
                                     
<!--<li ><a href="<?php echo get_site_url() ?>/logout">Logout</a></li> -->
                    </ul> <!--</div>-->
                </section>
            </nav>
          </div>
              </div>
              
              <div class="navbar navbar-inverse navbar-fixed-top" role="navigation" style="">
              <div class="container">
              <div class="navbar-header">
                  <button class="navbar-toggle collapsed" data-target=".navbar-collapse" data-toggle="collapse" type="button" style="display:none">
<span class="sr-only">Toggle navigation</span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
</button>
</div>
              <div class="navbar-collapse collapse in">
<div class="section" id="navigation"><div class="widget HTML" id="HTML1">
<div class="widget-content">
<ul class="nav navbar-nav" id="nav">
                    <li><a href="/">Menu</a></li>
                    
                    
                    <?php
$active_class = '';
$pages = get_current_files();

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

                               //$tab_array = array("link1dfdfd dfdfd dfdfdsfsdf ", "link2dfdfdfdfsdfdfdf","link3","link4","link5","link6","link7","link8","link9","link10","link11","link1dfdfd dfdfd dfdfdsfsdf ", "link2dfdfdfdfsdfdfdf","link3","link4","link5","link6","link7","link8","link9","link10","link11");

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
                                        </nav>
    </div>
              </div>
    </div>  
          
                                     
<!--<li ><a href="<?php echo get_site_url() ?>/logout">Logout</a></li> -->
                    </ul> <!--</div>-->
                </section>
            </nav>
          </div>
              </div>
                  </div>
                    
                    
                    
                    
                    
                    
                    
 