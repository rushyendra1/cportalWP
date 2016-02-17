<div class="bodyCell contentSub row-fluid" >
<!-- Start page content -->
<a name="skiplink"></a>
  <div class="row toggle-full-width">
    <div class="bPageTitle">
      <!--<h4 class="right"><small><em>* = Required</em></small></h4>-->
      <h1 class="headTitle">Customer Portal</h1>
    </div>
  </div>   
      <div class="row" >
      <div id="section_1">
         
          <div class="row">
              
          <div class="columns small-12"> 
      
          
            [insert_php]
             if(is_user_logged_in()){
            [/insert_php]
              <a href="[insert_php] echo get_site_url();[/insert_php]/profile"  class="button radius submit link">My Profile</a>
              [insert_php] 
              
              $response_array = json_decode(RESPONSEARRAY);
              var_dump($response_array);
              exit;
               if(count($response_array)>0)
                { 
                  $tab_array = $response_array['TabList'];
                  $api_array = $response_array['ApiList'];
                  $i =0;
                    foreach($tab_array as $each_tab)
                    {
                       
                        if($each_tab != ""){
                        [/insert_php]
                      <a href="[insert_php] echo get_site_url();[/insert_php]/object-list/?id=[insert_php] echo $api_array[$i] [/insert_php]&obj_name=[insert_php] echo $each_tab; [/insert_php]"  class="button radius submit link">[insert_php] echo $each_tab;[/insert_php]</a>   
                        [insert_php] }
                        $i++;
                        }
                }
              [/insert_php]
              
            <a href="#"  class="button radius submit link logouts">Logout</a>
            [insert_php] }else{ [/insert_php]
          <a href="[insert_php] echo get_site_url();[/insert_php]/cportal/login"  class="button radius submit link">Login</a> <br>
            <!--<a href="register.php"  class="button radius submit link">Register</a>-->
            [insert_php] } [/insert_php]
          </div>
        </div>
     </div>
    </div>
</div>
  
    
<!-- Body events -->

<!-- End page content -->
