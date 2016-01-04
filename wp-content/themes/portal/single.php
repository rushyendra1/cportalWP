<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */

get_header(); ?>


	<?php
		// Start the Loop.
		while ( have_posts() ) : the_post(); 
	?>

	<div class="row-fluid data-content-outer">
        <div class="post-cont">

			<div class="span9 left-col-wrapper">				
				
				<?php
				/*
				 * Include the post format-specific template for the content. If you want to
				 * use this in a child theme, then include a file called called content-___.php
				 * (where ___ is the post format) and that will be used instead.
				 */
				get_template_part( 'content', get_post_format() );
				?>
						
				<?php
				// Previous/next post navigation.
				twentyfourteen_post_nav();
				?>

				<div class="clear"></div>
				
				<?php
				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) {
					comments_template();
				}
				?>

			</div>


			<div class="span3 right-col-wrapper">
				<div class="rightBarCont">								
					<?php
						get_sidebar( 'content' );
						get_sidebar();
					?>
					<a href="<?=get_site_url(); ?>/quote/" class="redbuttonstyle" >Click to get your quote now</a>
				</div>				
			</div>


		</div>
	</div>
				
	<?php endwhile; ?>


<?php

get_footer();
