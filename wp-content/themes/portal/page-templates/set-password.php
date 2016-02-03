<?php
/**
 * Template Name: Page set-password
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
//redirect_to_login(); 
//redirect_to_home();
redirect_to_home();
get_header(); 
$rand=(isset($_GET['id']))?base64_decode($_GET['id']):"";
$user_info = $wpdb->get_row("SELECT ID 
            FROM ".$table_prefix."users
         WHERE forgotpwd_activation_code='".$rand."'");

if(count($user_info)==0)
{
    
   echo "Your Session is Expired";
    
  
    exit;
}
/*$status = (isset($_GET['s']))?$_GET['s']: 0;
$is_admin = (isset($_GET['a']))?$_GET['a']: 0;
$is_new = (isset($_GET['n']))?$_GET['n']: 0;
$id = (isset($_GET['id']))?$_GET['id']: 0;
*/
$title = "Set New Password";
/*if($status){
     $title = "Set Password"; 
    login_check(0);
    @pg_update("contacts", array("status" => 1), array("pwd_activation_code" =>$id));
    $user_query = $wpdb->get_row("SELECT id,name "
            .$table_prefix. " FROM wp_3uvwes_settings"
            . " WHERE pwd_activation_code='".$id."'");
    $id = $user_query['id'];
    if(is_bool($user_query) || is_null($user_query))
    {
        header("Location:index.php");
    }
}else{
   login_check(1);
}*/

/* if(isset($_REQUEST['forgotPwdSubmit']))
    {
        $result = $wpdb->update('users', array( 'user_pass' => $password),"WHERE ID =".$_REQUEST["$id"]);
        echo 'Password updated';
    }

global $user_ID;
$user_id = $user_ID; */
 //$user_id = (isset($_SESSION['user']['id']))?$_SESSION['user']['id']:$id;


//if((strlen($password) > wp_3uvwes_settings.$min_pass_len) && (strlen($password) < wp_3uvwes_settings.$max_pass_len ))
?>
<input type="hidden" id="rand" value="<?php echo $rand?>">
 <input type="hidden" id="page" value="<?php echo $title ?>">
  <input type="hidden" id="status" value="1">
<input type="hidden" id="minPassLen" value="<?php echo $min_pass_len ?>">
<input type="hidden" id="maxPassLen" value="<?php echo $max_pass_len ?>">
  <div class="row toggle-full-width">
    <div class="large-12 columns">
      <input type="hidden" id="id" value="<?php echo base64_encode($user_id) ?>" >
      <input type="hidden" id="isAdmin" value="<?php echo $is_admin?>" >
      <h4><br><?php echo $title; ?></h4>
       <h4 class="right"><small><em>* = Required</em></small></h4>
      <hr>
      <input type="hidden" id="status" value="<?php echo $status ?>" > 
      <div id="section_1">
                   
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
            <button  id="setpassword" name="setpassword" class="button radius submit link"  >Submit</button> <br>
          </div>
        </div>
      </div>
    </div>
  </div>

 <?php  get_footer();


