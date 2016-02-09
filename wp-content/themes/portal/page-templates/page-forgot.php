<?php
@session_start();
redirect_to_home();
global $wpdb;
global  $table_prefix;
get_header();
//login_check(0);

$title = "Forgot Password";
?>
<div class="bodyCell contentSub row-fluid" >
  <div class="row toggle-full-width">
    <div class="bPageTitle">
   
        <h1 class="headTitle">Forgot Password</h1>
       <h4 class="right"><small><em>* = Required</em></small></h4>
      <hr>
    </div>
  </div>
    <div class="row">
        <form id="forGotForm" >
      <div id="section_1">
           <div class="row">
          <div class="medium-6 columns">
            <label for="username">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Username/E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                   User Name/E-mail*</strong>
                <input type="email" id="username" name="username" placeholder="E-mail" class="radius" required tabindex="1">
            <span class="label error alert  radius" style="display:none">Required</span>
            <span id="correctEmail" style="display:none" ><img class="imageShown" src="<?php echo get_template_directory_uri() ?>/img/correct1.png"  ></span>
            </label>
          </div>
          </div>
          
           
          <div class="row">
              <div class="links-pad">
              <a href="<?php echo get_site_url() ?>/login"  >Login</a> &nbsp; &nbsp;
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
        </form>
    </div>
  
</div>
<?php get_footer();?>
