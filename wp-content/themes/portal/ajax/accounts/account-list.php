<?php
    session_start();
    include_once('../../../../../wp-config.php');
    include_once('../../functions.php');
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
     $method_url = "";
    if($view ==1)
    {  
        global $account_active_accounts_url;
        $method_url = $account_active_accounts_url;
    }
    else if($view ==2)
    {  
        global $account_list_url;
        $method_url = $account_list_url;
    }  
    
    $url = $instance_url.$method_url.$get_param;
    $json_response = connects_salesforce($url,array(),FALSE,$access_token,"get");
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
    if(isset($response->Accountinfo))
    $result = $response->Accountinfo;
     else $result = $response;
     if(!$is_more && $result != null) 
        $result = get_data_rec_pages($result,0,50,'');
     
     if($result == null)
         $result = array();
     $total_recs = 0;
     if(isset($response->NumberofRec))
         $total_recs = $response->NumberofRec;
      $start_pos = $end_pos = 0;
     if(isset($response->StartPos))
$start_pos = $response->StartPos;
     if(isset($response->EndPos))
$end_pos = $response->EndPos;
     
       echo json_encode(array("accountList" => $result,
     "NumberofRec" =>  $total_recs,
     "pageRecords" => count($result),
            "StartPos" =>$start_pos,
        "EndPos" => $end_pos
        ));exit;

  
