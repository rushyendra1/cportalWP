<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other 'pages' on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */

get_header(); ?>


	<section name="privacy-img-content">
		<div class="img-wrapper">
        	<div class="row-fluid">
				   
				<img width="2000" height="472" src="http://wastecollection.com/wp-content/uploads/2014/02/about_us.png" class="attachment-full wp-post-image" alt="wastecollection.com">
        		<div class="clearfix"></div>
            
			</div>  <!-- End of row-fluid --> 
		</div><!-- End of img-wrapper --> 
	</section>

	<div class="clearfix"></div>
	
	
	<div class="row-fluid data-content-outer">
        <div class="pageCont">
            <div class="span9 left-col-wrapper">
				
								
				<?php while ( have_posts() ) : the_post(); ?>
					
					<h1 class="pageName"><?=the_title()?></h1>
				<?php
						//get_template_part( 'content', 'page' );
						
						the_content();
						
					endwhile;
				?>
									
								
			</div>
						

			<div class="span3 right-col-wrapper">

				<div class="rightBarCont">									
					
					<?php get_sidebar(); ?>
					
				</div>
				
			</div>                   
 
		</div>

	</div>

	<hr>



<div id="main-content" class="main-content">

<?php
	if ( is_front_page() && twentyfourteen_has_featured_posts() ) {
		// Include the featured content template.
		get_template_part( 'featured-content' );
	}
?>
		
</div><!-- #main-content -->

<?php

get_footer();
