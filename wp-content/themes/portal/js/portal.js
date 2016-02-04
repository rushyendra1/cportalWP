var geocoder;  
  var files = "";
  var attachWindow ;
  var pageSize = 100;
//  var pageSize = 5; for testing
$ = jQuery.noConflict();
//$('#myModal').foundation('reveal', 'open');
$(document).ready(function(){
    $(document).foundation({
	abide:{
		
	},
        //'reveal': "open"
});
//$('#myModal').foundation('reveal', 'open');
//$("#wpadminbar").html("");
    var root = $.trim($("#rootTheme").val());
    var path = $.trim($("#path").val());
    var site = $.trim($("#siteTheme").val());
    var devWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
   var msg = $("#msg").val();
   if(msg != "")
       alertData("Message",msg);
   if(path == "object-list")
    {
       
         getObjectTemplate('2','','',pageSize,1,0,'','ASC','all');
        /*$.post(root+"/ajax/object/object-list.php",{type:type},function(e){
            
        });*/
    }
    if(path == "view-object")
    {
        var relatedTypes = $.trim($("#relatedTypes").val());
        var relatedTypesArray = relatedTypes.split(",");
        var relatedObjlen = relatedTypesArray.length;
        if(relatedObjlen >0)
        {
            for(var i =0; i<relatedObjlen; i++)
            {
                getObjectTemplateByObject('','',0,'all',0,"CreatedDate","desc",relatedTypesArray[i]);
            }
        }
    }
   var blog=$.trim($("#blogname").val());
    
    var gettitle = $.trim($(".headTitle").html());
    if(path =="" && path == "home")
    {
        gettitle = '';
    }
    if(gettitle != "")
        blog = gettitle +'|'+blog;
    document.title = blog;
    

    
    /*** more tabs ***/
    /** Edit User profile page **/
    
   $(".edit").on("click",function(e)
   {
       e.stopImmediatePropagation();
       $(".dispRow").hide();
       $(".editRow").show();
       $(this).hide();
   });
   /** Update profile **/
     $("#mysubmit").on("click",function(e){
        e.stopImmediatePropagation(); 
        var className = "ajaxCall";
        if($(this).hasClass(className))
        {
            return false;
        }
        $(this).addClass(className);
        showLoader();
        $(this).attr("disabled");
        $(".errorInput").removeClass("errorInput");
        var name = $.trim($("#firstname").val());
        var lastName = $.trim($("#lastname").val());
        var company = $.trim($("#company").val());
        
        var phone = $.trim($("#phone").val());
        var mobile = $.trim($("#mobile").val());
        var email = $.trim($("#email").val());
        var altEmail = $.trim($("#alternateemail").val());
        
        var street = $.trim($("#street").val());
        var city = $.trim($("#city").val());
        var state = $.trim($("#state").val());
        var country = $.trim($("#country").val());
        var error = "";
        var title = "Request Message";
        var error = [];
        error = firstNameError("#firstname",error);
        error =   LastNameError("#lastname",error);
        error = checkUserName("#email",error, "Please enter your E-mail.");
        error = checkUserName("#alternateemail",error, "Please enter your Alternate E-mail.");
        error = phoneValidation("#phone",error);
        error = phoneValidation("#mobile",error);
         error = addressValidation("#street",error);
         error = addressValidation("#city",error);
        error = addressValidation("#state",error);
        error = addressValidation("#country",error);
        error = addressValidation("#zip",error);
        error = addressValidation("#message",error);
        var status = errorFocus(error);
        if(!status)
        {
            $(this).removeClass(className);
            hideLoader();
            return false;
        }
        var that = this;
        $.post(root+"/ajax/loginmanage/my-update.php",{name:name,last_name:lastName, salutation:$.trim($("#salutation").val()) ,company:company,
                                phone:phone, mobile:mobile, email:email,alt_email:altEmail,
                             city:city,zipcode : $.trim($("#zip").val()),state:state,street:street,
                             id:$.trim($("#id").val()),
                             country:country, message: $.trim($("#message").val())},function(data){
                        data = $.trim(data);
                        if(data != "")
                        {
                            alertData(title,data);
                            $(that).removeClass(className);
                            hideLoader();
                            return false;
                        }else{
                                    //alertData(title,"Your Details Has Been Updated Successfully.");
                            $(".edit").show();
                            $(that).removeClass(className);
                            hideLoader();
                             window.location.href=site+"/profile";
                        }
                        });
                 
     });
    /** Login Functionality **/
   $("#submit").on("click",function(e){
       /** Stop the immediate propagation **/
        e.stopImmediatePropagation();
      var className = "ajaxCall";
        if($(this).hasClass(className))
        {
            return false;
        }
        $(this).addClass(className);
      showLoader(); 
      $(this).attr("disabled");
      
      $(".errorInput").removeClass("errorInput");
      var username = $.trim($("#username").val());
      var pass = $.trim($("#lpassword").val());
      var title = "Request Message";
      var that = this;
      var error = [];
      /** check the error validtions **/
      error = checkUserName("#username",error, "Please enter Username/E-mail.");
      error = checkPwdError("#lpassword",error,"");
      if(error.indexOf("e") != -1)
      {
          $(this).removeAttr("disabled");
          $(this).removeClass(className);
          hideLoader();
          $("#username").focus();
          return false;
      }
       if(error.indexOf("pr") != -1)
      {
          $(this).removeAttr("disabled");
          $(this).removeClass(className);
          hideLoader();
          $("#lpassword").val("");
          $("#lpassword").focus();
          return false;
      }
      var that = this;
      $.post(root+"/ajax/loginmanage/login-submit.php", {username:username, 
          password:pass},function(data){
          data = $.trim(data);
         
        if(data != "")
        {
            
            alertData(title,data);
                //showLabelFocus("#password",data);
                $(that).removeClass(className);
            $(that).removeAttr("disabled");
            $("#lpassword").val("");
             hideLoader();
             $("#lpassword").focus();
           
            return false;
        }
        
        //alertData(title, "Login Successfully !!");
        window.location.href=site;
   });
});
/** logouts **/
$(".logouts").on("click",function(e){
       /** Stop the immediate propagation **/
        e.stopImmediatePropagation();
      var className = "ajaxCall";
        if($(this).hasClass(className))
        {
            return false;
        }
        $(this).addClass(className);
      showLoader(); 
      $(this).attr("disabled");
    $.post(root+"/ajax/loginmanage/logout.php", {},function(data){
        
        window.location.href= site;
          }); 
});
/** E-mail is already Existed in registration **/
   $("#email").on("blur",function(e){
       e.stopImmediatePropagation();
      showLoader();
      var email  =  $.trim($(this).val());
      $(this).removeClass("errorInput");
      $(this).next().hide();
      if(email == "")
      {
          hideLoader();
          return false;
      }
      var error = [];
      var that = this;
      error = checkUserName(this,error,"Please enter your e-mail.");
      var status = errorFocus(error);
      if(!status)
      {
          $(this).removeAttr("disabled");
          hideLoader();
          return false;
      }
          $.post("php/check-email-val.php",{email:email},function(data){
              if(data != "")
              {
                   showLabelFocus(that,data);
                    $("#correctEmail").css("display", "none");
               //$(this).removeAttr("disabled");
                    hideLoader();
                $(that).focus();
                return false;
              }
             // $("#correctEmail").show();
              $("#correctEmail").css("display", "block");
              
          });
     
      hideLoader();
   });
 /** Check the above  new password element validations **/
    $("#newPwd").on("focus",function(){
        var status = $.trim($("#status").val());
       var error =  pwdCheckError(status,[],"#oldPwd");
       if(error.indexOf("o") != -1)
       {
           $(".passStrengthify").css("display", "none");
           hideLoader();
           $("#oldPwd").focus();
           return false;
       }
    });
    /** Confirm password above element validations **/
    $("#confirmPwd").on("focus",function(e){
        e.stopImmediatePropagation();
        var status = $.trim($("#status").val());
        var old = $.trim($("#oldPwd").val());
        var error = [];
        error = pwdCheckError(status,error,"#oldPwd");
        error = newPwdCheckError(status,error,"#newPwd",old);
            if(error.indexOf("o") != -1)
            {
                hideLoader();
                $(".correctPassword").hide();
                $("#oldPwd").focus();
                return false;
            }
            else if(error.indexOf("n") != -1)
            {
                hideLoader();
                 $(".correctPassword").hide();
                $("#newPwd").focus();
                return false;
            }
         });

/** Check the new password and old Password is same or not in set password page **/ 
  $("#newPwd").on("blur",function(e){
       
       e.stopImmediatePropagation();
     // showLoader(); 
      var pwd  =  $.trim($(this).val());
      var oldPwd = $.trim($("#oldPwd").val());
      if(pwd == ""){
         // hideLoader();
          return false;
      }
    /*  var status = $.trim($("#status").val());
      if(!status){
          //hideLoader();
          return false;
      } */
     $(this).removeClass("errorInput");
      $(this).next().hide();
      
      var error = [];
       error = pwdCheckError(1,error,"#oldPwd");
       
       error = newPwdCheckError(1,error,this,oldPwd);
       if(error.indexOf("o") != -1)
        {
         // $(this).removeAttr("disabled");
         // hideLoader();
          $("#oldPwd").focus();
          return false;
        }
           if(error.indexOf("n") != -1)
        {
         // $(this).removeAttr("disabled");
         $(this).val("");
         $(this).focus();
         //  hideLoader();
          return false;
        }

    }); 
 /** Check the Old Password is existed or not in change password **/
 
 $("#oldPwd").on("blur",function(e){
       e.stopImmediatePropagation();
      //showLoader(); 
      var pwd  =  $.trim($(this).val());
    /*  var status = $.trim($("#status").val());
      if(!status)
          return false; */
      $(this).removeClass("errorInput");
      $(this).next().hide();
      var error = [];
      error =  pwdCheckError(status,error,"#oldPwd");
           if(error.indexOf("o") != -1)
        {
         // $(this).removeAttr("disabled");
          //hideLoader();
          return false;
        }
      var that = this;
      $.post(root +"/ajax/loginmanage/old-pwd-check.php",{old_pwd:pwd,id: $.trim($("#id").val()),status:1},function(data){
          if(data!= "")
          {
              showLabelFocus(that,data);
              $(that).val("");
               //$(this).removeAttr("disabled");
              $(that).focus();
            //  hideLoader();
              return false;
          }
         // hideLoader();
      });
   
    });
    
     /** Change Password **/
     $("#changePwdSubmit").on("click",function(e){
         var site = $.trim($("#siteTheme").val());
        e.stopImmediatePropagation();
        var className = "ajaxCall";
        if($(this).hasClass(className))
        {
            return false;
        }
        $(this).addClass(className);
        showLoader();
        $(this).attr("disabled");
        $(".errorInput").removeClass("errorInput");
        var old = $.trim($("#oldPwd").val());
        var newp = $.trim($("#newPwd").val());
        var status = $.trim($("#status").val());
       
        //var title = "Request Message";
        var error = []; 
        error = pwdCheckError(status,error,"#oldPwd");
        error = newPwdCheckError(status,error,"#newPwd",old);
        error = confirmCheckError(error,"#confirmPwd",newp);
        
          if(error.indexOf("o") != -1)
            {
                 hideEnd(this);
                 $(this).removeClass(className);
                $("#oldPwd").focus();
                return false;
            }
            else if(error.indexOf("n") != -1)
            {
                 hideEnd(this);
                 $(this).removeClass(className);
                $("#newPwd").focus();
                return false;
            }
            else if(error.indexOf("c") != -1)
            {
                 hideEnd(this);
                 $(this).removeClass(className);
                $("#confirmPwd").focus();
                return false;
            }
            
        var isAdmin = parseInt($.trim($("#isAdmin").val()));
         $(".correctPassword").show();
         var that = this;
         
         $.post( root+"/ajax/loginmanage/change-pwd-submit.php", {id:$.trim($("#userId").val()),
         old_pwd:old , new_pwd: newp,id:$.trim($("#id").val()), is_admin:isAdmin ,
     status:status,type:"site"}, function (data) {
     
      if(data == "0" )
            {
                window.location.href = site+'/profile';
               
                return false;
            } 
            //data = $.trim(data);
          // var msg = data.msg;
                         
                      
            var role = data.role;
          
             if (data.error == 1)
            {
                $(that).removeClass(className);
                $("#newPassword").focus();
                 $(".correctPassword").hide();
               // alertData(title,data);
                hideLoader();
                return false;
            } else {
                $(".correctPassword").show();
                $(that).removeClass(className);
              
             
               
                window.location.href = site+'/profile';
            }
        },"json");
     });
     
     /** Forgot password **/
    $("#forogotSubmit").on("click",function(e)
    {
        var site = $.trim($("#siteTheme").val());
      e.stopImmediatePropagation();
       var className = "ajaxCall";
        if($(this).hasClass(className))
        {
            return false;
        }
        $(this).addClass(className);
      showLoader();
      $(this).attr("disabled");
      $(".errorInput").removeClass("errorInput");
     // var title = "Request Message";
      var username = $.trim($("#username").val());
      if(username == "")
      {
          var msg = "Please enter Username/E-mail.";
         // alertData(title,msg);
          showLabelFocus("#username",msg);
          $(this).removeClass(className);
          $(this).removeAttr("disabled");
          hideLoader();
          $("#username").focus();
          return false;
        }else if(!emailValid(username))
        {
            var msg = "Please enter valid E-mail";
           //alertData(title,msg);
          
            showLabelFocus("#username",msg);
           $(this).removeAttr("disabled");
           $(this).removeClass(className);
            hideLoader();
            $("#username").focus();
            return false;
        }else
            hideData("#username");
        var that = this;
         $.post(root+"/ajax/loginmanage/forgot-pwd-submit.php", {username:username},function(data){
          data = $.trim(data);
             if(data != "")
        
        {
            //alertData(title,data);
            hideLoader();
             showLabelFocus("#username",data);
           $(that).removeAttr("disabled");
           $(that).removeClass(className);
            //$("#correctEmail").hide();
             $("#correctEmail").css("display", "none");
            hideLoader();
            $("#username").focus();
            return false;
        }
         // $("#correctEmail").show();
           $("#correctEmail").css("display", "block");
           $(that).removeClass(className);
        //alertData(title,"Thank you, Your Password Details Are Sent To Your E-mail.");
         window.location.href = site+'/login';
      });
    });
    
    /** set Password **/
     $("#setpassword").on("click",function(e){
         
         var site = $.trim($("#siteTheme").val());
        e.stopImmediatePropagation();
        var className = "ajaxCall";
        if($(this).hasClass(className))
        {
            return false;
        }
        $(this).addClass(className);
        showLoader();
        $(this).attr("disabled");
        $(".errorInput").removeClass("errorInput");
        var newp = $.trim($("#newPwd").val());
        var conp = $.trim($("#confirmPwd").val());
        var oldPwd = $.trim($("#oldPwd").val());
      //  var status = $.trim($("#status").val());
       var status=1;
        //var title = "Request Message";
        var error = []; 
        
        error = newPwdCheckError(status,error,"#newPwd");
        error = confirmCheckError(error,"#confirmPwd",newp);
           if(error.indexOf("n") != -1)
            {
                 hideEnd(this);
                 $(this).removeClass(className);
                $("#newPwd").focus();
                return false;
            }
            else if(error.indexOf("c") != -1)
            {
                 hideEnd(this);
                 $(this).removeClass(className);
                $("#confirmPwd").focus();
                return false;
            }
            
        var isAdmin = parseInt($.trim($("#isAdmin").val()));
         $(".correctPassword").show();
         var that = this;
         
         $.post( root+"/ajax/loginmanage/change-pwd-submit.php", {id:$.trim($("#userId").val()),
         new_pwd: newp,id:$.trim($("#id").val()), is_admin:isAdmin ,
     status:status,rand :$("#rand").val() }, function (data) {
    
                if( data=="0"  )
            {
                window.location.href = site+'/login';
                return false;
            } 
     
            data = $.trim(data);
         var msg = data.msg;
                         
                      
            var role = data.role;
          
             if (data.error == 1)
            {
                $(that).removeClass(className);
                $("#newPassword").focus();
                 $(".correctPassword").hide();
               // alertData(title,data);
                hideLoader();
                return false;
            } else {
                $(".correctPassword").show();
                $(that).removeClass(className);
               // window.location.href = site+'/login';
              window.location.href = site+'/login';
            }
            
        },"json");
        
     });
});

/**
 * Show the Loader
 * @name showLoader
 * @returns {void}
 */
 function showLoader()
 {
        var root = $.trim($("#rootTheme").val());
        var parent = $(".main-content");
        var path = $.trim($("#path").val());
        var classNm = '';
        if(path == "account-lookup")
            classNm = 'account-pagent';
          $(parent).append(
                '<div  class= "loaderPageant '+classNm+'" ><img src="'+root+'/images/loading2.gif" ></div>');
        //$(".loaderPageant").show();
      
 }
 /**
     * Hide the Loader
     * @name hideLoader
     * @returns void
     */
function hideLoader()
{
        $(".loaderPageant").remove();
        //$(".loaderPageant").hide();
}
/**
 * Check the User name 
 * @name checkUserName
 * @param {object} ele
 * @param {array} error
 * @param {sring} errorMsg
 * @returns {array}
 */
function  checkUserName(ele,error,errorMsg)
{
   
     var username = $.trim($(ele).val());
     var isRequired = $.trim($(ele).data("required"));
     
     if(isRequired == "undefined" || ele == "#username")
         isRequired = "required";
     
     var type = "e";
     if(ele =="#alternateemail")
         type= "ae";
      if (ele == "#newEmail")
            type = "nemail";
    if(isRequired == "required" && username == "")
      {
          var msg = errorMsg;
          error.push(type);
          showLabelFocus(ele,msg);
         // $("#correctEmail").hide();
          $("#correctEmail").css("display", "none");
          //$(ele).focus();
         
      }/*else if( username != "" && !emailValid(username))
        {
           var msg = "Please enter valid e-mail.";
           error.push(type);
           showLabelFocus(ele,msg);
           //$("#correctEmail").hide();
            $("#correctEmail").css("display", "none");
           //$(ele).focus();
        }*/
    else{
            hideData(ele);
           // $(nextEle).focus();
        }
    return error;
          
}
/**
 * Checking the Old Password
 * @name pwdCheckError
 * @param {string} status
 * @param {array} error
 * @param {object} ele
 * @returns {array}
 */
function pwdCheckError(status,error,ele)
{
    var old = $.trim($(ele).val());
    if ( old == "" ) {
            var msg = "Please enter your Old Password.";
              showLabelFocus(ele,msg);
              $(ele).val("");
              error.push('o');
             //$(ele).focus();
        }else{
            hideData(ele);
           /* if($(nextEle).val() == "")
            $(nextEle).focus();*/
        }
        return error;
}
/**
 * Checking the New Password Check
 * @name newPwdCheckError
 * @param {string} status
 * @param {array} error
 * @param {object} ele
 * @param {string} old
 * @returns {array}
 */
function newPwdCheckError(status,error,ele,oldPwd)
{
     var root = $.trim($("#rootTheme").val());
    var newp = $.trim($(ele).val());
    var minPassLen = $.trim($("#minPassLen").val());
    if (newp == "") {
            var msg = "Please enter your New Password.";
           //error +=msg+"<br/>";
           $(ele).val("");
           error.push("n");
           showLabelFocus(ele,msg);
           //$(ele).focus();
            
        }else if(newp.length <minPassLen)
        {
            var msg = "Minimum Password character length should be "+minPassLen+".";
            $(ele).val("");
            //error += msg+"<br/>";
            error.push("n");
            $(ele).val("");
            showLabelFocus(ele,msg);
            //$(ele).focus();
        }else if(!passwordValid(newp))
        {
            var msg = "New Password should contains atleast one upper,one lowercase,one number and one symbol.";
            //error +=msg+"<br/>";
            error.push("n");
            $(ele).val("");
            showLabelFocus(ele,msg);
            //$(ele).focus();
        }else if(status ==0 &&  oldPwd == newp)
        {
             var msg = "Old Password and New Password should not be same.";
            //error +=msg+"<br/>";
            
            error.push("n");
            $(ele).val("");
            showLabelFocus(ele,msg);
           // $(ele).focus();
        }else if(status ==1 )
        {
            var rand = $.trim($("#rand").val());
             $.post(root +"/ajax/loginmanage/new-pwd-check.php",{new_pwd:newp,randno:rand},function(data){ 
                if(data != "")
                {
                     error.push("n");
                     $(ele).val("");
                   showLabelFocus(ele,data);
                }else 
                     hideData(ele);
                 return error;
                });                  
             
        }else{
            hideData(ele);
           /* if($(nextEle).val() == "")
                $(nextEle).focus();*/
        }
        return error;
}
/**
 * Check the Confirmation error
 * @name confirmCheckError
 * @param {array} error
 * @param {object} ele
 * @param {string} newp
 * @returns {array}
 */
function confirmCheckError(error,ele,newp)
{
    var confirmp = $.trim($(ele).val());
        if (confirmp == "") {
            var msg = "Please enter your Confirm New Password.";
            //error +=msg+"<br/>";
            error.push('c');
            showLabelFocus(ele,msg);
            $(ele).val("");
            $(".correctPassword").hide();
            //$(ele).focus();
        }
        else if(newp != confirmp)
        {
            //$(ele).focus();
            error.push('c');
            var msg = "New Password and Confirm New Password should be same.";
            $(ele).val("");
            //error+=msg+"<br/>";
            $(".correctPassword").hide();
            showLabelFocus(ele,msg);
            
        }
        else if(!passwordValid(confirmp))
        {
            var msg = "Confirm New Password should contains atleast one upper,one lowercase,one number and one symbol.";
            //error +=msg+"<br/>";
            error.push('c');
            $(ele).val("");
            showLabelFocus(ele,msg);
            $(".correctPassword").hide();
            //$(ele).focus();
        }
        else{
            hideData(ele);
            $(".correctPassword").show();
           /* if($(nextEle).val() == "")
            $(nextEle).focus();*/
        }
        return error;
}
/**
 * Display the password errors
 * @name pwdCheckErrors
 * @param {array} error
 * @param {object} ele
 * @returns {array}
 */
function pwdCheckErrorReg(error,ele)
{
    var newp = $.trim($(ele).val());
    var type = "";
    var emsg = "pr";
    var minPassLen = $.trim($("#minPassLen").val());
    if(ele == "#confirmpassword")
    {
        type = "Confirm";
        emsg = "pcr";
    }
    
    if (newp == "") {
            var msg = "Please enter your "+type+" Password.";
            error.push(emsg);
           showLabelFocus(ele,msg);
           $(ele).val("");
           if(ele == "#confirmpassword")
            $(".correctPassword").hide();
        
            
        }
        else if( ele == "#confirmpassword" &&  newp != $.trim($("#password").val())){
            
            var msg = "Confirm Password and Password should be same.";
           // hidePassword();
            error.push(emsg);
           $(ele).val("");
           showLabelFocus(ele,msg);
           hideLoader();
           if(ele == "#confirmpassword")
            $(".correctPassword").hide();
       }
        else if(newp.length <minPassLen)
        {
            var msg = "Minimum "+type+" Password character length should be "+minPassLen+".";
             error.push(emsg);
            $(ele).val("");
            showLabelFocus(ele,msg);
            if(ele == "#confirmpassword")
            $(".correctPassword").hide();
          
        }else if(ele != "#confirmpassword" && !passwordValid(newp))
        {
            var msg = type+" Password should contains atleast one upper,one lowercase,one number and one symbol.";
            error.push(emsg);
            $(ele).val("");
            showLabelFocus(ele,msg);
            if(ele == "#confirmpassword")
            $(".correctPassword").hide();
        }else{
            if(ele == "#confirmpassword")
            $(".correctPassword").show();
            hideData(ele);
       }
        return error;
}
/**
 * Focus to the element
 * @name showLabelFocus
 * @param {type} ele
 * @param {type} msg
 * @returns {void}
 */
function showLabelFocus(ele,msg)
{
    //if(typeof(type) == "undefined"){
    $(ele).next().show();
    $(ele).next().html(msg);
    //$(ele).prev().prev().html(msg);
//}
   // else{
        /*$(ele).prev().prev().prev().show();
     $(ele).prev().prev().prev().html(msg);
 }*/
    $(ele).addClass("errorInput");
}
/**
 * Hide the data
 * @name hideEnd
 * @param {object} that
 * @returns {void}
 */
function hideEnd(that)
{
    $(that).removeAttr("disabled");
          hideLoader();
}
/**
 * Check the Password Errors
 * @name checkPwdError
 * @param {object} ele
 * @param {array} error
 * @returns {array}
 */
function checkPwdError(ele,error)
{
    var pass = $.trim($(ele).val());
    if(pass == "")
      {
        var msg =  "Please enter your Password.";
        // alertData(title,msg);
        error.push("pr");
         showLabelFocus(ele,msg);
          $(ele).focus();
         
      }else{
            hideData("#password");
          
      }
      return error;
}
/**
  * Validate the E-mail
  * @name emailValid
  * @param {string} email
  * @returns (boolean}
  */       
 function emailValid(email)
    {
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
    }
 /**
 * Validate the Phone
 * @name phoneValid
 * @param {int} no
 * @returns {boolean}
 */
 var phoneValid =  function(no)
    {
		var check;
		//var check =  /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/.test(no);
		//if(!check)
		 check =  /^[0-9]{10}$/.test(no);
		 //return true;  
		 return check;
		
}
 /**
 * Validate the Password
 * @name passwordValid
 * @param {string} str
 * @returns (boolean}
 */
function passwordValid(str)
{
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\+\?\=\[\]\{\}\:\;\<\>\.,~`]).{5,20}$/.test(str);
}
/**
 * Hide the element 
 * @name hideData 
 * @param {object} ele
 * @returns {void} */
function hideData(ele)
{
    $(ele).next().hide();
    $(ele).removeClass("errorInput");
}
/*
 * Display the error messages
 * @name showMag
 * @param (string) title
 * @param (string) statusContent
 * @param (string) type
 * @return (mixed)
 */
function alertData(title, statusContent)
{
    
    if (typeof (statusContent) != 'undefined' && statusContent != "") {
             var opt = {
            modal: true,
            close: function ()
            {

               /* if ($('.shareListingEmail').html() != "") {

                    $('.shareListingEmail').dialog("open");
                }*/

            },
           width: "auto"
        };
        try{
        $("#dialogParent").remove();
    }catch(e){}
        $("#popup").append('<div id="dialogParent"><div id="dialog" title="' + title + '">' +
                statusContent + '</div></div>');
       $("#dialog").dialog(opt);
        hideLoader();
    }
}
/**
 * Display the Account Templates
 * @name getObjectTemplate
 * @param {string} view
 * @param {object} that
 * @param {string} classView
 * @param (int) length
 * @param (int) page
 * @param (int) isMore
 * @param (string) field
 * @param (string) sortType
 * @param (string) alphaType
 * @returns {void}
 */
function getObjectTemplate(view,that,classView,length,page,isMore,field,sortType,alphaType)
{
    showLoader();
    var root = $.trim($("#rootTheme").val()); 
    var site = $.trim($("#siteTheme").val());
     var objectType = $.trim($("#object").val());
     var parentObjectType = $.trim($("#parentObjType").val());
     var parentObjId = $.trim($("#parentObj").val());
     var isEdit = parseInt($.trim($("#isEdit").val()));
     var isCreate = parseInt($.trim($("#isCreate").val()));
    $.post(root+"/ajax/object/object-list.php",{view:view,PageNum:page,
        is_more:isMore,parent_obj_type:parentObjectType,object_id:parentObjId,
    field:field,sort_type:sortType, alpha_type:alphaType,object_type:objectType,length:length},
        function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayObjects();
            return false;
        }
            
    try {
        var  res = data.objectList;
        var fieldsArray = data.fields;
        var apiFields = data.api_fields;
        var result = data.response;
        var totalRecords = data.NumberofRec;
        var msg = "Request Message";
        var len = 0;
        var fieldsLen = fieldsArray.length;
            len = data.pageRecords;
       
        if (typeof (res.error) != "undefined")
        {
            itemAlertData(msg, data.message);
            return false;
            hideLoader();
        }
    } catch (e) { }
    var responseHtml = '';
    var headerHtml = '';
        if(fieldsLen>0){
            headerHtml = '<tr class="headerRow">';
            
            for(var i=0; i<fieldsLen; i++)
            {
                var sortTitle = "Sorted Ascending";
                var sortC = "sort ascending";
                var orderType = "asc";
                var sortClass = "sortAsc";
                var activeClass = "";
                var arg = apiFields[i];
                var fieldText = fieldsArray[i];
                if(field == "")
                    field = apiFields[0]; 
                if(field == arg)
                {
                     activeClass = "activeSort";
                     if(sortType== "desc"){
                        sortTitle = "Sorted Descending";
                        orderType = "desc";
                        sortClass = "sortDesc";
                        sortC = "sort descending";
                     }
                }
                headerHtml +='<th  scope="col">\n\
                        <a title="'+fieldText+'- '+sortC+'" class=" sortOrders" data-field="'+arg+'" data-type="'+orderType+'" >'+fieldText+'\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
            } //for loop closed
            headerHtml +='<th  scope="col">Action</th>';
            headerHtml += '</tr>';
        } //if closed
        
            
        $(".displayObjectHeader").html(headerHtml);
       
    if(typeof(result)!= "undefined" && typeof(result.status)!="undefined" && result.status== "Failure")
    {
            responseHtml +='<tr><td class="error noRecordRow" colspan="9">'+result.message+'</td></tr>';
    }else if(len>0){
        for (var i = 0; i < len; i++)
        {
            responseHtml +='<tr  class="dataRow">';
            var id = '';
             if (res[i] != null && typeof (res[i]['Id']) != "undefined")
                id= res[i]['Id'];
            for(var j=0;j<fieldsLen;j++)
            {
                var value =  fields =  "";
                fields = apiFields[j];
              
            //if (res[i] != null && typeof (res[i].fields) != "undefined")   
             if (res[i] != null && typeof (res[i][fields]) != "undefined")
               //value = res[i].fields;
               value = res[i][fields];  
               if(value == "null" || value == null)
                   value= "";
                responseHtml +='<td class=" dataCell  " scope="row">'+value+'</td>';
               // responseHtml +='<td class=" dataCell  " scope="row">'+value+'</td>';
                
            }//for closed
            var editLink = '';
         
            if(isEdit)
                editLink = ' &nbsp; <a>Edit</a>';
            responseHtml +='<td class=" dataCell  " scope="row"><a href="'+site+'/view-object?id='+id+'&type='+objectType+'">View</a>'+editLink+'</td>';
            responseHtml +='</tr>';
        }
    }else{
         responseHtml +='<tr><td class="error noRecordRow" colspan="9">No Records To Display</td></tr>';
    }
    
    /** Pagination Links ***/
     var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayObjects", alpha);
    
    $(".paginationLinks").html(paginationHtml);
           
    responseHtml += '<style type="text/css">@media only screen and (max-width: 760px),(min-device-width: 768px) and (max-device-width: 1024px)  {';
    var k = 0;
    for(var j=0;j<fieldsLen;j++)
    {
         k = j+1;
         var fields = fieldsArray[j];
        responseHtml += '.objectListTable td:nth-of-type( '+k+' ):before { content: "'+fields+'"; font-weight:bold;}';
    }
    k+=1;
    
    responseHtml += '.objectListTable td:nth-of-type( '+k+' ):before { content: "Action"; font-weight:bold;}';
     responseHtml += '}</style>';
    $(".object-list-res").html(responseHtml);
    //$('#objectListTable').stacktable({myClass:'your-class-name'});
     /*if(view ==2){
        var ele = $(".account-list-res").parent();
        ele.removeClass("accountListTable")
        ele.addClass("allAccountListTable")
    }else if(view ==1){
        var ele = $(".account-list-res").parent();
        ele.removeClass("allAccountListTable")
        ele.addClass("accountListTable")
    }*/
                $(that).removeClass(classView);
   displayObjects();
    hideLoader();
      },'json');
}
/**
 * perform the display Objects functionalites
 * @name displayObjects
 * @returns {void}
 */
function displayObjects()
{
    /** Highlight the rows **/
   $(".dataRow").on("mouseover",function(e){
      e.stopImmediatePropagation();
      $(this).addClass("addColorSpan");
   });
   /** Unhighlight the rows **/
    $(".dataRow").on("mouseout",function(e){
      e.stopImmediatePropagation();
      $(this).removeClass("addColorSpan");
   });
   
   /*** Account Pagination***/
   $(".displayObjects").on("click",function(e){
       e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          displayObjects();
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = $.trim($(this).data("paged"));
      
      var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getObjectTemplate(view,this,classView,pageSize,page,type,field,orderType,alphaType);
   });
   
   /*** Alpha paginations***/
   $(".alphaObject").on("click",function(e){
         e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = getPageNo("displayObjects");  
      
      var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(this).data('alphatype'));
      $(".listItem").removeClass("activeAlpha");
      $(".listItem[data-alphatype="+alphaType+"]").addClass("activeAlpha");
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getObjectTemplate(view,this,classView,pageSize,page,type,field,orderType,alphaType);
   });
   /*** Sort the functionality**/
   $(".sortOrders").on("click", function(e){
          e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var orderType = $.trim($(this).data("type"));
    $(this).find("img").addClass("activeSort"); 
      var orderBy = "asc";
      if(orderType == "asc")
          orderBy = "desc";
      var page = getPageNo("displayObjects");  
      var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var field = $.trim($(this).data("field"));
      getObjectTemplate(view,this,classView,pageSize,page,type,field,orderBy,alphaType);
   });

}
/**
 * Get the Connection to salsforce error
 * @name getConnectionError
 * @param {object} data
 * @returns {Boolean}
 */
function getConnectionError(data,that,className)
{
   var msg = "Request Message";
   try{
    if(typeof(data.error) != "undefined" && data.error ==1)
    {
        itemAlertData(msg, data.message);
        $(that).removeClass(className);
        hideLoader();
        return false;
    }
     else if(typeof(data.errorCode) != "undefined" )
    {
        itemAlertData(data.errorCode, data.message);
        $(that).removeClass(className);
        hideLoader();
        return false;
    }
    else if(typeof(data[0].errorCode) != "undefined" )
    {
        itemAlertData(data[0].errorCode, data[0].message);
        $(that).removeClass(className);
        hideLoader();
        return false;
    }else return true;
     
    }catch(e){ return true;}
}
/*
 * Display the error messages
 * @name showMag
 * @param (string) title
 * @param (string) statusContent
 * @param (string) type
 * @return (mixed)
 */
function itemAlertData(title, statusContent,type)
{
    if(typeof(type) == "undefined")
	type ="";
    if (typeof (statusContent) != 'undefined' && statusContent != "") {
         var opt = {
            modal: true,
            /*close: function (){/*if ($('.shareListingEmail').html() != "") {$('.shareListingEmail').dialog("open");}*///},
           // width: "auto",
            minWidth: "250"
        };  
        try{
            $("#dialogParent").remove();
         }catch(e){}
	
	var ok = "";
	if(type =="1")
	ok = '<div class="okMsg"><a class="okButton">OK</a></div>';
 	var msg = '<div id="dialogParent"><div id="dialog" title="' + title + '">' +
                statusContent +ok+' </div></div>';
        $("#popup").append(msg);
        
        $("#dialog").dialog(opt);
        okFun();
       // hideLoader();
    }
}
/**
 * Perform the valid alerts
 * @name okFun
 * @returns {void}
 */
function okFun()
{
    $(".okButton").on("click",function(e){
       
         //$("#dialogParent").remove();
         $(".ui-dialog").remove();
         $("#dialogParent").remove();
       // $('#dialog').dialog('close');   
    });
  
}
/**
 * Display the Pagination
 * @name paginationWC
 * @param {int} perPage
 * @param {int} start
 * @param {int} total
 * @param {int} pageCnt
 * @param {string} className
 * @returns {String}
 */
function paginationWC(difClass,perPage, start, total, pageCnt, className,alpha) {
    if(typeof(alpha) == "undefined")
        alpha = "";
    var totalPages = totalPageCnt(total,perPage);
    var page = parseInt(start);
    var nextPage = prevPage = "";
   if(page < totalPages)
   {
       nextPage = page+1;
      /* if(nextPage == totalPages)
           nextPage = "";*/
       prevPage = page -1;
       if(prevPage == -1)
           prevPage = "";
   }
    if(page == totalPages)
    {
        prevPage = page -1;
         if(prevPage == -1)
           prevPage = "";
    }
    var pagination = '';
    pagination += '<div class="paginations paginationsRes row-fluid">';
    if (prevPage !== "" && prevPage !== 0)
        pagination += '<a  class="' + className + '"  data-alpha="'+alpha+'" data-paged="' + prevPage + '"style="cursor:pointer"  title="Previous">  <i class="icon-left-open" ></i>< Previous Page</a>';
    
      if(nextPage !== "")
           pagination += '<a class=" ' + className + '" data-alpha="'+alpha+'"  data-paged="' + nextPage + '" style="cursor:pointer" title="Next" > Next Page ><i class="icon-right-open"></i></a>';
       
    pagination += '</div></div>';
    
    return pagination;
}
/**
 * Get the Total page Count
 * @name totalPagesCnt
 * @param {type} totalRecords
 * @param {type} perPageCnt
 * @returns {Number}
 */
function totalPageCnt(totalRecords,perPageCnt)
{
    var pages = Math.ceil(totalRecords/perPageCnt);
    return pages;
}
/**
 * Get the Page Number
 * @name getPageNo
 * @param {string} ele
 * @returns {number}
 */
function getPageNo(ele)
{
    var page = $.trim($('.'+ele+'[title="Next"]').data('paged'));
      var pageType = 0;
      if(page == "")
      {
          page = $.trim($('.'+ele+'[title="Previous"]').data('paged'));
          pageType = 1;
          if(page == "")
          page =0;
      }
      page = parseInt(page);
      if(pageType== 0 && page != 0)
        page -=1;
      else if(pageType== 1 && page != 0)
        page +=1;
    if(page ==0)
        page =1;
    return page;
}
/**
 * Display the contacts for account
 * @name getContactTemplateByAccount
 * @param {object} that
 * @param {string} classView
 * @param (int) offset
 * @param (int) page
 * @param (string) alpaType
 * @param {int} pagePart
 * @param {string} field
 * @param {string} sortType
 * @returns {void}
 */
function getObjectTemplateByObject(that,classView,page,alphaType,pagePart,field,sortType,objectType)
{
    showLoader();
    if(typeof(page) == "undefined")
        page = 0;
    if(typeof(pagePart) == "undefined")
        pagePart = 0;
     var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val()); 
     var parentObjectId = $.trim($("#objectId").val());
     var parentObjType = $.trim($("#objectType").val());
     var objName = $.trim($("#objName").val());
     var perPageCnt = 15;
    $.post(root+"/ajax/object/object-list.php",{
        object_id:parentObjectId,parent_obj_type :parentObjType,
        object_type:objectType,per_page_cnt:perPageCnt,
        PageNumShow:page,PageNum:pagePart,alpha_type:alphaType,
        field:field, sort_type:sortType},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayContacts();
          showMoreContact();
            return false;
        }
            var  res = data;
           var result = res.objectList;
           var fieldsArray = data.fields;
           var fieldsLen = fieldsArray.length;
           var totalRecords = 0;
           if(typeof(res.NumberofRec) != "undefined")
            totalRecords = res.NumberofRec;
        
            var msg = "Request Message";
            var len = showMoreCnt = 0;
            
    try {
        len = res.pageRecords;
       
        if (typeof (res.error) != "undefined")
        {
            itemAlertData(msg, data.message);
            return false;
            hideLoader();
        }
    } catch (e) {

    }
    var responseHtml = '';
    var errorResult = res.response;
                        
                        
    if(typeof(errorResult)!= "undefined" && typeof(errorResult.status)!="undefined" && errorResult.status== "Failure")
       responseHtml +='<tr><td class="error" colspan="5">'+errorResult.message+'</td></tr>';
    else if(len>0){
        var headerHtml = '';
        if(fieldsLen>0){
            headerHtml = '<tr class="headerRow">';
            for(var i=0; i<fieldsLen; i++)
            {
                var sortTitle = "Sorted Ascending";
                var sortC = "sort ascending";
                var orderType = "asc";
                var sortClass = "sortAsc";
                var activeClass = "";
                var arg = fieldsArray[i];
                
                if(field == arg)
                {
                     activeClass = "activeSort";
                     if(sortType== "desc"){
                        sortTitle = "Sorted Descending";
                        orderType = "desc";
                        sortClass = "sortDesc";
                        sortC = "sort descending";
                     }
                }
                headerHtml +='<th  scope="col">\n\
                        <a title="'+arg+'- '+sortC+'" class=" sortOrders" data-field="'+arg+'" data-type="'+orderType+'" >'+arg+'\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
            } //for loop closed
            headerHtml +='<th  scope="col">Action</th>';
            headerHtml += '</tr>';
        } //if closed
        
        $(".headerObject"+objectType).html(headerHtml);
    
         for (var i = 0; i < len; i++)
        {
            
             var name = id= titleP =email= phone= "";
             responseHtml +='<tr  class="dataRow even first">';
            var id = '';
            id= 123;
            for(var j=0;j<fieldsLen;j++)
            {
                var value =  fields =  "";
                fields = fieldsArray[j];
            //  if (res[i] != null && typeof (res[i].fields) != "undefined")   
             if (result[i] != null && typeof (result[i][fields]) != "undefined")
                //value = res[i].fields;
                  value = result[i][fields];  
           
                responseHtml +='<td class=" dataCell  " scope="row">'+value+'</td>';
               // responseHtml +='<td class=" dataCell  " scope="row">'+value+'</td>';
                
            }//for closed
            responseHtml +='<td class=" dataCell  " scope="row"><a href="'+siteUrl+'/view-object?id='+id+'&type='+objectType+'">View</a> &nbsp; <a>Edit</a></td>';
            responseHtml +='</tr>';

            showMoreCnt = i+1;
            
        }
    }
    else
        responseHtml +='<tr><td class="error" colspan="5">No Records To Display</td></tr>';
    var totalPageCount = totalPageCnt(totalRecords,perPageCnt);
    page = parseInt(page)+1;
   /* var showMore = '';
    if(page<totalPageCount && totalRecords > perPageCnt)
     showMore = '<span class="showMoreContactAct" data-cnt="'+showMoreCnt+'" data-page="'+page+'" data-pagepart="'+pagePart+'"  >Show '+perPageCnt+' more</span>&nbsp;&nbsp;';
            */
    
/*  var responseShowList = '<div >'+showMore+'\n\
<span><a href="'+siteUrl+'/object-list?id='+objectType+'&parent_obj_id='+parentObjectId+'">Go to List( '+totalRecords+' )</a></span></div>';
  */          
             var responseShowList = '<div >\n\
<span><a href="'+siteUrl+'/object-list?id='+objectType+'&parent_obj_id='+parentObjectId+'&obj_name='+objectType+'&parent_obj='+objName+'&parent_obj_type='+parentObjType+'">Go to List( '+totalRecords+' )</a></span></div>';
        if(typeof(totalRecords) != "undefined" && totalRecords >0)
   $(".showMoreDivObject"+objectType).html(responseShowList);
    $(".Object"+objectType+"Res").html(responseHtml);
    $(that).removeClass(classView);
    displayContacts();
    showMoreContact();
    hideLoader();
      },'json');
}
/**
 * Perform the Contact functionalities
 * @name displayContacts
 * @returns {void}
 */
function displayContacts()
{
   
   /** Highlight the rows **/
   $(".dataRow").on("mouseover",function(e){
      e.stopImmediatePropagation();
      $(this).addClass("addColorSpan");
   });
   /** Unhighlight the rows **/
    $(".dataRow").on("mouseout",function(e){
      e.stopImmediatePropagation();
      $(this).removeClass("addColorSpan");
   });
   /** View Type **/
   $("#contactViewType").on("change",function(e){
      e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var view = $.trim($(this).val());
       var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getContactTemplate(view,this,classView,100,0,type,field,orderType,alphaType)
   });
   
   /*** Contact Pagination***/
   $(".displayContacts").on("click",function(e){
       e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = $.trim($(this).data("paged"));
      var length = 100;
      var view = $.trim($("#contactViewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var type = $(".activeCont").data("type");
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getContactTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
   });
   /*** Click on the More Button **/
   $(".moreContact").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      $(this).addClass("activeMore");
      var page = getPageNo("displayContacts");
      var length = 100;
      var view = $.trim($("#contactViewType").val());
      $(this).addClass("activeCont");
      $(".fewerContact").removeClass("activeCont");
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getContactTemplate(view,this,classView,length,page,1,field,orderType,alphaType);
   });
   /*** Fewer functionalities ***/
    $(".fewerContact").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      $(this).addClass("activeFewer");
      showLoader();
      var page = getPageNo("displayContacts");
      var length = 100;
      var view = $.trim($("#contactViewType").val());
      $(this).addClass("activeCont");
      $(".moreContact").removeClass("activeCont");
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getContactTemplate(view,this,classView,length,page,0,field,orderType,alphaType);
   });
   /*** Alpha paginations***/
   $(".alphaContact").on("click",function(e){
         e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = getPageNo("displayContacts");  
      var length = 100;
      var view = $.trim($("#contactViewType").val());
      var alphaType = $.trim($(this).data('alphatype'));
      $(".listItem").removeClass("activeAlpha");
      $(".listItem[data-alphatype="+alphaType+"]").addClass("activeAlpha");
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getContactTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
   });
   
   /*** Sort the functionality**/
   $(".sortClass").on("click", function(e){
          e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var orderType = $.trim($(this).data("type"));
     
      var orderBy = "asc";
      if(orderType == "asc")
          orderBy = "desc";
      var page = getPageNo("displayContacts");  
      var length = 100;
      var view = $.trim($("#contactViewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var field = $.trim($(this).data("field"));
       getContactTemplate(view,this,classView,length,page,type,field,orderBy,alphaType);
       });
}
/**
 * Show more functionalities
 * @name showMoreContact
 * @returns {void}
 */
function showMoreContact()
{
    /** Show more in contacts in view account **/
    $(".showMoreContactAct").on("click",function(e){
       e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var offset = $.trim($(this).data("cnt"));
        var page = $.trim($(this).data("page"));
        var pagePart = $.trim($(this).data("pagepart"));
        if(typeof(page) == "undefined")
              page =0;
          if(typeof(pagePart) == "undefined")
              pagePart =0;
        getContactTemplateByAccount(this,classView,page,'all',pagePart,"CreatedDate","desc");
        
    });
    /**show more in cases in view account **/
    $(".showMoreCaseAct").on("click",function(e){
       e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var offset = $.trim($(this).data("cnt"));
        var page = $.trim($(this).data("page"));
        var pagePart = $.trim($(this).data("pagepart"));
        if(typeof(page) == "undefined")
              page =0;
          if(typeof(pagePart) == "undefined")
              pagePart =0;
        getCaseTemplateByAccount(this,classView,page,'all', pagePart,"CreatedDate","desc");
        
    });
    /**show more in cases in view account **/
    $(".showMoreCaseHistoryAct").on("click",function(e){
       e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        //var offset = $.trim($(this).data("cnt"));
        var page = $.trim($(this).data("page"));
        var pagePart = $.trim($(this).data("pagepart"));
        if(typeof(page) == "undefined")
              page =0;
          if(typeof(pagePart) == "undefined")
              pagePart =0;
        getCaseHistory(this,classView,page);
        
    });
}
/**
 * Display the first name errors
 * @name firstNameError
 * @param {object} ele
 * @param {array} error
  
 * @returns {array}
 */
function firstNameError(ele,error)
{
    var name = $.trim($(ele).val());
    var isRequired = $.trim($(ele).data("required"));
  
    if(isRequired== "required" && name == "" )
        {
            var msg = "Please enter your Firstname.";
            //error  += msg+"<br/>";
            error.push("f");
             showLabelFocus(ele,msg,1);
            //$(ele).focus();
        }else if(isRequired == "required" && name.length < 2)
        {
            var msg = "Minimum Firstname character length should be 2.";
            //error  += msg+"<br/>";
            error.push("f");
             showLabelFocus(ele,msg,1);
            // $(ele).focus();
        }else{
             hideData(ele);
            /* if($(nextEle).val() == "")
                $(nextEle).focus();*/
         }
         return error;
}
/**
 * Display the Last name errors
 * @name LastNameError
 * @param {object} ele
 * @param {array} error
 * @returns {array}
 */
function LastNameError(ele,error)
{
    var lastName = $.trim($(ele).val());
    var isRequired = $.trim($(ele).data("required"));
    if( isRequired == "required" && lastName == "")
        {
            var msg = "Please enter your Lastname.";
            //error += msg+"<br/>";
            error.push("l");
            showLabelFocus(ele,msg);
            //$(ele).focus();

        }else if(isRequired == "required" && lastName.length<2){
            var msg = "Minimum Lastname character length should be 2.";
            //error += msg+"<br/>";
            error.push("l");
            showLabelFocus(ele,msg);
            //$(ele).focus();
        }else{
             hideData(ele);
            /* if($(nextEle).val() == "")
             $(nextEle).focus();*/
         }
         return error;
}
/**
 * Check the all validation for phone
 * @name phoneValidation
 * @param {object} ele
 * @param {array} error
 * @returns {array}
 */
function phoneValidation(ele,error)
{
    var phone = $.trim($(ele).val());
    var isRequired = $.trim($(ele).data("required"));
    if(isRequired == "undefined")
        isRequired = "required";
    var type = "Phone";
    var emsg = "ppr";
    if(ele == "#mobile"){
        type = "Mobile";
        emsg = "pmr";
    }
    if( isRequired == "required" && phone == "" )
        {
            var msg = "Please enter your "+type+" number.";
            //error+=msg+"<br/>";
            hidePassword();
            error.push(emsg);
            showLabelFocus(ele,msg);
            //$(ele).focus();
        }
       else  if(phone != "" && !phoneValid(phone))
        {  var msg = "Please enter valid "+type+" number.";
            //error += msg+"<br/>";
            error.push(emsg);
            hidePassword();
            showLabelFocus(ele,msg);
           // $(ele).focus();
        }
        else {
            hideData(ele);
           /* if($(nextEle).val() == "")
                $(nextEle).focus();*/
        }
        return error;
}
/**
 * Hide the Password
 * @name hidePassword
 * @returns {void}
 */
function hidePassword()
{
    $("#password").val('');
    $("#confirmpassword").val('');
    $("#password").removeClass("errorInput");
    $("#password").next().hide();
    $(".passStrengthify").css("display", "none");
     $("#confirmpassword").removeClass("errorInput");
    $("#confirmpassword").next().hide();
}
/**
 * Check the Address Validation
 * @name addressValidation
 * @param string ele
 * @param {array} error
 * @returns {array}
 */
function addressValidation(ele,error)
{
    var errorMsg = '';
    var errorTitle = '';
    if(ele == "#city")
    {
        errorMsg = 'city';
        errorTitle = 'City';
    }
    else if(ele == "#state")
    {
        errorMsg = 'state';
        errorTitle = 'State';
    }
    else if(ele == "#country")
    {
        errorMsg = 'country';
        errorTitle = 'Country';
    }
    else if(ele == "#zip")
    {
        errorMsg = 'zip';
        errorTitle = 'Zipcode';
    }
    else if(ele == "#message")
    {
        errorMsg = 'mge';
        errorTitle = 'Message';
    }
    var isRequired = $.trim($(ele).data("required"));
    if(isRequired == "required" && $.trim($(ele).val()) == "")
    {
        var msg = "Please enter your "+errorTitle+".";
            //error+=msg+"<br/>";
           // hidePassword();
            error.push(errorMsg);
            showLabelFocus(ele,msg);
    }else
        hideData(ele);
    return error;
}
/**
 * Focus to error element.
 * @name errorFocus
 * @param {objecte} error
 * @returns {Boolean}
 */
function errorFocus(error)
{
   // console.log(error);
    var ele = "";
     if(error.indexOf("f") != -1)
        ele = "#firstname";
     else if(error.indexOf("l") != -1)
        ele = "#lastname";
     else if(error.indexOf("e") != -1)
        ele = "#email";
     else if(error.indexOf("ae") != -1)
        ele = "#alternateemail";
    else if(error.indexOf("pr") != -1)
        ele = "#password";
    else if(error.indexOf("pcr") != -1)
        ele = "#confirmpassword";
    else if(error.indexOf("city") != -1)
        ele = "#city";
    else if(error.indexOf("state") != -1)
        ele = "#state";
    else if(error.indexOf("country") != -1)
        ele = "#country";
    else if(error.indexOf("zip") != -1)
        ele = "#zip";
    else if(error.indexOf("mge") != -1)
        ele = "#message";
     else if(error.indexOf("ppr") != -1)
        ele = "#phone";
    else if(error.indexOf("pmr") != -1)
        ele = "#mobile";
    else if (error.indexOf("nemail") != -1)
            ele = "#newEmail";
     if( ele != "#email" &&  $.trim($("#email").val()) != "" )
              $("#correctEmail").css("display", "block");
      if(ele != ""){
          
          
      $(ele).focus();
       return false;
   }
   return true;
}
