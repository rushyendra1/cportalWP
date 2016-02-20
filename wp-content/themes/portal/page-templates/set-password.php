<?php
/**
 * Template Name: Page set-password
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
redirect_to_home();
global $wpdb;
global $table_prefix;

//global $submit;
 if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
     include_once('../../../../../wp-includes/class-phpass.php');   
     include_once('../functions.php');
} 
get_header(); 
$rand=(isset($_GET['id']))?base64_decode(trim($_GET['id'])):"";
if($rand == ""){
    echo "No access to this page"; exit;
}
$user_info = $wpdb->get_row("SELECT ID 
            FROM ".$table_prefix."users
         WHERE forgotpwd_activation_code='".$rand."'");

if(count($user_info)==0)
{
   echo "Your Session is Expired";
   exit;
}
$title = "Set New Password";
?>
<input type="hidden" id="rand" value="<?php echo $rand?>">
 <input type="hidden" id="page" value="<?php echo $title ?>">
  <input type="hidden" id="status" value="1">
<input type="hidden" id="minPassLen" value="<?php echo $min_pass_len ?>">
<input type="hidden" id="maxPassLen" value="<?php echo $max_pass_len ?>">
<input type="hidden" id="id" value="<?php echo $user_id ?>" >
 <input type="hidden" id="isAdmin" value="<?php echo $is_admin?>" >
<div class="bodyCell contentSub row-fluid" >
  <div class="row toggle-full-width">
    <div class="bPageTitle">
      
      <h4 class="headTitle"><?php echo $title; ?></h4>
       <h4 class="right"><small><em>* = Required</em></small></h4>
      <hr>
    </div>
  </div>
    <div class="row">
        <form id="setPwdForm" >
      <div id="section_1">
                   
          <div class="row">
          <div class="medium-6 columns">
              <label for="newPwd">
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter New Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                  New Password*</strong>
                <input type="password" maxlength="<?php echo $max_pass_len ?>" id="newPwd" name="newPwd" placeholder="New Password" class="radius" required tabindex="1">
              <span class="label error alert  radius" style="display:none">Required</span>
              <span class="correctPassword" style="display:none" ><img class="imageShown" src="<?php echo get_template_directory_uri() ?>/img/correct1.png"  ></span>
            </label>
          </div>
          </div>
           <div class="row">
          <div class="medium-6 columns">
            <label for="confirmPwd">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Confirm New Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                 Confirm New Password*</strong>
                <input type="password" id="confirmPwd" name="confirmPwd" placeholder="Confirm New Password" class="radius"  maxlength="<?php echo $max_pass_len ?>" tabindex="2" >
              <span class="label error alert radius" style="display:none">Required</span>
              <span class="correctPassword" style="display:none" ><img class="imageShown" src="<?php echo get_template_directory_uri() ?>/img/correct1.png"  ></span>
            </label>
          </div>
          </div>
          <div class="clear" style="height:15px"></div>
          <div class="row">
          <div class="columns small-12"> 
            <button  id="setpassword" name="setpassword" class="button radius submit link"  >Submit</button> <br>
          </div>
        </div>
      </div>
    </form>
    </div>
  
</div>
 <?php  get_footer();


