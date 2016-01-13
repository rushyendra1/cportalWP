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
    if(path == "object-list")
    {
       
         getObjectTemplate('2','','',1,0,0,'Name','asc','all');
        /*$.post(root+"/ajax/object/object-list.php",{type:type},function(e){
            
        });*/
    }
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
     
    $.post(root+"/ajax/object/object-list.php",{view:view,PageNum:page,is_more:isMore,
    field:field,sort_type:sortType, alpha_type:alphaType,object_type:objectType},
        function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayObjects();
            return false;
        }
            
    try {
        var  res = data.objectList;
        var fieldsArray = data.fields;
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
        
            
        $(".displayObjectHeader").html(headerHtml);
       
    if(typeof(result)!= "undefined" && typeof(result.status)!="undefined" && result.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="9">'+result.message+'</td></tr>';
    }else if(len>0){
        for (var i = 0; i < len; i++)
        {
            responseHtml +='<tr  class="dataRow even first">';
            for(var j=0;j<fieldsLen;j++)
            {
                var value = id= fields =  "";
                fields = fieldsArray[j];
            //  if (res[i] != null && typeof (res[i].fields) != "undefined")   
             if (res[i] != null && typeof (res[i][fields]) != "undefined")
                //value = res[i].fields;
                  value = res[i][fields];  
           
                responseHtml +='<td class=" dataCell  " scope="row">'+value+'</td>';
                responseHtml +='<td class=" dataCell  " scope="row">'+value+'</td>';
            }//for closed
            responseHtml +='</tr>';
        }
    }else{
         responseHtml +='<tr><td class="error" colspan="9">No Records To Display</td></tr>';
    }
    
    /** Pagination Links ***/
     var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayObjects", alpha);
    
    $(".paginationLinks").html(paginationHtml);
    
    $(".object-list-res").html(responseHtml);
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
   /** View Type **/
   $("#viewType").on("change",function(e){
      e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var view = $.trim($(this).val());
      var that = this;
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getObjectTemplate(view,that,classView,100,0,type,field,orderType,alphaType);
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
      var length = 1;
      var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getObjectTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
   });
   
   /*** Click on the More Button **/
   $(".moreObject").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      $(this).addClass("activeMore");
      
      var page = getPageNo("displayObjects");  
      var length = 100;
      var view = $.trim($("#viewType").val());
      
      $(this).addClass("activeCont");
      $(".fewerObject").removeClass("activeCont");
      
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getObjectTemplate(view,this,classView,length,page,1,field,orderType,alphaType);
   });
   /*** Fewer functionalities ***/
    $(".fewerObject").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      $(this).addClass("activeFewer");
      showLoader();
      var page = getPageNo("displayObjects");  
      var length = 100;
      var view = $.trim($("#viewType").val());
      $(this).addClass("activeCont");
      $(".moreObject").removeClass("activeCont");
      
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getObjectTemplate(view,this,classView,length,page,0,field,orderType,alphaType);
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
      var length = 100;
      var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(this).data('alphatype'));
      $(".listItem").removeClass("activeAlpha");
      $(".listItem[data-alphatype="+alphaType+"]").addClass("activeAlpha");
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getObjectTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
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
     
      var orderBy = "asc";
      if(orderType == "asc")
          orderBy = "desc";
      var page = getPageNo("displayObjects");  
      var length = 100;
      var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var field = $.trim($(this).data("field"));
      getObjectTemplate(view,this,classView,length,page,type,field,orderBy,alphaType);
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
       if(nextPage == totalPages)
           nextPage = "";
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
    if (prevPage !== "")
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
    return page;
}
