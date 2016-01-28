<?php
    session_start();
    include_once('../../../../../wp-config.php');
    include_once('../../functions.php');
    $type = (isset($_POST['object_type']))?trim($_POST['object_type']): "";
    $object_id = (isset($_POST['object_id']))?trim($_POST['object_id']): "";
    
    
$view = (isset($_POST['view']))?trim($_POST['view']): "";
$pageNum = (isset($_POST['PageNum']))?trim($_POST['PageNum']):0;

$is_fewer = (isset($_POST['is_fewer']))?trim($_POST['is_fewer']):1;
$is_more = (isset($_POST['is_more']))?trim($_POST['is_more']):0;

$field = (isset($_POST['field']))?trim($_POST['field']):"Name";
$sort_type = (isset($_POST['sort_type']))?trim($_POST['sort_type']):"";
$alpha_type = (isset($_POST['alpha_type']))?trim($_POST['alpha_type']):"";

    list($access_token,$instance_url) = get_connection_sales();
    
    $get_param = "";
    if($pageNum !== "")
    {
        $get_param .= "&PageNum=".$pageNum;
    }
    if($field != "" && $sort_type != "")
        $get_param .= '&sorting='.$field."+".$sort_type;
    $get_param .= '&type='.$alpha_type;
   
    
    /** Integrate the salesforce **/
        list($access_token,$instance_url) = get_connection_sales();
        global $login_time_url;
        $url = $instance_url.$login_time_url;
        $object_array = array("method" => "getObjectDetails",
                                "Type" =>$type );
        
        $json_response = post_request($url, $access_token, json_encode($object_array),"POST");
        $response_array = explode("chunked",$json_response);
    if(isset($response_array[1]))
    $json_response = $response_array[1];
 //}
 $result = json_decode($json_response); 
 $result = json_decode($result); 
 
   /* $result = array(
        array("first_name" => "xxx", "last_name" => "xy" ),
        array("first_name" => "xxxy", "last_name" => "yxy" ),
        array("first_name" => "xyxy", "last_name" => "xxy" )
        );*/
     
     
     if($result == null)
         $result = array();
     $total_recs = 0;
     if(isset($response->NumberofRec))
         $total_recs = $response->NumberofRec;
     else $total_recs = count($result);
  /*   $i = 1;
     $result_1 = $result;
     if($pageNum >0)
     {
         for($j=0;$j<$pageNum;$j++)
         {
             unset($result_1[$j]);
         }
         $result_1 = array_values($result_1);
     }
   //  var_dump($result);
   //  var_dump($result_1);
     $result = get_data_rec_pages($result_1,0,1,'');*/
     
   //  if(!$is_more && $result != null) 
     //   $result = get_data_rec_pages($result,0,50,'');
     
      $start_pos = $end_pos = 0;
     if(isset($response->StartPos))
$start_pos = $response->StartPos;
     if(isset($response->EndPos))
$end_pos = $response->EndPos;
     $params_array = array();
     if(isset($result[0])){
         $fields =(array) $result[0];
        $params_array = array_keys($fields); 
        $key = array_search('attributes', $params_array);
        unset($params_array[$key]);
        $key = array_search('Id', $params_array);
        unset($params_array[$key]);
        $params_array = array_values($params_array);
     }
       echo json_encode(array("objectList" => $result,
     "NumberofRec" =>  $total_recs,
     "pageRecords" => count($result),
            "StartPos" =>$start_pos,
        "EndPos" => $end_pos,
          "fields" => $params_array
        ));exit;

  
