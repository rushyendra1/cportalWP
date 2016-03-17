<?php
/**
 * Template Name: Page contact us
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
//redirect_to_login();
get_header();  
get_template_part("menualign","none");
global $wpdb;
if (!isset($wpdb)) {
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    // include_once('../../../../../wp-includes/class-phpass.php');
}
      
  if (isset($_REQUEST['email']))  {
   $admin_email = get_option("admin_email");
  //Email information
  $user_email = $_REQUEST['email'];
  $subject = $_REQUEST['subject'];
  $message = $_REQUEST['message'];
      $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: ' . $admin_email . "\r\n";
  //send email
  //@mail($admin_email, $subject, $comment, "From:" . $email);
  @mail($user_email,$subject,nl2br($message),$headers,"From:" . $admin_email);
  var_dump($admin_email);
  var_dump($user_email);
  var_dump($headers);
  //Email response
  ?>
<div class="bodyCell contentSub row-fluid" >
<?php
echo "Thank you for contacting us!";
?>
</div>

<?php
  
  }
  else  {
?>
<div class="bodyCell contentSub row-fluid" >
<!-- Start page content -->
<a name="skiplink">
    <!--<img width="1" height="1" title="Content Starts Here" class="skiplink skipLinkTargetInner zen-skipLinkTarget" alt="Content Starts Here" src="/s.gif">-->
</a>
 <input type="hidden" id="msg" value="<?php echo $msg ?>" >
  <div class="row toggle-full-width">
    <div class="large-12 columns ">
      <!--<h4 class="right"><small><em>* = Required</em></small></h4>-->
      <h4>Contact us</h4>
      
      <hr>
      <h5>EMAIL US AT:</h5> <br>
	  
<form method="post" >
    
    <label for="Email">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Username/E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    E-mail*</strong><br>
                <input type="email" id="email" name="email" placeholder="E-mail" class="radius" tabindex="1" style="width:40%">
             <span class="label error alert  radius " style="display:none">Required</span>
            </label>
    
    <label for="subject">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Username/E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    Subject*</strong><br>
                <input type="text" id="subject" name="subject" placeholder="Subject" class="radius" tabindex="1" style="width:40%">
             <span class="label error alert  radius " style="display:none">Required</span>
            </label>
    <label for="Message">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Username/E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    Message*</strong><br>
                <textarea type="text" id="message" rows="5" name="message" cols="30" placeholder="message" class="radius" tabindex="1" style="width:40%"></textarea>
             <span class="label error alert  radius " style="display:none">Required</span>
            </label>
    <div class="row">
          <div class="columns small-12"> 
            
              <button  id="submitquery" name="submitquery" type="submit" class="button radius submit link" tabindex="3">Submit</button> <br>
          </div>
        </div>

</form>
      <div class="clear" style="height:15px"></div>
          
     
      </div>
    </div>
  </div>
    
<!-- Body events -->

<!-- End page content -->
<?php 
    }  


				

			
		
	
?>
<?php
get_footer();



?>
