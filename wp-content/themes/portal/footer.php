<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
?>
		</div><!-- #main -->

		<div class="clearfix"></div>

		<footer name="footer-main" >
			<div id="footer" class="row-fluid footer-wrapper-width" align="center" >
				<div class="footer-content"  >
				
					<div class="span1 footer-logo-content" >
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" > 
							<img src="<?php echo get_template_directory_uri() ?>/images/CustomerPortal.jpg" width="114" height="40" class="footer-logo" />
						</a>
					</div>
					<div class="span7">
						<p>&copy; <?php echo date("Y"); ?> All rights reserved <br/> </p> 
						<div class="menu-footer-container">
						 <ul id="menu-footer" class="menu"> 
                                    <?php
                                    /*
                                    $args = array(
                                        'order' => 'ASC',
                                        'orderby' => 'menu_order',
                                        'post_type' => 'nav_menu_item',
                                        'post_status' => 'publish',
                                            //   'output'                 => ARRAY_A,
                                            // 'output_key'             => 'menu_order',
                                            //'nopaging'               => true,
                                            // 'update_post_term_cache' => false
                                            // 
                                    );
                                    $items = wp_get_nav_menu_items("portal footer", $args);
                                    $path = get_current_path();
                                    if( $items !== FALSE  && count($items)>0){
                                    foreach ($items as $each) {
                                       $link =  str_replace(site_url(), "", $each->url);
                                      $link = str_replace("/","",$link);
                                      $title = $each->title;
                                      $account_array = array("account-list","view-account","contact-list",
                                                             "view-contact","contact-form","view-case","new-attach",
                                                            "add-google-doc","new-note","all-document-list",
                                                            "case","case-list","case-form","account-hierarchy",
                                                            "all-attachment-list");
                                      $service_array = array("service-list","view-service");
                                      $service_support_array = array("service-assistance");
                                       $class = "";
                                       if($path == $link)
                                           $class = "current-menu-item";
                                       else if($title== "Account" && in_array($path, $account_array))
                                           $class = "current-menu-item";
                                       else if($title== "Services" && in_array($path, $service_array))
                                           $class = "current-menu-item";
                                       else if($title== "Service Support" && in_array($path, $service_support_array))
                                           $class = "current-menu-item";
                                        echo "<li class='".$class."'><a href='" . $each->url . "'>" . $title . '</a></li>';
                                    } }*/
                                    ?>
                                </ul>
                                                </div>
						
					</div>
					<div class="span3 footer-icon-right">
						<div class="footer-icons-cnt">
							<!--<a href="#">
								<img src="<?php echo get_template_directory_uri() ?>/images/appstore.png" width="114" height="40" />
							
       </a>-->
							<!--<img src="<?php echo get_template_directory_uri() ?>/images/paypal.png" width="33" height="11" />-->
	<!--						<img src="<?php echo get_template_directory_uri() ?>/images/visa.png" width="26" height="18" />
							<img src="<?php echo get_template_directory_uri() ?>/images/masterd.png" width="26" height="19" />
							<img src="<?php echo get_template_directory_uri() ?>/images/visa-verified.png" width="32" height="18" />-->
							<!--<img src="<?php echo get_template_directory_uri() ?>/images/american.png" width="26" height="19" />-->
					  </div>
					</div>
			</div><!-- container -->
			</div>
			
			
		</footer>

		<footer id="colophon" class="site-footer" role="contentinfo">

			<?php //get_sidebar( 'footer' );
                        ?>
			
		</footer><!-- #colophon -->
		
	</div><!-- #page -->

	<?php wp_footer(); ?>

	<!-- begin SnapEngage code -->
	<!-- <script type="text/javascript">
	  (function() {
	    var se = document.createElement('script'); se.type = 'text/javascript'; se.async = true;
	    se.src = '//commondatastorage.googleapis.com/code.snapengage.com/js/570de77a-b981-4347-894d-ebdaa67a35aa.js';
	    var done = false;
	    se.onload = se.onreadystatechange = function() {
	      if (!done&&(!this.readyState||this.readyState==='loaded'||this.readyState==='complete')) {
	        done = true;
	        // Place your SnapEngage JS API code below
	        //SnapEngage.openProactiveChat(true, true); // Example: open the proactive chat on load
	      }
	    };
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(se, s);
	  })();
	</script> --> 
	<!-- end SnapEngage code -->
	

	<!-- start CloudAmp code -->
	<!-- <script>
	window._cloudAmp = window._cloudAmp || {};
	_cloudAmp.forms = [];
	(function () {
		var scripts = document.getElementsByTagName('script'),
		    sLen = scripts.length,
		    ca_script = document.createElement('script'),
		    head = document.getElementsByTagName('head'),
		    protocol = document.location.protocol,
		    httpsDomain = '1d5ef9e9369608f625a8-878b10192d4a956595449977ade9187d.ssl.cf2.rackcdn.com',
		    httpDomain = 'trk.cloudamp.net',
		    filename = 'tracker2.js',
		    srcDomain = protocol === 'http:' ? httpDomain : httpsDomain;

		ca_script.type = 'text/javascript';
		ca_script.async = true;
		ca_script.src = protocol + '//' + srcDomain + '/' + filename;
		head[0].appendChild(ca_script);
	})();
</script> -->
<!-- end CloudAmp code -->

</body>
</html>
<div id="popup">
    
</div>