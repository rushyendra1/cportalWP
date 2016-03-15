$ = jQuery.noConflict();
$(document).ready(function(){
    
    var page = $.trim($("#page").val());
     if(page == "users.php")
    {
        $(".column-username a").removeAttr("href");
        $(".row-actions").html("");
        $("#bulk-action-selector-top option[value=delete]").html("");
        $("#wp-admin-bar-edit-profile").remove();
        $(".page-title-action").remove();
        $(".add-new-h2").remove();
        $("#submit").remove();
            
    } 

   var page = $.trim($("#pages").val());
   if(page == "wc_user_settings")
    userSettingsDispCall();

   if(page == "email_template")
    emailTemplateDispCall();
   $("#saveSettings").on("click",function(e){
               e.stopImmediatePropagation();
               var root = $.trim($("#rootTheme").val());
               showLoader();
               var minPassLen = $.trim($("#minPassLen").val());
               var maxPassLen = $.trim($("#maxPassLen").val());
               var maxLoginAttempts = $.trim($("#maxLoginAttempts").val());
               var title = $.trim($("#headerTitle").val());
               var isallowEdit = 0;
                       
               if($("#allowEdit").is(":checked")) 
                isallowEdit =1;
               
               var error = [];
                error = checkSetError("#minPassLen",error);
                error = checkSetError("#maxPassLen",error);
                error = checkSetError("#maxLoginAttempts",error);
               
                var status = errorFocus(error) ;
                if(!status)
                {
                       $(this).removeAttr("disabled");
                       hideLoader();
                        return false;
                }
                var that = this;
               $.post(root+"/ajax/settings/save-settings.php",{min_pass_len:minPassLen,max_pass_len:maxPassLen,
               max_login_attempts:maxLoginAttempts,is_edit:isallowEdit,title:title},function(data){
                   var msg = data.msg;
                         alertData("Request Message",msg);
                       $(that).removeAttr("disabled")
                       hideLoader();
                       return false;
                   
                  // window.location.href= 'settings.php';
               },"json");
            });
}); 
/**List the email Template
 * @name emailTemplateDispCall
 * @returns {void}
 */
function emailTemplateDispCall()
{
     document.title = "Emal Template List";
        var root = $.trim($("#rootTheme").val());
        $.post(root+"/ajax/email-template/email-template-list-disp.php",{},function(data){
               $(".content-disp").html(data);
               addShowSelect();
                callTemplate(1, "emails","call");
            
             });
}

 

/**
     * User Settings Display
     * @name userSettingsDispCall
     * @returns {void}
     */
    function userSettingsDispCall()
    {
        document.title = "User Settings List";
        var root = $.trim($("#rootTheme").val());
        $.post(root+"/ajax/settings/user-settings-list-disp.php",{},function(data){
               $(".content-disp").html(data);
               addShowSelect();
                callTemplate(1, "user_settings","call");
            
             });
    }
    /**
 * Add the Select 
 * @name addShowSelect
 * @returns {void}
 */    
function addShowSelect()
{
    var selStr = '<div class="showingItems"><span >Items Per Page</span><select id="perPageItem">\n\
                        <option value="10">10</option>\n\
                        <option value="20">20</option>\n\
                        <option value="50">50</option>\n\
                        <option value="100">100</option></select></div>';
              $(".box-content").append(selStr);
}
/**
 * call the template
 * @name callTemplate
 * @param {int} page
 * @param {string} type
 * @param (string) className
 * @param (object) that
 * @returns {voidd}
 */
function callTemplate(page, type,callType, search,className,that){
    var file= "";
    var length = $.trim($("#perPageItem").val());
    var root = $.trim($("#rootTheme").val());
    if( typeof(search) != "undefined" && callType=="search" && search == "")
    {
            alertData("Request Message", "Please enter the search item.")
            //$(this).removeAttr("disabled");
            hideLoader();
            $("#searchItem").focus();
            return false;
    }
    
    if(type == "emails")
    {
        file = "ajax/email-template/email-template-list.php";
    }
    else if(type == "history")
        file = "ajax/history/history-list.php";
     else if(type == "user_settings")
        file = "ajax/settings/setting-list.php";
    
     $.post(root+"/"+file, {page: page, length: length, search:search}, function (res)
    {
        if(type == "emails")
        displayDataTemplate(length, page, res);
        else if(type == "history")
            displayDataHistory(length,page,res);
        else  if(type == "user_settings")
            displayDataSettings(length,page,res);
        $(that).removeClass(className)
    }, "json");
}
/**
 * Display the User Settings
 * @name displayDataSettings
 * @param {int} length
 * @param {int} page
 * @param {object} res
 * @returns {void}
 */
function displayDataSettings(length, page, res)
{
     var tableData = "";
    var pageData = "";
    var len = res.data.length;
    var settingsData = res.data;
    if (len) {
        for (var i = 0; i < len; i++)
        {
            var id = settingsData[i].id;
            var visible = getCheckData(settingsData[i].searchable);
            var required =  getCheckData(settingsData[i].is_required);
            var isVisibleUser =  getCheckData(settingsData[i].is_visible_user);
            var isVisibleReg =  getCheckData(settingsData[i].is_visible_reg);
            var tooltip = settingsData[i].title_placeholder;
            if(tooltip ==null)
                tooltip = "";
         
             var action = '<a class="btn btn-info editUserSet" data-rel="tooltip"  data-original-title="Edit Attribute"  data-id="' + id + '"><i class="halflings-icon white edit"></i></a>';
            tableData += "<tr><td>" + settingsData[i].attribute + "</td>\n\
                            <td>" + settingsData[i].form_element + "</td>\n\
                            <td>" + nl2br(settingsData[i].options) + "</td>\n\
                            <td>" + visible + "</td>\n\
                            <td>" + isVisibleUser + "</td>\n\
                            <td>" + isVisibleReg + "</td>\n\
                             <td>" + required + "</td>\n\
                             <td>" + settingsData[i].placeholder + "</td>\n\
                            <td>" + tooltip + "</td>\n\
                            <td>" + settingsData[i].class_name + "</td>\n\
                            <td>" + settingsData[i].style_name+ "</td>\n\
                            <td>" + settingsData[i].order_by+ "</td>\n\
                            <td>" + action + "</td></tr>";
        }
    } else
        tableData += '<tr><td colspan="8" class="center">No data found.</td></tr>';

    pageData += pagination(length, page, res.recordsTotal, len, "displaySettings");

    pageData += '</div>';
    $("div.paginationDiv").html(pageData);
    $("#userSettingsBody").html(tableData);
    callToolTip();
    userSettingChanges();
    showPopUp();
    hideLoader();
}
/**
 * Display the Pagination
 * @name pagination
 * @param {int} perPage
 * @param {int} start
 * @param {int} total
 * @param {int} pageCnt
 * @param {string} className
 * @returns {String}
 */
function pagination(perPage, start, total, pageCnt, className) {
    var pageArray = commonPagination(perPage, start, total, pageCnt);
    var from = pageArray[0];
    var to = pageArray[1];
    start = pageArray[2];
    total = pageArray[3];
    var nextPage = pageArray[4];
    var prevPage = pageArray[5];
    var totalCnt = pageArray[6];
    var result = '';
    result += '<div class="span12"><div class="dataTables_info" id="DataTables_Table_0_info">';
    if (to) {
        result += 'Showing ' + from + ' to ' + to + ' of ' + total + ' entries.';

    }
    result += '</div></div>';
    result += '<div class="dataTables_paginate paging_bootstrap pagination">';

    //echo "next::".$next_page;
    if (prevPage) {
        result += '<a  class="' + className + '" data-paged="' + prevPage + '"style="cursor:pointer" >  <i class="icon-left-open"></i> Previous </a>';
    }
    if (to) {
        for (var i = 1; i <= totalCnt; i++)
        {
            if (i != start)
                result += '<a  class="endless_page_link ' + className + '" data-paged="' + i + '">' + i + '</a>';
            else
                result += '<span class="endless_page_current"><strong>' + i + '</strong></span>';
        }
        //$result .= 'Displaying ' . $from . ' -' . $to . ' ' . 'of ' . $total;
        if (start != totalCnt) {
            result += '<a class="endless_page_link ' + className + '" data-paged="' + nextPage + '" style="cursor:pointer" > Next <i class="icon-right-open"></i></a>';
        }
    }
    result += '</div>';

    return result;
}
/**
 * Display the common pagination
 * @name commonPagination
 * @param {int} perPage
 * @param {int} start
 * @param {int} total
 * @param {int} perCnt
 * @returns {Array}
 */
function commonPagination(perPage, start, total, perCnt)
{
    start = parseInt(start);
    perPage = parseInt(perPage);
    total = parseInt(total);
    perCnt = parseInt(perCnt);
    var to = 1;
    var offsetLimit = from = start;
    var end = to = perPage;
    if (start !== 1 && start !== 0) {
        end = start * perPage;
        offsetLimit = end - perPage;
        from = offsetLimit + 1;
        // $to = $offset_end-1;
    }
    /*var  offsetStart = offsetLimit;
     if (start == 1)
     offsetStart = 0;*/
    var displayRange = end - offsetLimit;
    var totalCnt = Math.ceil(total / perPage);
    var nextPage = start + 1;
    var prevPage = start - 1;
    if (displayRange > perCnt)
        to = total;
    if(to >total)
        to = total;
    return [from, to, start, total, nextPage, prevPage, totalCnt];
}
/**
 * Functioality for user settings
 * @name userSettingChanges
 * @returns {void}
 */
function userSettingChanges()
{
    /** PerPage History **/
     $("#perPageItem").on("change",function(e){
        e.stopImmediatePropagation();
        var className = "ajaxCall";
        if($(this).hasClass(className))
        {
            return false;
        }
        $(this).addClass(className);
       callTemplate(1, "user_settings","call", "" ,className, this);
         });
   /** Add the Attribute **/ 
    $(".addClass").on("click",function(e){
       e.stopImmediatePropagation();
       showLoader();
       var title = "Add Attribute";
       var data = userSettingsForm(title);
        $("#titleBred").html(title);
        document.title = title;
        $(".content-disp").html(data);
        userSettingsCheckErrors();
       
    });
    /** Edit Attribute **/
    $(".editUserSet").on("click",function(e){
        e.stopImmediatePropagation();
        var that = this;
        var className = "ajaxCall";
        if($(this).hasClass(className))
            return false
        $(this).addClass(className);
       showLoader();
       var id = $.trim($(this).data("id"));
       var title = "Edit Attribute";
       var data = userSettingsForm(title);
       var root = $.trim($("#rootTheme").val());
       document.title = title;
       $("#titleBred").html(title);
        $(".content-disp").html(data);
        $.post(root+"/ajax/settings/view-user-settings.php",{id:id},function(res){
            var settingsInfo = res.data;
            $("#name").val(settingsInfo.attribute);
             $("#name").attr("disabled","disabled");
            $("#options").val(settingsInfo.options);
            $("#placeholder").val(settingsInfo.placeholder);
            $("#title_placeholder").val(settingsInfo.title_placeholder);
            $("#className").val(settingsInfo.class_name);
            $("#styleName").val(settingsInfo.style_name);
            if(settingsInfo.searchable=="1")
                $("#isVisible").attr("checked","checked");
            if(settingsInfo.is_required=="1")
                $("#isRequired").attr("checked","checked");
            if(settingsInfo.is_visible_reg =="1")
                $("#isVisibleReg").attr("checked","checked");
            if(settingsInfo.is_visible_user=="1")
                $("#isVisibleUser").attr("checked","checked");
            $('#elementType option[value="'+settingsInfo.form_element+'"]').attr("selected","selected");
             $('#id').val(settingsInfo.id);
             userSettingsCheckErrors();
             if(settingsInfo.attribute == "address")
             {
                 $("#elementType").attr("disabled","disabled");
                 $(".dropDownDiv").hide();
                 $(".placeHolderDiv").hide();
                 $(".toolTipDiv").hide();
                 $(".classNameDiv").hide();
                 $(".styleNameDisp").hide();
                 
             }else {
                 $('#elementType option[value="radio"]').hide();
                 $('#elementType option[value="checkbox"]').hide();
                 $('#elementType option[value="dropdown"]').hide();
                 
                 $("#elementType").removeAttr("disabled");
                 $(".dropDownDiv").hide();
                 $(".placeHolderDiv").show();
                 $(".toolTipDiv").show();
                 $(".classNameDiv").show();
                 $(".styleNameDisp").show();
                 
             }
             /*else{
                 $("#elementType").removeAttr("disabled");
                 $(".dropDownDiv").show();
                 $(".placeHolderDiv").show();
                 $(".toolTipDiv").show();
                 $(".classNameDiv").show();
                 $(".styleNameDisp").show();
                 
                 $('#elementType option[value="radio"]').show();
                 $('#elementType option[value="checkbox"]').show();
                 $('#elementType option[value="dropdown"]').show();
             }*/
            $(that).removeClass(className);
             hideLoader();
        },'json');
       
    });
    
    /** show the sort Order for user settings **/
    $(".sortOrder").on("click",function(e){
       e.stopImmediatePropagation();
       var ele = $(this).find("span.sorting-indicator");
       var val = ele.html();
       $(".sorting-indicator").val("^");
       $(".sorting-indicator").hide();
       $(ele).show();
       var sortBy = "";
       if(val == "^"){
           val = "v"
           sortBy = "desc";
       }
       else{
           val = "^";
           sortBy = "asc";
       }
       $(ele).html(val);
       var fieldVal = $(this).data("type");
       
     var search = $.trim($("#searchItem").val());
     var length =10;
     var root = $.trim($("#rootTheme").val());
     var page =1;
       $.post(root+"/ajax/settings/setting-list.php",{sort:fieldVal, sort_by:sortBy,search:search,
       page: page, length: length},function(res){
                  displayDataSettings(length, page, res);
       },'json');
       
    });
    /** Search the settings by attribute **/
    $(".searchUserSettings").on("click",function(e){
       e.stopImmediatePropagation();
        showLoader();
            var className = "ajaxCall";
        if($(this).hasClass(className))
            return false;
        $(this).addClass(className);
        callTemplate(1, "user_settings", "search",$.trim($("#searchItem").val()),className,this);
       // historyChanges();
        hideLoader();
    });
}
/**
 * Display the Popup
 * @name showPopUp
 * @returns {void}
 */
function showPopUp()
{
    $('.btn-setting').click(function (e) {
        e.preventDefault();
        $('#popupDisp').modal('show');
    });
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
 * Get the Checkbox Value
 * @name getCheckData
 * @param {string} str
 * @returns {String}
 */
function getCheckData(str)
{
     var required = "No";
      str = parseInt($.trim(str));
     if(str==1)
          required = "Yes";
      return required
}
/**
 * Convert the new line into break
 * @name nl2br
 * @param {string} str
 * @param {type} is_xhtml
 * @returns {String}
 */
function nl2br(str, is_xhtml) {
  //  discuss at: http://phpjs.org/functions/nl2br/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Philip Peterson
  // improved by: Onno Marsman
  // improved by: Atli Þór
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Maximusya
  // bugfixed by: Onno Marsman
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //   example 1: nl2br('Kevin\nvan\nZonneveld');
  //   returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
  //   example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
  //   returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
  //   example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
  //   returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'

  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

  return (str + '')
    .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
/**
     * Show the Loader
     * @name showLoader
     * @returns {void}
     */
    function showLoader()
    {
        //var root = $.trim($("#root").val());
       /* root = root.replace("app/php","");
        root = root.replace("////g","");
        root = root.replace("/\\/g","");*/
        $("#primary").append(
                '<div  class= "loaderPageant" ><img src="img/ajax_loader.png" ></div>');
      
        //$(".loaderPageant").show();
    }
    /**
 * User Settings Form
 * @name userSettingsForm
 * @param {string} type
 * @returns {String}
 */
function userSettingsForm(type)
{
    var data = "";
         data += '<div class="box-header" data-original-title>\n\
                      <h2><i class="halflings-icon envelope"></i><span class="break"></span>'+type+'</h2>';
        data += '<div class="box-icon"><small><em>* = Required</em></small></div>';
                 data += '</div>\n\ <div class="box-content addEmailDisp" >';
            data +='<div class="control-group ">\n\
        <label  class="control-label viewEmailDisp">Name*</label>';
       data +='<div class="controls viewControls">';
       data+='<input type="text" id="name" placeholder="Enter Name" >\n\
             <p class="help-block errorTag" style="display:none"></p></div></div>';
        
       data +='<div class="control-group ">\n\
        <label  class="control-label viewEmailDisp">Element Type*</label>';
       data +='<div class="controls viewControls">';
       data+='<select id="elementType"><option value="">Please Select</option>';
       data += '<option value="text" >Text</option><option value="textarea" >Textarea</option>\n\
            <option value="dropdown" >Dropdown</option><option value="checkbox" >Checkbox</option>\n\
            <option value="radio" > Radio</option></select>';
     data+='<p class="help-block errorTag" style="display:none"></p></div></div>';
            
             data +='<div class="control-group dropDownDiv ">\n\
        <label " class="control-label viewEmailDisp">Options For Dropdown</label>\n\
       <div class="controls viewControls"> <textarea id="options"></textarea>\n\
 <p class="help-block errorTag" style="display:none"></p>\n\
<p class="help-block" >Note: Please enter one or more option values separated by enter and \n\
option value and option label are separated by :: suppose option value and label is same only specify label (option / value::option)</p></div></div>'; 
    
             data +='<div class="control-group placeHolderDiv  ">\n\
        <label " class="control-label viewEmailDisp">Place Holder</label>\n\
       <div class="controls viewControls"><input type="text" id="placeholder" placeholder="Enter Place Holder">\n\
 <p class="help-block errorTag" style="display:none"></p></div></div>';
    
           data +='<div class="control-group toolTipDiv ">\n\
        <label " class="control-label viewEmailDisp">Tool Tip</label>\n\
       <div class="controls viewControls"><input type="text" id="title_placeholder" placeholder="Enter Tooltip">\n\
 <p class="help-block errorTag" style="display:none"></p></div></div>';
  
    data +='<div class="control-group classNameDiv">\n\
        <label " class="control-label viewEmailDisp ">Class Name</label>\n\
       <div class="controls viewControls"><input type="text" id="className" placeholder="Enter Class Name">\n\
 <p class="help-block errorTag" style="display:none"></p></div></div>'; 
    data +='<div class="control-group  styleNameDisp">\n\
        <label " class="control-label viewEmailDisp ">Style Name</label>\n\
       <div class="controls viewControls"><input type="text" id="styleName" placeholder="Enter Style Name">\n\
 <p class="help-block errorTag" style="display:none"></p></div></div>'; 
    
    data +='<div class="control-group ">\n\
        <label " class="control-label viewEmailDisp">Visible On Register</label>\n\
       <div class="controls viewControls"><input type="checkbox" id="isVisibleReg" >\n\
 <p class="help-block errorTag" style="display:none"></p></div></div>'; 
    
    data +='<div class="control-group ">\n\
        <label " class="control-label viewEmailDisp">Visible On User</label>\n\
       <div class="controls viewControls"><input type="checkbox" id="isVisibleUser" >\n\
 <p class="help-block errorTag" style="display:none"></p></div></div>'; 
    
    data +='<div class="control-group ">\n\
        <label " class="control-label viewEmailDisp">Visible</label>\n\
       <div class="controls viewControls"><input type="checkbox" id="isVisible" >\n\
 <p class="help-block errorTag" style="display:none"></p></div></div>'; 
    
   data +='<div class="control-group ">\n\
        <label " class="control-label viewEmailDisp">Required</label>\n\
       <div class="controls viewControls"><input type="checkbox" id="isRequired" >\n\
 <p class="help-block errorTag" style="display:none"></p></div></div><input type="hidden" id="id" >'; 
            
       data += ' <button  id="saveUserSettingSubmit" class="btn btn-primary">Submit</button></div>';
       
    return data;
}
/**
 * User Check Errors
 * @name userSettingsCheckErrors
 * @returns {void}
 */
function userSettingsCheckErrors()
{
    /** check the required fields above the element type**/
    $("#elementType").on("focus",function(e){
        e.stopImmediatePropagation();
        var error = [];
         error = firstNameError("#name", error);
           errorFocus(error);
        
    });
    /** Check the required field above the elements **/
    $("#options,#placeholder,#className,#styleName,#isVisible,#isRequired").on("focus",function(e){
        e.stopImmediatePropagation();
        var error = [];
         error = firstNameError("#name", error);
         error = roleValidation("#elementType", error);
           errorFocus(error);
        
    });
    /** Is Required Click Then visible, visible on registration , visible on users **/
     var status = $("#isVisible").is(":checked");
         var regStatus = $("#isVisibleReg").is(":checked");
         var userStatus =   $("#isVisibleUser").is(":checked");
    $("#isRequired").on("click",function(e){
       
       if($(this).is(":checked")) 
       {
           
           $("#isVisible").attr("checked","checked");
           $("#isVisibleReg").attr("checked","checked");
           $("#isVisibleUser").attr("checked","checked");
       }else {
           if(!status)
                $("#isVisible").removeAttr("checked");
            if(!regStatus)
                $("#isVisibleReg").removeAttr("checked");
            if(!userStatus)
                $("#isVisibleUser").removeAttr("checked");
       }
    });
    /** Save the user setting attributes **/
    $("#saveUserSettingSubmit").on("click",function(e){
       e.stopImmediatePropagation();
       $(this).attr("disabled", "disabled");
        showLoader();
         var root = $.trim($("#rootTheme").val());
        var attribute = $.trim($("#name").val());
        var elementType = $.trim($("#elementType").val());
        var placeholder = $.trim($("#placeholder").val());
        var options = $.trim($("#options").val());
        var isSearch = getCheckedValues("#isVisible");
        var isRequired = getCheckedValues("#isRequired");
        var isVisibleReg = getCheckedValues("#isVisibleReg");
        var isVisibleUser = getCheckedValues("#isVisibleUser");
       
        var className = $.trim($("#className").val());
        var styleName = $.trim($("#styleName").val());
       
          var error = [];
         error = firstNameError("#name", error);
         error = roleValidation("#elementType", error);
          error = requiredValidation( error);
         var status = errorFocus(error);
      
        if(!status)
        {
           
            $(this).removeAttr("disabled");
            hideLoader();
            return false;
        }
       $.post(root+"/ajax/settings/save-user-settings.php", {
        name:attribute, element_type: elementType,options:options,title_place_holder:$.trim($("#title_placeholder").val()),
        is_search:isSearch,id: $("#id").val(), place_holder:placeholder, 
        class_name:className,style_name:styleName,is_required:isRequired,
        is_visible_user: isVisibleUser, is_visible_reg:isVisibleReg},function(data)
	{
            alertData("Request Message", "Your Settings has been updated successfully.");
            userSettingsDispCall()
            hideLoader();
            //window.location.href = "user-settings.php";
             return false;
        });
    });
}
/**
 * @name getCheckedValues
 * @param {object} ele
 * @returns {Number}
 */
function getCheckedValues(ele)
{
    var isCheck = 0;
        if($(ele).is(":checked"))
            isCheck =1;
        return isCheck
}
/**
     * Display the first name errors
     * @name firstNameError
     * @param {object} ele
     * @param {array} error
     
     * @returns {array}
     */
    function firstNameError(ele, error)
    {
        var name = $.trim($(ele).val());
        var isRequired = $.trim($(ele).data("required"));
        var errorMsg = "Firstname";
        var errorType = "f";
        if(ele == "#name"){
            errorMsg = "Name";
            errorType = "nm";
        }
        if (isRequired== "required" && name == "")
        {
            var msg = "Please enter your "+errorMsg+".";
            //error  += msg+"<br/>";
            error.push(errorType);
            showLabelFocus(ele, msg, 1);
            //$(ele).focus();
        } else if (isRequired== "required" && name.length < 2)
        {
            var msg = "Minimum "+errorMsg+" character length should be 2.";
            //error  += msg+"<br/>";
            error.push(errorType);
            showLabelFocus(ele, msg, 1);
            // $(ele).focus();
        } else {
            hideData(ele);
            /* if($(nextEle).val() == "")
             $(nextEle).focus();*/
        }
        return error;
    }
    /**
     * Hide the element 
     * @name hideData 
     * @param {object} ele
     * @returns {void} */
    function hideData(ele)
    {
        var id = $(ele).next().next();
        if ($(ele).next().hasClass("help-block"))
            id = $(ele).next();
        id.hide();
        $(ele).removeClass("errorInput");
    }
    /**
     * Get the Role validation
     * @name roleValidation
     * @param {object} ele
     * @param {array} error
     * @returns {void}
     */
    function roleValidation(ele,error)
{
     var role = $.trim($(ele).val());
     var eleMsg = "et";
     var msgTxt = "Element Type";
     if(ele == "#role"){
          eleMsg = "r";
          msgTxt = "Role";
      }
      else if(ele == "#username"){
          eleMsg = "um";
          msgTxt = "Salesforce Username";
      }
      else if(ele == "#password"){
          eleMsg = "pd";
          msgTxt = "Salesforce Password";
      }
      else if(ele == "#token"){
          eleMsg = "tok";
          msgTxt = "Salesforce Token";
      }
     if ( role == "")
        {
            var msg = "Please select "+msgTxt+".";
            error.push(eleMsg);
            showLabelFocus(ele, msg);
            //$(ele).focus();
        }  else {
            hideData(ele);
            /* if($(nextEle).val() == "")
             $(nextEle).focus();*/
        }
        return error;
}
/**
 * Check the error
 * @name isCheck
 * @param {object} ele
 * @param {int} status
 * @param {string} msg
 * @param {string} emsg
 * @param {array} error
 * @returns {array}
 */
function isCheck(ele,status,msg,emsg,error)
{
     if ( status && !$(ele).is(":checked"))
        {
            error.push(emsg);
            showLabelFocus(ele, msg);
        }
        else 
            hideData(ele);
        return error;
        
}
/**
 * Check the validation in user settings
 * @name requiredValidation
 * @param {array} error
 * @returns {array}
 */
function requiredValidation(error)
{
    var status = $("#isRequired").is(":checked");
    error = isCheck("#isVisibleUser",status,"Please check the visible on user.","visUser",error);
    error = isCheck("#isVisibleReg",status,"Please check the visible on register.","visReg",error);
    error = isCheck("#isVisible",status,"Please check the visible.","vis",error);
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
        var ele = "";
        if(typeof error == "undefined" )
            return true;
        if (error.indexOf("f") != -1)
            ele = "#firstname";
        else if (error.indexOf("l") != -1)
            ele = "#lastname";
        else if (error.indexOf("e") != -1)
            ele = "#email";
        else if (error.indexOf("ae") != -1)
            ele = "#alternateemail";
        else if (error.indexOf("pr") != -1)
            ele = "#password";
         else if (error.indexOf("pcr") != -1)
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
        else if (error.indexOf("ppr") != -1)
            ele = "#phone";
        else if (error.indexOf("pmr") != -1)
            ele = "#mobile";
        else if (error.indexOf("r") != -1)
            ele = "#role";
        else if (error.indexOf("mip") != -1)
            ele = "#minPassLen";
        else if (error.indexOf("map") != -1)
            ele = "#maxPassLen";
        else if (error.indexOf("mal") != -1)
            ele = "#maxLoginAttempts";
        else if(error.indexOf("con") != -1)
            ele = "#contentEmail";
         else if(error.indexOf("sub") != -1)
            ele = "#subject";
        else if(error.indexOf("nm") != -1)
            ele = "#name";
        else if (error.indexOf("et") != -1)
            ele = "#elementType";
        else if (error.indexOf("vis") != -1)
            ele = "#isVisible";
          else if (error.indexOf("visUser") != -1)
            ele = "#isVisibleUser";
          else if (error.indexOf("visReg") != -1)
            ele = "#isVisibleReg";
          else if (error.indexOf("nemail") != -1)
            ele = "#newEmail";
         else if (error.indexOf("um") != -1)
            ele = "#username";
        else if (error.indexOf("pd") != -1)
            ele = "#password";
        else if (error.indexOf("tok") != -1)
            ele = "#token";
        
         if (ele != "#email" && $.trim($(ele).val()) != "")
            $("#correctEmail").css("display", "block");
        if (ele != "") {
            //$("#password").val("");
            //$("#confirmpassword").val("");
           // hideData("#password");
            //hideData("#confirmpassword");
           // $(".passStrengthify").css("display", "none");
            $(ele).focus();
            return false;
        }
        return true;
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


            $("#popupDisp").find("h3").html(title);
            $("#popupDisp").find("div.modal-body").html(statusContent);
            showPopUp();
            $(".btn-setting").trigger("click");
            /* var opt = {
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
             // hideLoader();*/
        }
    }
    /**
 * Display the data Template
 * @name displayDataTemplate
 * @param {int} length
 * @param {int} page
 * @param {object} res
 * @returns {void}
 */
function displayDataTemplate(length, page, res)
{
    var tableData = "";
    var pageData = "";
    var len = res.data.length;
    var userData = res.data;
    if (len) {
        for (var i = 0; i < len; i++)
        {
            var id = userData[i].id;
            var action = '<a class="btn btn-info editEmail" data-id="'+ id +'"  data-rel="tooltip" data-original-title="Edit E-mail Template"><i class="halflings-icon white edit"></i></a>';
            action += '<a class="btn btn-danger accountChange" data-original-title="Delete E-mail Template" data-rel="tooltip" data-id="' + id + '"><i class="halflings-icon white trash"></i></a>';
            tableData += "<tr><td><input type='checkbox' class='checkData' value='" + id + "'></td>\n\
                             <td>" + userData[i].name + "</td>\n\\n\
                            <td>" + userData[i].subject + "</td>\n\
                              <td>" + nl2br(userData[i].content) + "</td>\n\
                               <td>" + action + "</td></tr>";
        }
    } else
        tableData += '<tr><td colspan="8" class="center">No data found.</td></tr>';

    pageData += pagination(length, page, res.recordsTotal, len, "displayEmails");

    pageData += '</div>';
    $("div.paginationDiv").html(pageData);
    $("#emailTemplateBody").html(tableData);
    callToolTip();
    emailTemplateChanges();
    showPopUp();
    hideLoader();
}
/**
 * get the tooltip values
 * @name callToolTip
 * @returns {void}
 */
function callToolTip()
{
    $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});
}
/**
 * Changes the account status
 * @name emailTemplateChanges
 * @returns {void}
 */
function  emailTemplateChanges()
{
    var root = $.trim($("#rootTheme").val());
    /** Per Page Display **/
      $("#perPageItem").on("change",function(e){
        e.stopImmediatePropagation();
        var className = "ajaxCall";
        if($(this).hasClass(className))
        {
            return false;
        }
        $(this).addClass(className);
       callTemplate(1, "emails","call","",className, this);
       
    });
    /** show the sort Order for users **/
    $(".sortOrder").on("click",function(e){
       e.stopImmediatePropagation();
        var className = "ajaxCall";
        if($(this).hasClass(className))
        {
            return false;
        }
        $(this).addClass(className);
       var ele = $(this).find("span.sorting-indicator");
       var val = ele.html();
       $(".sorting-indicator").val("^");
       $(".sorting-indicator").hide();
       $(ele).show();
       var sortBy = "";
       if(val == "^"){
           val = "v"
           sortBy = "desc";
       }
       else{
           val = "^";
           sortBy = "asc";
       }
       $(ele).html(val);
       var fieldVal = $(this).data("type");
       
     var search = $.trim($("#searchItem").val());
     var length =10;
     var page =1;
     var that = this;
       $.post("ajax/email-template/email-template-list.php",{sort:fieldVal, sort_by:sortBy,search:search,
       page: page, length: length},function(res){
                  displayDataTemplate(length, page, res);
                   $(that).removeClass(className);
       },'json');
       
    });
    /** Get the Add Email Template List **/
   $(".addClass").on("click",function(e){
       
        e.stopImmediatePropagation();
        var className = "ajaxCall";
        if($(this).hasClass(className))
            return false;
        $(this).addClass(className);
        showLoader();
        var data = emailForm("Add");
        var title = "Add E-mail Template";
         $("#titleBred").html(title);
          document.title = title;
        $(".content-disp").html(data);
        $(this).removeClass(className);
        firstNameFocus("#name");
        emailCheckErrors();
        hideLoader();
   });
    /** Edit E-mail Template **/
    $(".editEmail").on("click",function(e){
        e.stopImmediatePropagation();
        var className = "ajaxCall";
        if($(this).hasClass(className))
            return false;
        $(this).addClass(className);
        showLoader();
        var id = $(this).data("id");
        var that = this;
       $.post(root+"/ajax/email-template/view-email-template.php",{id:id},function(res){
           var data = emailForm("Edit");
           var title = "Edit E-mail Template";
           $("#titleBred").html(title);
           document.title = title;
           $(".content-disp").html(data);
           var emailInfo = res.data;
           $("#name").val(emailInfo.name);
           $("#name").attr("disabled","disabled");
           $("#subject").val(emailInfo.subject);
           $("#contentEmail").val(emailInfo.content);
           $("#id").val(emailInfo.id);
           firstNameFocus("#name");
           emailCheckErrors();
           $(that).removeClass(className);
           hideLoader();
        },"json");
        //hideLoader();
    }); 
    //check the check boxex
    checkAll();
   
   
    /** status Changes **/
    $(".accountChange").on("click", function (e) {
        e.stopImmediatePropagation();
         var that = this;
        var className = "ajaxCall";
        if($(this).hasClass(className))
            return false;
        $(this).addClass(className);
        if (!confirm("Are you sure want to delete Email Template?"))
        {
             $(that).removeClass(className);
            return false;
        }
        $(this).attr("disabled");
        showLoader();
        var idArray = $.trim($(this).data("id"));
        var id = [idArray];
        $.post(root+"/ajax/email-template/delete-email-template.php", {id: id}, function (data) {
           // window.location.href = "email-template.php";
            $(that).removeClass(className);
            emailTemplateDispCall();
            hideLoader();
            return false;
        });
    });
    //delete the selected users
    $(".deleteAllEmailClass").on("click", function (e)
    {
        e.stopImmediatePropagation();
        var that = this;
        var className = "ajaxCall";
        if($(this).hasClass(className))
            return false;
        $(this).addClass(className);
        var title = "Request Message";
        var delId = [];
        $(".checkData").each(function ()
        {
            if ($(this).is(":checked"))
                delId.push($(this).val());
        });
        if (!delId.length)
        {
            alertData(title, "Please select atleast one of the E-mail Template");
            $(that).removeClass(className);
            return false;
        }
      
            var r = confirm("Are sure want to delete the E-mail Template?");
            if (r == false) {
                //hideLoader();
                $(that).removeClass(className);
                return false;
            }
       
        showLoader();
        var id = delId;
        $.post(root+"/ajax/email-template/delete-email-template.php", {"id": id}, function (data) {
            var msg = data.msg;
            if (data.error==0)
            {
                 alertData(title,msg);
                 $(that).removeClass(className);
                 emailTemplateDispCall();
                 hideLoader();
                 return false;
                //window.location.href = "email-template.php";
            }else{
                alertData(title,msg);
                $(that).removeClass(className);
                 hideLoader();
                 return false;
            }
        },"json");
    });
    
    /** Search the email template by name **/
    $(".searchEmails").on("click", function (e) {
        e.stopImmediatePropagation();
         var className = "ajaxCall";
        if($(this).hasClass(className))
            return false;
        $(this).addClass(className);
        showLoader();
        /*$(this).attr("disabled");
        var search = $.trim($("#searchItem").val());
        if (search == "")
        {
            alertData("Request Message", "Please enter the search item.")
            $(this).removeAttr("disabled");
            hideLoader();
            $("#searchItem").focus();
            return false;
        }*/
         callTemplate(1, "emails", "search",$.trim($("#searchItem").val()),className,this);
        //classEmailSearch(1, 10, search);
    });
    /** email pagination **/
     $(".displayEmails").on("click", function (e) {
        e.stopImmediatePropagation();
            var className = "ajaxCall";
        if($(this).hasClass(className))
            return false;
        $(this).addClass(className);
        showLoader();
        callTemplate($(this).data("paged"), "emails", "page",$.trim($("#searchItem").val()),className,this);
        showPopUp();
        $("#checkBoxId").removeAttr("checked");
        hideLoader();
        return false;
    });
    
    }
/**
 * Check/uncheck the checkboxes
 * @name checkAll
 * @returns {void}
 */
function checkAll(ele)
{
      /** check All **/
      if(typeof(ele) == "undefined")
          ele = "#checkBoxId";
      else {
          var obj =  $("#userTab li.active a").attr("href");
          ele = obj + "  " + ele; 
      }
      
         
      $(ele).on("click", function(e)
  {
      e.stopImmediatePropagation();
	  if($(this).is(":checked"))
	   $(".checkData").attr("checked", "checked");
	   else
	   $(".checkData").removeAttr("checked");
	
  });
}
/**
     * @name emailForm
     * @param string type
     * @returns {String}
     */
    function emailForm(type)
    {
        var data = "";
         data += '<div class="box-header" data-original-title>\n\
                      <h2><i class="halflings-icon envelope"></i><span class="break"></span>'+type+' Email Template</h2>';
        data += '<div class="box-icon"><small><em>* = Required</em></small></div>';
                 data += '</div>\n\ <div class="box-content addEmailDisp" >';
            data +='<div class="control-group ">\n\
        <label  class="control-label viewEmailDisp">Name*</label>';
       data +='<div class="controls viewControls">';
       data+='<input type="text" id="name" placeholder="Enter Name"  data-required="required">\n\
             <p class="help-block errorTag" style="display:none"></p></div></div>';
        
            data +='<div class="control-group ">\n\
        <label  class="control-label viewEmailDisp">Subject*</label>';
       data +='<div class="controls viewControls">';
         data+='<input type="text" id="subject" placeholder="Enter Subject" data-required="required" >\n\
             <p class="help-block errorTag" style="display:none"></p></div></div>';
            
             data +='<div class="control-group ">\n\
        <label " class="control-label viewEmailDisp">Content *</label>\n\
       <div class="controls viewControls"><textarea id="contentEmail" placeholder="Enter Content" data-required="required"></textarea>\n\
 <p class="help-block errorTag" style="display:none"></p></div></div><input type="hidden" id="id" >';
            
            
       data += ' <button  id="saveEmailSubmit" class="btn btn-primary">Submit</button></div>';
       emailCheckErrors();
       return data;
    }
     /**
     * Check the email Errors
     * @name emailCheckErrors
     * @returns {void}
     */
    function emailCheckErrors()
{
    var root = $.trim($("#rootTheme").val());
      /** Check the above content element validations **/
        $("#subject").on("focus", function () {
            var error = [];
            //hideData("#firstname");
            error = firstNameError("#name", error);
            errorFocus(error);

        });
        /** Check the Required fileds above the contant **/
        $("#contentEmail").on("focus", function () {
            var error = [];
            //hideData("#firstname");
            error = firstNameError("#name", error);
            error = LastNameError("#subject",error);
            errorFocus(error);

        });
        /** Submit the data **/
       $("#saveEmailSubmit").on("click",function(e){
        e.stopImmediatePropagation();
        showLoader();
         $(this).attr("disabled");
        $(".errorInput").removeClass("errorInput");
        var name = $.trim($("#name").val());
        var content = $.trim($("#contentEmail").val());
        var subject = $.trim($("#subject").val());
      
        var error = [];
        error = firstNameError("#name",error);
        error = LastNameError("#subject",error);
        error = LastNameError("#contentEmail",error);
      
        var status = errorFocus(error);
      
        if(!status)
        {
           
            $(this).removeAttr("disabled");
            hideLoader();
            return false;
        }
        var that = this;
        var title = "Request Message";
        $.post(root+"/ajax/email-template/save-email-template.php", {name:name,content:content, 
                             id:$.trim($("#id").val()), subject:subject},function(data){
                             var msg = data.msg;
                if(data.error ==1)
                {
                    alertData(title,msg);
                    $(that).removeAttr("disabled");
                    hideLoader();
                    return false;
                }else{
                    alertData(title,msg);
                    emailTemplateDispCall();
                    hideLoader();
                    return false;
                }             
           // window.location.href= "email-template.php";
            hideLoader();
        },'json');
        
    });
}
/**
 * Focus to first name
 * @name firstNameFocus
 * @returns {void}
 */
function firstNameFocus(ele)
{
      $(ele).focus();
}
/**
     * Focus to the element
     * @name showLabelFocus
     * @param {type} ele
     * @param {type} msg
     * @returns {void}
     */
    function showLabelFocus(ele, msg)
    {
        var id = $(ele).next().next();
        if ($(ele).next().hasClass("help-block"))
                  id = $(ele).next();
        id.show();
        id.html(msg);
        $(ele).addClass("errorInput");
    }
 /**
     * Display the Last name errors
     * @name LastNameError
     * @param {object} ele
     * @param {array} error
     * @returns {array}
     */
    function LastNameError(ele, error)
    {
        var lastName = $.trim($(ele).val());
         var isRequired = $.trim($(ele).data("required"));
        var errorType = "l";
        var errorMsg = "Lastname";
        if(ele == "#contentEmail"){
            errorType = "con";
            errorMsg = "Content";
        }
         if(ele == "#subject"){
            errorType = "sub";
            errorMsg = "Subject";
        }
        if (isRequired == "required" && lastName == "")
        {
            var msg = "Please enter your "+errorMsg+".";
            //error += msg+"<br/>";
            error.push(errorType);
            showLabelFocus(ele, msg);
            //$(ele).focus();

        } else if (isRequired == "required" && lastName.length < 2) {
            var msg = "Minimum "+errorMsg+" character length should be 2.";
            //error += msg+"<br/>";
            error.push(errorType);
            showLabelFocus(ele, msg);
            //$(ele).focus();
        } else {
            hideData(ele);
            /* if($(nextEle).val() == "")
             $(nextEle).focus();*/
        }
        return error;
    }
    /**
     * Display the  errors
     * @name checkSetError
     * @param {object} ele
     * @param {array} error
    * @returns {array}
     */
    function checkSetError(ele, error)
    {
        var name = $.trim($(ele).val());
        var errorMsg = "Firstname";
        var errorType = "f";
        if(ele == "#minPassLen"){
            errorMsg = "Minimum Password Length";
            errorType = "mip";
        }
        if(ele == "#maxPassLen"){
            errorMsg = "Maximum Password Length";
            errorType = "map";
        }
        if(ele == "#maxLoginAttempts"){
            errorMsg = "Maximum Login Attempts";
            errorType = "mal";
        }
        var min = parseInt($.trim($("#minPassLen").val()));
        if (name == "")
        {
            var msg = "It should not be an empty.";
            //error  += msg+"<br/>";
            error.push(errorType);
            showLabelFocus(ele, msg, 1);
            //$(ele).focus();
        } else if (!numberValid(name))
        {
            var msg = "Please Enter Valid Number.";
            //error  += msg+"<br/>";
            error.push(errorType);
            showLabelFocus(ele, msg, 1);
            // $(ele).focus();
        }else if(ele == "#minPassLen" && (name<2 || name >6 )  ) {
             var msg = "It Should Accepts (2-6).";
            //error  += msg+"<br/>";
            error.push(errorType);
            showLabelFocus(ele, msg, 1);
        }
        else if(ele == "#maxPassLen" && min >= parseInt(name)  ) {
             var msg = "Maximum Passsword Length should be greater than Minimum Password Length.";
            //error  += msg+"<br/>";
            error.push(errorType);
            showLabelFocus(ele, msg, 1);
        }else {
            hideData(ele);
            /* if($(nextEle).val() == "")
             $(nextEle).focus();*/
        }
        return error;
    }
     /**
     * Validate the Number
     * @name numberValid
     * @param {string} no
     * @returns (boolean}
     */
    function numberValid(no)
    {
        return /^[0-9]+$/.test(no);
    }
