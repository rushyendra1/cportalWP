<?php
/**
 * Template Name: Page Forgot
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
@ssession_start();
unset($_SESSION['forgot-times']); 
include_once('php/config.php');
include_once('php/init.php');
login_check(0);
$title = "Forgot Password";
include_once('head-first.php');
include_once('header.php');
?>
  <div class="row toggle-full-width">
    <div class="large-12 columns">
     
      <h4><br>
        Forgot Password</h4>
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
              
              <a id="forogotSubmit" class="button radius submit link">Submit</a>          
              <?php 
error_reporting(0);
$email=$trim($_POST['email']);
if($_POST['submit']=='Submit')
{
global $wpdb;
global  $table_prefix;
$query="select * from ".$table_prefix."users where user_email='".$email."'";
$res = $wpdb->get_row($query);
// var_dump($res);
if($res_rows($result) > 0)
{
echo "User exist";
}
else
{
echo "No user exist with this email id";
}
}
?>
<form action="forgot.php" method="post">
Enter you email ID: <input type="text" name="email">
<input type="submit" name="submit" value="Submit">
</form>
          </div>
        </div>
     
      </div>
    </div>
  </div>

<?php include('footer.php');?>