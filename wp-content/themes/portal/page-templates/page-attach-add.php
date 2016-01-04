<?php
/**
 * Template Name: Page Attach Add
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
<a name="skiplink">&nbsp;</a>
<?php
$case_no = (isset($_GET['no']))?$_GET['no']:"";
$case_id = (isset($_GET['case_id']))?$_GET['case_id']:"";
$type = (isset($_GET['type']))?$_GET['type']:"";
$msg = "Case";
if($type =="service")
    $msg = "Service";
?>
<input type="hidden" id="caseId" value="<?php echo $case_id ?>" >
   <div class="bPageTitle">
            <h1 id="caseNoTitle">Attach File to  <?php echo $msg. " " .$case_no; ?></h1>
            
   </div>
            
            <!--<div class="blank">&nbsp;</div>-->
                
        
    <!--    <div class="links"></div>-->

    <!--<div class="ptBreadcrumb"></div>-->
        

    <div>
        
        <div class="pbBody">
            
            <div >
                <form  enctype="multipart/form-data">
                <div class="addAttachDiv">
                    <div class="attachEle">
                        <label>1. Select the File</label>
                        <p>Type the path of the file or click the Browse button to find the file.</p>
                        <input type="file" title="Type the path of the file or click the Browse button to find the file." size="20"  id="afile" name="afile">
                    </div>
                   <div class="attachEle">
                        <label>2. Click the "Attach File" button.</label>
                        <p>Repeat steps 1 and 2 to attach multiple files. </p>
                        <p>(When the upload is complete the file information will appear below.) </p>
                        <!--onclick="window.open('<?php echo get_site_url() ?>/showLoader', 'uploadWaiting',  'width=400,height=130,resizable=no,toolbar=no,status=no,scrollbars=no,menubar=no,directories=no,location=no,dependant=no', true);"-->
                        <input type="button" title="Attach File (New Window)"   class="btn  attachfiles" value="Attach File">
                    </div>
                    <div class="attachEle">
                        <label>3.Click the Done button to return to the previous page.</label>
                        <p>(This will cancel an in-progress upload)</p>
                        <input type="button" title="Done" name="cancel" class="btn btn-cancel-view-doc" value=" Done ">
                    </div>
                </div>
                </form>
                
            </div>
             <div class="addAttachLists" >
               </div>
                    </div>
        </div>


<!-- Body events -->

<!-- End page content -->
</div>				

			</div><!-- #content -->
		</div><!-- #primary -->
	</div>
	
</div><!-- #main-content -->

<?php
get_footer();
