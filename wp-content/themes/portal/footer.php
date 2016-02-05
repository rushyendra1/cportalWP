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
		<!--</div>--><!-- #main -->

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
						
					</div>
					
			</div><!-- container -->
			</div>
			
			
		</footer>

		<!--<footer id="colophon" class="site-footer" role="contentinfo">

			<?php //get_sidebar( 'footer' );
                        ?>
			
		</footer><!-- #colophon -->
		
	</div><!-- #page -->

	<?php wp_footer(); ?>

</body>
</html>
<div id="popup">
    
</div>
