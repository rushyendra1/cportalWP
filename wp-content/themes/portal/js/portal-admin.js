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
});
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
    //callToolTip();
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
            
       data += ' <div class="form-actions"><button  id="saveUserSettingSubmit" class="btn btn-primary">Submit</button></div></div>';
       
    return data;
}