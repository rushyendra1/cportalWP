<?php
/**
 * Template Name: Page Profile
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
redirect_to_login();
/*if(!is_user_logged_in()){
    wp_redirect(get_site_url()."/login");
    exit;
}*/
get_header();
/*if(!is_user_logged_in()){
    wp_redirect(get_site_url()."/login");
    exit;
}*/
?>
 
<div id="main-content" class="main-content">
    <!--
	<div class="row-fluid data-content-outer" >
	<b>profile page</b>
	</div>
    <div class="display-data" title="Profile">
    <div class="row-fluid data-content-outer"><input type="text">First Name:</div>
    <div class="row-fluid data-content-outer">Last Name:</div>
    <div class="row-fluid data-content-outer">Email:</div>
    <div class="row-fluid data-content-outer">Contact No:</div>
    <div class="row-fluid data-content-outer">H.No:</div>
    <div class="row-fluid data-content-outer">Street:</div>
    <div class="row-fluid data-content-outer">City:</div>
    <div class="row-fluid data-content-outer">State:</div>
    <div class="row-fluid data-content-outer">Country:</div>
    <div class="row-fluid data-content-outer">Pincode:</div>
        </div>-->
   
     <div id="section_1">
           <div class="row statusAccount" >
              <div class="links-pad">
              <a  class="edit" >Edit My Details</a> &nbsp; &nbsp;
              <a href="change-pwd.php"  >Change My  Password</a> &nbsp; &nbsp;
              <a   class="accountChange" data-type="2" >Delete My  Account</a> &nbsp; &nbsp;
              
              </div>
          </div>
          <div class="clear"></div>
          
          <input type="hidden" id="id" value="<?php echo base64_encode($user_id) ?>" >
          
          <?php
          $current_user = wp_get_current_user();
          echo "<pre>";
          var_dump( $current_user);
           echo "</pre>";
         
          
           while($result = @pg_fetch_assoc($query))
          {
               $value = '';
               $edit_value = '';
               if($result['attribute'] != "address"){
               switch($result['attribute']){
                   case "salutation":
                       $value = ucfirst($salutation);
                       $edit_value = $salutation;
                       break;
                   case "first name":
                       $value = ucfirst($salutation)." " .ucfirst($first_name);
                       $edit_value = $first_name;
                       break;
                    case "last name":
                       $value = ucfirst($last_name);
                        $salutation = $salutation;
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
               
              echo display_contact( $result['attribute'],  $value); 
              echo generate_input($result['form_element'], $result['options'], $result['attribute'], $result['searchable'],  $result['placeholder'],  $result['class_name'], $result['style_name'], $i, $result['is_required'],$result['title_placeholder'],$edit_value, "edit",$salutation);
              if($i==1){
                  ?>
          <div class="row dispRow">
          <div class="medium-6 columns">
            <label class="dispRowStrong">
                
                <strong  class="radius" > E-mail</strong>
              
            </label>
                <span>: <?php echo $email; ?> <a href="change-email.php" style="margin-left:10px">Change</a> </span>
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
          <?php
              }
               }else{
                   $required= '';
                  $required_msg = '';
                  $astrik = '';
                  if($result['is_required']){
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
              <?php }
              $i++;
           }
          ?>
          
           <!--<div class="row editRow" style="display:none">
          <div class="medium-6 columns">
            <label for="firstname" >
              
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your First Name.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    First Name*</strong>
                <select id="salutation" name="salutation">
                    <option value="Mr." <?php if($salutation == "Mr."){ echo 'selected="selected"';} ?>>Mr.</option>
                    <option value="Ms." <?php if($salutation == "Ms."){ echo 'selected="selected"';} ?>>Ms.</option>
                    <option value="Mrs." <?php if($salutation == "Mrs."){ echo 'selected="selected"';} ?>>Mrs.</option>
                    
                </select>
                <input type="text" id="firstname" name="firstname" placeholder="First Name" value="<?php echo $first_name ?>" class="radius" required>
               <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          
        
          
          <div class="row editRow" style="display:none">
          <div class="medium-6 columns">
            <label for="lastname">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your Last Name.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    Last Name*</strong>
                <input type="text"  value="<?php echo $last_name; ?>" id="lastname" name="lastname" placeholder="Last Name" class="radius" required>
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          
           
           <div class="row editRow" style="display:none">
          <div class="medium-6 columns">
            <label for="email">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;"> 
                    E-mail*</strong>
                <input type="email" disabled="disabled" value="<?php echo $email; ?>" id="email" name="email" placeholder="E-mail" class="radius" required>
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          
           <div class="row editRow" style="display:none">
          <div class="medium-6 columns">
            <label for="altEmail">
               
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your Alternate E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;"> 
                Alternate E-mail</strong>
                <input type="email"  value="<?php echo $alt_email; ?>" id="altEmail" name="altEmail" placeholder="Email address" class="radius">
               <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
           
          
      
          
          <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="phone">
               
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your Phone.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    Phone*</strong>
                <input type="text" value="<?php echo $phone_edit; ?>" id="phone" name="phone" placeholder="Phone" class="radius" required>
               <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          
          
        
          
          <div class="row editRow" style="display:none">
          <div class="medium-6 columns">
            <label for="mobile">
                
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your Mobile.&lt;br&gt;&lt;small&gt;&lt;em&gt;"> 
                     Mobile</strong>
                <input type="text" value="<?php echo $mobile_edit ?>" id="mobile" name="mobile" placeholder="Mobile" class="radius">
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          
         
          
           <div class="row editRow" style="display:none">
          <div class="medium-6 columns">
            <label for="city" class="dispRowStrong">
               
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your City.&lt;br&gt;&lt;small&gt;&lt;em&gt;"> 
                     City</strong>
                <input type="text"  value="<?php echo $city ?>" id="city" name="city" placeholder="City" class="radius">
               <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          
          
          
          <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="state">
                
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your State.&lt;br&gt;&lt;small&gt;&lt;em&gt;"> 
                     State</strong>
                <input type="text" value="<?php echo $state ?>" id="state" name="state" placeholder="State" class="radius">
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          
        
          
          <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="country">
                
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your Country.&lt;br&gt;&lt;small&gt;&lt;em&gt;"> 
                     Country</strong>
                <input type="text" value="<?php echo $country ?>" id="country" name="country" placeholder="Country" class="radius">
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          
          
          
          <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="zip">
                
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Your Zipcode.&lt;br&gt;&lt;small&gt;&lt;em&gt;"> 
                     Zip Code</strong>
                <input type="text" value="<?php echo $zip ?>" id="zip" name="zip" placeholder="Zipcode" class="radius">
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
           
          
          <div class="row editRow" style="display: none">
          <div class="medium-6 columns">
            <label for="message">
               
                 <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Leave Your Message.&lt;br&gt;&lt;small&gt;&lt;em&gt;"> 
                     Message</strong>
                <textarea id="message" name="message" placeholder="Message" class="radius medium"><?php echo $message ?></textarea>
               <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>-->
           
          
          <div class="clear" style="height:15px"></div>
          
          <div class="row editRow" style="display:none">
          <div class="columns small-12"> 
            
            <a  id="mysubmit" class="button radius submit link">Submit</a> <br>
          </div>
        </div>
     
      </div>
    
</div><!-- #main-content --> 

<?php
get_footer();
