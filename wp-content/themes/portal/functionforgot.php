if(mysql_num_rows($result))
{
$code=rand(100,999);
$message="You activation link is: http://customerportal.com/forgot.php?email=$email&code=$code
mail($email, "Reset Password Link", $message);
echo "Email sent";
}
else
{
echo "No user exist with this email id";
}