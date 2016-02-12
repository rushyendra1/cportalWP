[insert_php]

global $wpdb;
global $table_prefix;


redirect_to_login();


$title = "Change My Password";

global $user_ID;
$user_id = $user_ID;

 $result= get_wp_settings();

if( count($result)>0)
{
  $max_pass_len = $result['max_pass_len'] ;
  $min_pass_len = $result['min_pass_len'] ;
}

[/insert_php]

<input type="hidden" id="page" value="[insert_php] echo $title;[/insert_php]">
<input type="hidden" id="minPassLen" value="[insert_php] echo $min_pass_len; [/insert_php]">
<input type="hidden" id="maxPassLen" value="[insert_php] echo $max_pass_len; [/insert_php]">
<input type="hidden" id="status" value="0">
<input type="hidden" id="id" value="[insert_php] echo $user_id; [/insert_php]" >
<input type="hidden" id="isAdmin" value="[insert_php] echo $is_admin;[/insert_php]" >

<div id="main-content" class="main-content">

	<div class="row-fluid data-content-outer objectmainContentDisp" >
<div class="bodyCell contentSub row-fluid " >
  <div class="row toggle-full-width">

    <div class="bPageTitle">
     
      <h1 class="headTitle">[insert_php] echo $title; [/insert_php]</h1>

       <h4 class="right"><small><em>* = Required</em></small></h4>
       <div class="goBackDiv">
                            <a  class="goBack buttonCss">Back</a>
       </div>
      <hr>
    </div>
  </div>
<div class="row" >
    <form id="chgFrm">
      <div id="section_1">
          [insert_php] if(!$status) { [/insert_php]
           <div class="row">
          <div class="medium-6 columns">
            <label for="oldPwd">
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Old Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                  Old Password*</strong>
                <input type="password" maxlength="[insert_php] echo $max_pass_len; [/insert_php]" id="oldPwd" name="oldPwd" placeholder="Old Password" class="radius"  tabindex="1">
              <span class="label error alert  radius" style="display:none">Required</span>
            </label>
          </div>
          </div>
          [insert_php] } [/insert_php]
          <div class="row">
          <div class="medium-6 columns">
              <label for="newPwd">
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter New Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                  New Password*</strong>
                  <input type="password" maxlength="[insert_php] echo $max_pass_len; [/insert_php]" id="newPwd" name="newPwd" placeholder="New Password" class="radius"  tabindex="2">
              <span class="label error alert  radius" style="display:none">Required</span>
               <span class="correctPassword" style="display:none" ><img class="imageShown" src="[insert_php] echo get_template_directory_uri(); [/insert_php]/img/correct1.png"  ></span>
            </label>
          </div>
          </div>
           <div class="row">
          <div class="medium-6 columns">
            <label for="confirmPwd">
                
                <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="Enter Confirm New Password.&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;"> 
                 Confirm New Password*</strong>
                <input type="password" id="confirmPwd" name="confirmPwd" placeholder="Confirm New Password" class="radius"  maxlength="[insert_php] echo $max_pass_len [/insert_php]" tabindex="3" >
              <span class="label error alert radius" style="display:none">Required</span>
              <span class="correctPassword" style="display:none" ><img class="imageShown" src="[insert_php] echo get_template_directory_uri(); [/insert_php]/img/correct1.png"  ></span>
            </label>
          </div>
          </div>
          <div class="clear" style="height:15px"></div>
          <div class="row">
          <div class="columns small-12"> 
            <button  id="changePwdSubmit" name="changePwdSubmit" class="button radius submit link"  >Submit</button> 
            <a   class="button radius  link goBack">Cancel</a> 
            <br>
          </div>
        </div>
      </div>
</form>
    </div>
  </div>
        </div>
</div>

