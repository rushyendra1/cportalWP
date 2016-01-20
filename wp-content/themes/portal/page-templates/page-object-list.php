<?php
/**
 * Template Name: Page Object List
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
redirect_to_login();
get_header();
$type = (isset($_GET['id']))?trim($_GET['id']):"";
?>

<div id="main-content" class="main-content">
    <div class="row-fluid data-content-outer" >
        <div id="primary" class="content-area">
            <div id="content" class="site-content" role="main">
                <div class=" contentSub sidebarCell">
                    <!-- Sidebar Started -->
<?php //echo portal_sidebar();
?>
                    <!-- Sidebar ended -->
                </div>
                <div class="bodyCell contentSub" >
                    <!-- Start page content -->
                    <div class="bodyPage">
                        <div class="bPageTitle">
                            <h1 class="pageType noSecondHeader"><?php echo $type; ?></h1>

                        </div>

                        <!-- Begin ListElement -->

                        <!-- motif: Account -->


                        <!--<div class="filter row-fluid accountListView">
                            <label  class="viewTypeLabel" >View:</label>
                            <select title="View:"   id="viewType">
                                <option value="1">Active Accounts</option>
                                <option  value="2" selected="selected">All Accounts</option>
                                <!-- <option value="3">H and M Accounts</option>
                                 <option value="4">My Accounts</option>
                                 <option value="5">Recently Viewed Accounts</option>-->
                           <!-- </select>


                        </div>-->
                        <!-- Paginations Start Here  -->
                        <div class="paginationLinks pageContact"></div>
                        <!-- Pagination End Here -->
                        <div class="clear"></div>
                        <!-- Alphabet Pagination -->
                       

                            <div class="alphaDiv row-fluid">
                                <?php foreach (range('A', 'Z') as $char) { ?>
                                    <a  class="listItem alphaObject" data-alphatype="<?php echo $char ?>" ><span class="listItemPad"><?php echo $char ?></span></a>
<?php } ?>
                                <!--<a  class="listItem alphaObject" data-alphatype="other">
                                    <span class="listItemPad">Other</span>
                                </a>-->
                                <a class="listItem alphaObject activeAlpha" data-alphatype="all" >
                                    <span class="listItemSelected listItemLast">All</span>
                                </a>
                            </div>

                      
                        <div class="clear"></div>
                        <!--Alpha pagination ended -->

                        <!-- WrappingClass -->
                        <div class="listRelatedObject accountBlock">
                            <div class="accountListDiv">
                                <!--<div class="pbHeader"></div>-->
                                <div class="pbBody">
                                    <table cellspacing="0" cellpadding="0" border="0" class="list accountListTable">
                                        <thead class="displayObjectHeader">

                                        </thead>
                                        <tbody class="object-list-res">

                                            <!-- ListRow -->

                                        </tbody>
                                    </table>
                                    <div class="clearfix"></div>
                                    <!--<div class="fewerMore">
                                        Show me <a class="fewerObject activeCont" data-type="0">fewer
                                            <img width="17" height="15" align="texttop" title="Show Fewer" alt="Show Fewer" src="<?php echo get_template_directory_uri() ?>/images/extended/accounts_show_fewer_arrow.gif"></a> 
                                        /  
                                        <a class="moreObject" data-type="1">
                                            <img width="17" height="15" align="texttop" title="Show More" alt="Show More" src="<?php echo get_template_directory_uri() ?>/images/extended/accounts_show_more_arrow.gif">more</a>
                                        records per list page
                                    </div>-->
                                </div>

                            </div>

                        </div>
                        <!-- Alpha Pagination started -->
                        <div class="alphaDiv">
                            <?php foreach (range('A', 'Z') as $char) { ?>
                                <a class="listItem alphaObject" data-alphatype="<?php echo $char ?>" ><span class="listItemPad"><?php echo $char ?></span></a>
<?php } ?>
                            <!--<a  class="listItem alphaObject" data-alphatype="other" >
                                <span class="listItemPad">Other</span>
                            </a>-->
                            <a class="listItem alphaObject activeAlpha" data-alphatype="all">
                                <span class="listItemSelected listItemLast">All</span>
                            </a>
                        </div>
                        <!-- Alpha pagination Ended -->
                        <div class="paginationLinks paginationRight"></div>
                        <!-- End ListElement -->
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