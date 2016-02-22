<html >
<head>
	
	<title>US Census Population Change Calculator</title>
</head>
<body>
<style>
input[type=submit] {
    width: 7em;  height: 1.5em;
	background-color:#66ff33;
}
</style>
<h1 style="color:blue;"align="center" >US Census Population Change Calculator</h1>

<?php
$SELECT_Year = array
 (
 array(1790,number_format("3929214")),
 array(1800,number_format("5236631")),
 array(1810,number_format("7239881")),
 array(1820,number_format("9638453")),
 array(1830,number_format("12866020")),
 array(1840,number_format("17069453")),
 array(1850,number_format("23191876")),
 array(1860,number_format("31443321")),
 array(1870,number_format("38558371")),
 array(1880,number_format("49371340")),
 array(1890,number_format("62979766")),
 array(1900,number_format("76212168")),
 array(1910,number_format("92228531")),
 array(1920,number_format("106021568")),
 array(1930,number_format("123202660")),
 array(1940,number_format("132165129")),
 array(1950,number_format("151325798")),
 array(1960,number_format("179323175")),
 array(1970,number_format("203211926")),
 array(1980,number_format("226545805")),
 array(1990,number_format("248709873")),
 array(2000,number_format("281421906")),
 array(2010,number_format("308745538"))
 );
$SELECT_Year2 = array
 (
 array(1790,number_format("3929214")),
 array(1800,number_format("5236631")),
 array(1810,number_format("7239881")),
 array(1820,number_format("9638453")),
 array(1830,number_format("12866020")),
 array(1840,number_format("17069453")),
 array(1850,number_format("23191876")),
 array(1860,number_format("31443321")),
 array(1870,number_format("38558371")),
 array(1880,number_format("49371340")),
 array(1890,number_format("62979766")),
 array(1900,number_format("76212168")),
 array(1910,number_format("92228531")),
 array(1920,number_format("106021568")),
 array(1930,number_format("123202660")),
 array(1940,number_format("132165129")),
 array(1950,number_format("151325798")),
 array(1960,number_format("179323175")),
 array(1970,number_format("203211926")),
 array(1980,number_format("226545805")),
 array(1990,number_format("248709873")),
 array(2000,number_format("281421906")),
 array(2010,number_format("308745538"))
 );
echo '<form action="#" method="post">';
echo "Year 1: ";
echo '<select name="year">';
echo '<option value="">' . 'Select' . '</option>';
foreach ($SELECT_Year as $key => $value) {
    echo '<option value="' . $value[1] . '">' . $value[0] . '</option>';
}
echo '</select>'."<br>"."<br>";
echo "Year 2: ";
echo '<select name="year2">';
echo '<option value="">' . 'Select' . '</option>';
foreach ($SELECT_Year2 as $key => $value2) {
    echo '<option value="' . $value2[1] . '">' . $value2[0] . '</option>';
}
echo '</select>'."<br>"."<br>";
echo '<input type="submit" name="submit" value="Submit" />';
echo '</form>'."<br>";

if(isset($_POST['submit'])){
$selected_val = $_POST['year']; 
$selected_val2 =  $_POST['year2'];  
$selected_val3 = str_replace(",","", $_POST['year']); 
$selected_val4 = str_replace(",","", $_POST['year2']); 
foreach ($SELECT_Year as $key => $value) {
	if($value[1]==$selected_val)
echo "Population". $value[0].": " .$selected_val."<br>";
}
foreach ($SELECT_Year2 as $key => $value2) {
	if($value2[1]==$selected_val2)
echo "Population".$value2[0].": " .$selected_val2."<br>";
}
$sum_total = intval($selected_val3) - intval($selected_val4);

if($selected_val == "" && $selected_val2 ==0 )
{
	echo "please enter years";
}
else if($sum_total < 0)
{
	echo '<p style=color:#00b300;>';
	echo "Population Increased by :".number_format(abs($sum_total))."<br>";
	echo "</p>";
}
else if($sum_total > 0)
{
	echo '<p style=color:red;>';
	echo "Population Decreased by :".number_format(abs($sum_total))."<br>";
	echo "</p>";
}
else if($sum_total == 0 )
{
	echo "<br>";
	echo " No Population change ";
}

}
?>
</body>
</html>
