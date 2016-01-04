<?php
/**
 * Template Name: Page Account
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
redirect_to_login();
get_header(); ?>

<div id="main-content" class="main-content">

	<div class="row-fluid data-content-outer" >
		<div id="primary" class="content-area">
			<div id="content" class="site-content" role="main">
				
           <div class=" contentSub sidebarCell">                 
            <!-- Sidebar Started -->
              <?php echo portal_sidebar(); ?>
            <!-- Sidebar ended -->
     </div>
<div class="bodyCell contentSub" >
<!-- Start page content -->
<!-- Account Information start HEre -->
<div class="contentBlock" >
    <h1>Account Management</h1>
    <div class="mainAcctClass">
        <div>
             <h2 class="actTag"><a href="<?php echo get_site_url()."/account-list" ?>" class="actTag">My Sites</a></h2>
             <p>My Sites allows you to view all your sites under management with the green house. Here you can view current and historic site records and sort your data in the way you need it.</p>
        </div>
        <div>
            <h2 class="actTag"><a href="<?php echo get_site_url() ?>/contact-list" class="actTag">My Organisation</a></h2>
                    <p>My Organisation allows you to view and edit the registered contact details of everyone from your organisation. Here you can view current and historic contact records and sort your data in the way you need it.</p>
        </div>
    </div>
    <div class="mainAcctClass">
        
        <div>
             <h2 class="actTag"><a href="#" class="actTag">My Library</a>
                    </h2>
                    <p>My Library allows you to search, view, share and download all documentation produced by the green house on behalf of your organisation. Your unique library has separate volumes to allow easy navigation for retrieval of important documents. Here you will find items including, Waste Transfer Notes, Meeting Minutes, Proposals and Contracts to name but a few.</p>
           </div>
    </div>
    
</div>


<!-- Body events -->
<!-- End page content -->
</div>
                            <!-- Account Information end here -->
				

			</div><!-- #content -->
		</div><!-- #primary -->
	</div>
	
</div><!-- #main-content -->

<?php
get_footer();
