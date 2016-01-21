<?php
$user = array();
global $wpdb;
global $table_prefix;
if(!isset($wpdb))
{
    include_once('../wp-config.php');
    include_once('../wp-load.php');
    include_once('../wp-includes/wp-db.php');
}
try{
    
$first_name = (isset($_POST['first_name']))?check_null(trim($_POST['first_name'])): "";

$last_name = (isset($_POST['last_name']))?check_null(trim($_POST['last_name'])): "";
$salutation = (isset($_POST['salutation']))?check_null(trim($_POST['salutation'])): "";
//$user['company'] = (isset($_POST['company']))?$_POST['company']: "";

$phone = (isset($_POST['phone']))?check_null(trim($_POST['phone'])): "";
$mobile = (isset($_POST['mobile']))?check_null(trim($_POST['mobile'])): "";
$email = (isset($_POST['email']))?check_null(trim($_POST['email'])): "";
$alt_email = (isset($_POST['alt_email']))?check_null(trim($_POST['alt_email'])): "";
 
$street = (isset($_POST['street']))?check_null(trim($_POST['street'])): "";
$city = (isset($_POST['city']))?check_null(trim($_POST['city'])): "";
$state = (isset($_POST['state']))?check_null(trim($_POST['state'])): "";
$country = (isset($_POST['country']))?check_null(trim($_POST['country'])): "";
$zip = (isset($_POST['zipcode']))?check_null(trim($_POST['zipcode'])): "";
 
$message = (isset($_POST['message']))?check_null(trim($_POST['message'])): "";
 //$user['password'] = (isset($_POST['password']))?md5($_POST['password']): "";
//$user['allow_login'] = 1;
//$user['allow_admin'] = 0;
//$user['status'] = 1;

if($email != "" && !preg_match('/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/', $email))
{
     echo json_encode(array("errorCode" => "Failure", "message" => "Please enter valid email address"));
      exit;
}

$con = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
if(!is_object($con))
{
    echo json_encode(array("errorCode" => "Failure", "message" => "Connection failure"));
    exit;
}
//$db = mysqli_select_db($con,"waste_collection");
$db = mysqli_select_db($con,DB_NAME);
if(!$db){
    echo json_encode(array("errorCode" => "Failure", "message" => "Database is not there"));
    exit;
}
//Check the email existed or not 
 $email_str = "SELECT ID FROM"
        . " ".$table_prefix."users "
        . " WHERE user_email='".$email."'";
$user_exist_results = $wpdb->get_results($email_str);

if(is_array($user_exist_results) && count($user_exist_results)>0)
{
   echo json_encode(array("errorCode" => "Failure", "message" => "E-mail is already existed"));
   exit;

}

$uname = $email;
$nice_name = $first_name." " .$last_name;

   $sql = 'INSERT INTO '.$table_prefix.'users(user_nicename,user_login,user_email,is_deactive)
 values("'.$nice_name.'","'. $uname.'","'.$email.'",0)';
$res = mysqli_query($con,$sql);

if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}

$user_id = mysqli_insert_id($con);
 
 $password = generate_strong_password();
 $blog_title = get_option("blogname");
 $email_info = $wpdb->get_row("SELECT subject,content "
                             . " FROM ".$table_prefix."email_template"
                             . " WHERE name='authentication'");
 $subject = $email_info->subject;
 $msg  = $email_info->content;
 $url = get_site_url();
 $msg = str_replace("!!URL!!",$url, $msg );
 $msg = str_replace("!!UserName!!",$uname, $msg );
 $msg = str_replace("!!PassWord!!",$password, $msg );
  /*$msg = "<h3>Your Authentication Details</h3><table cellspacing='0' cellpadding='0'>"
          . "<tr><td colspan='2'>Thank you for registering for " .$blog_title."</td></tr>"
         . "<tr><td style='width:150px'>Access Url:</td>"
         . "<td><a href='".get_site_url()."'>".get_site_url()."</a></td></tr>"
         . "<tr><td style='width:150px'>User Name:</td>"
         . "<td>".$uname."</td></tr>"
         . "<tr><td style='width:150px'>Password:</td>"
         . "<td>".$password."</td></tr>"
         . "</table>";*/
 
 $admin_email = get_option('admin_email');
 //Send the password to respect email
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  $headers  .= 'From: '.$admin_email."\r\n";
  @mail($email, $subject, nl2br($msg),$headers);
 //Set the password
 wp_set_password($password,$user_id);
 $site = get_site_url();
 $site = str_replace("http://", "", $site);
 $site = str_replace("https://", "",$site);
 //source domain
 $insert_src = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('source_domain','','".$user_id."')";
$res = mysqli_query($con,$insert_src);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}

//displayname
 $insert_displayname = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('display_name','". $nice_name."','".$user_id."')";
$res = mysqli_query($con,$insert_displayname);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
 //nickname
 $insert_nickname = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('nickname','". $nice_name."','".$user_id."')";
$res = mysqli_query($con,$insert_nickname);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//Salutation
$insert_salutation = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('salutation','". $salutation."','".$user_id."')";
$res = mysqli_query($con,$insert_salutation);
if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//First Name
$insert_first_name = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('first_name','". $first_name."','".$user_id."')";
$res = mysqli_query($con,$insert_first_name);
if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//Last Name
$insert_last_name = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('last_name','". $last_name."','".$user_id."')";
$res = mysqli_query($con,$insert_last_name);
if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//description
$insert_desc = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('description','". $description."','".$user_id."')";
$res = mysqli_query($con,$insert_desc);
if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//Phone
$insert_phone = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('phone','". $phone."','".$user_id."')";
$res = mysqli_query($con,$insert_phone);
if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//Mobile
$insert_mobile = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('mobile','". $mobile."','".$user_id."')";
$res = mysqli_query($con,$insert_mobile);
if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//alternate email
$insert_alt_email = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('alt_email','". $alt_email."','".$user_id."')";
$res = mysqli_query($con,$insert_alt_email);
if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
}

//user previliges
$cap = 'a:1:{s:10:"subscriber";b:1;}';
$insert_capbilites = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('wp_capabilities','". $cap."','".$user_id."')";
$res = mysqli_query($con,$insert_capbilites);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//address 
$insert_addr = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('addr1','". $address."','".$user_id."')";
$res = mysqli_query($con,$insert_addr);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//zip
$insert_zip = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('zip','". $zip."','".$user_id."')";
$res = mysqli_query($con,$insert_zip);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//city 
$insert_city = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('city','". $city."','".$user_id."')";
$res = mysqli_query($con,$insert_city);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//state 
$insert_state = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('state','". $state."','".$user_id."')";
$res = mysqli_query($con,$insert_state);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//country 
$insert_country = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('country','". $country."','".$user_id."')";
$res = mysqli_query($con,$insert_country);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//user_id 
$insert_user_id = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('user_id','". $id."','".$user_id."')";
$res = mysqli_query($con,$insert_user_id);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}
//owner_name
$insert_owner_name = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('owner_name','". $owner_name."','".$user_id."')";
$res = mysqli_query($con,$insert_owner_name);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}

//act_nm 
$insert_act_nm = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('account_name','". $account_name."','".$user_id."')";
$res = mysqli_query($con,$insert_act_nm);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}

//act_id 
$insert_act_id = "INSERT INTO ".$table_prefix."usermeta(meta_key, meta_value,user_id) values('account_id','". $account_id."','".$user_id."')";
$res = mysqli_query($con,$insert_act_id);
 	if(!$res){
    echo json_encode(array("errorCode" => "Failure", "message" => "Insertion Query Failure"));
    exit;
    
}

echo json_encode(array(
    "errorCode" => "Success",
    "message" =>"", 
    "userID" => $user_id,
     "createdDateTime" => date("c", time())));
exit;
//echo $user_id; 
}catch(Exception $e)
{
    echo json_encode(array("errorCode" => "Failure", "message" => "Connection failure"));
}
//first_name=xxx&last_name=yyy&username=zzz&email=ttt
function generate_strong_password($length = 9, $add_dashes = false, $available_sets = 'luds')
{
    $sets = array();
    if(strpos($available_sets, 'l') !== false)
        $sets[] = 'abcdefghjkmnpqrstuvwxyz';
    if(strpos($available_sets, 'u') !== false)
        $sets[] = 'ABCDEFGHJKMNPQRSTUVWXYZ';
    if(strpos($available_sets, 'd') !== false)
        $sets[] = '23456789';
    if(strpos($available_sets, 's') !== false)
        $sets[] = '!@#$%&*?+-_()={}{}:;,<>.~`^';

    $all = '';
    $password = '';
    foreach($sets as $set)
    {
        $password .= $set[array_rand(str_split($set))];
        $all .= $set;
    }

    $all = str_split($all);
    for($i = 0; $i < $length - count($sets); $i++)
        $password .= $all[array_rand($all)];

    $password = str_shuffle($password);

    if(!$add_dashes)
        return $password;

    $dash_len = floor(sqrt($length));
    $dash_str = '';
    while(strlen($password) > $dash_len)
    {
        $dash_str .= substr($password, 0, $dash_len) . '-';
        $password = substr($password, $dash_len);
    }
    $dash_str .= $password;
    return $dash_str;
}
function check_null($given_str)
{
    if($given_str == "null") $given_str = '';
    return $given_str;
}


?>