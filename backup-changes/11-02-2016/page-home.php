[insert_php]

redirect_to_home();
 [/insert_php]

<div id="main-content" class="main-content">

	<div class="row-fluid data-content-outer" >
            [insert_php] if(!is_user_logged_in()) { [/insert_php]
		<div id="primary" class="content-area">
			<div id="content" class="site-content" role="main">

<div class=" contentSub sidebarCell">
            <!-- Sidebar Started -->
              [insert_php] //echo portal_sidebar();
              [/insert_php]
            <!-- Sidebar ended -->

</div>
<div class="bodyCell contentSub" >
<!-- Start page content -->
<a name="skiplink">
    <!--<img width="1" height="1" title="Content Starts Here" class="skiplink skipLinkTargetInner zen-skipLinkTarget" alt="Content Starts Here" src="/s.gif">-->
</a>

<input type="hidden" id="msg" value="[insert_php] echo $msg [/insert_php]" >
  <div class="row toggle-full-width">
    <div class="bPageTitle">
      <!--<h4 class="right"><small><em>* = Required</em></small></h4>--><br>
        <h1 class="headTitle">
        Login</h1>
       <h4 class="right"><small><em>* = Required</em></small></h4>
      </div>
  </div>
<div class="row">
    <form id="loginForm" >
      <div id="section_1" class="loginDiv">
           <div class="row">
          <div class="medium-6 columns">
            <label for="username">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Username/E-mail.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    User Name/E-mail*</strong>
                <input type="email" id="username" name="username" placeholder="Username/E-mail" class="radius" tabindex="1" >
             <span class="label error alert  radius " style="display:none">Required</span>
            </label>
          </div>
          </div>
          
           <div class="row">
          <div class="medium-6 columns">
            <label for="password">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                    Password*</strong>
                <input type="password" id="lpassword" name="lpassword" placeholder="Password" class="radius" tabindex="2" >
                <span class="label error alert  radius" style="display:none">Required</span>
                          </label>
          </div>
          </div>
          <div class="row">
              <div class="links-pad">
              <a href="[insert_php] echo get_site_url();[/insert_php]/forgot"  >Forgot Password</a> &nbsp; &nbsp;
              <!-- <a href="register.php"  >Register</a>-->
              </div>
          </div>
          <div class="clear" style="height:15px"></div>
          <div class="row">
          <div class="columns small-12"> 
            
              <a  id="submit" class="button radius submit link" tabindex="3">Submit</a> <br>
          </div>
        </div>
     
      </div>
    </form>
    </div>
  </div>
    
<!-- Body events -->

<!-- End page content -->
</div>
        <!-- Account Information end here -->
				

			</div><!-- #content -->
		</div><!-- #primary -->
            [insert_php] }
            /*else { 
                echo get_home_page();
             }*/
            [/insert_php]
	</div>
	
<!-- #main-content -->
