<?php
add_action('admin_menu', 'setup_theme_admin_menus');
function setup_theme_admin_menus() {  
    
	if (!current_user_can('manage_options')) {  
		wp_die('You do not have sufficient permissions to access this page.');  
	} 
		
	//add_menu_page('Theme Settings', 'Portal Settings', 'manage_options', 'wc_settings', 'theme_wc_settings');  
        add_menu_page('Portal Settings', 'Portal Settings', 'manage_options', 'general_settings', 'general_settings_fun');  
          
    add_submenu_page('general_settings',   
        'Salesforce Configurations', 'Salesforce Configurations', 'manage_options', 'wc_sf_settings', 'theme_wc_sf_settings');
    //add_submenu_page('general_settings',   
      //  'General Settings', 'General Settings', 'manage_options', 'wc_sf_settings', 'general_settings_fun');
    add_submenu_page('general_settings',   
        'User Settings', 'User Settings', 'manage_options', 'wc_user_settings', 'user_settings_fun');
}  
function general_settings_fun()
{ 
    global $wpdb;
    global $table_prefix;
    $result = $wpdb->get_row("SELECT min_pass_len,max_pass_len,max_login_attempts,allow_edit"
                            . " FROM ".$table_prefix."settings"
                           . " WHERE id=1");
$min_pass_len =$max_pass_len = $max_login_attempts = $allow_edit =  0;

if(isset($result) && count($result)>0)
{
    $min_pass_len = $result->min_pass_len;
    $max_pass_len = $result->max_pass_len;
    $max_login_attempts = $result->max_login_attempts;
    $allow_edit = $result->allow_edit;
}
    ?>
    <input type="hidden" id="pages" value="general_settings">
    <input type="hidden" value="<?php echo get_template_directory_uri() ?>" id="rootTheme" >
    <div class="box span12 content-disp">
        
         
        
        <div data-original-title="" class="box-header">
        <h2><i class="halflings-icon wrench"></i>
            <span class="break"></span>Portal Settings
        </h2>
         </div>
        <div class="box-content">
            
    <div class="row-fluid ">		
        <div class="box span12 content-disp">
            <div class="box-header" data-original-title>
                <h2><i class="halflings-icon user"></i><span class="break"></span><?php echo $title; ?></h2>
                <div class="box-icon">
                     <small><em>* = Required</em></small>
                </div>
            </div>
         
            <div class="box-content titles" > <!-- Box Content Started -->
                <div class="control-group ">
                    <label  class="control-label viewUserDisp">Title </label>
                    <div class="controls viewSettingControls">
                        <input type="text" id="headertitle"  placeholder="Header Title" value="" >
                        <p class="help-block errorTag" style="display:none"></p>
                    </div>
                </div>
                
                <div class="control-group ">
                    <label  class="control-label viewUserDisp">Footer Title </label>
                    <div class="controls viewSettingControls">
                        <input type="text" id="footertitle"  placeholder="Footer Title" value="" >
                        <p class="help-block errorTag" style="display:none"></p>
                    </div>
                </div>
                 </div>
            
            <div class="box-content" > <!-- Box Content Started -->
                <div class="control-group ">
                    <label  class="control-label viewUserDisp">Minimum Password Length* </label>
                    <div class="controls viewSettingControls">
                        <input type="text" id="minPassLen"  placeholder="Minimum Password Length" value="<?php echo $min_pass_len ?>" >
                        <p class="help-block errorTag" style="display:none"></p>
                    </div>
                </div>
                
                <div class="control-group ">
                    <label  class="control-label viewUserDisp">Maximum Password Length* </label>
                    <div class="controls viewSettingControls">
                        <input type="text" id="maxPassLen"  placeholder="Maximum Password Length" value="<?php echo $max_pass_len ?>" >
                        <p class="help-block errorTag" style="display:none"></p>
                    </div>
                </div>
                   <div class="control-group ">
                    <label  class="control-label viewUserDisp">Maximum Login Attempts Allowed* </label>
                    <div class="controls viewSettingControls">
                        <input type="text" id="maxLoginAttempts" placeholder="Maximum Login Attempts Allowed" value="<?php echo $max_login_attempts ?>" >
                        <p class="help-block errorTag" style="display:none"></p>
                     </div>
                </div>
               <!-- <div class="control-group ">
                    <label  class="control-label viewUserDisp">Allow Edit User Profile</label>
                    <div class="controls viewSalesControls"> 
                        <input type="checkbox" id="allowEdit" <?php if($allow_edit) echo 'checked="checked"'; ?>>
                        <p class="help-block errorTag" style="display:none"></p>
                    </div>
                </div>-->
                
                <div class="form-actions"><button  id="saveSettings" class="btn btn-primary">Submit</button></div>
                    </div> <!-- Box Content Closed-->
            </div>
        </div>
    <!-- /span -->
        </div>
    </div>
<?php
}
function theme_wc_settings() { 

  
	if (isset($_POST["update_settings"])) {  
		
		update_option("wc_phone", esc_attr($_POST["wc_phone"])); 
		update_option("wc_email", esc_attr($_POST["wc_email"])); 
		update_option("wc_address", esc_attr($_POST["wc_address"])); 
		update_option("wc_facebook", esc_attr($_POST["wc_facebook"])); 
		update_option("wc_twitter", esc_attr($_POST["wc_twitter"])); 
		update_option("wc_linkedin", esc_attr($_POST["wc_linkedin"])); 
	
		echo '<div id="message" class="updated"><p>Settings saved</p></div>';	
	}
	
	$wc_phone = get_option("wc_phone");
	$wc_email = get_option("wc_email");
	$wc_address = get_option("wc_address");
	$wc_facebook = get_option("wc_facebook");
	$wc_twitter = get_option("wc_twitter");
	$wc_linkedin = get_option("wc_linkedin");
	
?>

    <div class="wrap">  
        <?php screen_icon('themes'); ?> <h2>Portal Settings</h2>  
    
        <form method="POST" action="">  
			<input type="hidden" name="update_settings" value="Y" />
            <table class="form-table">  
                <tr valign="top">  
                    <th scope="row">  
                        <label for="wc_phone">  
                            Phone
                        </label>   
                    </th>  
                    <td>  
                        <input type="text" id="wc_phone" name="wc_phone" value="<?php echo $wc_phone;?>" class="regular-text" />  
                    </td>  
                </tr>  
				<tr valign="top">  
                    <th scope="row">  
                        <label for="wc_email">  
                            Email
                        </label>   
                    </th>  
                    <td>  
                        <input type="text" id="wc_email" name="wc_email" value="<?php echo $wc_email;?>" class="regular-text" />  
                    </td>  
                </tr>
				<tr valign="top">  
                    <th scope="row">  
                        <label for="wc_address">  
                            Address
                        </label>   
                    </th>  
                    <td>  
                        <textarea id="wc_address" name="wc_address" class="regular-text" rows="4" cols="40" ><?php echo $wc_address;?></textarea>
                    </td>  
                </tr>
				<tr valign="top">  
                    <th scope="row">  
                        <label for="wc_facebook">  
                            Facebook url
                        </label>   
                    </th>  
                    <td>  
                        <input type="text" id="wc_facebook" name="wc_facebook" value="<?php echo $wc_facebook;?>" class="regular-text" /> 
                    </td>  
                </tr>
				<tr valign="top">  
                    <th scope="row">  
                        <label for="wc_twitter">  
                            Twitter url
                        </label>   
                    </th>  
                    <td>  
                        <input type="text" id="wc_twitter" name="wc_twitter" value="<?php echo $wc_twitter;?>" class="regular-text" /> 
                    </td>  
                </tr>
				<tr valign="top">  
                    <th scope="row">  
                        <label for="wc_linkedin">  
                            Linkedin url
                        </label>   
                    </th>  
                    <td>  
                        <input type="text" id="wc_linkedin" name="wc_linkedin" value="<?php echo $wc_linkedin;?>" class="regular-text" /> 
                    </td>  
                </tr>
            </table>  
			<p>  
				<input type="submit" value="Save settings" class="button-primary"/>  
			</p> 
        </form>  
    </div>  
<?php 
}  


/**
 *
 *
 **/
function theme_wc_sf_settings() { 

  
    if (isset($_POST["update_settings"])) {  
        
        update_option("wc_sf_client_id", esc_attr($_POST["wc_sf_client_id"])); 
        update_option("wc_sf_client_secret", esc_attr($_POST["wc_sf_client_secret"])); 
        update_option("wc_sf_client_redirect_uri", esc_attr($_POST["wc_sf_client_redirect_uri"])); 
        update_option("wc_sf_login_url", esc_attr($_POST["wc_sf_login_url"])); 
        update_option("wc_sf_instance_url", esc_attr($_POST["wc_sf_instance_url"])); 
        update_option("wc_sf_refresh_token", esc_attr($_POST["wc_sf_refresh_token"])); 
        update_option("wc_sf_public_site_url", esc_attr($_POST["wc_sf_public_site_url"])); 
        
        echo '<div id="message" class="updated"><p>Settings saved</p></div>';   
    }
    
    $wc_sf_client_id = get_option("wc_sf_client_id");
    $wc_sf_client_secret = get_option("wc_sf_client_secret");
    $wc_sf_client_redirect_uri = get_option("wc_sf_client_redirect_uri");
    $wc_sf_login_url = get_option("wc_sf_login_url");
    $wc_sf_instance_url = get_option("wc_sf_instance_url");
    $wc_sf_refresh_token = get_option("wc_sf_refresh_token");
    $wc_sf_public_site_url = get_option("wc_sf_public_site_url");
    
?>

    <div class="wrap">  
        <?php screen_icon('themes'); ?> <h2>Salesforce Configurations</h2>  
    
        <form method="POST" action="">  
            <input type="hidden" name="update_settings" value="Y" />
            <table class="form-table salesforceSettings">  
                <tr valign="top">  
                    <th scope="row">  
                        <label for="wc_sf_client_id">  
                            Client ID
                        </label>   
                    </th>  
                    <td>  
                        <input type="text" id="wc_sf_client_id" name="wc_sf_client_id" value="<?php echo $wc_sf_client_id;?>" class="regular-text" />  
                    </td>  
                </tr>  
                <tr valign="top">  
                    <th scope="row">  
                        <label for="wc_sf_client_secret">  
                            Client Secret
                        </label>   
                    </th>  
                    <td>  
                        <input type="text" id="wc_sf_client_secret" name="wc_sf_client_secret" value="<?php echo $wc_sf_client_secret;?>" class="regular-text" />  
                    </td>  
                </tr>
                <tr valign="top">  
                    <th scope="row">  
                        <label for="wc_sf_client_redirect_uri">  
                            Redirect URI
                        </label>   
                    </th>  
                    <td>  
                        <input type="text" id="wc_sf_client_redirect_uri" name="wc_sf_client_redirect_uri" value="<?php echo $wc_sf_client_redirect_uri;?>" class="regular-text" /> 
                    </td>  
                </tr>
                <tr valign="top">  
                    <th scope="row">  
                        <label for="wc_sf_login_url">  
                            Login URL
                        </label>   
                    </th>  
                    <td>  
                        <input type="text" id="wc_sf_login_url" name="wc_sf_login_url" value="<?php echo $wc_sf_login_url;?>" class="regular-text" /> 
                    </td>  
                </tr>
                <tr valign="top">  
                    <th scope="row">  
                        <label for="wc_sf_instance_url">  
                            Instance URL
                        </label>   
                    </th>
                    <td>  
                        <input type="text" id="wc_sf_instance_url" name="wc_sf_instance_url" value="<?php echo $wc_sf_instance_url;?>" class="regular-text" /> 
                    </td>  
                </tr>
                <tr valign="top">  
                    <th scope="row">  
                        <label for="wc_sf_refresh_token">  
                            Refresh Token
                        </label>   
                    </th>
                    <td>  
                        <input type="text" id="wc_sf_refresh_token" name="wc_sf_refresh_token" value="<?php echo $wc_sf_refresh_token;?>" class="regular-text" /> 
                    </td>  
                </tr>  
                 <tr valign="top">  
                    <th scope="row">  
                        <label for="wc_sf_refresh_token">  
                          &nbsp;
                        </label>   
                    </th>
                    <td>  
                        <input type="submit" value="Save" class="button-primary"/>  
                    </td>  
                </tr>        
            </table>  
            
        </form>  
    </div>  
<?php 
}

/*** User settings 
 * @name user_settings_fun
 */  
function user_settings_fun()
  {
    ?>
<input type="hidden" id="pages" value="wc_user_settings">
<input type="hidden" value="<?php echo get_template_directory_uri() ?>" id="rootTheme" >
<div class="box span12 content-disp">
    
</div>
  <?php }
?>