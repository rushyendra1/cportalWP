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


				
								
				<?php while ( have_posts() ) : the_post(); ?>
					
					<!--<h1 class="pageName"><?=the_title()?></h1>-->
				<?php
						//get_template_part( 'content', 'page' );
						
						the_content();
						
					endwhile;
				?>
									
								
		
<?php

get_footer();
