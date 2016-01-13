var geocoder;  
  var files = "";
  var attachWindow ;
$ = jQuery.noConflict();
$(document).ready(function(){
$(document).foundation({
	abide:{
		
	}
});
//$("#wpadminbar").html("");
    var root = $.trim($("#rootTheme").val());
    var path = $.trim($("#path").val());
    var site = $.trim($("#siteTheme").val());
    var devWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
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
      var that = this;
      $.post("ajax/loginmanage/change-pwd.php",{old_pwd:pwd,id: $.trim($("#id").val())},function(data){
          if(data!= "")
          {
              showLabelFocus(that,data);
              $(that).val("");
               //$(this).removeAttr("disabled");
              $(that).focus();
              hideLoader();
              return false;
          }
        //  hideLoader();
      });
   
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
      $.post("ajax/loginmanage/change-pwd.php",{old_pwd:pwd,id: $.trim($("#id").val()),status:1},function(data){
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
         $.post( "php/change-pwd-submit.php", {id:$.trim($("#userId").val()),
         old_pwd:old , new_pwd: newp,id:$.trim($("#id").val()), is_admin:isAdmin ,
     status:status,type:"site"}, function (data) {
            //data = $.trim(data);
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
              var file = "user-details.php";
                if(isAdmin && role == "admin")
                   file= "admin/index.php";
               
                window.location.href = file;
            }
        },"json");
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
    if (status == "0" && old == "" ) {
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
function newPwdCheckError(status,error,ele,old)
{
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
        }else if(status == "0" && old == newp)
        {
             var msg = "Old Password and New Password should not be same.";
            //error +=msg+"<br/>";
            error.push("n");
            $(ele).val("");
            showLabelFocus(ele,msg);
           // $(ele).focus();
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

                if ($('.shareListingEmail').html() != "") {

                    $('.shareListingEmail').dialog("open");
                }

            },
           width: "auto"
        };
        try{
        $("#dialogParent").remove();
    }catch(e){}
        $("#popup").append('<div id="dialogParent"><div id="dialog" title="' + title + '">' +
                statusContent + '</div></div>');
        $("#dialog").dialog(opt);
       // hideLoader();
    }
}
//init foundation framework

function changePwd()
{
    var oldPwd = document.getElementById("oldPwd").value;
     var root = document.getElementById("rootTheme").value;
      var newPwd = document.getElementById("newPwd").value;
      var that = document.getElementById("changePwdSubmit");
       var confirmPwd = document.getElementById("confirmPwd").value;
       
        $.post(root+"/ajax/loginmanage/change-pwd.php", {oldPwd:oldPwd},function(data){
             if(data!= "")
          {
              showLabelFocus(that,data);
              $(that).val("");
               //$(this).removeAttr("disabled");
              $(that).focus();
            //  hideLoader();
              return false;
          }
    }); 
    /*

      	global $wpdb;
		global $table_prefix;

		//$wp_ad_counter_table = $wpdb->prefix . "ad_counter";

		$submit = $_POST['submit'];
      	if( isset($submit) ) {
      		$results = $wpdb->update('users', array( 'user_pass' => $password),"WHERE ID =".$_REQUEST["$id"]);
      		echo 'Password Updated';
      	}
        else {
            echo 'Password doesnot match ';
        }
        */
}

    
