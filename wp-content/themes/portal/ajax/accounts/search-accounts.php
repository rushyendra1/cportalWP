<?php
    session_start();
    include_once('../../../../../wp-config.php');
    include_once('../../functions.php');
    $search_account = (isset($_POST['search']))?trim($_POST['search']): "";
    $search_type = (isset($_POST['search_type']))?trim($_POST['search_type']): "";
    
    $term = (isset($_GET['term']))?trim($_GET['term']): "";
    if($search_account == "")
        $search_account = $term;
    global $search_account_url;
    global $search_account_all_flieds_url;
        $url = $search_account_url;
    if($search_type == "all")
        $url = $search_account_all_flieds_url;
    list($access_token,$instance_url) = get_connection_sales();
    $get_param = '';
    if($search_account != "") 
        $get_param = $search_account;
    $url = $instance_url.$url.$get_param;
    $json_response = connects_salesforce($url,array(),FALSE,$access_token,"get");
    $response = json_decode($json_response);
    $response = json_decode($response);
    $result = array(); 
    if($term != ""){
     foreach($response as $each)
     {
         $result[] = array("id" => $each->Id, "label" => $each->Name, "value" => $each->Id );
                      
     }
    //$result = array(array("id" => 312, "label" => "account nm", "value" =>312),array("id" => 321, "label" => "sdsdsd", "value" =>321));

echo json_encode($result); exit;
    }else{
        $result = $response;
    echo json_encode(array("accountList" => $result,
     "NumberofRec" =>  $response->NumberofRec,
     "pageRecords" => count($result)
        ));exit;
    }
  
