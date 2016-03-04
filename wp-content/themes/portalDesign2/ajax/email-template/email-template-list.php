<?php
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
}
$start = (isset($_POST['page']))?$_POST['page']:1;
$length = (isset($_POST['length']))?$_POST['length']:10;
$search = (isset($_POST['search']))?$_POST['search']:"";
$sort = (isset($_POST['sort']))?$_POST['sort']:"id";
$sort_by = (isset($_POST['sort_by']))?$_POST['sort_by']:"desc";
$start_1 = paginate_support($start,$length);
   $cond = '';
  if($search != "")
      $cond = " WHERE  name LIKE '%".$search."%' ";
  $email_data = array();
  $email_res = $wpdb->get_results( "SELECT id"
                            . " FROM ".$table_prefix."email_template ".$cond
                            . " order by ".$sort. " ".$sort_by
                        );
  
  $records_total =  count($email_res);
 $records_filter = 0;
 //$records_total = 15;
if($records_total>0){
    
    $email_array = $wpdb->get_results("SELECT id,name,content,subject"
                                 . " FROM ".$table_prefix."email_template " 
                                .$cond. " order by ".$sort. " ".$sort_by
                                . " LIMIT ".$length. " OFFSET ".$start_1);
    $records_filter = count($email_array);
    
 foreach($email_array  as $each)
 {
      
           array_push($email_data, array("name" => ucfirst($each->name),
                        "content" => ucfirst(nl2br($each->content)), 
                         "subject" =>ucfirst($each->subject),
                        'id' => $each->id,
                   ));                  
 }
}
echo json_encode(array("draw" =>1,
               "recordsTotal" =>  $records_total,
  "recordsFiltered" => $records_total,
  "data" => $email_data));
?>