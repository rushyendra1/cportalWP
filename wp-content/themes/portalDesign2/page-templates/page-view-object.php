<?php
/**
 * Template Name: Page View Object
 *
 * @package WordPress
 * @subpackage portalDesign2
 * @since portalDesign2 1.0
 */
session_start();
redirect_to_login();

$object_type = (isset($_GET['type']))?$_GET['type']:"";
$object_id = (isset($_GET['id']))?$_GET['id']:"";
$object_name = (isset($_GET['obj_name']))?$_GET['obj_name']:"";
$plu_name = (isset($_GET['plu_name']))?$_GET['plu_name']:"";

 /*** Connect the salesforce ***/
 list($access_token,$instance_url) = get_connection_sales();
 global $login_time_url;
  $url = $instance_url.$login_time_url;
 // echo url;
 /*** Retrieve contact details **/
 $response = array();
 try{
     global $user_ID;
   $object_array = array("method" => "getRecordDetails",
                         "Type" =>$object_type,
                         "RecordId" => $object_id,
                         "userId" => $user_ID
                         );  
  //echo json_encode($object_array);
   $json_response = post_request($url, $access_token, json_encode($object_array),"POST");
   $response_array = explode("chunked",$json_response);
    if(isset($response_array[1]))
    $json_response = $response_array[1];
 }catch(Exception $e){}
  $response = json_decode($json_response);
$msg = '';
if(isset($response[0]->errorCode)){
    $msg = $response[0]->message;
}else{
    $response = json_decode($response);
    if (isset($response->errorCode))
    {
        $msg = $response->msg;
    }
    if(is_string($response))
    $response = json_decode($response);
    
       $related_types_array = $params_array = $related_list_array = $fields_array = array();
       if(isset($response->Fields->Fields))
         $params_array = $response->Fields->Fields;
     if(isset($response->ApiFields->ApiFields))
         $fields_array = $response->ApiFields->ApiFields;
     $key = array_search("Id", $params_array);
     if($key)
     {
         unset($params_array[$key]);
         $params_array = array_values($params_array);
         unset($fields_array[$key]);
         $fields_array = array_values($fields_array);
     }
     
     if(isset($response->RelatedList->RelatedList))
     $related_list_array = $response->RelatedList->RelatedList;
     
     if(isset($response->RelatedListApi->RelatedListApi))
     $related_types_array = $response->RelatedListApi->RelatedListApi;
      if(isset($response->Data->Data))
     $result = $response->Data->Data; 
      if(isset($result[0]))
      $result = $result[0];
      $name = '';
      $is_attach = 0;
      $body = $ext_mime ='';
      if(!isset($result))
      {
          $result = $response;
          $is_attach = 1;
         //var_dump($result); exit;
           if(isset($result->name))
        $name = $result->name;
           if(isset($result->body))
        $body = $result->body;
           if(isset($result->type))
              $ext_mime = $result->type;
      }else{
          if(isset($result->Name))
        $name = $result->Name;
      
      if($name == "" && isset($result->Id))
          $name = $result->Id;
      }
}
 if($is_attach){
     if($msg != ""){ ?>
    <div class="content">
    <h1 class="pageType"> <?php echo $msg; ?></h1>
    </div>                       
   <?php  exit; }
                   if($ext_mime != "" && $body != "")
  $ext_array = array("image/bmp", "image/x-windows-bmp","image/vnd.dwg","image/x-dwg","image/fif","image/florian"
          ,"image/vnd.fpx","image/vnd.net-fpx","image/g3fax","image/gif","image/x-icon",
          "image/ief",	"image/jpeg", "image/pjpeg","image/x-jps","image/vasa","image/naplps",
         "image/x-niff","image/x-portable-bitmap","image/x-pict", "image/x-pcx","image/x-portable-graymap",
         "image/x-xpixmap","image/png","image/x-quicktime","image/cmu-raster","image/x-cmu-raster",
      "image/vnd.rn-realflash", "image/x-rgb","	image/vnd.rn-realpix","image/tiff", "image/x-tiff", 
      "	image/x-xbitmap", "image/x-xbm","image/xbm","image/vnd.xiff","image/xpm","image/x-xwd",
      "	image/x-xwindowdump");
  if(in_array($ext_mime, $ext_array)){
?>
<img src="data:<?php echo $ext_mime.";base64,".$body ?>">
  <?php }else { 
      $content = base64_decode($body);
      $cntent_len = strlen($content);
     if($ext_mime == "text/plain")
       echo nl2br($content);
      else{
      /* header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.$file.'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . $cntent_len);*/
       header('Content-Description: File Transfer');
     header("Content-type: $ext_mime"); 
     header("Content-length: $cntent_len"); 
      header("Content-Disposition: attachment; filename=".$file);
     header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
     
    // header("Content-Disposition: attachment; filename=$file");
     
    ob_clean(); 
    echo $content;
    exit;
     }
   } 
               } else{
              
get_header();
get_template_part("menualign","none");
echo place_message();

?>

<div id="main-content" class="main-content">

	<div class="row-fluid data-content-outer objectmainContent" >
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
  //if no data is there 
   if($msg != ""){ ?>
    <div class="content">
    <h1 class="pageType"> <?php echo $msg; ?></h1>
    </div>                       
   <?php }else{
       
      
      
      
       
?>
 <div class="">
<div class="bPageTitle">
    
    <h1 class="headTitle"> <?php echo $plu_name; ?></h1>
    
</div>
     <div class="goBackDiv">
          <a  class="goBack buttonCss">Back</a>
     </div>
 </div> 

<div>
    <input type="hidden" id="objName" value="<?php echo $name; ?>" >
    <input type="hidden" id="objectId" value="<?php echo $object_id ?>" >
    <input type="hidden" id="objectType" value="<?php echo $object_type ?>" >
      <?php 
               ?>
             
    <!--<div class="pbHeader">
        <div class="pbTitle small-12">
            <h3 class="accountTitleH3"> <?php echo $object_name; ?>s Detail</h3>
        </div>
       
    </div> -->
    <!--<div class="pbBody">-->
               <!--<div class="pbSubsection">-->
               <div class="relatedlistshow" style="display:none"> 
                <div class="" data-equalizer="foo"  >
                       <div class=" large-6 columns " >
                            <div class="callout" data-equalizer-watch="foo">
                           <?php
                             $item_cnt = count($params_array);
                            $rep_cnt = ceil($item_cnt);
                           if($item_cnt>0)
                           {
                               $i=0; $j = 0;
                                $c_class = 'callout cal1';
                                if($item_cnt %2 >0)
                                    $item_cnt += 1;
                                for($j=0;$j<$item_cnt;$j){
                               //foreach($params_array as $val){
                                    $val = $key = $content = '';
                                    if(isset($params_array[$j]))
                                        $val = $params_array[$j];
                                   //if($key != "related_types"){
                                    if(isset($fields_array[$j]))
                                   $key = $fields_array[$j];
                                   //$c_class = 'panel';
                                  
                                   if($i == $rep_cnt)
                                   {
                                       $i=0;
                                       echo '</div></div><div class="large-6 columns">'
                                       . '<div class="callout" data-equalizer-watch="foo">';
                                       //$c_class = 'callout';
                                       $c_class = 'callout cal2';
                                   }
                                   $i++;
                                   $j++;
                                   
                                   if(isset($result->$key))
                                       $content = $result->$key;
                               ?>
                           <div class="row object-view-row clearfix" data-equalizer="bar"  >
                            <div class="small-3 columns labelColItem">
                                <div class="<?php echo $c_class ?>" data-equalizer-watch="bar">
                                    <label > <?php echo $val; ?> </label>
                                 </div>   
                            </div>
                        <div class=" small-9 columns labelColItem  oddDivObject">
                            <div class="<?php echo $c_class ?>" data-equalizer-watch="bar">
                            <span class="objectSpan"><?php echo nl2br($content); ?></span>
                            </div>
                        </div>
                        </div>
                               <?php 
                                   //} // if closed
                                   } //for closed
                           }// if closed ?>
                            
                        
                       </div>
                     
                   </div>
        
        </div>
      
    <!--</div>-->
    <!--<div class="pbBottomButtons">-->
      <!--  <div class="buttonWidth buttonEdit">
        <input type="button"  title="Edit" name="edit" data-id="<?php echo $contact_id ?>" class="btn editContact" value=" Edit ">
        </div>-->
     
    <!--</div>-->
     <!--<div class="buttonEdit row">
      <a  class="button buttonCss" data-id="<?php echo $contact_id ?>" class="btn editContact">Edit</a>
      </div>-->
        
<!--</div>-->
<!-- Begin RelatedListElement -->
<div  class="bRelatedList first" >
   <!-- <a name="0032000000ck5ZE_00Nw0000003EEmL_target"></a>-->
<!-- Begin ListElement -->

<!-- motif: Contact -->

<!-- WrappingClass -->
<div class="listRelatedObject Custom28Block">
    <?php
    if(count($related_types_array)>0){
        $relateds_types = implode(",",$related_types_array);
        $related_lists = implode(",",$related_list_array);   
        echo '<input type="hidden" id="relatedTypes" value="'.$relateds_types.'" >';
        echo '<input type="hidden" id="relatedLists" value="'.$related_lists.'" >';
        $i =0 ;
        foreach($related_types_array as $each){
            $rel_name = $related_list_array[$i];
            $i++;
    ?>
    <div class="bPageBlock">
        <div class="pbHeader">
            <div class="pbTitle small-12">
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
               </div>
               <div class="mobilerelatedlisthide" style="display:block">
               <table width="100%" style="border:0px;">
<tr width="100%"><td width="100%">                   <div class="" data-equalizer="foo"  >
                       <div class=" large-6 columns " >
                            <div class="callout" data-equalizer-watch="foo" style="height:0px;">
                           <?php
                             $item_cnt = count($params_array);
                            $rep_cnt = ceil($item_cnt/2);
                           if($item_cnt>0)
                           {
                               $i=0; $j = 0;
                                $c_class = 'callout cal1';
                              /*  if($item_cnt %2 >0)
                                    $item_cnt += 1;*/
                                for($j=0;$j<$item_cnt;$j){
                               //foreach($params_array as $val){
                                    $val = $key = $content = '';
                                    if(isset($params_array[$j]))
                                        $val = $params_array[$j];
                                   //if($key != "related_types"){
                                    if(isset($fields_array[$j]))
                                   $key = $fields_array[$j];
                                   //$c_class = 'panel';
                                  
                                   if($i == $rep_cnt)
                                   {
                                       $i=0;
                                       echo '</div></div><div class="large-6 columns">'
                                       . '<div class="callout" data-equalizer-watch="foo" style="height:0px;">';
                                       //$c_class = 'callout';
                                       $c_class = 'callout cal2';
                                   }
                                   $i++;
                                   $j++;
                                   
                                   if(isset($result->$key))
                                       $content = $result->$key;
                               ?>
                           <div class="row object-view-row clearfix" data-equalizer="bar"  >
                            <div class="small-3 columns labelColItem">
                                <div class="<?php echo $c_class ?>" data-equalizer-watch="bar">
                                    <label > <?php echo $val; ?> </label>
                                 </div>   
                            </div>
                        <div class=" small-9 columns labelColItem  oddDivObject">
                            <div class="<?php echo $c_class ?>" data-equalizer-watch="bar">
                            <span class="objectSpan"><?php echo nl2br($content); ?></span>
                            </div>
                        </div>
                        </div>
                               <?php 
                                   //} // if closed
                                   } //for closed
                           }// if closed ?>
                            
                        
                       </div>
                     
                   </div>
        
        </div></td></tr>
      
    <!--</div>-->
    <!--<div class="pbBottomButtons">-->
      <!--  <div class="buttonWidth buttonEdit">
        <input type="button"  title="Edit" name="edit" data-id="<?php echo $contact_id ?>" class="btn editContact" value=" Edit ">
        </div>-->
     
    <!--</div>-->
     <!--<div class="buttonEdit row">
      <a  class="button buttonCss" data-id="<?php echo $contact_id ?>" class="btn editContact">Edit</a>
      </div>-->
        
<!--</div>-->
<!-- Begin RelatedListElement -->
<tr width="100%"><td width="100%">
<div  class="bRelatedList first clear" style="">
   <!-- <a name="0032000000ck5ZE_00Nw0000003EEmL_target"></a>-->
<!-- Begin ListElement -->

<!-- motif: Contact -->

<!-- WrappingClass -->
<div class="listRelatedObject Custom28Block">
    <?php
    if(count($related_types_array)>0){
        $relateds_types = implode(",",$related_types_array);
        $related_lists = implode(",",$related_list_array);   
        echo '<input type="hidden" id="relatedTypes" value="'.$relateds_types.'" >';
        echo '<input type="hidden" id="relatedLists" value="'.$related_lists.'" >';
        $i =0 ;
        foreach($related_types_array as $each){
            $rel_name = $related_list_array[$i];
            $i++;
    ?>
    <div class="bPageBlock " style>
        <div class="pbHeader ">
            <div class="pbTitle small-12 ">
            <h3 class="accountTitleH3 "><?php echo $rel_name ?></h3>
        </div>
        <!--<div class="buttonWidth">
            <input type="button" title="New Case" data-contactid="<?php echo $contact_id; ?>" data-contactname="<?php echo $name; ?>"  class="btn newCase" value="New Case">
        </div>-->
       
        </div>
         <div  class="pbBody ">
            
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
</div></td></tr></table>
                   </div>
<!-- End RelatedListElement -->

               <?php }  //attachment else part is closed
               //} 
               
        
   ?>

<!-- Body events -->

<!-- End page content -->
</div>				

			</div><!-- #content -->
		</div><!-- #primary -->
	</div>
	
</div><!-- #main-content -->
</div>
<?php
get_footer();
}
