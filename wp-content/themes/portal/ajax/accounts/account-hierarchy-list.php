<?php
    session_start();
    include_once('../../../../../wp-config.php');
    include_once('../../functions.php');
$account_id = (isset($_POST['account_id']))?trim($_POST['account_id']): "";
/*$pageNum = (isset($_POST['PageNum']))?trim($_POST['PageNum']):0;
$is_fewer = (isset($_POST['is_fewer']))?trim($_POST['is_fewer']):1;
$is_more = (isset($_POST['is_more']))?trim($_POST['is_more']):0;
$field = (isset($_POST['field']))?trim($_POST['field']):"Name";
$sort_type = (isset($_POST['sort_type']))?trim($_POST['sort_type']):"";*/
/** Unset the Session **/
/*if(isset($_SESSION['response']) && $view != $_SESSION['response']['view'])
{
   unset($_SESSION['response']);
}*/

//if(!isset($_SESSION['response'])){

    list($access_token,$instance_url) = get_connection_sales();
    global $account_hierarchy_url;
     $url = $instance_url.$account_hierarchy_url.$account_id;
    
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
    $result = $own_res = $child_res =   array(); 
    
    if(isset($response->AccountparentDetails))
    {
        $parent  =  $response->AccountparentDetails;
        if($parent == null)
            $parent = array();
        $result[] = $parent;
    }
    if(isset($response->AccountDetails))
    {
        $own_res  =  $response->AccountDetails;
        if($own_res == null)
            $own_res = array();
        $result[] = $own_res;
    }
    if(isset($response->ListAccountDetails))
    {
        $child_res  = $response->ListAccountDetails;
        if($child_res == null)
            $child_res = array();
        
        if(count($child_res)>0)
        {
            foreach($child_res as $each)
            {
                $result[] = $each;
            }
        }
        
    }
     
    if($result == null)
        $result = array();
    
    $total_count = count($response);
    if(isset($response->NumberofRec))
        $total_records = $response->NumberofRec;
    else 
        $total_records = count($result);

    
    /*$_SESSION['response'] = array("result" => $response,
                              'response_cnt' => $total_count,
                                'id' =>$id);*/
    
/*}else{
     $response = $_SESSION['response']['result'];
    $total_count = $_SESSION['response']['response_cnt'];
}*/
//$result = get_data_rec_pages($response,$start,$length,"stores");
    
    echo json_encode(array("accountList" => $result,
     "NumberofRec" =>  $total_records,
     "pageRecords" => count($result)
        ));exit;

  
