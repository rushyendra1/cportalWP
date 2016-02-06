<?php
/**
 * Template Name: Page change pwd
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */

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

redirect_to_login();
get_header();

$title = "Change My Password";
 if(isset($_REQUEST['changePwdSubmit']))
    {
        $result = $wpdb->update('users', array( 'user_pass' => $password),"WHERE ID =".$_REQUEST["$id"]);
        echo 'Password updated';
    }

global $user_ID;
$user_id = $user_ID;

 $result= get_wp_settings();
if( count($result)>0)
{
  $max_pass_len = $result['max_pass_len'] ;
  $min_pass_len = $result['min_pass_len'] ;
}

?>

<input type="hidden" id="page" value="<?php echo $title ?>">
<input type="hidden" id="minPassLen" value="<?php echo $min_pass_len ?>">
<input type="hidden" id="maxPassLen" value="<?php echo $max_pass_len ?>">
<input type="hidden" id="status" value="0">
<input type="hidden" id="id" value="<?php echo $user_id ?>" >
<input type="hidden" id="isAdmin" value="<?php echo $is_admin?>" >
<div class="bodyCell contentSub row-fluid" >
  <div class="row toggle-full-width">
    <div class="bPageTitle">
     
      <h1 class="headTitle"><?php echo $title; ?></h1>
       <h4 class="right"><small><em>* = Required</em></small></h4>
      <hr>
    </div>
  </div>
<div class="row" >
      <div id="section_1">
          <?php if(!$status) { ?>
           <div class="row">
          <div class="medium-6 columns">
            <label for="oldPwd">
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Old Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                  Old Password*</strong>
                <input type="password" maxlength="<?php echo $max_pass_len ?>" id="oldPwd" name="oldPwd" placeholder="Old Password" class="radius" required>
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          <?php } ?>
          <div class="row">
          <div class="medium-6 columns">
              <label for="newPwd">
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter New Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                  New Password*</strong>
                <input type="password" maxlength="<?php echo $max_pass_len ?>" id="newPwd" name="newPwd" placeholder="New Password" class="radius" required>
              <span class="label error alert  radius" style="display:none">Required</span>
               <span class="correctPassword" style="display:none" ><img class="imageShown" src="img/correct1.png"  ></span>
            </label>
          </div>
          </div>
           <div class="row">
          <div class="medium-6 columns">
            <label for="confirmPwd">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Confirm New Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                 Confirm New Password*</strong>
                <input type="password" id="confirmPwd" name="confirmPwd" placeholder="Confirm New Password" class="radius"  maxlength="<?php echo $max_pass_len ?>" >
              <span class="label error alert radius" style="display:none">Required</span>
              <span class="correctPassword" style="display:none" ><img class="imageShown" src="img/correct1.png"  ></span>
            </label>
          </div>
          </div>
          <div class="clear" style="height:15px"></div>
          <div class="row">
          <div class="columns small-12"> 
            <button  id="changePwdSubmit" name="changePwdSubmit" class="button radius submit link"  >Submit</button> <br>
          </div>
        </div>
      </div>
    </div>
  </div>

<?php  get_footer();


