<?php
@session_start();
global $wpdb;
global  $table_prefix;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
     include_once('../../../../../wp-includes/class-phpass.php');   
     include_once('..//functions.php');
}
get_header();

login_check(0);
$title = "Forgot Password";
?>
  <div class="row toggle-full-width">
    <div class="large-12 columns">
     
      <h4><br>Forgot Password</h4>
       <h4 class="right"><small><em>* = Required</em></small></h4>
      <hr>
      <div id="section_1">
           <div class="row">
          <div class="medium-6 columns">
            <label for="username">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Username/E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                   User Name/E-mail*</strong>
                <input type="email" id="username" name="username" placeholder="E-mail" class="radius" required>
            <span class="label error alert  radius" style="display:none">Required</span>
              <span id="correctEmail" style="display:none" ><img class="imageShown" src="img/correct1.png"  ></span>
            </label>
          </div>
          </div>
          
           
          <div class="row">
              <div class="links-pad">
              <a href="login.php"  >Login</a> &nbsp; &nbsp;
            <!--   <a href="register.php"  >Register</a> -->
              </div>
          </div>
          <div class="clear" style="height:15px"></div>
          <div class="row">
          <div class="columns small-12"> 
              <a id="forogotSubmit" class="button radius submit link">Submit</a> <br>
          </div>
        </div>
     
      </div>
    </div>
  </div>
<?php get_footer();?>
