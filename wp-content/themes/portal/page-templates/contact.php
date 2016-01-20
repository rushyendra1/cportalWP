<?php
/**
 * Template Name: Page Contact
 *
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */

//redirect_to_login();
get_header();

 ?>

 
<section id="page">
<header id="pageheader" class="normalheader">
<h2 class="sitedescription">
  </h2>
</header>

<section id="contents">

<article class="post">
  <header class="postheader">
  <h2>Contact us</h2>
  </header>
  <section class="entry">
  <?php
  if(isset($_POST["name"]))
  {
  include("conection.php");
$sql="INSERT INTO contact (name, emailid, contactno, subject, message) VALUES ('$_POST[name]','$_POST[email]','$_POST[contact]','$_POST[subject]','$_POST[message]')";
if (!mysql_query($sql,$con))
  {
  die('Error in mysql: ' . mysql_error());
  }
  else
  {
echo "Mail sent Successfully...";
  }
  }
  else
  {
	  ?>
  
<form name="form1" method="post" action="" id="formID">
   <p class="textfield">
   <label for="author">
    Name:   <input name="name" id="name" value="" size="22" tabindex="1" type="text" class="validate[required,custom[onlyLetterSp]] text-input">
          </label>
   </p>
   <p class="textfield">
    <label for="email">
   E-Mail *(will not be published) :<input name="email" id="email" value="" size="22" tabindex="2" type="text" class="validate[required,custom[email]] text-input">
         
             
          </label>
   </p>
   <p class="textfield">
   <label for="url1">
    Contact No : <input name="contact" id="contact" value="" size="22" tabindex="3" type="text" class="validate[required,custom[phone]] text-input">
          
            
          </label>
   </p>
    <p class="textfield">
	<label for="url">
       Subject :<input name="subject" id="subject" value="" size="22" tabindex="3" type="text" class="validate[required] text-input">
          </label>
   </p>
   <p>
       <small><strong>Message</strong></small>
   :</p>
   <p class="text-area">
       <textarea name="message" id="message" class="validate[required]"  cols="50" rows="10" tabindex="4"></textarea>
   </p>
   <p>
       <input name="button" type="Submit" id="submit" >
       <input name="comment_post_ID" value="1" type="hidden">
   </p>
   <div class="clear"></div>
</form>
<?php
  }
  ?>
<div class="clear"></div>
</section>
</article>


</section>

<div class="clear"></div>

<div class="clear"></div>
</section>
</div>
<?php get_footer(); ?>