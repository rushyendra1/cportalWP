<?php
/**
 * Template Name: Page Advanced Search
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */
redirect_to_login();
get_header();
$search = (isset($_GET['search']))?trim($_GET['search']):"";
$type = (isset($_GET['type']))?trim($_GET['type']):"";
$stype = (isset($_GET['stype']))?trim($_GET['stype']):"";
$title = "Advanced Search";
if($type != ""){
    $title = "Search Results";
    $type_name = get_search_type($type);
}
else $type_name = "All Objects";
if($type == "" && $stype == "s")
    $title = "Search Results";
 
/** Connect the Salesforce **/
list($access_token,$instance_url) = get_connection_sales();
global $search_all_url;
$url = $search_all_url;
if($stype == ""){
    global  $adv_search_url;
    $url =  $adv_search_url;
}
$url = $url."&searchString=".$search."&SelectedSobject=".$type;

$response = array();
$error = 0;
if(isset($_GET['search'])){
    if(strlen($search)<2)
            $error = 1;
    
if($type == "")
{
    global $search_all_objects;
    $url = $search_all_objects.$search;
}
//echo $url;
if(!$error){
    $json_response = connects_salesforce($instance_url.$url,array(),FALSE,$access_token,"get");
    //var_dump($json_response);
    if(is_array($json_response))
    {
        echo json_encode($json_response); exit;
    }
    $response = json_decode($json_response);
    if(is_array($response))
    {
         echo json_encode($response); exit;
    }
    $response = json_decode($response);
    if($response->response)
    {
        echo json_encode($response); exit;
    }
    $response_cnt = count($response);
}
}

?>

<div id="main-content" class="main-content">

	<div class="row-fluid data-content-outer" >
            <input type="hidden" value="<?php echo $stype; ?>" id="stype" >
            <input type="hidden" value="<?php echo $search; ?>" id="search" >
		<div id="primary" class="content-area">
			<div id="content" class="site-content" role="main">
			<div class=" contentSub sidebarCell">
           <?php echo portal_sidebar(); ?>
       </div>
<div class="bodyCell contentSub" >
<!-- Start page content -->
<div class="contentBlock" >
<div class="services" id="searchDiv">
<h1><?php echo $title; ?></h1>
<div class="advSearchClass">
    <?php if($error){ ?>
    <p class="error">Error: Please enter a search string at least 2 characters long.</p>
    <?php } ?>
        <span> Search</span> 
            <input type="hidden" id="searchType" value="<?php echo $type; ?>" >
        <div class="searchBoxInput">
            <input type="text" value="<?php echo $search;?>" title="Enter search keywords" size="40"  maxlength="80" id="searchItems" >
            <input type="submit" title="Search" name="search" class="btn advSearchBtn" value="Search">
        </div>
        
        <div>
            <p>
                <?php 
                if($search != ""){
                if($type_name != "")
                          echo "<span>Scope: </span>".$type_name."|"; 
                       ?>
                <a href="<?php echo get_site_url() ?>/advanced-search">Advanced Search</a>
                <?php } ?>
            </p>
        </div>
        
    </div>
    
</div>
<div class="advSearchClass" style="display:none">
    <div>
            <p><span>Use enhanced search capabilities</span></p>
            <p><input type="checkbox" value="1" name="asPhrase" id="asPhrase">
                    <label for="asPhrase">Exact phrase</label></p>
    </div>
</div>
<?php if($type == "" && $stype != "s"){
    if(!$error){
      ?>
<div class="advSearchClass">
    <div>
        <h3>Scope</h3>
        <a class="selectorToggle selectChk" >Select All</a> | 
        <a class="selectorToggle deSelectChk" >Deselect All</a>
        
    </div>
    
</div>
    
<div class="advSearchClass">
    <div class="advSearchItem">
        <input type="checkbox" class="typeValue" id="accountChk" value="Account"  <?php if($type=="Account") echo 'checked="checked"'; ?>>
        <span> Accounts</span>
    </div>
    <div class="advSearchItem">
        <input type="checkbox" class="typeValue" id="contactChk" value="Contact"  <?php if($type=="Contact") echo 'checked="checked"'; ?>>
        <span>Contacts</span>
    </div>
    <div class="advSearchItem">
        <input type="checkbox" class="typeValue" id="caseChk" value="Case"  <?php if($type=="Case") echo 'checked="checked"'; ?>> 
        <span> Cases </span>
    </div>
    <div class="advSearchItem">
        <input type="checkbox" class="typeValue" id="serviceChk" value="Service"  <?php if($type=="Service") echo 'checked="checked"'; ?>>
        <span>Services</span>
    </div>
    <div class="advSearchItem">
        <input type="checkbox" class="typeValue" id="noteChk" value="Note" <?php if($type=="Note") echo 'checked="checked"'; ?>>
        <span>Notes</span>
    </div>
    
</div>
    <?php  } 
     }else{?>
<div class="divMainAdv">
    <?php 
     //$res_cnt = count($response);
     $response_cnt = count($response);
     $is_all =0;
     if($stype == "s" && $type == ""){
         $type = "Account,Contact,Case,Service,Note";
         $is_all =1;
     }
     
     $type_array = explode(",",$type);
     $type_count = count($type_array);
     //var_dump($type_array);
     
     $cnt_key = array_search( "Contact",$type_array);
     $act_key = array_search( "Account",$type_array);
     $case_key = array_search( "Case",$type_array);
     $service_key = array_search("Service", $type_array);
     $note_key = array_search("Note", $type_array);
     $result_act = $response[$act_key];
     if($is_all)
     {
         $case_key = 4;
         $note_key = 2;
         $service_key = 3;
     }
     
      $result_cnt = array();
      $result_cnt = $response[$cnt_key]; 
      
      $result_case = array();
      $result_case = $response[$case_key]; 
     
      $result_service = array();
      $result_service = $response[$service_key];   
      
      $result_note = array();
      $result_note = $response[$note_key];
      
      $text_msg = '';
      
     list( $account_res, $account_type ) = get_adv_search_data($type_array, $type_count, $response_cnt, $result_act, 'Account');
     list( $contact_res, $contact_type ) = get_adv_search_data($type_array, $type_count, $response_cnt, $result_cnt, "Contact");
     list( $case_res, $case_type ) = get_adv_search_data($type_array, $type_count, $response_cnt, $result_case, "Case");
     list( $service_res, $service_type ) = get_adv_search_data($type_array, $type_count, $response_cnt, $result_service, "Service");
     list( $note_res, $note_type ) = get_adv_search_data($type_array, $type_count, $response_cnt, $result_note, "Note");

    $no_records =  '<p> There are no matching:'.$type_name.'</p>';
    //$is_error_msg = '';
    $account_cnt = count($account_res);
    $contact_cnt = count($contact_res);
    $case_cnt = count($case_res);
    $service_cnt = count($service_res);
    $note_cnt = count($note_res);
    $text_array = array();
    $is_data_act  = $is_data_cnt = $is_data_case = $is_data_ser = $is_data_note = 0;
    $msg_disp_array = array();
    if($account_cnt >0)
    $msg_disp_array[] = '<a href="#advAccountList">Accounts['.$account_cnt.']</a>';
    if($contact_cnt >0)
    $msg_disp_array[] = '<a href="#advContactList" >Contacts['.$contact_cnt.']</a>';
    if($case_cnt >0)
    $msg_disp_array[] = '<a href="#advCaseList" >Cases['.$case_cnt.']</a>';
    if($service_cnt >0)
    $msg_disp_array[] = '<a href="#advServiceList">Services['.$service_cnt.']</a>';
    if($note_cnt >0)
    $msg_disp_array[] = '<a href="#advNoteList">Notes['.$note_cnt.']</a>';
    $msg_dispt = implode(" | ", $msg_disp_array);
    echo "<p>".$msg_dispt."</p>";
     if($account_cnt>0){
                 $is_data_act = 1;
                 
              //   $is_error_msg = '';
        //if($account_type == "Account") { 
            //if(count($account_res) >0 ){
            $type_name = get_search_type($account_type);
            echo "<span>". $type_name." [".count($account_res)."] "."</span>";
            
     ?>
    <a name="advAccountList"></a>
     <table cellspacing="0" cellpadding="0" border="0" class="list advAccountList">
                <thead>
                   <tr>
                        <th>Account Name</th>
                        <th>Store Number</th>
                        <th>Shipping Street</th>
                        <th>Shipping City</th>
                        <th>Shipping Zip/Postal Code </th>
                        <th>Phone</th>
                        <th> Active Services</th>
                        <th> Parent Account </th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                   foreach($account_res as $each) {
                        
                        $name = (isset($each->Name))?$each->Name: "";
                        $id = (isset($each->Id))?$each->Id: "";
                        $store_no = (isset($each->Store_Number__c))?$each->Store_Number__c: "";
                        $street = (isset($each->ShippingStreet))?$each->ShippingStreet: "";
                        $city = (isset($each->ShippingCity))?$each->ShippingCity: "";
                        $postal_code = (isset($each->ShippingPostalCode))?$each->ShippingPostalCode: "";
                        $phone = (isset($each->Phone))?$each->Phone: "";
                        $active = (isset($each->Active_Account_Services__c))?$each->Active_Account_Services__c: "";
                        $parent_nm = (isset($each->Parent) && isset($each->Parent->Name))?$each->Parent->Name: "";
                        $parent_id = (isset($each->Parent) && isset($each->Parent->Id))?$each->Parent->Id: "";
                        $file = "flag_green.gif";
                        if($active == "Inactive")
                            $file = "flag_red.gif";
                        
                        ?>
                    <tr>
                        <td>
                            <a href="<?php echo get_site_url(); ?>/view-account?id=<?php echo $id;  ?>"><?php echo $name;  ?></a>
                        </td>
                        <td><?php echo $store_no;  ?></td>
                        <td><?php echo $street; ?></td>
                        <td><?php echo $city; ?></td>
                        <td><?php echo $postal_code; ?></td>
                        <td><?php echo $phone; ?></td>
                        <td><img src="<?php echo get_template_directory_uri(); ?>/images/extended/<?php echo $file; ?>" >
                        </td>
                        <td>
                            <a href="<?php echo get_site_url(); ?>/view-account?id=<?php echo $parent_id;  ?>"><?php echo $parent_nm;  ?></a>
                        </td>
                    </tr>
                    <?php    }  ?>
                </tbody>
</table>
        <?php } else $text_array[] = 'Account';  }
        
     //if($contact_type == "Contact"){
         if($contact_cnt >0 ){
             //$is_error_msg = '';
             $is_data_cnt = 1;
         $type_name = get_search_type($contact_type);
            echo "<span>". $type_name." [".count($contact_res)."] "."</span>";
            
     ?>
    <a name="advContactList"></a>
    <table cellspacing="0" cellpadding="0" border="0"  class="list advContactList">
                <thead>
                   <tr>
                        <th>Action</th>
                        <th>Name</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Account Name </th>
                        <th>Email</th>
                    </tr>    
                </thead>
                <tbody>
                    <?php 
                    foreach($contact_res as $each) {
                        $name = (isset($each->Name))?$each->Name: "";
                        $id = (isset($each->Id))?$each->Id: "";
                        $first_name = (isset($each->FirstName))?$each->FirstName: "";
                        $last_name = (isset($each->LastName))?$each->LastName: "";
                        $act_name = ( isset($each->Account) && isset($each->Account->Name))?$each->Account->Name: "";
                        $email = (isset($each->Email))?$each->Email: "";
                        ?>
                    <tr>
                        <td>
                            <a href="<?php echo get_site_url(); ?>/contact-form?id=<?php echo $id;  ?>">Edit</a></td>
                        <td>
                            <a href="<?php echo get_site_url(); ?>/view-contact?id=<?php echo $id;  ?>"><?php echo $name;  ?></a>
                        </td>
                        <td><?php echo $first_name;  ?></td>
                        <td><?php echo $last_name; ?></td>
                        <td><?php echo $act_name; ?></td>
                        <td><?php echo $email; ?></td>
                       
                    </tr>
                        <?php    } ?>
                </tbody>
</table>
     <?php } else $text_array[] = 'Contact';
    // else $is_error_msg =  $no_records;
                    //}
     //if($case_type == "Case") { 
         if($case_cnt >0 ){
             ///$is_error_msg = '';
             $is_data_case = 1;
         $type_name = get_search_type($case_type);
            echo "<span>". $type_name." [".count($case_res)."] "."</span>";
            
     ?>
    <a name="advCaseList"></a>
     <table cellspacing="0" cellpadding="0" border="0" class="list advCaseList">
                <thead>
                   <tr>
                        <th>Action</th>
                        <th>Case Number</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Created Date </th>
                        <th>Owner Alias</th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                    foreach($case_res as $each) {
                        $name = (isset($each->Name))?$each->Name: "";
                        $id = (isset($each->Id))?$each->Id: "";
                        $subject = (isset($each->Subject__c))?$each->Subject__c: "";
                        $status = (isset($each->Status__c))?$each->Status__c: "";
                        $date_time = (isset($each->CreatedDate))?get_date_from_time($each->CreatedDate): "";
                        $date_time = str_replace("//","",$date_time);
                        $owner = (isset($each->Owner) && isset($each->Owner->Alias))?$each->Owner->Alias: "";
                        ?>
                    <tr>
                        <td>
                            <a href="<?php echo get_site_url(); ?>/case?case-id=<?php echo $id;  ?>">Edit</a>
                        </td>
                        <td>
                            <a href="<?php echo get_site_url(); ?>/view-case?id=<?php echo $id;  ?>"><?php echo $name;  ?>
                            </a></td>
                        <td><?php echo $subject; ?></td>
                        <td><?php echo $status; ?></td>
                        <td><?php echo $date_time; ?></td>
                        <td><?php echo $owner; ?></td>
                      </tr>
                    <?php    }  ?>
                </tbody>
</table>
            <?php  } else $text_array[] = 'Case';
          //  else $is_error_msg =  $no_records;
                   // }
                    ?>
</div>
<?php 
//if($service_type == "Service") { 
    if($service_cnt >0 ){
       // $is_error_msg = '';
        $is_data_ser = 1;
         $type_name = get_search_type($service_type);
            echo "<span>". $type_name." [".count($service_res)."] "."</span>";
     ?>
    <a name="advServiceList"></a>
     <table cellspacing="0" cellpadding="0" border="0" class="list advServiceList">
                <thead>
                   
                    <tr>
                        <th>Ref</th>
                        <th>Customer</th>
                        <th>Store Number</th>
                        <th>Service Postcode</th>
                        <th>Container </th>
                        <th>Size</th>
                        <th>Status</th>
                        <th>Quantity</th>
                        <th>Service Delivery Date</th>
                        <th>Days Of Service</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <?php 
                    foreach($service_res as $each) {
                        $name = (isset($each->Name))?$each->Name: "";
                        $id = (isset($each->Id))?$each->Id: "";
                        $customer = ( isset($each->Customer__r) && isset($each->Customer__r->Name))?$each->Customer__r->Name: "";
                        $store_no = (isset($each->Store_Number__c))?$each->Store_Number__c: "";
                        $service_postcode = (isset($each->Service_Postcode__c))?$each->Service_Postcode__c: "";
                        $container = (isset($each->Container__c))?$each->Container__c: "";
                        $size = (isset($each->Size__c))?$each->Size__c: "";
                        $status = (isset($each->Status__c))?$each->Status__c: "";
                        $qty = (isset($each->Quantity__c))?$each->Quantity__c: "";
                        $date_time = (isset($each->Service_Delivery_Date__c))?get_day_first($each->Service_Delivery_Date__c): "";
                        $day_of_service = (isset($each->Days_Of_Service__c) )?$each->Days_Of_Service__c: "";
                        ?>
                    <tr>
                        <td>
                            <a href="<?php echo get_site_url(); ?>/view-service?id=<?php echo $id;  ?>"><?php echo $name; ?></a>
                        </td>
                        <td><?php echo $customer; ?></td>
                        <td><?php echo $store_no; ?></td>
                        <td><?php echo $service_postcode; ?></td>
                        <td><?php echo $container; ?></td>
                        <td><?php echo $size; ?></td>
                        <td><?php echo $status; ?></td>
                        <td><?php echo $qty; ?></td>
                        <td><?php echo $date_time; ?></td>
                        <td><?php echo $day_of_service; ?></td>
                      </tr>
                    <?php    }  ?>
                </tbody>
</table>
<?php } else $text_array[] = 'Service';
      //else $is_error_msg = $no_records;
                    //}
     //if($note_type == "Note") { 
    if($note_cnt >0 ){
            //$is_error_msg = '';
            $is_data_note = 1;
            $type_name = get_search_type($note_type);
            echo "<span>". $type_name." [".count($note_res)."] "."</span>";
            ?>
    <a name="advNoteList"></a>
     <table cellspacing="0" cellpadding="0" border="0" class="list advNoteList">
                <thead>
                   <tr>
                        <th>Action</th>
                        <th>Title</th>
                        <th>Alias</th>
                        <!--<th>Related To</th>
                        <th>Type </th>-->
                    </tr>
                </thead>
                <tbody>
                    
                    <?php 
                    foreach($note_res as $each) {
                        $alias = (isset($each->Owner) && isset($each->Owner->Alias))?$each->Owner->Alias: "";
                        $id = (isset($each->Id))?$each->Id: "";
                        $title = (isset($each->Title))?$each->Title: "";
                        $related = (isset($each->related))?$each->related: "";
                        $type = (isset($each->type))?$each->type: "";
                        ?>
                    <tr>
                        <td>
                            <a href="<?php echo get_site_url(); ?>/new-note?id=<?php echo $id;  ?>">Edit</a>
                        </td>
                        <td><?php echo $title; ?></td>
                        <td><?php echo $alias; ?></td>
                       <!-- <td><?php echo $related; ?></td>
                        <td><?php echo $type; ?></td>-->
                        
                      </tr>
                    <?php     } ?>
                </tbody>
</table>
     <?php } else $text_array[] = 'Note';
     
     //else $is_error_msg = $no_records;
     if(!in_array(1, array($is_data_act, $is_data_case, $is_data_cnt, $is_data_note, $is_data_ser)))
                    //}
     //if($is_error_msg != "")
         echo $no_records;
     $text_msg = implode(",", $text_array);
     if($is_all )
         echo "There are no matching: ". $text_msg;
     ?>
</div>
<?php //}
?>
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
