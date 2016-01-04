<?php
session_start();
//include_once 'init.php';
//include_once 'config.php';

/* do after words $max_login_attempts = 0;
$result_query = @pg_query($db,"SELECT min_pass_len,max_pass_len,max_login_attempts"
                            . " FROM settings"
                           . " WHERE id=1");
$result = @pg_fetch_assoc($result_query);
if(is_array($result) && count($result)>0)
{
  $max_login_attempts = $result['max_login_attempts'] ;
}
$max_login_attempts +=1;

if(!isset($_SESSION['forgot-times']))
{
    $_SESSION['forgot-times'] =1;
}  else {
    $_SESSION['forgot-times']+=1;
}
if($_SESSION['forgot-times'] >=$max_login_attempts)
{
    echo "If you forgot your password reset by click on <a href='forgot.php' class='forgot-link'>Forgot Password</a> link.";
    exit;
}*/
 $user = (isset($_POST['username']))?$_POST['username']: "";
$pass = (isset($_POST['password']))?$_POST['password']: "";
try{


$user_query = @pg_query($db," SELECT id, name,lname "
        . " FROM contacts"
        . " WHERE email='".$user."'"
        . " and password='".md5($pass)."' and allow_login=1 and status=1");
$user_info = @pg_fetch_assoc($user_query);

if($user_info && count($user_info)>0)
{
    //session_start();
    $_SESSION['user'] = array("id"=> $user_info['id'],
        "name"=> $user_info['name'],
        "lname"=> $user_info['lname']);
    
    
}else{
    echo "Username/E-mail or Password is incorrect.";
}
}  catch (Exception $e)
{
    echo "Internal server error";
}
?>