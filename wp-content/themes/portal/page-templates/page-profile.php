<?php
/**
 * Template Name: Page Profile
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
redirect_to_login();
/*if(!is_user_logged_in()){
    wp_redirect(get_site_url()."/login");
    exit;
}*/
get_header();
/*if(!is_user_logged_in()){
    wp_redirect(get_site_url()."/login");
    exit;
}*/
?>

<div id="main-content" class="main-content">

	<div class="row-fluid data-content-outer" >
	profile page
	</div>
	
</div><!-- #main-content -->

<?php
get_footer();
