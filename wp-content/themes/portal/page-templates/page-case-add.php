<?php
/**
 * Template Name: Page Case Form
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
            <a name="skiplink">&nbsp;
                <!--<img width="1" height="1" title="Content Starts Here" class="skiplink skipLinkTargetInner zen-skipLinkTarget" alt="Content Starts Here" src="/s.gif">-->
            </a>
            <div class="bPageTitle">
              <h1 class="accountTitle">New Case</h1>
           </div>
<div class="bDescription">Select a record type for the new case.&nbsp;</div>
 <?php
 //Get the connection
 list($access_token,$instance_url) = get_connection_sales();
 global $contact_case_record_type_url;
  $url = $instance_url.$contact_case_record_type_url;
 $json_response = connects_salesforce($url,array(),FALSE,$access_token,"get");
  $response = json_decode($json_response);
   $response = json_decode($response);
   $contact_id = (isset($_GET['contact_id']))?$_GET['contact_id']: "";
   $contact_name = (isset($_GET['contact_name']))?$_GET['contact_name']: "";
   
   $account_id = (isset($_GET['act_id']))?$_GET['act_id']: "";
   $account_name = (isset($_GET['act_name']))?$_GET['act_name']: "";
   
   $case_record_type = (isset($_GET['id']))?$_GET['id']: "";
   
 ?>
<input type="hidden" id="contactId" value="<?php echo $contact_id; ?>" >
<input type="hidden" id="contactName" value="<?php echo $contact_name; ?>" >

<input type="hidden" id="accountId" value="<?php echo $account_id ; ?>" >
<input type="hidden" id="accountName" value="<?php echo $account_name; ?>" >

<!--<input type="hidden" id="caseRecordType" value="<?php echo $case_record_type; ?>" >-->
   
    <div>
        <div class="pbHeader">
            <div class="pbTitle titleWidth caseTitleWidth">
                <h2 class="mainTitle">Select Case Record Type</h2>
            </div>
          
        </div>
        <div class="pbBody">
            <div style="display: none" id="errorDiv_ep" class="pbError">
                Error: Invalid Data. <br>Review all error messages below to correct your data.
            </div>
            <div class="pbSubsection">
                    <table cellspacing="0" cellpadding="0" border="0" class="detailList addCaseList">
                        <tbody>
                            <tr>
                                <td class="labelCol requiredInput">
                                    <label for="p3">
                                        <span class="assistiveText">*</span>Record Type of new record
                                    </label>
                                </td>
                                <td colspan="3" class="data2Col">
                                    <div class="requiredInput">
                                        <div class="requiredBlock"></div>
                                        <select  id="caseRecordTypeSelect">
                                          <?php
                                          if(!isset($response->response) && count($response)>0){
                                              foreach($response as $each)
                                                  {
                                                      //echo '<option value="'.$each->Id.'">'.$each->Name.'</option>';
                                                      echo '<option value="'.$each->Id.'">'.$each->Name.'</option>';
                                                  }
                                          }?>
                                          
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <!--<tr class="last detailRow">
                                <td colspan="4">
                                    <span id="errorText"></span>
                                </td>
                            </tr>-->
                        </tbody>
                    </table>
            </div>
        </div>
        <div class="pbBottomButtons buttonCaseDiv">
            <input type="button" title="Continue" name="save" class="btn continueCase" value="Continue"> 
           <input type="button" title="Cancel" name="cancel" class="btn cancelCase" data-id="view-contact" value="Cancel">
        </div>
        <!--<div class="pbFooter secondaryPalette">
            <div class="bg"></div>
                
        </div>-->
            
    </div>
    
<!--</form>-->
<h3 class="accountTitleH3">Available Case Record Types</h3>
<table cellspacing="0" cellpadding="0" border="0" class="infoTable  recordTypeInfo">
    <tbody>
        <tr class="headerRow">
            <th scope="col" class="recordTypeName">Record Type Name</th>
            <th scope="col" class="recordTypeDescription">Description</th>
        </tr>
        <?php
        if(!isset($response->response) && count($response)>0){
             foreach($response as $each)
                { ?>
                    <tr class="rowDisp">
            <td scope="row" class="recordTypeName"><?php echo $each->Name ?></td>
            <td class="recordTypeDescription"><?php echo $each->Description ?></td>
        </tr>
               <?php  }
        }?>
        
        
</tbody>
</table>
<!-- Body events -->

<!-- End page content -->
</div>				

			</div><!-- #content -->
		</div><!-- #primary -->
	</div>
	
</div><!-- #main-content -->

<?php
get_footer();
