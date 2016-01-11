<?php 
error_reporting(0);
$email=$trim($_POST['email']);
if($_POST['submit']=='Submit')
{
global $wpdb;
global  $table_prefix;
$query="select * from ".$table_prefix."users where user_email='".$email."'";
$res = $wpdb->get_row($query);
var_dump($res);
if($res_rows($result) > 0)
{
echo "User exist";
}
else
{
echo "No user exist with this email id";
}
}
?>
<form action="forgot.php" method="post">
Enter you email ID: <input type="text" name="email">
<input type="submit" name="submit" value="Submit">
</form>
