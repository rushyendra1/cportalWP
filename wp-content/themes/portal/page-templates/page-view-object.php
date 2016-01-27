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
 /*** Connect the salesforce ***/
 list($access_token,$instance_url) = get_connection_sales();
 global $contact_details_url;
  $url = $instance_url.$contact_details_url.$contact_id;
 /*** Retrieve contact details **/
 $response = array();
 try{
  $json_response = connects_salesforce($url,array(),FALSE,$access_token,"get");
 }catch(Exception $e){}
  $response = json_decode($json_response);
  $response = json_decode($response);
  //if no data is there 
   if(isset($response->response->status)){ ?>
    <div class="content">
    <h1 class="pageType"> <?php echo $response->response->message; ?></h1>
    </div>                       
   <?php }else{
       
       $result = $response[0];
       
       $result = array("Name" => "dffgfg", "Email" => "email@reg.com",
           "Phone" => "9638527410", "Mobile" => "9638527410",
           "Type" => "dfdfdfd", "related_types" => "Contact,Cases",
           "dfdfd" => "dfdfdfd"
           );
       $related_types = $result['related_types'];
       $related_types_array = explode(",", $related_types);
       unset($result['related_types']);
       
?>
<div class="bPageTitle serviceTitle">
  
     <h1><?php echo $object_type; ?></h1>
     <!--<h2><?php echo $name;?></h2>-->
    
</div>
    
&nbsp;
<div>
    <input type="hidden" id="objectId" value="<?php echo $object_id ?>" >
    <div class="pbHeader">
        <div class="pbTitle titleWidth">
            <h2 class="mainTitle"> <?php echo $object_type; ?> Detail</h2>
        </div>
      <!--  <div class="buttonWidth">
            <input type="button"  title="Edit" name="edit" class="btn editContact" value="Edit"  data-id="<?php echo $contact_id ?>">
        </div>-->
       
    </div>
    <div class="pbBody">
               <div class="pbSubsection">
                   <div class="contactDets">
                       <div class="contactDetsDet">
                           <?php
                             $item_cnt = count($result);
                            $rep_cnt = ceil($item_cnt/2);
                           if($item_cnt>0)
                           {
                               $i=0;
                               foreach($result as $key=>$val){
                                   //if($key != "related_types"){
                                   if($i == $rep_cnt)
                                   {
                                       $i=0;
                                       echo '</div><div class="contactDetsDet">';
                                   }
                                   $i++;
                               ?>
                           <div class="eachContactDetsDet">
                            <div class="labelColItem"><label > <?php echo $key; ?> </label>
                            </div>
                        <div class="oddDivContact">
                            <span class="contactSpan"><?php echo $val; ?></span>
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
        foreach($related_types_array as $each){
    ?>
    <div class="bPageBlock">
        <div class="pbHeader">
            <div class="pbTitle titleWidth">
            <h3 class="accountTitleH3"><?php echo $each ?></h3>
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
