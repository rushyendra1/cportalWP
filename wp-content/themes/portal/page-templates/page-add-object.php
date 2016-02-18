<?php
/**
 * Template Name: Page Add Object 
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
    // if(isset($result->data->is_Delete))
     //$is_delete = $result->data->is_Delete; 
     //if(isset($result->data->is_View))
     //$is_view = $result->data->is_View; 
     
         
     
?>
<div id="main-content" class="main-content ">
    <div class="row-fluid data-content-outer " >
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
                    <div class="row toggle-full-width">
                        <div class="bPageTitle">

                            <h1  class="pageType noSecondHeader headTitle" >Add <?php echo $obj_name; ?></h1>

                          
                        </div>    
                        <div class="goBackDiv">
                            <a  class="goBack buttonCss">Back</a>
                        </div>
                    </div>
                    <?php if(!$is_create){ ?>
                    <div class="row-fluid">
                        <h1> You have enough previleges to access this page</h1>
                    </div>
                    <?php }else{
                        /*** Connect the salesforce ***/
                    list($access_token,$instance_url) = get_connection_sales();
                    global $login_time_url;
                    $url = $instance_url.$login_time_url;
                        $object_array = array("method" => "addRecord",
                                "Type" =>$type);  
  //echo json_encode($object_array);
   $json_response = post_request($url, $access_token, json_encode($object_array),"POST");
    $response = array();
    $response_array = explode("chunked",$json_response);
    if(isset($response_array[1]))
    $json_response = $response_array[1];
   $response = json_decode($json_response);
   
   if(isset($response[0]->errorCode)){ ?>
    <div class="content">
    <h1 class="pageType"> <?php echo $response[0]->message; ?></h1>
    </div>                       
   <?php } else{
       $response = json_decode($response);
   
       if(isset($response->errorCode)){ ?>
    <div class="content">
    <h1 class="pageType"> <?php echo $response->msg; ?></h1>
    </div>                       
   <?php } else{
                    if(isset($response->Fields->Fields))
                        $array_fields = $response->Fields->Fields;
                        //$array_fields = array("fields1","fields2","fields3","fields4");
                    if(isset($response->ApiFields->ApiFields))
                        $array_labels = $response->ApiFields->ApiFields;
                        //$array_labels = array("label1","label2","label3","label4");
                        ?>
                    
                        <div class="row">
                        
                            <?php 
                            $i =0; $j =0;
                            foreach($array_fields as $each){
                                $label = '';
                                if(isset($array_labels[$j]))
                                $label = $array_labels[$j];
                                $place_holder = "Please enter ".$label; 
                                ?>
                            <div class="large-6 columns">
        <div class="row collapse prefix-radius">
        <div class="small-3 columns">
          <span class="prefix"><?php echo $label; ?></span>
        </div>
        <div class="small-9 columns">
          <input type="text" placeholder="<?php echo $place_holder; ?>" id="<?php echo $each; ?>">
        </div>
      </div>
    </div>
                            <?php
                            
                            if($i == 1 )
                            {
                                $i=0;
                                echo '</div><div class="row">';
                            }else $i++;
                            $j++;
                            } ?>                     
    
  </div>
                    
   <?php }  //3 else
   } //2 else
                            } //1 else
                            ?>                           
                    <!-- Body events -->
                    <!-- End page content -->
                </div>
                <!-- Account Information end here -->
            </div><!-- #content -->
        </div><!-- #primary -->
    </div>
<!--</div>--><!-- #main-content -->

<?php
get_footer();
