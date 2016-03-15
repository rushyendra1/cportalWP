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
    <div class="large-12 columns">
      <!--<h4 class="right"><small><em>* = Required</em></small></h4>-->
      <h4>Contact us</h4>
      
      <hr>
	  
<form action="phpmailer.php" method="post">
My Email: <input type="text" name="email"><br>
Subject : <input type="text" name="subject"><br>
Message:<br><textarea rows="5" name="message" cols="30"></textarea><br>
<input type="submit" name="submit" value="Submit">
</form>


	  
	  
	  
	  
	  
      /*<div id="section_1">
         
        <div class="row">
          <div class="columns small-12"> 
           <?php
           
             $wc_phone = get_option("wc_phone");
             $wc_email = get_option("wc_email");
             $wc_address = get_option("wc_address");
           ?>
          </div>
            <p>Contact us at :<?php echo $wc_phone; ?> </p>
            <p>Email us at :<?php echo $wc_email; ?> </p>
            <p>Post  us at :<?php echo $wc_address; ?> </p>
        </div>
     </div> */
    </div>
  </div>
    
<!-- Body events -->

<!-- End page content -->
</div>
        <!-- Account Information end here -->
				

			
		
	
	
<!-- #main-content -->

<?php
get_footer();
