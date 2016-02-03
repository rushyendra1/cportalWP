<?php
/**
 * Template Name: Page Login
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */

//redirect_to_login();
redirect_to_home();
get_header(); ?>

<div id="main-content" class="main-content">

	<div class="row-fluid data-content-outer" >
            <?php if(!is_user_logged_in()) { ?>
		<div id="primary" class="content-area">
			<div id="content" class="site-content" role="main">

<div class=" contentSub sidebarCell">
            <!-- Sidebar Started -->
              <?php //echo portal_sidebar();
              ?>
            <!-- Sidebar ended -->

</div>
<div class="bodyCell contentSub" >
<!-- Start page content -->
<a name="skiplink">
    <!--<img width="1" height="1" title="Content Starts Here" class="skiplink skipLinkTargetInner zen-skipLinkTarget" alt="Content Starts Here" src="/s.gif">-->
</a>

<input type="hidden" id="msg" value="<?php echo $msg ?>" >
  <div class="row toggle-full-width">
    <div class="large-12 columns">
      <!--<h4 class="right"><small><em>* = Required</em></small></h4>-->
      <h4><br>
        Login</h4>
       <h4 class="right"><small><em>* = Required</em></small></h4>
      <hr>
      <div id="section_1" class="loginDiv">
           <div class="row">
          <div class="medium-6 columns">
            <label for="username">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Username/E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    User Name/E-mail*</strong>
                <input type="email" id="username" name="username" placeholder="Username/E-mail" class="radius" >
             <span class="label error alert  radius " style="display:none">Required</span>
            </label>
          </div>
          </div>
          
           <div class="row">
          <div class="medium-6 columns">
            <label for="password">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    Password*</strong>
                <input type="password" id="lpassword" name="lpassword" placeholder="Password" class="radius" >
                <span class="label error alert  radius" style="display:none">Required</span>
                          </label>
          </div>
          </div>
          <div class="row">
              <div class="links-pad">
              <a href="<?php echo get_site_url() ?>/forgot"  >Forgot Password</a> &nbsp; &nbsp;
              <!-- <a href="register.php"  >Register</a>-->
              </div>
          </div>
          <div class="clear" style="height:15px"></div>
          <div class="row">
          <div class="columns small-12"> 
            
            <a  id="submit" class="button radius submit link">Submit</a> <br>
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
            <?php }
            /*else { 
                echo get_home_page();
             }*/
            ?>
	</div>
	
</div><!-- #main-content -->

<?php
get_footer();
