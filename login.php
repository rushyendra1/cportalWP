<?php
@session_start();
include_once('php/config.php');
include_once('php/init.php');
login_check(0);
$title = "Login";
include_once('head-first.php');
include_once('header.php');
$max_login_attempts =0;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    include_once('../../../../../wp-includes/class-phpass.php');
}
$result_query = @pg_query($db,"SELECT min_pass_len,max_pass_len,max_login_attempts"
                            . " FROM settings"
                           . " WHERE id=1");
$result = @pg_fetch_assoc($result_query);
if(is_array($result) && count($result)>0)
{
  $max_login_attempts = $result['max_login_attempts'] ;
}
$max_login_attempts +=1;
if(!isset($_SESSION['forgot-times']))
{
    $_SESSION['forgot-times'] =1;
}  else {
    $_SESSION['forgot-times']+=1;
}
if($_SESSION['forgot-times'] >=$max_login_attempts)
{
    echo "If you forgot your password reset by click on <a href='forgot.php' class='forgot-link'>Forgot Password</a> link.";
    exit;
} 
 $user = (isset($_POST['username']))?$_POST['username']: "";
$pass = (isset($_POST['password']))?$_POST['password']: "";

?>
  <div class="row toggle-full-width">
    <div class="large-12 columns">
      <!--<h4 class="right"><small><em>* = Required</em></small></h4>-->
      <h4><br>
        Login</h4>
       <h4 class="right"><small><em>* = Required</em></small></h4>
      <hr>
      <div id="section_1">
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
              <a href="forgot.php"  >Forgot Password</a> &nbsp; &nbsp;
               <a href="register.php"  >Register</a>
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
<?php include('footer.php');?>

