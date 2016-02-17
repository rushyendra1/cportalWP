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
                        <h1> You have enough previliages to access this page</h1>
                    </div>
                    <?php }else{
                        $array_fields = array("fields1","fields2","fields3","fields4");
                        $array_labels = array("label1","label2","label3","label4");
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
                    
                    <?php } ?>                           
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
