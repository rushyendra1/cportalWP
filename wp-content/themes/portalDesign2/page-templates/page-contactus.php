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
get_template_part("menualign","none");?>
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
	  
<form action="phpmailer.php" method="post">
    
    <label for="Email">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Username/E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    E-mail*</strong><br>
                <input type="email" id="username" name="username" placeholder="E-mail" class="radius" tabindex="1" style="width:40%">
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

</form>
      <div class="clear" style="height:15px"></div>
          <div class="row">
          <div class="columns small-12"> 
            
              <a  id="submit" class="button radius submit link" tabindex="3">Submit</a> <br>
          </div>
        </div>
     
      </div>
    </div>
  </div>
    
<!-- Body events -->

<!-- End page content -->
</div>
        <!-- Account Information end here -->
				

			
		
	
	
<!-- #main-content -->

<?php
get_footer();
