<?php
/**
 * Template Name: Page Home
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
redirect_to_login();
get_header(); ?>

<div class="bodyCell contentSub row-fluid" >
<!-- Start page content -->
<a name="skiplink">
    <!--<img width="1" height="1" title="Content Starts Here" class="skiplink skipLinkTargetInner zen-skipLinkTarget" alt="Content Starts Here" src="/s.gif">-->
</a>

<input type="hidden" id="msg" value="<?php echo $msg ?>" >
  <div class="row toggle-full-width">
    <div class="large-12 columns">
      <!--<h4 class="right"><small><em>* = Required</em></small></h4>-->
      <h4>Customer Portal</h4>
      <br>
      <div id="section_1">
         
          <div class="row">
              
          <div class="columns small-12"> 
      
          
            <?php
            //if(isset($_SESSION['user'])){
            if(is_user_logged_in()){
            ?>
              <a href="<?php echo get_site_url() ?>/profile"  class="button radius submit link">My Profile</a>
              <?php 
              $response_array = get_tabs_from_sales();
              
               if(count($response_array)>0)
                { 
                  $tab_array = $response_array['TabList'];
                  $api_array = $response_array['ApiList'];
                  $i =0;
                    foreach($tab_array as $each_tab)
                    {
                       /* if($i == 3)
                        {
                            echo "<br>";
                            $i =0;
                        }
                        $i++;*/
                        if($each_tab != ""){
                        ?>
                     <a href="<?php echo get_site_url() ?>/object-list/?id=<?php echo $api_array[$i] ?>&obj_name=<?php echo $each_tab; ?>"  class="button radius submit link"><?php echo $each_tab ?></a>   
                        <?php }
                        $i++;
                        }
                }
              ?>
              
            <a href="#"  class="button radius submit link logouts">Logout</a>
            <?php }else{ ?>
          <a href="<?php echo get_site_url() ?>/cportal/login"  class="button radius submit link">Login</a> <br>
            <!--<a href="register.php"  class="button radius submit link">Register</a>-->
            <?php } ?>
          </div>
        </div>
     </div>
    </div>
</div>
  
    
<!-- Body events -->

<!-- End page content -->
</div>
        <!-- Account Information end here -->
				

			</div><!-- #content -->
		</div><!-- #primary -->
	</div>
	
</div><!-- #main-content -->

<?php
get_footer();
