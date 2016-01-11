<?php
/**
 * Template Name: Page Profile
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
redirect_to_login();
get_header();
$title = " My Account Details";
global $user_ID;
global $wpdb;
global $table_prefix;
//Get the Current profile details
 $prof_str = "SELECT u.ID, m.meta_value, m.meta_key"
        . " from ".$table_prefix."users u"
        . " left join ".$table_prefix."usermeta m on m.user_id=u.ID"
        . " where u.ID = ".$user_ID;

$result = $wpdb->get_results($prof_str);
$first_name = $phone_edit = $mobile_edit = $last_name = $salutation = $email = 
        $alt_email = $phone = $mobile = $city = $state = $country = $zip = 
        $message = $street =  "";
        
if(is_array($result) && count($result)>0)
{
    foreach($result as $each)
    {
        if($each->meta_name == "first_name")
            $first_name = $each->meta_value;
        if($each->meta_name == "last_name")
            $last_name = $each->meta_value;
        
    }
}

/*** Edit the operations **/
$settings_str = "SELECT allow_edit, min_pass_len, max_pass_len"
        . " FROM ".$table_prefix."settings";
$set_results = $wpdb->get_row($settings_str);
$is_edit =  (isset($set_results->allow_edit))?$set_results->allow_edit: 0;
?>

<div id="main-content" class="main-content">

	<div class="row-fluid data-content-outer" >
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
      <h4><?php echo $title; ?></h4>
      
      <hr>
      <div id="section_1">
        <div class="row statusAccount" >
              <div class="links-pad">
                  <?php if($is_edit){ ?>
              <a  class="edit" >Edit My Details</a> &nbsp; &nbsp;
                <?php } ?>
              <a href="<?php echo get_site_url() ?>/change-password"  >Change My  Password</a> &nbsp; &nbsp;
             
              
              </div>
          </div>
           <div class="clear"></div>
          <input type="hidden" id="id" value="<?php echo $user_ID; ?>" >
        <div class="row">
         
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
