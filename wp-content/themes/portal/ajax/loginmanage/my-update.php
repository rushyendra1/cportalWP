<?php
 
 
global $wpdb;
global $table_prefix;
if (!isset($wpdb)) {
    include_once('../../../../../wp-config.php');
    include_once('../../../../../wp-load.php');
    include_once('../../../../../wp-includes/wp-db.php');
    // include_once('../../../../../wp-includes/class-phpass.php');
}
$users = array();
 $id = (isset($_POST['id']))?trim($_POST['id']): 0;
 $salutation = (isset($_POST['salutation']))?trim($_POST['salutation']): "";
 $fname = (isset($_POST['name']))?trim($_POST['name']): "";
 $lname = (isset($_POST['last_name']))?trim($_POST['last_name']): "";
 $name = $salutation." ".$fname. " ".$lname;
  $users['user_nicename'] = $name;
  $users['display_name'] = $name;
 
 $phone = (isset($_POST['phone']))?trim($_POST['phone']): "";
 $mobile = (isset($_POST['mobile']))?trim($_POST['mobile']): "";
 //$user['email'] = ($_POST['email'])?$_POST['email']: "";
 $alt_email = (isset($_POST['alt_email']))?trim($_POST['alt_email']): "";
 
 
 $street = (isset($_POST['street']))?trim($_POST['street']): "";
 $city = (isset($_POST['city']))?trim($_POST['city']): "";
 $state = (isset($_POST['state']))?trim($_POST['state']): "";
 $country = (isset($_POST['country']))?trim($_POST['country']): "";
 $zipcode = (isset($_POST['zipcode']))?trim($_POST['zipcode']): "";
 
 $message = (isset($_POST['message']))?trim($_POST['message']): "";
//update the users table
$wpdb->update($table_prefix."users", $users, array("ID" => $id));

  //update the first name
   $wpdb->update($table_prefix."usermeta", array("meta_value" => $fname),
           array("user_id" =>$id, "meta_key" => "first_name"));  
   //update the last name
    $wpdb->update($table_prefix."usermeta", array("meta_value" => $lname),
           array("user_id" =>$id, "meta_key" => "last_name"));  
  //update the salutation
     $wpdb->update($table_prefix."usermeta", array("meta_value" => $salutation),
           array("user_id" =>$id, "meta_key" => "salutation"));  
     //nickname
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $name),
           array("user_id" =>$id, "meta_key" => "nickname"));  
     //display name
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $name),
           array("user_id" =>$id, "meta_key" => "display_name"));
      //description
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $message),
           array("user_id" =>$id, "meta_key" => "description"));
    
      //phone
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $phone),
           array("user_id" =>$id, "meta_key" => "phone"));
    
      //mobile 
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $mobile),
           array("user_id" =>$id, "meta_key" => "mobile"));
    
      //Alternate Email 
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $alt_email),
           array("user_id" =>$id, "meta_key" => "alt_email"));
 
      //street 
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $street),
           array("user_id" =>$id, "meta_key" => "addr1"));
 
      //zip 
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $zipcode),
           array("user_id" =>$id, "meta_key" => "zip"));
 
      //city 
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $city),
           array("user_id" =>$id, "meta_key" => "city"));

      //state 
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $state),
           array("user_id" =>$id, "meta_key" => "state"));
 
      //country 
      $wpdb->update($table_prefix."usermeta", array("meta_value" => $country),
           array("user_id" =>$id, "meta_key" => "country"));
    //integrate into salesforce
       


?>