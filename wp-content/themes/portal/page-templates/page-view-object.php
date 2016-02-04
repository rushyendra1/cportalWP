<?php
/**
 * Template Name: Page View Object
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
              <?php //echo portal_sidebar();
              ?>
            <!-- Sidebar ended -->
      </div>
<div class="bodyCell contentSub" >
<!-- Start page content -->
<a name="skiplink" id="skiplink">&nbsp;</a>
<?php
$object_type = (isset($_GET['type']))?$_GET['type']:"";
$object_id = (isset($_GET['id']))?$_GET['id']:"";
$object_name = (isset($_GET['obj_name']))?$_GET['obj_name']:"";


 /*** Connect the salesforce ***/
 list($access_token,$instance_url) = get_connection_sales();
 global $login_time_url;
  $url = $instance_url.$login_time_url;
 /*** Retrieve contact details **/
 $response = array();
 try{
   $object_array = array("method" => "getRecordDetails",
                                "Type" =>$object_type,
       "RecordId" => $object_id);  
  // echo json_encode($object_array);
   $json_response = post_request($url, $access_token, json_encode($object_array),"POST");
   $response_array = explode("chunked",$json_response);
    if(isset($response_array[1]))
    $json_response = $response_array[1];
 }catch(Exception $e){}
  $response = json_decode($json_response);
  
  
  //var_dump($response);
  //if no data is there 
   if(isset($response[0]->errorCode)){ ?>
    <div class="content">
    <h1 class="pageType"> <?php echo $response[0]->message; ?></h1>
    </div>                       
   <?php }else{
       $response = json_decode($response);
       $related_types_array = $params_array = $related_list_array = $fields_array = array();
       if(isset($response->Fields->Fields))
         $params_array = $response->Fields->Fields;
     if(isset($response->ApiFields->ApiFields))
         $fields_array = $response->ApiFields->ApiFields;
     if(isset($response->RelatedList->RelatedList))
     $related_list_array = $response->RelatedList->RelatedList;
     
     if(isset($response->RelatedListApi->RelatedListApi))
     $related_types_array = $response->RelatedListApi->RelatedListApi;
      if(isset($response->Data->Data))
     $result = $response->Data->Data; 
      if(isset($result[0]))
      $result = $result[0];
      $name = '';
      if(isset($result->Name))
        $name = $result->Name;
      if($name == "" && isset($result->Id))
          $name = $result->Id;
       
?>
<div class="bPageTitle serviceTitle">

  
    <h1 class="headTitle">View <?php echo $object_name; ?></h1>
     <!--<h2><?php echo $name;?></h2>-->
    


</div>
    
&nbsp;
<div>
    <input type="hidden" id="objName" value="<?php echo $name; ?>" >
    <input type="hidden" id="objectId" value="<?php echo $object_id ?>" >
    <input type="hidden" id="objectType" value="<?php echo $object_type ?>" >
    <div class="pbHeader">
        <div class="pbTitle titleWidth">
            <h2 class="mainTitle"> <?php echo $object_name; ?> Detail</h2>
        </div>
      <!--  <div class="buttonWidth">
            <input type="button"  title="Edit" name="edit" class="btn editContact" value="Edit"  data-id="<?php echo $contact_id ?>">
        </div>-->
       
    </div>
    <div class="pbBody">
               <div class="pbSubsection">
                   <div class="objectDets">
                       <div class="objectDetsDet">
                           <?php
                             $item_cnt = count($params_array);
                            $rep_cnt = ceil($item_cnt/2);
                           if($item_cnt>0)
                           {
                               $i=0; $j = 0;
                               foreach($params_array as $val){
                                   //if($key != "related_types"){
                                   $key = $fields_array[$j];
                                   if($i == $rep_cnt)
                                   {
                                       $i=0;
                                       echo '</div><div class="objectDetsDet">';
                                   }
                                   $i++;
                                   $j++;
                               ?>
                           <div class="eachObjectDetsDet">
                            <div class="labelColItem"><label > <?php echo $val; ?> </label>
                            </div>
                        <div class="oddDivObject">
                            <span class="objectSpan"><?php echo $result->$key; ?></span>
                        </div>
                        </div>
                               <?php 
                                   //} // if closed
                                   } //for closed
                           }// if closed ?>
                            
                        
                       </div>
                     
                   </div>
        
        </div>
      
    </div>
    <div class="pbBottomButtons">
        <div class="buttonWidth buttonEdit">
        <input type="button"  title="Edit" name="edit" data-id="<?php echo $contact_id ?>" class="btn editContact" value=" Edit ">
        </div>
       
    </div>
    <div class="clear"></div>
    
        
</div>
<!-- Begin RelatedListElement -->
<div  class="bRelatedList first">
   <!-- <a name="0032000000ck5ZE_00Nw0000003EEmL_target"></a>-->
<!-- Begin ListElement -->

<!-- motif: Contact -->

<!-- WrappingClass -->
<div class="listRelatedObject Custom28Block">
    <?php
    if(count($related_types_array)>0){
        $relateds_types = implode(",",$related_types_array);
        
        echo '<input type="hidden" id="relatedTypes" value="'.$relateds_types.'" >';
        $i =0 ;
        foreach($related_types_array as $each){
            $rel_name = $related_list_array[$i];
            $i++;
    ?>
    <div class="bPageBlock">
        <div class="pbHeader">
            <div class="pbTitle titleWidth">
            <h3 class="accountTitleH3"><?php echo $rel_name ?></h3>
        </div>
        <!--<div class="buttonWidth">
            <input type="button" title="New Case" data-contactid="<?php echo $contact_id; ?>" data-contactname="<?php echo $name; ?>"  class="btn newCase" value="New Case">
        </div>-->
       
        </div>
         <div  class="pbBody">
            
          <table cellspacing="0" cellpadding="0" border="0" class="list object-<?php echo $each; ?>-list">
                <thead class="headerObject<?php echo $each; ?>">
                    
                </thead>
                <tbody class="Object<?php echo $each; ?>Res">
                </tbody>
            </table>
            <div class="showMoreDivObject<?php echo $each; ?>"></div>
        </div>         
     

            
    </div>
    
    <?php }// if closed
    } //for closed?>
</div>
<!--<div class="listElementBottomNav"></div>-->

<!-- End ListElement -->
</div>
<!-- End RelatedListElement -->

   <?php } ?>

<!-- Body events -->

<!-- End page content -->
</div>				

			</div><!-- #content -->
		</div><!-- #primary -->
	</div>
	
</div><!-- #main-content -->

<?php
get_footer();
