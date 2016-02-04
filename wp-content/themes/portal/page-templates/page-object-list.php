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
$obj_name = (isset($_GET['obj_name']))?trim($_GET['obj_name']):"";
global $user_ID;
$result = get_userdata($user_ID);
$is_edit = $is_create= $is_delete = $is_view =   0;
if(isset($result->data->is_Edit))
     $is_edit = $result->data->is_Edit; 
     if(isset($result->data->is_Create))
     $is_create = $result->data->is_Create; 
     if(isset($result->data->is_Delete))
     $is_delete = $result->data->is_Delete; 
     if(isset($result->data->is_View))
     $is_view = $result->data->is_View; 
?>
<input type="hidden" id="isEdit" value="<?php echo $is_edit; ?>" >
<input type="hidden" id="isView" value="<?php echo $is_view; ?>" >
<input type="hidden" id="isCreate" value="<?php echo $is_create; ?>" >
<input type="hidden" id="isDelete" value="<?php echo $is_delete; ?>" >
<input type="hidden" id="object" value="<?php echo $type; ?>" >
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
                            <h1 class="headTitle" class="pageType noSecondHeader" ><?php echo $obj_name; ?></h1>
                            <?php if($is_create) { ?>
                            <input type="button" value="Add" class="btn addObject" data-id="" name="edit" title="Add">
                            <?php } ?>

                        </div>

                        <!-- Begin ListElement -->

                        <!-- motif: Account -->



                        </div>
                        <!-- Paginations Start Here  -->
                        <div class="paginationLinks pageContact"></div>
                        <!-- Pagination End Here -->
                        <div class="clear"></div>
                        <!-- Alphabet Pagination -->
                       

                            <div class="alphaDiv row-fluid">
                                <?php foreach (range('A', 'Z') as $char) { ?>
                                    <a  class="listItem alphaObject" data-alphatype="<?php echo $char ?>" ><span class="listItemPad"><?php echo $char ?></span></a>
<?php } ?>
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
                                    <table cellspacing="0" cellpadding="0" border="0" class="list objectListTable" id="objectListTable">
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
