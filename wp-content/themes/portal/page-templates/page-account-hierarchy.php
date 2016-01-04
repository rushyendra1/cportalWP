<?php
/**
 * Template Name: Page Account Hierarchy
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
session_start();
redirect_to_login();
get_header();
echo place_message();
?>

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
<?php
$account_id = (isset($_GET['id']))?$_GET['id']:"";
$account_name = (isset($_GET['act_name']))?$_GET['act_name']:"";
?>
<input type="hidden" id="accountName" value="<?php echo $account_name ?>" >
<div class="bodyPage">
<div class="bPageTitle">
    <h1>Account Hierarchy </h1>
        <?php 
         if($account_name != "") 
          echo "<h2>".$account_name."</h2>"; 
         ?>
 </div>
    

<!-- Begin ListElement -->

<!-- motif: Account -->

   
       <div class="bDescription">The hierarchy is created by associating accounts with parent accounts.</div>
<!-- Paginations Start Here  -->
         <!--<div class="paginationLinks pageContact"></div>-->
 <!-- Pagination End Here -->
        
 <!-- Alphabet Pagination -->
<!--<div class="row-fluid" >
    
        <div class="rolodex" style="display:none">
           <?php foreach (range('A', 'Z') as $char) { ?>
            <a shouldstayinownframe="true" class="listItem" ><span class="listItemPad"><?php echo $char ?></span></a>
            <?php } ?>
          
            
            <a shouldstayinownframe="true" class="listItem" href="">
                <span class="listItemPad">Other</span></a>
            <span class="listItemSelected listItemLast">All</span>
        </div>
   
</div>-->
 
 <!--Alpha pagination ended -->
 
<!-- WrappingClass -->
<div class="listRelatedObject accountBlock">
    <input type="hidden" id="accountId" value="<?php echo $account_id ?>" >
    <div class="accountListDiv">
        <!--<div class="pbHeader"></div>-->
        <div class="pbBody">
            <table cellspacing="0" cellpadding="0" border="0" class="list accountHierarchyTable">
                <thead class="headerAccountHierarchy">
                    
                </thead>
                <tbody class="account-hierarchy-list-res">

<!-- ListRow -->

</tbody>
</table>
            <div class="clearfix"></div>
<!--<div class="fewerMore">
    Show me <a  class="fewerContact">fewer
        <img width="17" height="15" align="texttop" title="Show Fewer" alt="Show Fewer" src="<?php echo get_template_directory_uri() ?>/images/extended/accounts_show_fewer_arrow.gif"></a> 
    /  
    <a class="moreContact">
        <img width="17" height="15" align="texttop" title="Show More" alt="Show More" src="<?php echo get_template_directory_uri() ?>/images/extended/accounts_show_more_arrow.gif">more</a>
    records per list page
</div>-->
        </div>
            
    </div>
            
</div>
<!--
<div class="listElementBottomNav" >
            <div class="bNext">
                <div class="rolodex" style="display:none">
                     <?php foreach (range('A', 'Z') as $char) { ?>
            <a shouldstayinownframe="true" class="listItem" ><span class="listItemPad"><?php echo $char ?></span></a>
            <?php } ?>
                    <a shouldstayinownframe="true" class="listItem" ><span class="listItemPad">Other</span></a>
                    <span class="listItemSelected listItemLast">All</span>
                </div>
               
            </div>
     <div class="paginationLinks">
                   
     </div>
        </div>-->
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
