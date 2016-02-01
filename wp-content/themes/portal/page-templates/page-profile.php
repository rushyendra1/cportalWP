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
 $prof_str = "SELECT u.ID,u.user_email, m.meta_value, m.meta_key"
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
        if($each->meta_key == "first_name")
           $first_name = check_nulls($each->meta_value);
        if($each->meta_key == "last_name")
            $last_name = check_nulls($each->meta_value);
        if($each->meta_key == "salutation")
            $salutation = check_nulls($each->meta_value);
        $email = check_nulls($each->user_email);
        if($each->meta_key == "alt_email")
            $alt_email = check_nulls($each->meta_value);
        if($each->meta_key == "phone")
            $phone = check_nulls($each->meta_value);
        if($each->meta_key == "mobile")
            $mobile = check_nulls($each->meta_value);
        if($each->meta_key == "city")
            $city = check_nulls($each->meta_value);
        if($each->meta_key == "state")
            $state = check_nulls($each->meta_value);
        if($each->meta_key == "country")
            $country = check_nulls($each->meta_value);
        if($each->meta_key == "zip")
            $zip = check_nulls($each->meta_value);
        if($each->meta_key == "addr1")
            $street = check_nulls($each->meta_value);
        if($each->meta_key == "description")
            $message = check_nulls($each->meta_value);
        
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
         <?php
         $sql = " SELECT  id,attribute,form_element, options, searchable,placeholder,
                           class_name,style_name, is_required,title_placeholder
                   FROM  ".$table_prefix."user_settings
		   WHERE searchable = 1  and is_visible_user=1
                   ORDER BY order_by asc";
         $set_result = $wpdb->get_results($sql);
         if(is_array($set_result) && count($set_result)>0)
         {
             $i=0;
            foreach($set_result as $each_set)
            {
              if($each_set->attribute != "address"){  
             switch($each_set->attribute){

                   case "salutation":
                       $value = $salutation;
                       $edit_value = $salutation;
                       break;
                   case "first name":
                       
                       $value = $first_name;
                       $edit_value = $first_name;
                       break;
                    case "last name":
                         $value = $last_name;
                         $edit_value = $last_name;
                       break;
                   case "email":
                       $value = $email;
                       $edit_value = $email;
                       break;
                   case "alternate email":
                       $value = $alt_email;
                       $edit_value = $alt_email;
                       break;
                   case "phone":
                       $value = add_slashes($phone);
                       $edit_value = $phone;
                       break;
                   case "mobile":
                       $value = add_slashes($mobile);
                       $edit_value = $mobile;
                       break;
                   case "message":
                       $value =  nl2br(ucfirst($message));
                       $edit_value = $message;
                       break;
               }
               
               echo display_contact( $each_set->attribute,  $value); 
              echo generate_input($each_set->form_element, $each_set->options, $each_set->attribute, $each_set->searchable,  $each_set->placeholder,  $each_set->class_name, $each_set->style_name, $i, $each_set->is_required,$each->title_placeholder,$edit_value, "edit",$salutation);
              if($i==1){?>
           <div class="row dispRow">
          <div class="medium-6 columns">
            <label class="dispRowStrong">
                
                <strong  class="radius" > E-mail</strong>
              
            </label>
                <span>: <?php echo $email; ?> <!--<a href="change-email.php" style="margin-left:10px">Change</a>--> </span>
          </div> </div>
              <div class="row editRow" style="display:none">
          <div class="medium-6 columns">
            <label for="email">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Email address for login into site.&lt;br&gt;&lt;small&gt;&lt;em&gt;"> 
                    E-mail*</strong>
                <input type="email" disabled="disabled" value="<?php echo $email; ?>" id="email" name="email" placeholder="Email address" class="radius" required>
              <span class="label error alert radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
                  <?php }
                  $i++;
              }else{
                  $required= '';
                  $required_msg = '';
                  $astrik = '';
                  if($each_set->is_required){
                      $required= 'data-required="required"';
                      $required_msg = 'This field is Required.';
                      $astrik = '*';
                  }
                   ?>
          <div class="row dispRow">
          <div class="medium-6 columns">
            <label for="street" class="dispRowStrong">
                 <strong  class="radius" > Street</strong>
                
              
            </label>
               <span>: &nbsp;<?php echo ucfirst($street) ?></span>
          </div>
          </div>
           <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="street">
                
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your Street.&lt;br&gt;&lt;small&gt;&lt;em&gt;<?php echo $required_msg ?>"> 
                     Street<?php echo $astrik ?></strong>
                <input type="text" value="<?php echo $street ?>" id="street" name="street" placeholder="State" class="radius" <?php echo $required ?>>
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
                   <div class="row dispRow">
          <div class="medium-6 columns">
            <label for="city" class="dispRowStrong">
                 <strong  class="radius" > City</strong>
                
              
            </label>
               <span>: &nbsp;<?php echo ucfirst($city) ?></span>
          </div>
          </div>
         <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="city">
                
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your City.&lt;br&gt;&lt;small&gt;&lt;em&gt;<?php echo $required_msg ?>"> 
                     City<?php echo $astrik ?></strong>
                <input type="text" value="<?php echo $city ?>" id="city" name="city" placeholder="City" class="radius" <?php echo $required ?>>
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
           <div class="row dispRow">
          <div class="medium-6 columns">
            <label for="state" class="dispRowStrong">
                 <strong  class="radius" > State</strong>
               
              
            </label>
                <span>: &nbsp;<?php echo ucfirst($state) ?></span>
          </div>
          </div>
          <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="state">
                
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your State.&lt;br&gt;&lt;small&gt;&lt;em&gt;<?php echo $required_msg ?>"> 
                     State<?php echo $astrik ?></strong>
                <input type="text" value="<?php echo $state ?>" id="state" name="state" placeholder="State" class="radius" <?php echo $required ?>>
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
            <div class="row dispRow">
          <div class="medium-6 columns">
            <label for="country" class="dispRowStrong">
                 <strong  class="radius" > Country</strong>
                
              
            </label>
               <span>: &nbsp;<?php echo ucfirst($country) ?></span>
          </div>
          </div>
            <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="country">
                
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your Country.&lt;br&gt;&lt;small&gt;&lt;em&gt;<?php echo $required_msg ?>"> 
                     Country<?php echo $astrik ?></strong>
                <input type="text" value="<?php echo $country ?>" id="country" name="country" placeholder="Country" class="radius" <?php echo $required ?>>
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
           <div class="row dispRow">
          <div class="medium-6 columns">
            <label for="zip" class="dispRowStrong">
                 <strong  class="radius" > Zip Code</strong>
                
              
            </label>
               <span>: &nbsp;<?php echo $zip ?></span>
          </div>
          </div>
          <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="zip">
                
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your Zipcode.&lt;br&gt;&lt;small&gt;&lt;em&gt;<?php echo $required_msg ?>"> 
                     Zip Code<?php echo $astrik ?></strong>
                <input type="text" value="<?php echo $zip ?>" id="zip" name="zip" placeholder="Zipcode" class="radius" <?php echo $required ?>>
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
            <?php
              }
              } //for loop closed
         } //if loop closed
         
         ?>
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
