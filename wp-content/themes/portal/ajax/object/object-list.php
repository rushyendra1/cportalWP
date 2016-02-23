<?php
    session_start();
    include_once('../../../../../wp-config.php');
    include_once('../../functions.php');
    $type = (isset($_POST['object_type']))?trim($_POST['object_type']): "";
    $object_id = (isset($_POST['object_id']))?trim($_POST['object_id']): "";
    $parent_obj_type = (isset($_POST['parent_obj_type']))?trim($_POST['parent_obj_type']): "";
    
    
$view = (isset($_POST['view']))?trim($_POST['view']): "";
$pageNum = (isset($_POST['PageNum']))?trim($_POST['PageNum']):1;
$page_size = (isset($_POST['length']))?trim($_POST['length']):1;

$field = (isset($_POST['field']))?trim($_POST['field']):"Name";
$sort_type = (isset($_POST['sort_type']))?trim($_POST['sort_type']):"";
$alpha_type = (isset($_POST['alpha_type']))?trim($_POST['alpha_type']):"";

    list($access_token,$instance_url) = get_connection_sales();
    
    /** Integrate the salesforce **/
        list($access_token,$instance_url) = get_connection_sales();
        global $login_time_url;
        $url = $instance_url.$login_time_url;
        $object_array = array("method" => "getObjectDetails",
                                "Type" =>$type );
        if($pageNum !== "")
        {
            $object_array['PageNo'] = $pageNum;
            $object_array['PageSize'] = $page_size;
        } 
        if($field != "" && $sort_type != "")
        {
            $object_array['FldName'] = $field;
            $object_array['Srt'] = strtoupper($sort_type);
        }
        if($alpha_type != "")
        {
            $object_array['chr'] = strtolower($alpha_type);
        }
        global $user_ID;
        if($user_ID)
         $object_array['userId'] =$user_ID;
        if($object_id != "")
        {
            $object_array['RecordId'] = $object_id;
            $object_array['RelatedToapi'] = $parent_obj_type;
        }
      //  echo $url;
       //echo json_encode($object_array);
        $json_response = post_request($url, $access_token, json_encode($object_array),"POST");
        //var_dump($json_response);
        $response_array = explode("chunked",$json_response);
    if(isset($response_array[1]))
    $json_response = $response_array[1];
 //}
 $result = json_decode($json_response); 


 if(isset($result[0]->errorCode))
 {
        //var_dump($response);
        $admin_email = get_option("admin_email");
        mail($admin_email,$response[0]->errorCode, $response[0]->message );
        echo json_encode(array("errorCode" => "Request Message", 
                "message" => "Something event wrong. Please contact your system Administrator."
                ));
        
        exit;
    }
      $response = json_decode($result); 
      /*if(isset($response->errorCode))
      {
            echo json_encode(array("errorCode" => "Request Message", 
                "message" => $response->msg
                ));
             exit;
      }*/
      $result =  $response->Data->Data;
     if($result == null)
         $result = array();
     $total_recs = 0;
     if(isset($response->Count))
         $total_recs = $response->Count;
     else $total_recs = count($result);
     $params_array = $fields_array = array();
     if(isset($response->Fields->Fields))
         $params_array = $response->Fields->Fields;
     if(isset($response->ApiFields->ApiFields))
         $fields_array = $response->ApiFields->ApiFields;
     
      
     $page_records = 0;
     if(isset($result))
     $page_records = count($result);
       echo json_encode(array("objectList" => $result,
     "NumberofRec" =>  $total_recs,
     "pageRecords" => $page_records,
          "fields" => $params_array,
            "api_fields" => $fields_array
        ));exit;

  
