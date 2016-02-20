var geocoder;  
  var files = "";
  var attachWindow ;
  var pageSize = 100;
//  var pageSize = 5; for testing
$ = jQuery.noConflict();
showLoader();
$(document).ready(function(){
    $(document).foundation({
	abide:{
		
	}
});

    var root = $.trim($("#rootTheme").val());
    var path = $.trim($("#path").val());
    var site = $.trim($("#siteTheme").val());
    //var devWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(path != "object-list" && path != "view-object")
    {
        $(".objectmainContentDisp").show();
        $("#footerPortal").show();
        hideLoader();
    }
    /*** Add Object **/
    $(".addObject").on("click",function(e){
        e.stopImmediatePropagation();
    var className = "ajaxCall";
    if($(this).hasClass(className))
         return false;
    $(this).addClass(className);
    var objectType = $.trim($("#object").val());
     var objectName = $.trim($("#objectName").val());
     window.location.href = site+"/add-object?id="+objectType+"&obj_name="+objectName; 
    });
/*** Go back **/
$(".goBack").on("click",function(e){
    e.stopImmediatePropagation();
    var className = "ajaxCall";
    if($(this).hasClass(className))
         return false;
    $(this).addClass(className);
    $(".error").remove();
    $(".errorInput").removeClass("errorInput");
    var title = $(".headTitle").html();
    if(path == "profile" && title == "Edit My Details")
    {
        $(".headTitle").html("My Profile");
        $(".edit").show();
        $(".dispRow").show();
        $(".editRow").hide();
        $(this).removeClass(className);
        return false;
    }
     history.back(); 
     $(this).removeClass(className);
});
var h1 = h2 =  0;
$(".cal1").each(function(){
    var h = $(this).attr("style");
   
    h1 = maxH(h1,h);
});
$(".cal2").each(function(){
    var h = $(this).attr("style");
    
    h2 = maxH(h2,h);
});

var h = h1;
if(h2 >h1 )
    h = h2;

var addStyle= '<style type="text/css">.cal1{ height:'+h+'px !important;}\n\
.cal2{ height:'+h+'px !important;}</style>';
$('head').append(addStyle);
$(".toggle-topbar").on("click",function(){
   $(".top-bar-section").toggle(); 
});
   
   var msg = $("#msg").val();
   if(msg != "")
       alertData("Message",msg);
   if(path == "login"|| path == "forgot")
      $("#username").focus();
   if(path == "set-paasword")
       $("#newPwd").focus();
  // if(path == "change-password")
     //  $("#oldPwd").focus();
   if(path == "object-list")
         getObjectTemplate('','',pageSize,1,0,'','ASC','all');
    
    if(path == "view-object")
    {
        var relatedTypes = $.trim($("#relatedTypes").val());
        var relatedTypesArray = relatedTypes.split(",");
        var relatedObjlen = relatedTypesArray.length;
        
        var relatedLists = $.trim($("#relatedLists").val());
        var relatedListsArray = relatedLists.split(",");
        if(relatedObjlen >0)
        {
            //for(var i =0; i<relatedObjlen; i++)
            //{
            var i =0;
                getObjectTemplateByObject('','',1,'all',1,"CreatedDate","desc",relatedTypesArray,relatedListsArray,i);
            //}
        }
    }
   var blog=$.trim($("#blogname").val());
    
    var gettitle = $.trim($(".headTitle").html());
    if(path =="" && path == "home")
    {
        gettitle = '';
    }
    if(gettitle != "")
        blog = gettitle +' | '+blog;
    document.title = blog;
    

    
    /*** more tabs ***/
    /** Edit User profile page **/
    
   $(".edit").on("click",function(e)
   {
       e.stopImmediatePropagation();
       $(".dispRow").hide();
       $(".editRow").show();
       $(".headTitle").html("Edit My Details");
       var gettitle = $.trim($(".headTitle").html());
   var blog=$.trim($("#blogname").val()); 
    if(gettitle != "")
        blog = gettitle + ' | ' +blog;
    document.title = blog;
     $("#firstname").focus();
       $(this).hide();
   });
   $("#editForm").on("keypress",function(e){
       if(e.keyCode ==13)
       {
           editPerform(e,this);
           return false;
       }
   });
   /** Update profile **/
     $("#mysubmit").on("click",function(e){
           
        editPerform(e,this);
                 
     });
    /** Login Functionality **/
    $("#loginForm").on("keypress",function(e){
       if(e.keyCode ==13)
       {
           //form is submitted
           loginPerform(e,this);
           return false;
       }  
        
    });
   $("#submit").on("click",function(e){
       /** Stop the immediate propagation **/
        loginPerform(e,this)
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
     $(this).removeClass("errorInput");
      $(this).next().hide();
      var status = $.trim($("#status").val());
      var error = [];
       error = pwdCheckError(status,error,"#oldPwd");
       
       error = newPwdCheckError(status,error,this,oldPwd);
       if(error.indexOf("o") != -1)
        {
          $("#oldPwd").focus();
          return false;
        }
           if(error.indexOf("n") != -1)
        {
      
         $(this).val("");
         $(this).focus();
      
          return false;
        }

    }); 
 /** Check the Old Password is existed or not in change password **/
 
 $("#oldPwd").on("blur",function(e){
       e.stopImmediatePropagation();
    
      var pwd  =  $.trim($(this).val());
      $(this).removeClass("errorInput");
      $(this).next().hide();
      var error = [];
      error =  pwdCheckError(status,error,"#oldPwd");
           if(error.indexOf("o") != -1)
        {
          return false;
        }
      var that = this;
      $.post(root +"/ajax/loginmanage/old-pwd-check.php",{old_pwd:pwd,id: $.trim($("#id").val()),status:1},function(data){
          if(data!= "")
          {
              showLabelFocus(that,data);
              $(that).val("");
              $(that).focus();
              return false;
          }
          });
   
    });
    $("#chgFrm").on("keypress",function(e){
        if(e.keyCode ==13)
        {
            changePwdPerform(e,this);
            return false;
        }
    });
     /** Change Password **/
     $("#changePwdSubmit").on("click",function(e){
         changePwdPerform(e,this);
         return false;
     });
     $("#forGotForm").on("keypress",function(e){
         if(e.keyCode ==13)
         { forgotPerform(e,this);
            return false;
         }
     }); 
     /** Forgot password **/
    $("#forogotSubmit").on("click",function(e)
    {
       forgotPerform(e,this);
       return false;
    });
    $("#setPwdForm").on("keypress",function(e){
        if(e.keyCode ==13)
        {
            setPwdPerform(e, this);
            return false;
        }
    }); 
    /** set Password **/
     $("#setpassword").on("click",function(e){
         setPwdPerform(e, this); 
         return false;
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
                '<div  class= "loaderPageant loading '+classNm+'" align="center" ><!--<img src="'+root+'/images/loader3.gif" >--></div>');
        $(".loaderPageant").show();
      
 }
 /**
     * Hide the Loader
     * @name hideLoader
     * @returns void
     */
function hideLoader()
{
        $(".loaderPageant").remove();
       
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
          $("#correctEmail").css("display", "none");
       
         
      }
    else{
            hideData(ele);
       
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
             
        }else{
            hideData(ele);
           
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
           
           $(ele).val("");
           error.push("n");
           showLabelFocus(ele,msg);
           
            
        }else if(newp.length <minPassLen)
        {
            var msg = "Minimum Password character length should be "+minPassLen+".";
            $(ele).val("");
           
            error.push("n");
            $(ele).val("");
            showLabelFocus(ele,msg);
           
        }else if(!passwordValid(newp))
        {
            var msg = "New Password should contains atleast one upper,one lowercase,one number and one symbol.";
            
            error.push("n");
            $(ele).val("");
            showLabelFocus(ele,msg);
            
        }else if(status ==0 &&  oldPwd == newp)
        {
             var msg = "Old Password and New Password should not be same.";
            
            
            error.push("n");
            $(ele).val("");
            showLabelFocus(ele,msg);
           
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
           
            error.push('c');
            showLabelFocus(ele,msg);
            $(ele).val("");
            $(".correctPassword").hide();
            
        }
        else if(newp != confirmp)
        {
            
            error.push('c');
            var msg = "New Password and Confirm New Password should be same.";
            $(ele).val("");
            $(".correctPassword").hide();
            showLabelFocus(ele,msg);
            
        }
        else if(!passwordValid(confirmp))
        {
            var msg = "Confirm New Password should contains atleast one upper,one lowercase,one number and one symbol.";
            error.push('c');
            $(ele).val("");
            showLabelFocus(ele,msg);
            $(".correctPassword").hide();
            
        }
        else{
            hideData(ele);
            $(".correctPassword").show();
           
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
    
    $(ele).next().show();
    $(ele).next().html(msg);
    
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
          return false;
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
            /*close: function ()
            {

            },*/
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
function getObjectTemplate(that,classView,length,page,isMore,field,sortType,alphaType)
{
    showLoader();
    var root = $.trim($("#rootTheme").val()); 
    var site = $.trim($("#siteTheme").val());
     var objectType = $.trim($("#object").val());
     var objectName = $.trim($("#objectName").val());
     var parentObjectType = $.trim($("#parentObjType").val());
     var parentObjId = $.trim($("#parentObjectId").val());
     var isEdit = parseInt($.trim($("#isEdit").val()));
      $.post(root+"/ajax/object/object-list.php",{PageNum:page,
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
            responseHtml +='<tr><td class="error noRecordRow" colspan="'+fieldsLen+'">'+result.message+'</td></tr>';
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
              
            if (res[i] != null && typeof (res[i][fields]) != "undefined")
               
               value = res[i][fields];  
               if(value == "null" || value == null)
                   value= "";
                responseHtml +='<td class=" dataCell  " scope="row">'+nl2br(value)+'</td>';
               
                
            }//for closed
            var editLink = '';
         
            if(isEdit)
                editLink = ' &nbsp; <a>Edit</a>';
            responseHtml +='<td class=" dataCell  " scope="row"><a href="'+site+'/view-object?id='+id+'&type='+objectType+'&obj_name='+objectName+'">View</a>'+editLink+'</td>';
            responseHtml +='</tr>';
        }
        $(".alphaDiv").show();
    }else{
         responseHtml +='<tr><td class="error noRecordRow" colspan="'+fieldsLen+'">No records to display</td></tr>';
    }
    
    /** Pagination Links ***/
     var alpha = '';
       var paginationHtml = '';
      totalRecords =  parseInt(totalRecords);
    paginationHtml += paginationWC("",length, page, totalRecords, len, "displayObjects", alpha);
    
    $(".paginationLinks").html(paginationHtml);
    
    if(totalRecords){
        var showLabel = '';
        var pageRelArray = calculatePageRel(page,totalRecords,len,length);
        var from = pageRelArray[0];
        var to = pageRelArray[1];
        showLabel = 'Showing ' + from + ' to ' + to + ' of ' + totalRecords + ' entries.';
        $(".showTotalCnt").html(showLabel);
    }
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
    responseHtml += '.objectListTable td.error:nth-of-type( 1 ):before { content: "" !important; font-weight:bold;}';
    responseHtml += '}</style>';
    $(".object-list-res").html(responseHtml);
    $(".objectmainContent").show();
    $("#footerPortal").show();
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
      
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getObjectTemplate(this,classView,pageSize,page,type,field,orderType,alphaType);
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
      var alphaType = $.trim($(this).data('alphatype'));
      $(".listItem").removeClass("activeAlpha");
      $(".listItem[data-alphatype="+alphaType+"]").addClass("activeAlpha");
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getObjectTemplate(this,classView,pageSize,page,type,field,orderType,alphaType);
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
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var field = $.trim($(this).data("field"));
      getObjectTemplate(this,classView,pageSize,page,type,field,orderBy,alphaType);
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
       
       
         $(".ui-dialog").remove();
         $("#dialogParent").remove();
       
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
    var nextPage ="", prevPage = "";
   if(page < totalPages)
   {
       nextPage = page+1;
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
function getObjectTemplateByObject(that,classView,page,alphaType,pagePart,field,sortType,objectTypeArray,currentObjectNameArray,iVal)
{
    showLoader();
   var  objectType = objectTypeArray[iVal];
   var currentObjectName = currentObjectNameArray[iVal];
   var objectLen = objectTypeArray.length;
    if(typeof(page) == "undefined")
        page = 0;
    if(typeof(pagePart) == "undefined")
        pagePart = 0;
     var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val()); 
     var parentObjectId = $.trim($("#objectId").val());
     var parentObjType = $.trim($("#objectType").val());
     
    $.post(root+"/ajax/object/object-list.php",{
        object_id:parentObjectId,parent_obj_type :parentObjType,
        object_type:objectType,length:5,
         PageNum:pagePart,alpha_type:alphaType,
        field:field, sort_type:sortType},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayContacts();
            return false;
        }
            var  res = data;
           var result = res.objectList;
           var fieldsArray = data.fields;
           var fieldsLen = fieldsArray.length;
         
            var msg = "Request Message";
            var len = 0;
            
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
            
             var  id =  "";
             responseHtml +='<tr  class="dataRow even first">';
            
            if (result[i] != null && typeof (result[i]['Id']) != "undefined")
            id= result[i]['Id'];
            for(var j=0;j<fieldsLen;j++)
            {
                var value =  fields =  "";
                fields = fieldsArray[j];
           
             if (result[i] != null && typeof (result[i][fields]) != "undefined")
           
                  value = result[i][fields];  
           
                responseHtml +='<td class=" dataCell  " scope="row">'+nl2br(value)+'</td>';
           
                
            }//for closed
            responseHtml +='<td class=" dataCell  " scope="row"><a href="'+siteUrl+'/view-object?id='+id+'&type='+objectType+'&obj_name='+currentObjectName+'"">View</a> &nbsp; <a>Edit</a></td>';
            responseHtml +='</tr>';

           
            
        }
    }
    else
        responseHtml +='<tr><td class="error" colspan="5">No records to display</td></tr>';
 
    page = parseInt(page)+1;
             
   responseHtml += '<style type="text/css">@media only screen and (max-width: 760px),(min-device-width: 768px) and (max-device-width: 1024px)  {';
    var k = 0;
    for(var j=0;j<fieldsLen;j++)
    {
         k = j+1;
         var fields = fieldsArray[j];
        responseHtml += '.object-'+objectType+'-list td:nth-of-type( '+k+' ):before { content: "'+fields+'"; font-weight:bold;}';
    }
    k+=1;
    
    responseHtml += '.object-'+objectType+'-list td:nth-of-type( '+k+' ):before { content: "Action"; font-weight:bold;}';
    responseHtml += '.object-'+objectType+'-list td.error:nth-of-type( 1 ):before { content: "" !important; font-weight:bold;}';
     responseHtml += '}</style>';
    $(".Object"+objectType+"Res").html(responseHtml);
    iVal+=1;
    if(iVal <objectLen)
    {
        getObjectTemplateByObject('','',1,'all',1,"CreatedDate","desc",objectTypeArray,currentObjectNameArray,iVal);
        return false;
    }
    $(".objectmainContent").show();
    $("#footerPortal").show();
    $(that).removeClass(classView);
    displayContacts();
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
            error.push("f");
             showLabelFocus(ele,msg,1);
            
        }else if(isRequired == "required" && name.length < 2)
        {
            var msg = "Minimum Firstname character length should be 2.";
            
            error.push("f");
             showLabelFocus(ele,msg,1);
            
        }else{
             hideData(ele);
            
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
             error.push("l");
            showLabelFocus(ele,msg);
            

        }else if(isRequired == "required" && lastName.length<2){
            var msg = "Minimum Lastname character length should be 2.";
            
            error.push("l");
            showLabelFocus(ele,msg);
            
        }else{
             hideData(ele);
            
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
            
            hidePassword();
            error.push(emsg);
            showLabelFocus(ele,msg);
            
        }
       else  if(phone != "" && !phoneValid(phone))
        {  var msg = "Please enter valid "+type+" number.";
            
            error.push(emsg);
            hidePassword();
            showLabelFocus(ele,msg);
           
        }
        else {
            hideData(ele);
           
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
/**
 * Get the maximum values
 * @name maxH
 * @param {int} h1
 * @param {string} h
 * @returns {@var;h}
 */
function maxH(h1,h)
{
    h = $.trim(h);
     h = h.replace("height:","");
     h = h.replace("px;","");
     h = parseInt($.trim(h));
     h1 =parseInt(h1);
    if(h1 <h)
        h1 = h;
    return h1;
}
/**
 * Convert the new line into break in given string
 * @name nl2br
 * @param {type} str
 * @param {type} is_xhtml
 * @returns {String}
 * 
 */
function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}
/**
 * Perform the login functionality
 * @name loginPerform
 * @param {object} e
 * @param {object} that
 * @returns {Boolean}
 */
function loginPerform(e,that)
{
    e.stopImmediatePropagation();
      var className = "ajaxCall";
        if($(that).hasClass(className))
        {
            return false;
        }
        $(that).addClass(className);
        var root = $.trim($("#rootTheme").val());
        var site = $.trim($("#siteTheme").val());
        showLoader(); 
        $(that).attr("disabled");
      
      $(".errorInput").removeClass("errorInput");
      var username = $.trim($("#username").val());
      var pass = $.trim($("#lpassword").val());
      var title = "Request Message";
        var error = [];
      /** check the error validtions **/
      error = checkUserName("#username",error, "Please enter Username/E-mail.");
      error = checkPwdError("#lpassword",error,"");
      if(error.indexOf("e") != -1)
      {
          $(that).removeAttr("disabled");
          $(that).removeClass(className);
          hideLoader();
          $("#username").focus();
          return false;
      }
       if(error.indexOf("pr") != -1)
      {
          $(that).removeAttr("disabled");
          $(that).removeClass(className);
          hideLoader();
          $("#lpassword").val("");
          $("#lpassword").focus();
          return false;
      }
     // var that = this;
      $.post(root+"/ajax/loginmanage/login-submit.php", {username:username, 
          password:Base64.encode(pass)},function(data){
          data = $.trim(data);
         
        if(data != "")
        {
            
            alertData(title,data);
            $(that).removeClass(className);
            $(that).removeAttr("disabled");
            $("#lpassword").val("");
             hideLoader();
             $("#lpassword").focus();
           
            return false;
        }
     
        window.location.href=site;
   });
}
/**
 * Edit the user details
 * @name editPerform
 * @param {object} e
 * @param {object} that
 * @returns {Boolean}
 */
function editPerform(e,that)
{
    e.stopImmediatePropagation(); 
        var className = "ajaxCall";
        if($(that).hasClass(className))
        {
            return false;
        }
        $(that).addClass(className);
        showLoader();
        var root = $.trim($("#rootTheme").val());
        var site = $.trim($("#siteTheme").val());
        $(that).attr("disabled");
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
            $(that).removeClass(className);
            hideLoader();
            return false;
        }
        //var that = this;
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
}
/**
 * Perform the forgot functionality
 * @name forgotPerform
 * @param {object} e
 * @param {object} that
 * @returns {void}
 */
function forgotPerform(e,that)
{
     var site = $.trim($("#siteTheme").val());
     var root = $.trim($("#rootTheme").val());
      e.stopImmediatePropagation();
       var className = "ajaxCall";
        if($(that).hasClass(className))
        {
            return false;
        }
        $(that).addClass(className);
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
          $(that).removeClass(className);
          $(that).removeAttr("disabled");
          hideLoader();
          $("#username").focus();
          return false;
        }else if(!emailValid(username))
        {
            var msg = "Please enter valid E-mail";
           //alertData(title,msg);
          
            showLabelFocus("#username",msg);
           $(that).removeAttr("disabled");
           $(that).removeClass(className);
            hideLoader();
            $("#username").focus();
            return false;
        }else
            hideData("#username");
        //var that = this;
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
}
/**
 * Set the password functionality
 * @name setPwdperform
 * @param {object} e
 * @param {object} that
 * @returns void
 */
function setPwdPerform(e, that)
{
     var site = $.trim($("#siteTheme").val());
      var root = $.trim($("#rootTheme").val());
        e.stopImmediatePropagation();
        var className = "ajaxCall";
        if($(that).hasClass(className))
        {
            return false;
        }
        $(that).addClass(className);
        showLoader();
        $(that).attr("disabled");
        $(".errorInput").removeClass("errorInput");
        var newp = $.trim($("#newPwd").val());
        //var conp = $.trim($("#confirmPwd").val());
        //var oldPwd = $.trim($("#oldPwd").val());
      //  var status = $.trim($("#status").val());
       var status=1;
        //var title = "Request Message";
        var error = []; 
        
        error = newPwdCheckError(status,error,"#newPwd");
        error = confirmCheckError(error,"#confirmPwd",newp);
           if(error.indexOf("n") != -1)
            {
                 hideEnd(that);
                 $(that).removeClass(className);
                $("#newPwd").focus();
                return false;
            }
            else if(error.indexOf("c") != -1)
            {
                 hideEnd(that);
                 $(that).removeClass(className);
                $("#confirmPwd").focus();
                return false;
            }
            
        var isAdmin = parseInt($.trim($("#isAdmin").val()));
         $(".correctPassword").show();
         //var that = this;
         
         $.post( root+"/ajax/loginmanage/change-pwd-submit.php", {id:$.trim($("#userId").val()),
         new_pwd: Base64.encode(newp),id:$.trim($("#id").val()), is_admin:isAdmin ,
     status:status,rand :$("#rand").val() }, function (data) {
    
                if( data=="0"  )
            {
                window.location.href = site+'/login';
                return false;
            } 
     
            data = $.trim(data);
         //var msg = data.msg;
                         
                      
            //var role = data.role;
          
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
        
     
}
/**
 * perform change password functionality
 * @name changePwdPerform
 * @param {object} e
 * @param {object} that
 * @returns {void}
 */
function changePwdPerform(e,that)
{
    var site = $.trim($("#siteTheme").val());
    var root = $.trim($("#rootTheme").val());
        e.stopImmediatePropagation();
        var className = "ajaxCall";
        if($(that).hasClass(className))
        {
            return false;
        }
        $(that).addClass(className);
        showLoader();
        $(that).attr("disabled");
        $(".errorInput").removeClass("errorInput");
        var old = $.trim($("#oldPwd").val());
        var newp = $.trim($("#newPwd").val());
        var status = $.trim($("#status").val());
       
        //var title = "Request Message";
        var error = []; 
        error = pwdCheckError(status,error,"#oldPwd");
        error = newPwdCheckError(0,error,"#newPwd",old);
        error = confirmCheckError(error,"#confirmPwd",newp);
        
          if(error.indexOf("o") != -1)
            {
                 hideEnd(that);
                 $(that).removeClass(className);
                $("#oldPwd").focus();
                return false;
            }
            else if(error.indexOf("n") != -1)
            {
                 hideEnd(that);
                 $(that).removeClass(className);
                $("#newPwd").focus();
                return false;
            }
            else if(error.indexOf("c") != -1)
            {
                 hideEnd(that);
                 $(that).removeClass(className);
                $("#confirmPwd").focus();
                return false;
            }
            
        var isAdmin = parseInt($.trim($("#isAdmin").val()));
         $(".correctPassword").show();
         //var that = this;
         
         $.post( root+"/ajax/loginmanage/change-pwd-submit.php", {id:$.trim($("#userId").val()),
         old_pwd:Base64.encode(old) , new_pwd: Base64.encode(newp),id:$.trim($("#id").val()), is_admin:isAdmin ,
     status:status,type:"site"}, function (data) {
     
      if(data == "0" )
            {
                window.location.href = site+'/profile';
               
                return false;
            } 
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
        return false;
}
/**
 * Calculate the from and to 
 * @name calculatePageRel
 * @param {int} page
 * @param {int} totalRecords
 * @param {int} lenPage
 * @param {int} pageSize
 * @returns {Array}
 */
function calculatePageRel(page,totalRecords,lenPage,pageSize)
{
    var from = 1, to =pageSize;
    if(totalRecords ==0)
        from =0;
    if(page >1){
        from = (page-1)*pageSize+1;
        to = pageSize*page;
    }
    if(totalRecords <to)
         to = totalRecords;
    if(totalRecords<to)
         to = totalRecords;
    return [from,to];
} 