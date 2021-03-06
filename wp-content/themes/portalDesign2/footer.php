<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage portalDesign2
 * @since portalDesign2 1.0
 */
global $table_prefix;
global $wpdb;
$result = $wpdb->get_row("SELECT title"
                            . " FROM ".$table_prefix."settings"
                           . " WHERE id=1");
                $title='';
                if(isset($result) && count($result)>0)
                {
                    $portal = $result->title;
                }
?>
		<!--</div>--><!-- #main -->

		<!--<div class="clearfix"></div>-->


		<footer name="footer-main"  id="footerPortal">
			<div id="footer" class="row-fluid footer-wrapper-width" align="center" >
				<div class="footer-content"  >
				
					<div class="span1 footer-logo-content" >
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" > 
					        </a>
					</div>
					<div class="span7">
                                            <p >
                                                    <!--<a href="<?php echo get_site_url() ?>"><?php echo $portal; ?></a>
                                         <br> --> 
						&copy; <?php echo date("Y"); ?> All rights reserved <br/> </p> 
						
					</div>
					
			</div><!-- container -->
			</div>
			
			
		</footer>

	
		
	</div><!-- #page -->
        
<div id="popup">
    
</div>
	<?php wp_footer(); ?>

</body>
</html>

