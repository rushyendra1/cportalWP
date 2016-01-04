<?php
/**
 * Template Name: Page Portal Home
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
<a name="skiplink">
    <!--<img width="1" height="1" title="Content Starts Here" class="skiplink skipLinkTargetInner zen-skipLinkTarget" alt="Content Starts Here" src="/s.gif">-->
</a>

    
        <div class="home-mgmt">

    <div class="contentBlock portalHome">
        <h1>Welcome to the green house customer portal</h1>
    </div>
    <div class="mainHomeClass">
    <div>
        	<ul>
            <li>
                <h2 class="homeTag">
                    <a href="<?php echo get_site_url() ?>/account-information/" class="homeTag">
                        Account Management</a></h2>
	</li>
        <li>
            <a href="<?php echo get_site_url() ?>/account-list/" class="homeSubTag">My Sites</a>
        </li>
        <li>
            <a href="<?php echo get_site_url() ?>/contact-list" class="homeSubTag">My Organisation</a>
        </li>
        <li><a href="#" class="homeSubTag">My Library</a></li>
        </ul>

    </div>
    <div >
        <ul><li>
	<h2 class="homeTag">
            <a href="<?php echo get_site_url() ?>/services" class="homeTag">Services</a>
        </h2>
	</li>
        <li><a href="<?php echo get_site_url() ?>/service-list/" class="homeSubTag">Current Services</a>
        </li>
        <li>
            <a href="#" class="homeSubTag">I Need A New Service</a>
        </li>
        </ul>
    </div>
    </div>
    <div class="mainHomeClass">
        <div>
            		<ul><li>
				<h2 class="homeTag"><a href="#" class="homeTag">Service Support</a></h2>
			</li>
                        <li>
                            <a href="#" class="homeSubTag">I Need Service Assistance</a>
                        </li>
                        </ul>
	
        </div>
        <div>
            <ul><li><h2 class="homeTag"><a href="#" class="homeTag">Reporting</a></h2>
				</li>
                                <li><a href="#" class="homeSubTag">My Reports</a></li>
                                <li><a href="#" class="homeSubTag">My Reports Libray</a></li>
                        </ul>
        </div>
    </div>
    <div class="mainHomeClass">
        <div>
            	<ul>
                            <li>
				<h2 class="homeTag"><a href="#" class="homeTag">Education &amp;Communication</a></h2>
				</li>
                                <li><a href="#" class="homeSubTag">Education Resources</a>
                                </li>
                                <li><a href="#" class="homeSubTag">Compliance</a>
                                </li>
                                <li><a href="#" class="homeSubTag">News Letter</a></li>
                                <li><a href="#" class="homeSubTag">Container Information</a></li>
                        </ul>
        </div>
        <div >
            		<ul>
                            <li>
				<h2 class="homeTag">Contact Us</h2>
				</li>
                                <li>Telephone : 01604 808 703</li>
                                <li>email: <a class="homea" href="mailto:customerservice@thegreenhouse.co.uk">customerservice@thegreenhouse.co.uk
                                    </a>
                                </li>
                        </ul>
	
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
