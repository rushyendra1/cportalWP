var geocoder;  
  var files = "";
  var attachWindow ;
$ = jQuery.noConflict();
$(document).ready(function(){

    var root = $.trim($("#rootTheme").val());
    var path = $.trim($("#path").val());
    var site = $.trim($("#siteTheme").val());
    var devWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    /*** **/
   
    /** copy mailing Address to other Address **/
    $(".copyAddress").on("click",function(e){
        $("#otherStreet").val($.trim($("#mailingStreet").val()));
        $("#otherCity").val($.trim($("#mailingCity").val()));
        $("#otherState").val($.trim($("#mailingState").val()));
        $("#otherPostalCode").val($.trim($("#mailingPostalCode").val()));
        $("#otherCountry").val($.trim($("#mailingCountry").val()));
    });
    if(path== "attachment-list")
    {
         var siteT = getSiteName(document.title);
         document.title = "Notes And Attachment List | "+siteT;
         getAttachTemplate('','','',100,0,0,'Name','asc','all');
    }
    if(path == "case-history-list")
    {
        getCaseHistoryTemplate('','',100,0,0,'Name','asc','all');
    }
    /*** Title in view Service **/
     if(path == "view-service")
     {
         var serviceName = $.trim($("#serviceName").val());
         var siteT = getSiteName(document.title);
         document.title = "Service : "+serviceName+" | "+siteT;
          getAttachList('','','service',0,0,'all',0,"CreatedDate","desc");
     }
     /*** Title in add case **/
     if(path == "case-form")
     {
         var siteT = getSiteName(document.title);
         document.title = "New Case : Select Record Type | "+siteT;
     }
     /*** title in add case **/
     if(path == "case")
     {
         var siteT = getSiteName(document.title);
         document.title = "New Case | "+siteT;
         var caseId = $.trim($("#caseId").val());
         var caseNo = $.trim($("#caseNo").val());
         if(caseId != "")
         {
             document.title = "Edit Case : " + caseNo+" | "+siteT;
         }
     }
     /** Title in add contact **/
     if(path == "contact-form")
     {
         var siteT = getSiteName(document.title);
         document.title = "New Contact   | "+siteT;
         var contactName = $.trim($("#contactName").val());
         var contactId = $.trim($("#contactId").val());
         if(contactId != "")
             document.title = "Edit Contact: "+ contactName+" | "+siteT;
     }
     /*** Title in new note **/
    if(path == "new-note"){
        var noteId = $.trim($("#noteId").val());
        if( noteId != "")
        {
            title = $.trim($("#noteTitle").val());
            var siteT = getSiteName(document.title);
            document.title = "Edit Note : "+ title +" | "+siteT;
        }
           if(devWidth >= "480" && devWidth <= "767")
            $(".rightNoteDiv").addClass("note480");
        if(devWidth >= "768" && devWidth <= "1024")
            $(".rightNoteDiv").addClass("note768");
        if(devWidth >= "240" && devWidth < "320")
            $(".rightNoteDiv").addClass("note240320");
        if(devWidth >= "1024")
            $(".rightNoteDiv").addClass("notedesk");
    }
    /*** Title in new attach ***/
        if(path == "new-attach")
        {
            var title = $.trim($("#caseNoTitle").html());
            var siteT = getSiteName(document.title);
            document.title =  title +" | "+siteT;
        }
       /*** Title in edit attachment **/ 
    if(path == "edit-attachment"){
        var title = $.trim($("#titleAttach").html());
         var siteT = getSiteName(document.title);
            document.title =  "Attachment Edit : "+title +" | "+siteT;
        if(devWidth >= "480" && devWidth <= "767")
            $(".rightAttachDiv").addClass("attach480");
    }
    /** title in advanced search **/
    if(path == "advanced-search")
    {
       var stype = $.trim($("#stype").val());
       var search = $.trim($("#search").val());
       if(stype == "s"){
            $("#searchPattern").val($.trim($("#searchItems").val()));
            $("#searchItem").val($.trim($("#searchType").val()));
        }
        if(search != ""){
            var title = document.title;
            var siteT = getSiteName(title);
            document.title = "Search Results | "+siteT;
        }
        //Select All
        $(".selectChk").on("click",function(e){
            e.stopImmediatePropagation();
            $(".typeValue").attr("checked","checked");
        });
        //Deselect All
        $(".deSelectChk").on("click",function(e){
            e.stopImmediatePropagation();
            $(".typeValue").removeAttr("checked");
        });
    }
    //Recent Items 
    getRecentItem();
    //Search functionality
    $(".searchGo").on("click",function(e){
       e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        window.location.href = site+"/advanced-search/?search="+$.trim($("#searchPattern").val())+
                "&type="+$.trim($("#searchItem").val())+"&stype=s"; 
    });
    //Advanced Search functionality
    $(".advSearchBtn").on("click",function(e){
      
        e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var type = comma = '';
        $(".typeValue").each(function(){
            if($(this).is(":checked")){
               type += comma+$.trim($(this).val());
               comma = ',';
           }
        });
        if(type == "")
            type = "Account,Contact,Case,Service,Note";
        //type = $.trim($("#searchType").val());
        var item = $.trim($("#searchItems").val());
        window.location.href = site+"/advanced-search/?search="+item+"&type="+type; 
         });
    //just comment$.post(site+"/webservice/create-user.php",{"first_name" : "dffd","last_name": "fdfd"},function(data){});
    getSelect("#searchItem");
    /*** Account Hierarchy display ***/
    if(path == "account-hierarchy"){
        var accountName = $.trim($("#accountName").val());
         var siteT = getSiteName(document.title);
         document.title = "Account Hierarchy: "+accountName+"| "+siteT;
        displayAccountHiearchy('','');
    }
    if(path == "all-document-list")
    {
        var title = $.trim($(".headerTitleView").html());
        var siteT = getSiteName(document.title);
         document.title = title+"| "+siteT;
        
    }
    /*** All attachment Display **/
    if(path == "all-attachment-list")
        displayAttachList('','');
    /** New Contact **/
    $(".newContact").on("click",function(e){
        e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        
        window.location.href = site+'/contact-form/';
    });
    /***New case via Account ***/
    $(".new-case-account").on("click",function(e){
        e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var accountId = $.trim($(this).data("id"));
        var accountName = $.trim($(this).data("name"));
        window.location.href = site+'/case-form/?act_id='+accountId+'&act_name='+accountName;
    });
    /*** Go back to previous page**/
    $(".cancelAddAttach,.contactReset,.cancelCase,.cancelAddNote,.cancelAddDoc,.btn-cancel-view-doc,.gotoAccount").on("click",function(e){
        e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        window.history.back();
    });
    $(".caseBtnCancel").on("click",function(e){
         e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var caseId = $(this).data("caseid");
        window.location.href= "view-case?id="+caseId;
        //window.history.go('-2');
    });
    /** Store the file value **/
    $("#afile").on("change",function(e){
        files = e.target.files;
        
    });
    /*** Attach the file ***/
    $(".attachfiles").on("click",function(e)
    {
        $(".error").remove();
      attachWindow =  window.open(site+'/showLoader', 'uploadWaiting',  'width=400,height=130,resizable=no,toolbar=no,status=no,scrollbars=no,menubar=no,directories=no,location=no,dependant=no', true);
      if($("#afile").val() == "")
      {
          attachWindow.close();
          $("#afile").parent().append('<p class="error">Error: Please specify a file upload. Type in the path to the file, or use the "Browse" button to locate it in your local filesystem.</p>')
          return false;
      }
        attachFile('');
       // attachFile('',e,this)
    });
    
    /***Go to  Edit Case  Page **/
    $(".editCase").on("click",function(e){
           e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var caseId = $.trim($(this).data("id"));
        window.location.href=site+"/case/?case-id="+caseId;
    });
    /*** New COntact By through the Account ***/
    $(".new-contact-act-btn").on("click",function(e){
          e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var accountId = $.trim($(this).data('id'));
        var accountName = $.trim($(this).data('name'));
        window.location.href=site+"/contact-form/?act-id="+accountId+"&actName="+accountName;
    });
    /** Contact List by account Id **/
    if(path == "view-account")
    {
        var accountName = $.trim($("#accountName").val());
         var siteT = getSiteName(document.title);
         document.title = "Account: "+accountName+ " | "+siteT;
        getContactTemplateByAccount('','',0,'all',0,"CreatedDate","desc");
        getCaseTemplateByAccount('','',0,'all',0,"CreatedDate","desc");
        getServiceTemplateByAccount('','',0,'',0,'all',0,"CreatedDate","desc");
        getServiceTemplateByAccount('','',0,'live',0,'all',0,"CreatedDate","desc");
    }
      /*** Save the Add Note **/
    $(".saveAddNote").on("click",function(e){
         e.stopImmediatePropagation();
        var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      
      var caseId = $(this).data('id');
      var noteName  = $.trim($("#noteTitle").val());
      var noteBody  = $.trim($("#noteBody").val());
      var isPrivate = 0;
      if($("#isPrivate").is(":checked"))
          isPrivate =1;
      var error = 0;
      $(".error").remove();
      $(".pbError").hide();
      $(".noteBtn").val('Saving');
      
      if(noteName == "")
      {
          error =1;
          contactError("Error:You must enter a value","#noteTitle",this,classView,"<span>");
      }
       if(error ==1)
          return false;
      var that = this;
      var noteId = $.trim($("#noteId").val());
      $.post(root+"/ajax/attach/attach-note-submit.php",{"name":noteName,"note_body":noteBody, "case_id" :caseId, is_private:isPrivate, note_id:noteId },function(data){
           var status = getConnectionError(data,that,classView);
        if(!status){
             contactError("","",that,classView);
             $(".pbError").hide();
            return false;
        }else
            
            //window.location.href = site+"/view-case?id="+ caseId;
               window.history.back();
      },"json");
    });
    /*** Save the Attach **/
    $(".saveAddAttach").on("click",function(e){
         e.stopImmediatePropagation();
        var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      
      var caseId = $(this).data('id');
      var name  = $.trim($("#attachTitle").val());
      var body  = $.trim($("#attachBody").val());
      var isPrivate = 0;
      if($("#isPrivate").is(":checked"))
          isPrivate =1;
      var error = 0;
      $(".error").remove();
      $(".pbError").hide();
      $(".noteBtn").val('Saving');
      
      if(name == "")
      {
          error =1;
          contactError("Error:You must enter a value","#attachTitle",this,classView,"<span>");
      }
       if(error ==1)
          return false;
      var that = this;
      var id = $.trim($("#id").val());
      $.post(root+"/ajax/attach/update-attach.php",{"name":name,"body":body,
          is_private:isPrivate, attach_id:id },function(data){
           var status = getConnectionError(data,that,classView);
        if(!status){
             contactError("","",that,classView);
             $(".pbError").hide();
            return false;
        }else
            window.history.back();
            //window.location.href = site+"/view-case?id="+ caseId;
        
          //
      },"json");
    });
    
    /*** Save the Add Document **/
    $(".saveAddDoc").on("click",function(e){
         e.stopImmediatePropagation();
        var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      
      var caseId = $(this).data('id');
      var docName  = $.trim($("#name").val());
      var docUrl  = $.trim($("#url").val());
      var docId = $.trim($("#docId").val());
      var error = 0;
      $(".error").remove();
      $(".pbError").hide();
      $(".docBtn").val('Saving');
      
      if(docName == "")
      {
          error =1;
          contactError("Error:You must enter a value","#name",this,classView);
      }
      if(docUrl == "")
      {
          error =1;
          contactError("Error:You must enter a value","#url",this,classView);
      }else if(docUrl != "" && (docUrl.indexOf("https://docs.google.com") != 0 &&
              docUrl.indexOf("http://docs.google.com")!= 0))
      {
          error =1;
          contactError("Error:This Google Doc is not part of the Google apps business account","#url",this,classView);
      }
      if(error ==1)
          return false;
      $.post(root+"/ajax/attach/attach-doc-submit.php",{"doc_id":docId, "name":docName,"url":docUrl, "case_id" :caseId },function(data){
          
          //window.location.href = site+"/view-case?id="+caseId;
      },"json");
    });
   /** Goto pages in view case **/
    $(".gotoLink").on("click",function(e){
       e.stopImmediatePropagation();
        var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      var file = $(this).data('page');
      var caseId =$(this).data('caseid');
      var caseNo = $(this).data('no');
      var type = $(this).data('types');
      var strType = '';
      if( typeof(type) != "undefined" && type != "")
          strType = "&type="+type;
      window.location.href = site+"/"+file+"?case_id="+caseId+"&no="+caseNo+strType;
    });
    /** Tooltip **/
    try{
    $(".helpOrb").tooltip();
}catch(e){}
    /*** account lookup **/
    if(path== "account-lookup")
         getRecentAccountTemplate('','',100,0,1,'Name','asc');
    /** case list **/
    if(path== "view-contact"){
        var contactName = $.trim($("#contactName").val());
         var siteT = getSiteName(document.title);
         document.title = "Contact: "+contactName+" | "+siteT;
         getCaseTemplateByContact('','',0,'all',0,0,"CreatedDate","desc");
       // getCaseTemplate('','','',0,0,'all',0);
    }
    if(path== "case-list"){
        //getSelect("#caseViewType");
        getCaseTemplate('1','','',100,0,0,'Name','asc','all');
    }
    
    /**** Initial Popup Show ***/
    var msg = $.trim($("#msg").val());
     if(msg != "")
        itemAlertData("Request Message", msg);
    /*** Save the Case ***/
    $(".saveCase").on("click",function(e){
         e.stopImmediatePropagation();
        var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
       $(".error").remove();
      $(".pbError").hide();
      $(".caseBtn").val("Saving");
      var error = 0;
      var account = $.trim($("#account").val());
      var accountId = $.trim($("#accountId").val());
      var isClosure = false;
      if($("#closure").is(":checked"))
          isClosure = true;
      var subject = $.trim($("#subject").val());
      var caseReason = $.trim($("#caseReason").val());
      var description = $.trim($("#description").val());
      var resolution = $.trim($("#resolution").val());
      var contactId = $.trim($("#contactId").val());
      var caseRecordType = $.trim($("#caseRecordTypeMain").val());
      var caseId = $.trim($("#caseId").val());
      /*if(account == "")
      {
          error =1;
          contactError("Error:You must enter a value","#account",this,classView);
          
      }*/
      if(caseReason == "")
      {
          error =1;
          contactError("Error:You must enter a value","#caseReason",this,classView);
      }
      if(subject == "")
      {
          error =1;
          contactError("Error:You must enter a value","#subject",this,classView);
      }
      if(description == "")
      {
          error =1;
          contactError("Error:You must enter a value","#description",this,classView);
      }
      if(error)return false;
      var status = $.trim($("#status").val());
      var priority = $.trim($("#priority").val());
      var ownerId = $.trim($("#ownerId").val());
      var contactName = $.trim($("#contactName").val());
      var inputData = {account:accountId,is_closure:isClosure,subject:subject,
      case_reason:caseReason,description:description,resolution:resolution,
      contact_id:contactId,case_record_type:caseRecordType,status:status,
     priority:priority,owner_id:ownerId, case_id:caseId};
      var that = this;
      $.post(root+"/ajax/case/case-submit.php",inputData,function(data){
          
          var status = getConnectionError(data,that,classView);
        if(!status){
             contactError("","",that,classView);
             $(".pbError").hide();
            return false;
        }else{
            var id = data.id;
           if(id == null)
           {
            itemAlertData("Request Message", "Something event wrong. Please contact your system Administrator.");
            $(that).removeClass(classView);
            hideLoader();
            return false;
           }
            //var file = "case-list?id="+contactId+"&contact_name="+contactName;
            var file = "view-case?id="+id;
           if($(that).hasClass("saveCaseNew"))
               file = "case-form";
        
            window.location.href= site+"/"+file;
        }
          $(that).removeClass(classView);
          hideLoader();
      },'json');
    });
     /***** *****/
    /*** Map Initilization ***/
    initialize();
  
     /*** View Contact , new case is opened ***/    
     $(".newCase").on("click",function(e){
        e.stopImmediatePropagation();
        var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
     var contactId = $.trim($(this).data("contactid"));
     var contactName = $.trim($(this).data("contactname"));
      window.location.href = site+'/case-form/?contact_id='+contactId+'&contact_name='+contactName;
     });
     /** Goes to the continue button **/
     $(".continueCase").on("click",function(e){
          e.stopImmediatePropagation();
        var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
        $(this).addClass(classView);
        var caseRecordType = $.trim($("#caseRecordTypeSelect").val());
        var caseRecordTypeName = $.trim($("#caseRecordTypeSelect option:selected").html());
        var contactId = $.trim($("#contactId").val());
        var contactName = $.trim($("#contactName").val());
        var accountId = $.trim($("#accountId").val());
        var accountName = $.trim($("#accountName").val());
        var getParam = '';
        if(contactId != "")
            getParam += "&contact_id="+contactId;
        if(contactName != "")
            getParam += "&contactName="+contactName;
        if(accountId != "")
            getParam += "&act_id="+accountId;
        if(accountName != "")
            getParam += "&act_name="+accountName;
       window.location.href = site+'/case/?id='+caseRecordType+"&recordName="+caseRecordTypeName+getParam;
     });
     $(".ui-loader").hide();
    /** Account Functionality **/
    if(path == "account-list")
        getAccountTemplate('2','','',100,0,0,'Name','asc','all');
         displayAccounts();
    /** Service Functionality **/
    if(path == "service-list")
    getServiceTemplate('1','','',100,0,0, 'Name','asc','all');

    /** Contact Functionality **/
    if(path == "contact-list"){
        var view = $.trim($("#contactViewType").val());
        var accountId = $.trim($("#accountId").val());
        //if(accountId == "")
         //getContactTemplate(view,'','',100,0,0,'Name','asc','all');
        //else
            getContactTemplate('','','',100,0,0,'Name','asc','all');
       }
    displayContacts();
    performContactForm();
    /*** Edit Contact ***/
    $(".editContact").on("click",function(e){
         e.stopImmediatePropagation();
       var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      var id = $.trim($(this).data("id"));
      window.location.href = site+'/contact-form/?id='+id;
    });
    /** View Case functionalities **/
    if(path =="view-case")
    {
        var caseName = $.trim($("#caseName").val());
         var siteT = getSiteName(document.title);
         document.title = "Case : "+caseName+" | "+siteT;
        getCaseHistory('','',0);
        getAttachList('','','case',0,0,"all",0,"CreatedDate","desc");
    }
});
/**
 * Perform the contact form functionaliites
 * @name performContactForm 
 * @returns {void}
 */
function performContactForm()
{
    var root = $.trim($("#rootTheme").val());
    var site = $.trim($("#siteTheme").val());
    try{
    $("#birthday").datepicker({dateFormat: "mm/dd/yy"});
}catch(e){}
    /** cancel the contact **/
    /*$(".contactReset").on("click",function(e){
        e.stopImmediatePropagation();
       var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      window.location.href = site+'/contact-list/';
    });*/
    /*** Submit the Contact ***/
    $(".contactSubmit").on("click",function(e){
       e.stopImmediatePropagation();
       var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      $(".contactBtn").val('Saving');
       $(".pbError").hide();
       $(".error").remove();
      var salutation = $.trim($("#salutation").val());
      var firstname = $.trim($("#firstname").val());
      var accountId = $.trim($("#accountId").val());
      var lastname = $.trim($("#lastname").val());
      var error = 0;
      if(lastname == "")
      {
          error =1;
          contactError("Error:You must enter a value","#lastname",this,classView);
          //return false;
          /*$(".pbError").show();
          $("#lastname").parent().append("<span class='error'>Error:You must enter a value</span");
          $(".contactSave").val('Save');
          $(".contactSaveNew").val('Save &amp; New');
          $(".contactReset").val('Cancel');
          hideLoader();
          return false;*/
      }
      
      var deparatment = $.trim($("#deparatment").val());
      var title = $.trim($("#title").val());
      var phone = $.trim($("#phone").val());
      if(phone != "" && !phoneValid(phone))
      {
          error =1;
          contactError("Error: Please should enter numbers","#phone",this,classView);
          //return false;
      }
      var mobile = $.trim($("#mobile").val());
      if(mobile != "" && !phoneValid(mobile))
      {
          error =1;
          contactError("Error: Please should enter numbers","#mobile",this,classView);
          //return false;
      }
      var otherPhone = $.trim($("#otherPhone").val());
      if(otherPhone != "" && !phoneValid(otherPhone))
      {
          error =1;
          contactError("Error: Please should enter numbers","#otherPhone",this,classView);
          //return false;
      }
      var email = $.trim($("#email").val());
      if( email != "" && !emailValid(email))
      {
          error =1;
          contactError("Error: Please enter valid E-mail","#email",this,classView);
          //return false;
      }
      var mailingStreet = $.trim($("#mailingStreet").val());
      var mailingCity = $.trim($("#mailingCity").val());
      var mailingState = $.trim($("#mailingState").val());
      var mailingPostalCode = $.trim($("#mailingPostalCode").val());
      var mailingCountry = $.trim($("#mailingCountry").val());
      
      var otherStreet = $.trim($("#otherStreet").val());
      var otherCity = $.trim($("#otherCity").val());
      var otherState = $.trim($("#otherState").val());
      var otherPostalCode = $.trim($("#otherPostalCode").val());
      var otherCountry = $.trim($("#otherCountry").val());
      
      var birthday = $.trim($("#birthday").val());
      var isOptOut = 0;
      if(error ==1)
          return false;
      
      if($("#optOut").is(":checked"))
          isOptOut =1;
      var contactId = $.trim($("#contactId").val());
      var data = {contact_id:contactId,salutation:salutation,firstname:firstname,account_id:accountId,
      lastname:lastname,deparatment:deparatment,title:title,phone:phone,
  mobile:mobile,other_phone:otherPhone,email:email,mailing_street:mailingStreet,
  mailing_city:mailingCity,mailing_state:mailingState,mailing_postal_code:mailingPostalCode,
  mailing_country:mailingCountry,other_street:otherStreet,other_city:otherCity,other_state:otherState,
  other_postal_code:otherPostalCode,other_country:otherCountry,birthday :birthday,is_opt_out:isOptOut 
  };
  var that = this;
  var site = $.trim($("#siteTheme").val());
      $.post(root+"/ajax/contacts/contact-submit.php",data,function(data){
           var status = getConnectionError(data,that,classView);
        if(!status){
             contactError("","",that,classView);
             $(".pbError").hide();
            return false;
        }else{ 
            var file = "view-contact?id="+data.id;
           if($(that).hasClass("contactSaveNew"))
               file = "contact-form";
           
            window.location.href= site+"/"+file;
        }
          $(that).removeClass(classView);
          hideLoader();
      },'json');
    });
}
/**
 * Perform the Account functionalities
 * @name displayAccounts
 * @returns {void}
 */
function displayAccounts()
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
      getAccountTemplate(view,that,classView,100,0,type,field,orderType,alphaType);
   }); 
   /*** Account Pagination***/
   $(".displayAccounts").on("click",function(e){
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
      var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getAccountTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
   });
   
   /*** Click on the More Button **/
   $(".moreAccount").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      $(this).addClass("activeMore");
      
      var page = getPageNo("displayAccounts");  
      var length = 100;
      var view = $.trim($("#viewType").val());
      
      $(this).addClass("activeCont");
      $(".fewerAccount").removeClass("activeCont");
      
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getAccountTemplate(view,this,classView,length,page,1,field,orderType,alphaType);
   });
   /*** Fewer functionalities ***/
    $(".fewerAccount").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      $(this).addClass("activeFewer");
      showLoader();
      var page = getPageNo("displayAccounts");  
      var length = 100;
      var view = $.trim($("#viewType").val());
      $(this).addClass("activeCont");
      $(".moreAccount").removeClass("activeCont");
      
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getAccountTemplate(view,this,classView,length,page,0,field,orderType,alphaType);
   });
   /** get the account id **/
   $(".nameCell").on("click",function(e){
      e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      showLoader();
      $(this).addClass(classView);
      var id = $.trim($(this).data("id"));
      var name = $.trim($(this).html());
      if (window.opener != null && !window.opener.closed) {
            window.opener.document.getElementById("accountId").value = id;
            window.opener.document.getElementById("account").value = name;
            }
            window.close();
      hideLoader();
   });
   /*** display the recent accounts **/
   $(".displayRecentAccounts").on("click",function(e){
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
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getRecentAccountTemplate(this,classView,length,page,1,field,orderType,alphaType);
   });
   /*** Alpha paginations***/
   $(".alphaAccount").on("click",function(e){
         e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = getPageNo("displayAccounts");  
      var length = 100;
      var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(this).data('alphatype'));
      $(".listItem").removeClass("activeAlpha");
      $(".listItem[data-alphatype="+alphaType+"]").addClass("activeAlpha");
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getAccountTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
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
      var page = getPageNo("displayAccounts");  
      var length = 100;
      var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var field = $.trim($(this).data("field"));
      getAccountTemplate(view,this,classView,length,page,type,field,orderBy,alphaType);
   });
}
/**
 * Display the Account Templates
 * @name getAccountTemplate
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
function getAccountTemplate(view,that,classView,length,page,isMore,field,sortType,alphaType)
{
    showLoader();
     var root = $.trim($("#rootTheme").val()); 
     var site = $.trim($("#siteTheme").val());
     var title = 'All Accounts';
     if(view == 1)
         title = 'Active Accounts';
    
    var siteT = getSiteName(document.title);
         document.title = title + " | "+siteT;
     
    $.post(root+"/ajax/accounts/account-list.php",{view:view,PageNum:page,is_more:isMore,
    field:field,sort_type:sortType, alpha_type:alphaType},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayAccounts();
            return false;
        }
            var  res = data.accountList;
            var result = data.response;
            var totalRecords = data.NumberofRec;
            var msg = "Request Message";
            var len = 0;
    try {
        len = data.pageRecords;
       
        if (typeof (res.error) != "undefined")
        {
            itemAlertData(msg, data.message);
            return false;
            hideLoader();
        }
    } catch (e) {

    }
    var responseHtml = '';
    
    var headerHtml = '<tr class="headerRow">';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Name")
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
                        <a title="Account Name - '+sortC+'" class=" sortOrders" data-field="Name" data-type="'+orderType+'" >Account Name\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Store_Number__c")
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
                    <a class="sortOrders" title="Store Number - Click to '+sortC+'" data-field="Store_Number__c" data-type="'+orderType+'">Store Number\n\
                    <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass +'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                    </a></th>';
      var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "ShippingStreet")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th  scope="col">\n\
                        <a  class="sortOrders" data-field="ShippingStreet" data-type="'+orderType+'"  title="Shipping Street - Click to '+sortC+'" >Shipping Street\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif"></a>\n\
                        </th>';
    var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "ShippingCity")
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
                        <a class="sortOrders" data-field="ShippingCity" data-type="'+orderType+'"  title="Shipping City - Click to '+sortC+'" >Shipping City\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass +'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "ShippingPostalCode")
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
                  <a class="sortOrders" data-field="ShippingPostalCode" data-type="'+orderType+'"  title="Shipping Zip/Postal Code - Click to '+sortC+'" >Shipping Zip/Postal Code\n\
                   <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                    </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Phone")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        headerHtml +='<th scope="col">\n\
                        <a class="sortOrders" data-field="Phone" data-type="'+orderType+'"  title="Phone - Click to '+sortC+'" >Phone\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Active_Account_Services__c")
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
                    <a class="sortOrders" data-field="Active_Account_Services__c" data-type="'+orderType+'" title="Active Services - Click to '+sortC+'" >Active Services\n\
                    <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                    </a></th>';
    var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Parent.Name")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        headerHtml += '<th  scope="col">\n\
                        <a class="sortOrders" data-field="Parent.Name" data-type="'+orderType+'"  title="Parent Account - Click to '+sortC+'" >Parent Account\n\
                    <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                    </a></th>';
    
        headerHtml += '</tr>';
        $(".displayAccountHeader").html(headerHtml);
       
    if(typeof(result)!= "undefined" && typeof(result.status)!="undefined" && result.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="9">'+result.message+'</td></tr>';
    }else if(len>0){
         for (var i = 0; i < len; i++)
        {
             var name = id = area = storeNo = recordType = createdDate = owner = 
                 ownerR = lastActivity = billCity = billCountry = billZip = street = 
                     city = postalCode = phone = active = parent = parentAccountId =
                     billState = sites= "";
             if (res[i] != null && typeof (res[i].Name) != "undefined")
                name = res[i].Name;
             if (res[i] != null && typeof (res[i].Store_Number__c) != "undefined")
                 storeNo = res[i].Store_Number__c;
             if (res[i] != null && typeof (res[i].Id) != "undefined")
                 id = res[i].Id;
             if (res[i] != null && typeof (res[i].RecordType) != "undefined" && typeof (res[i].RecordType.Name) != "undefined")
                recordType = res[i].RecordType.Name;
            if (res[i] != null && typeof (res[i].Area__c) != "undefined")
                area = res[i].Area__c;
            if (res[i] != null && typeof (res[i].LastActivityDate) != "undefined")
                lastActivity = res[i].LastActivityDate;
            if (res[i] != null && typeof (res[i].Site) != "undefined")
                sites = res[i].Site;
            if (res[i] != null && typeof (res[i].CreatedDate) != "undefined")
            {
                createdDate = res[i].CreatedDate;
                if(createdDate != "")
                    createdDate = getDateVal(createdDate,"/");
            }
            if(res[i] != null && typeof (res[i].Owner) != "undefined" && res[i].Owner.Alias != "undefined")
                     owner += res[i].Owner.Alias;
             if (owner != "" && res[i] != null && typeof (res[i].Owner) != "undefined" && typeof (res[i].Owner.Name) != "undefined" )
             {
                 owner = res[i].Owner.Name;
                 
             }
              if (res[i] != null && typeof (res[i].Owner) != "undefined" && typeof (res[i].Owner.Alias) != "undefined" )
             ownerR = res[i].Owner.Alias;
         if (res[i] != null && typeof (res[i].BillingState) != "undefined")
                billState = res[i].BillingState;
             if (res[i] != null && typeof (res[i].BillingCity) != "undefined")
                billCity = res[i].BillingCity;
            if (res[i] != null && typeof (res[i].BillingCountry) != "undefined")
                billCountry = res[i].BillingCountry;
            if (res[i] != null && typeof (res[i].BillingPostalCode) != "undefined")
                billZip = res[i].BillingPostalCode;
             /*if (res[i] != null && typeof (res[i].Store_Number__c) != "undefined")
                 street = res[i].Store_Number__c;*/
                if (res[i] != null && typeof (res[i].Phone) != "undefined")
                 phone = res[i].Phone;
             if (res[i] != null && typeof (res[i].ShippingStreet) != "undefined")
                street = res[i].ShippingStreet;
             if (res[i] != null && typeof (res[i].ShippingCity) != "undefined")
                city = res[i].ShippingCity;
             if (res[i] != null && typeof (res[i].ShippingPostalCode) != "undefined")
                postalCode = res[i].ShippingPostalCode;
             if (res[i] != null && typeof (res[i].Active_Account_Services__c) != "undefined")
                active = res[i].Active_Account_Services__c;   
            
             if (res[i] != null && typeof (res[i].Parent) != "undefined" &&  typeof (res[i].Parent.Name) != "undefined")
                parent = res[i].Parent.Name;    
            if (res[i] != null && typeof (res[i].Parent) != "undefined" &&  typeof (res[i].Parent.Id) != "undefined")
            parentAccountId = res[i].Parent.Id;
             var activeImg = file = '';
             if(active == "Active"){
                  file = 'flag_green.gif';
             }else
                 file = 'flag_red.gif';
                 //if(view ==2)
                 
                     
                 activeImg = '<img border="0" alt="Active" src="'+root+'/images/extended/'+file+'">';
             //}
            responseHtml +='<tr  class="dataRow even first">';
            responseHtml +='<td class=" dataCell  " scope="row"><a href="view-account?id='+id+'">'+name+'</a></td>';
            responseHtml +='<td class=" dataCell  ">'+storeNo+'</td>';
            responseHtml +='<td class=" dataCell  ">'+street+'</td>';
            responseHtml +='<td class=" dataCell  ">'+city+'</td>';
            responseHtml +='<td class=" dataCell  ">'+postalCode+'</td>';
            responseHtml +='<td class=" dataCell  ">'+phone+'</td>';
            responseHtml +='<td class=" dataCell  ">'+activeImg+'</td>';
            responseHtml +='<td class=" dataCell  "><a href="'+site+'/view-account?id='+parentAccountId+'">'+parent+'</a></td>';
        
            responseHtml +='</tr>';
        }
    }else{
         responseHtml +='<tr><td class="error" colspan="9">No Records To Display</td></tr>';
    }
    
    /** Pagination Links ***/
     var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayAccounts", alpha);
    $(".paginationLinks").html(paginationHtml);
    /**** ****/
    $(".bPageTitle h1").html(title);
    
    $(".account-list-res").html(responseHtml);
     if(view ==2){
        var ele = $(".account-list-res").parent();
        ele.removeClass("accountListTable")
        ele.addClass("allAccountListTable")
    }else if(view ==1){
        var ele = $(".account-list-res").parent();
        ele.removeClass("allAccountListTable")
        ele.addClass("accountListTable")
    }
   displayAccounts();
    hideLoader();
      },'json');
}

/**
 * Perform the Service functionalities
 * @name displayServices
 * @returns {void}
 */
function displayServices()
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
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getServiceTemplate(view,that,classView);
   }); 
}
/**
 * Display the Contact Templates
 * @name getContactTemplate
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
function getContactTemplate(view,that,classView,length,page,isMore,field,sortType,alphaType)
{
    showLoader();
     var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val()); 
     var accountId = $.trim($("#accountId").val());
     var title = "All Contacts";
     if(accountId != ""){
         $("#contactViewType").hide();
         $("#contactViewType").prev().hide();
         title = "Contacts";
     }
      var siteT = getSiteName(document.title);
         document.title = title+" | "+siteT;
    $.post(root+"/ajax/contacts/contact-list.php",{view:view,PageNum:page,is_more:isMore,
    field:field,sort_type:sortType,alpha_type:alphaType,account_id:accountId},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayContacts();
            return false;
        }
            var  res = data;
           var result = res.contactGrid;
           var totalRecords = res.NumberofRec;
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
    var headerContact = '<tr class="headerRow">\n\
                        <th scope="col" class="actionColumn">Action</th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Name")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        headerContact += '<th class="" scope="col">\n\
                <a title="Name - Click to '+sortC+'" class="sortClass"  data-field ="Name" data-type="'+orderType+'"> Name\n\
                <img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                </a></th>';
    if(accountId != ""){
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Title")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        headerContact += '<th class="" scope="col" >\n\
                <a title="Title - Click to '+sortC+'" data-field ="Title" data-type="'+orderType+'"  class="sortClass">Title\n\
                <img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Email")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        headerContact += '<th class="" scope="col">\n\
                               <a title="Email - Click to '+sortC+'" data-field ="Email"  data-type="'+orderType+'" class="sortClass" >Email\n\
                              <img title="'+sortTitle+'"  data-field ="Name" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                                </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Phone")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        headerContact += '<th class="" scope="col">\n\
                <a title="Phone - Click to '+sortC+'" data-field ="Phone" data-type="'+orderType+'" class="sortClass">Phone\n\
                <img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                </a></th>';
            
    }else{
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Account.Name")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
    headerContact += '<th class="" scope="col">\n\
                <a title="Account Name - Click to '+sortC+'" class="sortClass" data-field ="Account.Name" data-type="'+orderType+'">Account Name\n\
                <img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                </a> </th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Title")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
    headerContact +='<th class="" scope="col" >\n\
                <a title="Title - Click to '+sortC+'" data-field ="Title" data-type="'+orderType+'" class="sortClass">Title\n\
                <img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Phone")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
     headerContact += '<th class="" scope="col">\n\
                <a title="Phone - Click to '+sortC+'" data-field ="Phone" data-type="'+orderType+'" class="sortClass">Phone\n\
                <img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "MobilePhone")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
            headerContact +='<th class="" scope="col">\n\
                        <a title="Mobile - Click to '+sortC+'" data-field ="MobilePhone" data-type="'+orderType+'"  class="sortClass" >Mobile\n\
                        <img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';  
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Email")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }  
            headerContact += '<th class="" scope="col">\n\
                               <a title="Email - Click to '+sortC+'" data-field ="Email" data-type="'+orderType+'" class="sortClass" >Email\n\
                              <img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                                </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "MailingPostalCode")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
            headerContact += '<th scope="col">\n\
                            <a title="Mailing Zip/Postal Code - Click to '+sortC+'" data-field ="MailingPostalCode" data-type="'+orderType+'" class="sortClass" >Mailing Zip/Postal Code\n\
                            <img title="'+sortTitle+'"  class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                            </a></th>';         
    }
            headerContact += '</tr>';
            $(".headerContact").html(headerContact);
                        
                        
    if(typeof(errorResult)!= "undefined" && typeof(errorResult.status)!="undefined" && errorResult.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="9">'+errorResult.message+'</td></tr>';
    }else{
         for (var i = 0; i < len; i++)
        {
             var name = accountName=id= titleP = mobile=email= postalCode =phone= owner="";
             if (result[i] != null && typeof (result[i].Name) != "undefined")
                name = result[i].Name;
            if (result[i] != null && typeof (result[i].Id) != "undefined")
                id = result[i].Id;
             if ((result[i] != null || result[i] != "undefined") && typeof (result[i].Account) != "undefined"  && typeof (result[i].Account.Name) != "undefined")
                 accountName = result[i].Account.Name;
             if (result[i] != null && typeof (result[i].Title) != "undefined")
                 titleP = result[i].Title;
             if (result[i] != null && typeof (result[i].Phone) != "undefined")
                 phone = result[i].Phone;
             if (result[i] != null && typeof (result[i].MobilePhone) != "undefined")
                mobile = result[i].MobilePhone;
             if (result[i] != null && typeof (result[i].Email) != "undefined")
                email = result[i].Email;   
            
            if (result[i] != null && typeof (result[i].MailingPostalCode) != "undefined")
                postalCode = result[i].MailingPostalCode;
              if (result[i] != null && typeof (result[i].Owner) != "undefined" && typeof (result[i].Owner.Alias) != "undefined")
                owner = result[i].Owner.Alias;  
            if(owner != "" &&  result[i] != null && typeof (result[i].Owner) != "undefined" && typeof (result[i].Owner.Name) != "undefined")
                 owner = result[i].Owner.Name;  
            responseHtml +='<tr  class="dataRow even first">';
            responseHtml +='<td class="actionColumn"><a  href="'+siteUrl+'/contact-form?id='+id+'">Edit</a></td>';
            responseHtml +='<td class=" dataCell" scope="row"><a href="'+siteUrl+'/view-contact?id='+id+'">'+name+'</a></td>';
            if(accountId != "")
            {
                responseHtml +='<td class=" dataCell">'+titleP+'</td>';
                responseHtml +='<td class=" dataCell">'+email+'</td>';
                responseHtml +='<td class=" dataCell">'+phone+'</td>';
            }else{
           
            
            responseHtml +='<td class=" dataCell">'+accountName+'</td>';
            responseHtml +='<td class=" dataCell">'+titleP+'</td>';
            responseHtml +='<td class=" dataCell">'+phone+'</td>';
            //if(view ==1)
                responseHtml +='<td class=" dataCell">'+mobile+'</td>';
            responseHtml +='<td class=" dataCell">'+email+'</td>';
             //if(view !=1)
               // responseHtml +='<td class=" dataCell">'+owner+'</td>';  
            //if(view != 3)
            responseHtml +='<td class=" dataCell">'+postalCode+'</td>';
           }
            responseHtml +='</tr>';
        }
    }
       var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayContacts", alpha);
   
    
    $(".contactOwnerShow").hide();
    $(".paginationLinks").html(paginationHtml);
     $(".contact-list-res").html(responseHtml);
    //alert($(".contact-list-res tr").length);
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
 * Display the common pagination
 * @name commonPaginationWC
 * @param {int} perPage
 * @param {int} start
 * @param {int} total
 * @param {int} perCnt
 * @returns {Array}
 */
function commonPaginationWC(perPage, start, total, perCnt)
{
    start = parseInt(start);
    perPage = parseInt(perPage);
    total = parseInt(total);
    perCnt = parseInt(perCnt);
    var to = 1;
    var offsetLimit = from = start;
    var end = to = perPage;
    //if (start !== 1 && start !== 0) {
    if ( start !== 0) {
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
    var ends = 0;
    if(start != 0)
       ends = start-1;
    
    to = (ends*perPage)+perPage;
    if (displayRange > perCnt)
        to = total;
    if(to >total)
        to = total;
    return [from, to, start, total, nextPage, prevPage, totalCnt];
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
    if (prevPage != "")
        pagination += '<a  class="' + className + '"  data-alpha="'+alpha+'" data-paged="' + prevPage + '"style="cursor:pointer"  title="Previous">  <i class="icon-left-open" ></i>< Previous Page</a>';
      if(nextPage != "")
           pagination += '<a class=" ' + className + '" data-alpha="'+alpha+'"  data-paged="' + nextPage + '" style="cursor:pointer" title="Next" > Next Page ><i class="icon-right-open"></i></a>';
    pagination += '</div></div>';
    return pagination;
}
/**
 * Get the date from the timestamp , custom format
 * @name getDateVal
 * @param {string} str
 * @param {string} format
 * @returns {striing}
 */
function getDateVal(str,format)
{
    var result= '';
    var array = str.split("T");
    var givenDate = array[0];
    var givenDateArray = givenDate.split("-");
   result = givenDateArray[0]+format+givenDateArray[1]+format+givenDateArray[2]
    return result;
}
//var map;
function initialize() {
    try{
   geocoder = new google.maps.Geocoder();
  var map;
   codeAddress($("#mailingAddrDiv").html(),"map-canvas",map,geocoder);
 // var geocoders;
  // geocoders = new google.maps.Geocoder();
  var mapId;
  
  codeAddress($("#otherAddrDiv").html(),"map-canvas-others",mapId,geocoder);
   
    }catch(e){}
}
try{
var bounds = new google.maps.LatLngBounds();
}catch(e){}
/**
 * Get map the locations
 * @name codeAddress
 * @param {string} address
 * @param {string} id
 * @param {string} map
 * @param {object} geocoder
 * @returns {void}
 */
function codeAddress(address,id,map,geocoder) {
 
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        
        if (status == google.maps.GeocoderStatus.OK) {
            var myOptions = {
                zoom: 16,
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
			//if(typeof(map) == "undefined" || (typeof(map) == "undefined" && !map))	{
                        if(typeof(map) == "undefined" || (typeof(map) == "undefined" && !map))
            map = new google.maps.Map(document.getElementById(id), myOptions);
        //}

            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            
			bounds.extend(marker.position);
			map.fitBounds(bounds);
			 google.maps.event.addListener(marker,'mouseover',   ( function(marker) {
            return function() {
               var infowindow = new google.maps.InfoWindow();
             
                var content = '<div class="map-content"><h3>' + address + '</h3> </div>';
              infowindow.setContent(content);
              infowindow.open(map, marker);
            }
          })(marker));
        } 
        /*else {
		  alert('Geocode was not successful for the following reason: ' + status);
		}*/
    });
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
var phoneValid = function (no)
{

    //var check = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/.test(no);
    var check = /^[0-9]{10}$/.test(no);
    //if(!check)
    // return  /^[0-9]{10}$/.test(no);
    //return true;  
    return check;

}
/**
 * Display the errors
 * @name contactError
 * @param {string} msg
 * @param (object) ele
 * @param (object) that
 * @param string classView
 * @param string tag
 * @returns {void}
 */
function contactError(msg,ele,that,classView,tag)
{
    var msgString = '<p class="error">'+msg+'</p>';
    if(typeof(tag) != "undefined" )
        msgString = '<span class="error">'+msg+'</span>';
    $(".pbError").show();
    $(ele).parent().append(msgString);
          //$(ele).prev().show();
          /*** Contact ***/
          $(".contactSave").val('Save');
          $(".contactSaveNew").val('Save & New');
          $(".contactReset").val('Cancel');
          /*** Case ***/
           $(".saveCaseSubmit").val('Save');
          $(".saveCaseNew").val('Save & New');
          $(".caseBtnCancel").val('Cancel');
          /*** Doc ***/
          $(".saveAddDoc").val('Save');
          $(".cancelAddDoc").val('Cancel');
          /*** Note ***/
          $(".saveAddNote").val('Save');
          $(".cancelAddNote").val('Cancel');
          $(that).removeClass(classView);
          hideLoader();
}
/**
 * Decrease the character length while entering
 * @name textChanges
 * @param {object} e
 * @param {object} that
 * @returns {Boolean}
 */
function textChanges(e,that)
{
      e.stopImmediatePropagation();
        var classView = "ajaxCall";
      if($(that).hasClass(classView))
      {
          return false;
      }
      $(that).addClass(classView);
      var ele = $(that).parent().parent().parent().find(".textCounter");
     var textValue = ele.html();
     var data = $(that).val();
     var len=  data.length;
     var count = parseInt(textValue.replace("remaining",""));
     count -=len;
     var result = "";
    
     if(count>0)
       result = count+"  remainig";
     
     if(len ==0)
         result = textValue;
     ele.html(result);
     $(that).removeClass(classView);
}
/**
 * Perform the Case functionalities
 * @name displayCases
 * @returns {void}
 */
function displayCases()
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
   $("#caseViewType").on("change",function(e){
      e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          displayCases();
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
      getCaseTemplate(view,this,classView,100,0,type,field,orderType,alphaType)
   });
   
   /*** Contact Pagination***/
   $(".displayCases").on("click",function(e){
       e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          displayCases();
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = $.trim($(this).data("paged"));
      var length = 100;
      var view = $.trim($("#caseViewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var type = $(".activeCont").data("type");
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getCaseTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
   });
   /*** Click on the More Button **/
   $(".moreCase").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      $(this).addClass("activeMore");
      var page = getPageNo("displayCases");
      var length = 100;
      var view = $.trim($("#caseViewType").val());
      $(this).addClass("activeCont");
      $(".fewerCase").removeClass("activeCont");
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
       getCaseTemplate(view,this,classView,length,page,1,field,orderType,alphaType);
      
   });
   /*** Fewer functionalities ***/
    $(".fewerCase").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          displayCases();
          return false;
      }
      $(this).addClass(classView);
      $(this).addClass("activeFewer");
      showLoader();
      var page = getPageNo("displayCases");
      var length = 100;
      var view = $.trim($("#caseViewType").val());
      $(this).addClass("activeCont");
      $(".moreCase").removeClass("activeCont");
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getCaseTemplate(view,this,classView,length,page,0,field,orderType,alphaType);
   });
   /*** Alpha paginations***/
   $(".alphaCase").on("click",function(e){
         e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          displayCases();
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = getPageNo("displayCases");  
      var length = 100;
      var view = $.trim($("#caseViewType").val());
      var alphaType = $.trim($(this).data('alphatype'));
      $(".listItem").removeClass("activeAlpha");
      $(".listItem[data-alphatype="+alphaType+"]").addClass("activeAlpha");
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getCaseTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
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
      var page = getPageNo("displayCases");  
      var length = 100;
      var view = $.trim($("#caseViewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var field = $.trim($(this).data("field"));
       getCaseTemplate(view,this,classView,length,page,type,field,orderBy,alphaType);
       });
}
/**
 * Display the Case Templates
 * @name getCaseTemplate
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
function getCaseTemplate(view,that,classView,length,page,isMore,field,sortType,alphaType)
{
    showLoader();
     var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val());
     var contactId = $.trim($("#contactId").val());
     var accountId = $.trim($("#accountId").val());
     var title = 'All Cases';
     if(view == 2)
         title = 'All Closed Cases';
    if(view == 3)
         title = 'All Open Cases';
     if(contactId != "" || accountId != "")
         title = "Cases";
    var siteT = getSiteName(document.title);
         document.title = title + " | "+siteT;
      
     
    $.post(root+"/ajax/case/cases-list.php",{view:view,PageNum:page,is_more:isMore,
    field:field,sort_type:sortType, alpha_type:alphaType,
    contact_id:contactId,account_id: accountId},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayCases();
            return false;
        }
            var  res = data.caseGrid;
            var result = data.response;
            var totalRecords = data.NumberofRec;
            var msg = "Request Message";
            var len = 0;
    try {
        len = data.pageRecords;
       
        if (typeof (res.error) != "undefined")
        {
            itemAlertData(msg, data.message);
            return false;
            hideLoader();
        }
    } catch (e) {

    }
    var responseHtml = '';
    
    var headerHtml = '<tr class="headerRow">';
    var actionTd = '<th>Action</th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Name")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        var caseNoTd = '<th ><a title="Case Number - '+sortC+'" class=" sortOrders" data-field="Name" data-type="'+orderType+'" >Case Number\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
    var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Contact__r.Name")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        var contactTd = '<th ><a title="Contact - '+sortC+'" class=" sortOrders" data-field="Contact__r.Name" data-type="'+orderType+'" >Contact\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
    
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Owner.FirstName")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        var ownerTd = '<th ><a title="Owner First Name - '+sortC+'" class=" sortOrders" data-field="Owner.FirstName" data-type="'+orderType+'" >Owner First Name\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';    
    
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Account__r.Name")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
            var accountTd =  '<th ><a title="Account - '+sortC+'" class=" sortOrders" data-field="Account__r.Name" data-type="'+orderType+'" >Account\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Account__r.Store_Number__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
            var storeNoTd =  '<th >\n\
                        <a title="Store Number - '+sortC+'" class=" sortOrders" data-field="Account__r.Store_Number__c" data-type="'+orderType+'" >Store Number\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                         </a></th>';
         var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Subject__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
            var subjectTd = '<th ><a title="Subject - '+sortC+'" class=" sortOrders" data-field="Subject__c" data-type="'+orderType+'" >Subject\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
    var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Status__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
            var statusTd = '<th ><a title="Status - '+sortC+'" class=" sortOrders" data-field="Status__c" data-type="'+orderType+'" >Status\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>'; 
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Priority__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
            var priorityFlagTd  = '<th ><a title="Priority Flag - '+sortC+'" class=" sortOrders" data-field="Priority__c" data-type="'+orderType+'" >Priority Flag\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
    var priorityTd  = '<th ><a title="Priority - '+sortC+'" class=" sortOrders" data-field="Priority__c" data-type="'+orderType+'" >Priority\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
            var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Date_Time_Opened__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }            
            var dateOpenedTd = '<th ><a title="Date/Time Opened - '+sortC+'" class=" sortOrders" data-field="Date_Time_Opened__c" data-type="'+orderType+'" >Date/Time Opened\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
           var dateClosedTd = '';
            if(view != 3){
                   var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "ClosedDate__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
            dateClosedTd = '<th ><a title="Date/Time Closed - '+sortC+'" class=" sortOrders" data-field="ClosedDate__c" data-type="'+orderType+'" >Date/Time Closed\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
            }
            var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Origin__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
             var originTd = '<th ><a title="Case Origin - '+sortC+'" class=" sortOrders" data-field="Origin__c" data-type="'+orderType+'" >Case Origin\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
            var reasonTd = '';
        if(view ==3)
        {
            var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Reason__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
           reasonTd = '<th ><a title="Case Reason - '+sortC+'" class=" sortOrders" data-field="Reason__c" data-type="'+orderType+'" >Case Reason\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' '+activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
       }
       
       if(contactId != "" || accountId != "")
           headerHtml += actionTd+caseNoTd+contactTd+subjectTd+priorityFlagTd+dateOpenedTd+statusTd+ownerTd;
       else
           headerHtml += caseNoTd+accountTd+storeNoTd+subjectTd+statusTd+
               priorityTd+dateOpenedTd+dateClosedTd+originTd+reasonTd;
        headerHtml += '</tr>';
        $(".displayCaseHeader").html(headerHtml);
       
    if(typeof(result)!= "undefined" && typeof(result.status)!="undefined" && result.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="9">'+result.message+'</td></tr>';
    }else if(len>0){
        result = res;
         for (var i = 0; i < len; i++)
        {
            var caseNo = caseId =contact= statusC = subject = 
                    priority = accountIds = dateOpen = dateClosed = owner= accountName
                    = storeNo = origin = reason = contactIds= "";
           if (result[i] != null && typeof (result[i].Name) != "undefined")
                caseNo = result[i].Name;
            if (result[i] != null && typeof (result[i].Id) != "undefined")
                caseId = result[i].Id;
            if (result[i] != null && typeof (result[i].Account__r) != "undefined"
                    && typeof (result[i].Account__r.Name) != "undefined")
                accountName = result[i].Account__r.Name;
            
            if (result[i] != null && typeof (result[i].Account__c) != "undefined")
                accountIds = result[i].Account__c;
            
            if (result[i] != null && typeof (result[i].Account__r) != "undefined" && typeof (result[i].Account__r.Store_Number__c) != "undefined")
                storeNo = result[i].Account__r.Store_Number__c;
           
            if (result[i] != null && typeof (result[i].Reason__c) != "undefined")
                reason = result[i].Reason__c;
            
             if (result[i] != null && typeof (result[i].Priority__c) != "undefined")
                priority = result[i].Priority__c;
             if (result[i] != null && typeof (result[i].Origin__c) != "undefined")
                origin = result[i]. Origin__c;
             if (result[i] != null && typeof (result[i].Status__c) != "undefined")
                statusC = result[i].Status__c;
             if (result[i] != null && typeof (result[i].Owner) != "undefined" 
                     &&  typeof (result[i].Owner.FirstName) != "undefined")
                owner = result[i].Owner.FirstName; 
            /*if (result[i] != null && typeof (result[i].Owner) != "undefined" 
                     &&  typeof (result[i].Owner.Id) != "undefined")
                owner = result[i].Owner.Id; */
            if (result[i] != null && typeof (result[i].ClosedDate__c) != "undefined")
                dateClosed = getDateTimeFormat(result[i].ClosedDate__c);
            if (result[i] != null && typeof (result[i].Contact__r) != "undefined"  && typeof (result[i].Contact__r.Name) != "undefined")
                contact = result[i].Contact__r.Name;
            if (result[i] != null && typeof (result[i].Contact__r) != "undefined"  && typeof (result[i].Contact__r.Id) != "undefined")
                contactIds = result[i].Contact__r.Id;    
             
            if (result[i] != null && typeof (result[i].Subject__c) != "undefined")
                subject = result[i].Subject__c;
            
            if (result[i] != null && typeof (result[i].Date_Time_Opened__c) != "undefined")
                dateOpen = getDateTimeFormat(result[i].Date_Time_Opened__c);
            /*** Priority Flag ***/
            var priorityFlag = '';
            if(priority == "Low")
                priorityFlag = '<img src="'+root+'/images/extended/light_green.gif">';
            if(priority == "Medium")
                priorityFlag = '<img src="'+root+'/images/extended/light_yellow.gif">';
            if(priority == "High")
                priorityFlag = '<img src="'+root+'/images/extended/light_red.gif">';
            /**** ****/
            /**** Case Origin ***/
            var originFile = originFiles = '';
            switch(origin){
                case "Phone": originFile = 'phone.png';
                break;
                case "Email" :case "Email WC.com": originFile = 'email.png';
                break;
                case "Web": originFile = 'web.png';
                break;
                case "Operator": originFile = 'operator.png';
                break;
                case "Portal": originFile = 'portal.png';
                break;
            }
           originFiles = '<img width="40" border="0" height="40" alt="'+origin+'" src="'+root+'/images/extended/'+originFile+'">';
           //showMoreCnt = i+1;
              responseHtml += '<tr class="dataRow">';
              
              if(contactId == "" && accountId == ""){
               // responseHtml += '<td class="actionColumn" scope="col"><a href="'+siteUrl+'/case?case-id='+caseId+'">Edit</a></td>';
                responseHtml += '<td><a href="'+siteUrl+'/view-case?id='+caseId+'" >'+caseNo+'</a></td>';
                responseHtml += '<td><a href="'+siteUrl+'/view-account?id='+accountIds+'" >'+accountName+'</a></td>';
                responseHtml += '<td>'+storeNo+'</td>';
                responseHtml += '<td>'+subject+'</td>';
                responseHtml += '<td>'+statusC+'</td>'; 
                responseHtml += '<td>'+priorityFlag+'</td>';
                responseHtml += '<td>'+dateOpen+'</td>';
            if(view != 3)
                responseHtml += '<td>'+dateClosed+'</td>';
            responseHtml += '<td>'+origin+'</td>';
            if(view ==3)
                responseHtml += '<td>'+reason+'</td>';
              }else
              {
               responseHtml += '<td class="actionColumn" scope="col"><a href="'+siteUrl+'/case?case-id='+caseId+'">Edit</a></td>';
               responseHtml += '<td><a href="'+siteUrl+'/view-case?id='+caseId+'" >'+caseNo+'</a></td>';
               responseHtml += '<td><a href="'+siteUrl+'/view-contact?id='+contactIds+'" >'+contact+'</a></td>';
               responseHtml += '<td>'+subject+'</td>';
               responseHtml += '<td>'+priority+'</td>';
               responseHtml += '<td>'+dateOpen+'</td>';
               responseHtml += '<td>'+statusC+'</td>';
               responseHtml += '<td>'+owner+'</td>';
              }
            responseHtml += '</tr>';
        }
    }else{
         responseHtml +='<tr><td class="error" colspan="10">No Records To Display</td></tr>';
    }
    
    /** Pagination Links ***/
     var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayCases", alpha);
    $(".paginationLinks").html(paginationHtml);
    /**** ****/
    $(".bPageTitle h1").html(title);
    
    $(".case-list-res").html(responseHtml);
    
   displayCases();
   $(that).removeClass(classView);
    hideLoader();
      },'json');
}
/**
 * Perform the display case contacts functionalities
 * @name caseContactFuns
 * @returns {void}
 */
function caseContactFuns()
{
    /*** More link ***/
    $(".moreCaseContact").on("click",function(e){
         e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        var type = $(this).data('types');
        $(this).addClass(classView);
        
        var page = getPageNo("displayCases");  
        
        var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       
       getCaseTemplate('','',type,1,page, alphaType);
    });
    /*** Fewer Link ***/
    $(".fewerCaseContact").on("click",function(e){
         e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var type = $(this).data('types');
         var page = getPageNo("displayCases");  
         var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
        getCaseTemplate('','',type,0,page,alphaType);
    });
    
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
   $("#caseViewType").on("change",function(e){
      
      e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      //var view = $.trim($(this).val());
      var that = this;
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
      getCaseTemplate(that,classView,'list',type,page,alphaType);
      caseContactFuns();
   });
   /*** pagination cases Pagination***/
   $(".displayCases").on("click",function(e){
       e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = $.trim($(this).data("paged"));
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
      getCaseTemplate(this,classView,'list',type,page,alphaType);
   });
   /*** Alpha paginations***/
   $(".alphaCase").on("click",function(e){
         e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = getPageNo("displayCases");  
      //var length = 100;
      //var view = $.trim($("#viewType").val());
      var alphaType = $.trim($(this).data('alphatype'));
      $(".listItem").removeClass("activeAlpha");
      $(".listItem[data-alphatype="+alphaType+"]").addClass("activeAlpha");
       var type = $(".activeCont").data("type");
      getCaseTemplate(this,classView,'list',type,page,alphaType);
   });
}
/**
 * Perform the function
 * @name performFun
 * @returns void
 */
 function performFun(length,page,that,classView)
    {
        showLoader();
        var account = $.trim($("#accountWindow").val());
        var search = $.trim($("#search").val());
        var searchType = '';
        if($("#searchTypes").is(":checked"))
            searchType = 'all';
        $(".error").remove();
        if(search.length <2)
        {
            
            var divEle = document.getElementById("searchBlock");
            var data = divEle.innerHTML+'<p  class="error" style="color:red">Error: Please enter a search string at least 2 characters long.</p>';
            divEle.innerHTML = data;
            return false;
        }
        /*** Search the functionality ***/
        var root = $.trim($("#rootTheme").val());
        $.post(root+"/ajax/accounts/search-accounts.php",{search:search,search_type:searchType},function(data){
                var status = getConnectionError(data,that,classView);
                if(!status)
                        return false;
              var  res = data.accountList;
            var result = data.response;
            var totalRecords = data.NumberofRec;
            var msg = "Request Message";
            var len = 0;  
            len = data.pageRecords;
            if (typeof (res.error) != "undefined")
            {
                itemAlertData(msg, data.message);
                return false;
                hideLoader();
            }
             var responseHtml = '';
    
    if(typeof(result)!= "undefined" && typeof(result.status)!="undefined" && result.status== "Failure")
            responseHtml +='<tr><td class="error" colspan="6">'+result.message+'</td></tr>';
    else if (res ==null)
    {
         responseHtml +='<tr><td class="error" colspan="6">No Data Found</td></tr>';
    }else{
       
        for (var i = 0; i < len; i++)
        {
            var name = id = storeNo = postalCode = city = siteM = active = "";
            if (res[i] != null && typeof (res[i].Name) != "undefined")
                name = res[i].Name;
           
            if (res[i] != null && typeof (res[i].Id) != "undefined")
                 id = res[i].Id;
            if (res[i] != null && typeof (res[i].Store_Number__c) != "undefined")
                 storeNo = res[i].Store_Number__c;
             if (res[i] != null && typeof (res[i].ShippingPostalCode) != "undefined")
                postalCode = res[i].ShippingPostalCode;
             if (res[i] != null && typeof (res[i].ShippingCity) != "undefined")
                city = res[i].ShippingCity;
            if (res[i] != null && typeof (res[i].Active_Account_Services__c) != "undefined")
                active = res[i].Active_Account_Services__c; 
            if (res[i] != null && typeof (res[i].Site) != "undefined")
                siteM = res[i].Site; 
            
            var activeImg = file = '';
             if(active == "Active"){
                  file = 'flag_green.gif';
              }
             else     
                 file = 'flag_red.gif';
                 activeImg = '<img border="0" alt="Active" src="'+root+'/images/extended/'+file+'">';
             //}
            responseHtml += '<tr class="dataRow">';
            responseHtml += '<td class="dataCell nameCell" data-id="'+id+'">'+name+'</td>';
            responseHtml += '<td class="dataCell">'+storeNo+'</td>';
            responseHtml += '<td class="dataCell">'+postalCode+'</td>';
            responseHtml += '<td class="dataCell" >'+city+'</td>';
            responseHtml += '<td class="dataCell">'+siteM+'</td>';
            responseHtml += '<td class="dataCell">'+activeImg+'</td>';
            responseHtml += '</tr>';
        }
    }
  //$(".account-list-res").html('');
            $(".account-list-res").html(responseHtml);
      //      var paginationHtml = '';
    //var alpha = '';
    //paginationHtml += pagination("",length, page, parseInt(totalRecords), len, "displaySearchRecentAccounts", alpha);
    //$(".paginationLinks").html(paginationHtml);
    /**** ****/
    $(".accountHead").html(" Accounts ("+totalRecords+" ) ");
    displayAccounts();
    $(that).removeClass(classView);
    hideLoader();
            /*if (window.opener != null && !window.opener.closed) {
            window.opener.document.getElementById("accountId").value = account;
            }*/
            //just comment window.close();
        },"json");
        
    }
    /**
     * Display the Recent Accounts
     * @name getRecentAccountTemplate
     * @param {object} that
     * @param {string} classView
     * @param {int} length
     * @param {int} page
     * @param {boolean} isMore
     * @param {string} field
     * @param {string} sortType
     * @returns {void}
     */
    function getRecentAccountTemplate(that,classView,length,page,isMore,field,sortType)
{
    showLoader();
     var root = $.trim($("#rootTheme").val()); 
     var site = $.trim($("#siteTheme").val());
    $.post(root+"/ajax/accounts/account-list.php",{ view: 5,PageNum:page,is_more:isMore,
    field:field,sort_type:sortType},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayAccounts();
            return false;
        }
            var  res = data.accountList;
            var result = data.response;
            var totalRecords = data.NumberofRec;
            var msg = "Request Message";
            var len = 0;
    try {
        len = data.pageRecords;
       if (typeof (res.error) != "undefined")
        {
            itemAlertData(msg, data.message);
            return false;
            hideLoader();
        }
    } catch (e) {

    }
    
    var responseHtml = '';
    
    if(typeof(result)!= "undefined" && typeof(result.status)!="undefined" && result.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="9">'+result.message+'</td></tr>';
    }else{
         for (var i = 0; i < len; i++)
        {
            var name = id = storeNo = postalCode = city = siteM = active = "";
            if (res[i] != null && typeof (res[i].Name) != "undefined")
                name = res[i].Name;
            if (res[i] != null && typeof (res[i].Id) != "undefined")
                 id = res[i].Id;
            if (res[i] != null && typeof (res[i].Store_Number__c) != "undefined")
                 storeNo = res[i].Store_Number__c;
             if (res[i] != null && typeof (res[i].ShippingPostalCode) != "undefined")
                postalCode = res[i].ShippingPostalCode;
             if (res[i] != null && typeof (res[i].ShippingCity) != "undefined")
                city = res[i].ShippingCity;
             if (res[i] != null && typeof (res[i].Site) != "undefined")
                siteM = res[i].Site; 
            if (res[i] != null && typeof (res[i].Active_Account_Services__c) != "undefined")
                active = res[i].Active_Account_Services__c; 
            var activeImg =file = '';
             if(active == "Active"){
                  file = 'flag_green.gif';
              }
                  else
                 file = 'flag_red.gif';
                 activeImg = '<img border="0" alt="Active" src="'+root+'/images/extended/'+file+'">';
             //}
            responseHtml += '<tr class="dataRow">';
            responseHtml += '<td class="dataCell nameCell" data-id="'+id+'">'+name+'</td>';
            responseHtml += '<td class="dataCell">'+storeNo+'</td>';
            responseHtml += '<td class="dataCell">'+postalCode+'</td>';
            responseHtml += '<td class="dataCell" >'+city+'</td>';
            responseHtml += '<td class="dataCell">'+siteM+'</td>';
            responseHtml += '<td class="dataCell">'+activeImg+'</td>';
            responseHtml += '</tr>';
        }
    }
    
    
    /** Pagination Links ***/
   
    var paginationHtml = '';
    var alpha = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayRecentAccounts", alpha);
    $(".paginationLinks").html(paginationHtml);
    /**** ****/
    $(".accountHead").html(" Accounts ("+totalRecords+" ) ");
    $(".account-list-res").html(responseHtml);
    
          $(that).removeClass(classView);
          displayAccounts();
          hideLoader();
      },'json');   
    }
    /**
     * Given datetime sring to date time format
     * @name getDateTimeFormat
     * @param {string} givenDateTime
     * @returns {String}
     */
    function getDateTimeFormat(givenDateTime)
    {
        var date = time = "";
     var dateArray = givenDateTime.split("T");
    if(typeof(dateArray[0]) != "undefined")
    { 
        var dateA = dateArray[0].split("-");
        date = dateA[2]+"/"+dateA[1]+"/"+dateA[0];
    }
  
    if(typeof(dateArray[1]) != "undefined")
    {
        var min = sec =  0;
        var timeArray = dateArray[1].split(":");
        if(typeof(timeArray[0]) != "undefined")
            min = timeArray[0];
        if(typeof(timeArray[1]) != "undefined")
         sec = timeArray[1];
        time = min+":"+sec;
    }
    return date+ " " +time;
    }
    /**
     * Get the Case History
     * @name getCaseHistory
     * @param {object} that
     * @param {string} classView
     * @returns {void}
     */
    function getCaseHistory(that,classView,page)
    {
        var root = $.trim($("#rootTheme").val());
        var site = $.trim($("#siteTheme").val());
        var pagePart = 0;
        var caseId = $.trim($(".gotoLink").data("caseid"));
        var caseNo = $.trim($(".gotoLink").data("no"));
        var perPageCnt = 15;
        var showMoreCnt = 0;
        if(typeof(page) == "undefined")
        page = 0;
        if(typeof(pagePart) == "undefined")
        pagePart = 0;
        $.post(root+"/ajax/case/case-history-list.php",{case_id:caseId,
            PageNumShow:page,per_page_cnt:perPageCnt},function(data){
          var status = getConnectionError(data,that,classView);
          if(!status){
              showMoreContact();
              return false;
          }
          var  res = data;
          var resultData = res.caseHistoryGrid;
          var totalRecords = res.NumberofRec;
          var msg = "Request Message";
          var len =  res.pageRecords;
          if(len > 0)
          {
             var result = '';
             result +='<div>';
             result += '<div ><h3 class="accountTitleH3">Case History</h3></div>';
             result += '<div  class="pbBody">';    
             result += '<table cellspacing="0" cellpadding="0" border="0" class="list">';
             result += '<tbody>';
             result += '<tr class="headerRow caseHistoryRow">';
             result += '<th  scope="col">Date</th>';
             result += '<th  scope="col">User</th>';
             result += '<th  scope="col">Connection</th>';
             result += '<th  scope="col">Action</th></tr>'; 
             for (var i = 0; i < len; i++)
             {
                 var createdDate = action= user = oldVal =  newVal = field = changedFieldNm =  '';
                if (resultData[i] != null && typeof (resultData[i].CreatedDate) != "undefined")
                    createdDate = getDateTimeFormat(resultData[i].CreatedDate);   
                if (resultData[i] != null && typeof (resultData[i].CreatedBy) != "undefined" && typeof (resultData[i].CreatedBy.Name) != "undefined")
                    user = resultData[i].CreatedBy.Name; 
                if (resultData[i] != null && typeof (resultData[i].Field) != "undefined" )
                    field = resultData[i].Field;
                if (resultData[i] != null && typeof (resultData[i].OldValue) != "undefined" )
                    oldVal = resultData[i].OldValue;
                if (resultData[i] != null && typeof (resultData[i].NewValue) != "undefined" )
                    newVal = resultData[i].NewValue;
                 changedFieldNm = getFieldForCase(field);
                if(changedFieldNm != "")
                {
                    if(field == "created")
                        action = '<strong>'+changedFieldNm+'</strong>';
                    else 
                        action = 'Changed <strong>'+changedFieldNm+'</strong>';
                }
                if(field == "Description__c")
                    action = 'Changed Description';
                if(field == "Resolution__c")
                    action = 'Changed Resolution';
                showMoreCnt = i+1;
                if(oldVal != '' && oldVal != null)
                    action += ' from <strong>'+oldVal+'</strong>';
                if(newVal != '' && newVal != null)
                    action += ' to <strong>'+newVal+'</strong>';
                if(field != "created" &&  field != "Account__c"  && field != "Date_Time_Opened__c"  &&  oldVal != newVal){
                    result += '<tr  class=" dataRow">';
                    result += '<td class=" dataCell  " scope="row">'+createdDate+'</td>';
                    result += '<td class=" dataCell  ">'+user+'</td>';
                    result += '<td class=" dataCell  ">&nbsp;</td>';
                    result += '<td class=" dataCell  "> '+action+' </td>';
                    result += '</tr>';   
                }else if(field == "created" && field != "Date_Time_Opened__c" )
                {
                       result += '<tr  class=" dataRow">';
                    result += '<td class=" dataCell  " scope="row">'+createdDate+'</td>';
                    result += '<td class=" dataCell  ">'+user+'</td>';
                    result += '<td class=" dataCell  ">&nbsp;</td>';
                    result += '<td class=" dataCell  "> '+action+' </td>';
                    result += '</tr>';   
                }
             }
             result += '</tbody></table>';
             result += '</div></div>';    
             var totalPageCount = totalPageCnt(totalRecords,perPageCnt);
    
    page = parseInt(page)+1;
    var showMore = '';
   
    if(page < totalPageCount && totalRecords > perPageCnt)
     showMore = '<span class="showMoreCaseHistoryAct" data-cnt="'+showMoreCnt+'" data-page="'+page+'" data-pagepart="'+pagePart+'"  >Show '+perPageCnt+' more</span>&nbsp;&nbsp;';
     if(totalRecords >0){
        var responseShowList = '<div >'+showMore+'<span><a href="'+site+'/case-history-list?case_id='+caseId+'&case_no='+caseNo+'">Go to List( '+totalRecords+' )</a></span></div>';
        
     }
    
        $(".showMoreDivHistorys").html(responseShowList);
             $(".caseHistoryDiv").html(result);
             showMoreContact();
          }
        },'json');
        
   
    }
/**
 * Get the fields for case
 * @name getFieldForCase
 * @param {string} field
 * @returns {String}
 */    
function  getFieldForCase(field)
{
    var result = '';
    switch(field){
        case "created":
             result = "Created";
        break;
        case "Name":
            result = "Case Number";
        break;
        case "Status__c":
            result = "Status";    
            break;
         case "Subject__c":
            result = "Subject";
            break;
         case "ContactPhone__c":
            result = "Phone";   
            break;
         /*case "Account__r.Id":
            result = "Account"; 
            break;*/
         /*case "Contact__r.Id":
            result = "Contact";
            break;*/
         case "store_number__c":
            result = "Store Number";
            break;
         case "Street_Address__c":
            result = "Street Address";
            break;
         case "City__c":
            result = "City";   
            break;   
        case "Case_Site_Postcode__c":
            result = "Postcode";   
            break;
        case "Reason__c":
            result = "Case Reason";   
            break;    
        case "Description__c":
            result = "Description";   
        break;    
        case "Resolution__c":
            result = "Resolution";   
        break;    
        case "Owner.Name":
            result = "Owner";   
        break;
        case "LastModifiedBy.Name":
            result = "Last Modify User";   
        break;
        case "LastModifiedDate":
            result = "Last Modify Date";   
        break;
        case "DateOpened__c":
            result = "Date/Time Opened";   
        break;
        case "ClosedDate__c":
            result = "Date/Time Closed";   
        break;
        case "Origin__c":
            result = "Origin";   
        break;
        case "Priority__c":
            result = "Priority";   
        break;
        case "ContactEmail__c":
            result = "Email";   
        break;
        case "Owner":
            result = "Owner";
        break;
          case "Contact":
            result = "Contact";
        break;
        case "Account":
            result = "Account";
        break;
        case "CreatedBy":
            result = "CreatedBy";
        break;
        case "Received_Closure_Confirmation_from_Store__c":
            result = "Received Closure Confirmation from Store";   
        break;
        
    }
    return result;
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
function getContactTemplateByAccount(that,classView,page,alphaType,pagePart,field,sortType)
{
    showLoader();
    if(typeof(page) == "undefined")
        page = 0;
    if(typeof(pagePart) == "undefined")
        pagePart = 0;
     var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val()); 
     var accountId = $.trim($(".new-contact-act-btn").data("id"));
     var accountName = $.trim($(".new-contact-act-btn").data("name"));
     var perPageCnt = 15;
    $.post(root+"/ajax/contacts/contact-list-by-account.php",{account_id:accountId,
        per_page_cnt:perPageCnt,PageNumShow:page,PageNum:pagePart,
    alpha_type:alphaType,field:field, sort_type:sortType},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayContacts();
          showMoreContact();
            return false;
        }
            var  res = data;
           var result = res.contactGrid;
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
        var headerContact = '<tr class="headerRow">\n\
                <th scope="col" class="actionColumn labelCol">Action</th>\n\
                 <th class="labelCol" scope="col">\n\
                <a title="Contact Name" class="sortClass "  data-field ="Name"> Contact Name\n\
                </a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Title" class="sortClass" data-field ="AName">Title</a> </th>\n\
                <th class="labelCol" scope="col" >\n\
                <a title="Email"   class="sortClass" data-field ="AName">Email</a></th>\n\
                  <th class="labelCol" scope="col">\n\
                <a title="Phone" data-field ="Phone" class="sortClass">Phone</a></th>';
        headerContact += '</tr>';
        $(".headerContact").html(headerContact);
    
         for (var i = 0; i < len; i++)
        {
            
             var name = id= titleP =email= phone= "";
             if (result[i] != null && typeof (result[i].Name) != "undefined")
                name = result[i].Name;
             if (result[i] != null && typeof (result[i].Id) != "undefined")
                id = result[i].Id;
             if (result[i] != null && typeof (result[i].Title) != "undefined")
                 titleP = result[i].Title;
             if (result[i] != null && typeof (result[i].Phone) != "undefined")
                 phone = result[i].Phone;
             if (result[i] != null && typeof (result[i].Email) != "undefined")
                email = result[i].Email;   
            showMoreCnt = i+1;
            responseHtml +='<tr  class="dataRow even first">';
            
            responseHtml +='<td class="actionColumn"><a  href="'+siteUrl+'/contact-form?id='+id+'">Edit</a></td>';
            responseHtml +='<td class=" dataCell" scope="row"><a href="'+siteUrl+'/view-contact?id='+id+'&act_id='+accountId+'&act_name='+accountName+'">'+name+'</a></td>';
            responseHtml +='<td class=" dataCell">'+titleP+'</td>';
            responseHtml +='<td class=" dataCell">'+phone+'</td>';
            responseHtml +='<td class=" dataCell">'+email+'</td>';
            responseHtml +='</tr>';
        }
    }
    else
        responseHtml +='<tr><td class="error" colspan="5">No Records To Display</td></tr>';
    var totalPageCount = totalPageCnt(totalRecords,perPageCnt);
    page = parseInt(page)+1;
    var showMore = '';
    if(page<totalPageCount && totalRecords > perPageCnt)
     showMore = '<span class="showMoreContactAct" data-cnt="'+showMoreCnt+'" data-page="'+page+'" data-pagepart="'+pagePart+'"  >Show '+perPageCnt+' more</span>&nbsp;&nbsp;';
    /*   var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayContacts", alpha);
   */
    //$(".paginationLinks").html(paginationHtml);
  var responseShowList = '<div >'+showMore+'\n\
<span><a href="'+siteUrl+'/contact-list??act_id='+accountId+'&act_name='+accountName+'">Go to List( '+totalRecords+' )</a></span></div>';
        if(typeof(totalRecords) != "undefined" && totalRecords >0)
   $(".showMoreDivContact").html(responseShowList);
    $(".contact-list-res").html(responseHtml);
    $(that).removeClass(classView);
    displayContacts();
    showMoreContact();
    hideLoader();
      },'json');
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
 * Get cases information for account
 * @name getCaseTemplateByAccount
 * @param {object} that
 * @param {string} classView
 * @param {string} page
 * @param {string) alphaType
 * @param {int} pagePart
 * @param {string} field
 * @param {string} sortType
 * @returns {undefined}
 */
function getCaseTemplateByAccount(that,classView,page,alphaType,pagePart,field,sortType)
{
    showLoader();
     var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val()); 
     var accountId = $.trim($(".new-contact-act-btn").data("id"));
     var accountName = $.trim($(".new-contact-act-btn").data("name"));
     var perPageCnt = 15;
     var showMoreCnt = 0;
     if(typeof(page) == "undefined")
        page = 0;
    if(typeof(pagePart) == "undefined")
        pagePart = 0;
    $.post(root+"/ajax/case/case-list-by-account.php",{account_id:accountId, 
        PageNum:pagePart,per_page_cnt:perPageCnt,PageNumShow:page,
    alpha_type:alphaType,field:field,sort_type:sortType},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayContacts();
            showMoreContact();
            return false;
        }
            var  res = data;
           var result = res.caseGrid;
           var totalRecords = res.NumberofRec;
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
        var headerContact = '<tr class="headerRow">\n\
                <th scope="col" class="actionColumn labelCol">Action</th>\n\
                 <th class="labelCol" scope="col">\n\
                <a title="Case Number" class="sortClass"  data-field ="Name"> Case Number</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Contact" class="sortClass" data-field ="Contact">Contact</a> </th>\n\
                <th class="labelCol" scope="col" >\n\
                <a title="Subject"   class="sortClass" data-field ="Subject__c">Subject</a></th>\n\
                  <th class="labelCol" scope="col">\n\
                <a title="Priority" data-field ="Priority__c" class="sortClass">Priority</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Date/Time Opened" data-field ="Priority__c" class="sortClass">Date/Time Opened</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Status" data-field ="Status__c" class="sortClass">Status</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Owner First Name" data-field ="FirstName" class="sortClass">Owner First Name</a></th>';
        headerContact += '</tr>';
        $(".headerCase").html(headerContact);
    
         for (var i = 0; i < len; i++)
        {
            
             var name = contact= id = dateOpen = statusM =
                 subject = priority = phone = owner = "";
             if (result[i] != null && typeof (result[i].Name) != "undefined")
                name = result[i].Name;
             if (result[i] != null && typeof (result[i].Id) != "undefined")
                id = result[i].Id;
             if (result[i] != null && typeof (result[i].Status__c) != "undefined")
                 statusM = result[i].Status__c;
             if (result[i] != null && typeof (result[i].Subject__c) != "undefined")
                 subject = result[i].Subject__c;
             if (result[i] != null && typeof (result[i].Priority__c) != "undefined")
                priority = result[i].Priority__c;   
            if (result[i] != null && typeof (result[i].Date_Time_Opened__c) != "undefined")
                dateOpen = getDateTimeFormat(result[i].Date_Time_Opened__c);
            if (result[i] != null && typeof (result[i].Contact__r) != "undefined" && typeof (result[i].Contact__r.Name) != "undefined")
                contact = result[i].Contact__r.Name;
            if (result[i] != null && typeof (result[i].Owner) != "undefined" && typeof (result[i].Owner.FirstName) != "undefined")
                owner = result[i].Owner.FirstName;
            showMoreCnt = i+1;
            responseHtml +='<tr  class="dataRow even first">';
            
            responseHtml +='<td class="actionColumn"><a  href="'+siteUrl+'/case?case-id='+id+'">Edit</a></td>';
            responseHtml +='<td class=" dataCell" scope="row"><a href="'+siteUrl+'/view-case?id='+id+'&act_id='+accountId+'&act_name='+accountName+'">'+name+'</a></td>';
            responseHtml +='<td class=" dataCell">'+contact+'</td>';
            responseHtml +='<td class=" dataCell">'+subject+'</td>';
            responseHtml +='<td class=" dataCell">'+priority+'</td>';
            responseHtml +='<td class=" dataCell">'+dateOpen+'</td>';
            responseHtml +='<td class=" dataCell">'+statusM+'</td>';
            responseHtml +='<td class=" dataCell">'+owner+'</td>';
            responseHtml +='</tr>';
        }
    }
    else
         responseHtml +='<tr><td class="error" colspan="5">No Records To Display</td></tr>';
    /*   var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayContacts", alpha);
   */
    //$(".paginationLinks").html(paginationHtml);
    var totalPageCount = totalPageCnt(totalRecords,perPageCnt);
    
    page = parseInt(page)+1;
    var showMore = '';
    
    if(page < totalPageCount && totalRecords > perPageCnt)
     showMore = '<span class="showMoreCaseAct" data-cnt="'+showMoreCnt+'" data-page="'+page+'" data-pagepart="'+pagePart+'"  >Show '+perPageCnt+' more</span>&nbsp;&nbsp;';
     if(totalRecords >0){
        var responseShowList = '<div >'+showMore+'<span><a href="'+siteUrl+'/case-list??act_id='+accountId+'&act_name='+accountName+'">Go to List( '+totalRecords+' )</a></span></div>';
        $(".showMoreDivCase").html(responseShowList);
     }
    $(".case-list-res").html(responseHtml);
    
    //alert($(".contact-list-res tr").length);
          $(that).removeClass(classView);
          displayContacts();
          showMoreContact();
          hideLoader();
      },'json');
}
/**
 * Get cases information for account
 * @name getCaseTemplateByContact
 * @param {object} that
 * @param {string} classView
 * @param {string} page
 * @param {string) alphaType
 * @param {int} pagePart
 * @param {int} isMore
 * @param {string} field
 * @param {string} sortType
 * @returns {undefined}
 */
function getCaseTemplateByContact(that,classView,page,alphaType,pagePart,isMore, field,sortType)
{
    showLoader();
     var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val()); 
     var contactId = $.trim($("#contactId").val());
     var contactName = $.trim($("#contactName").val());
     var perPageCnt = 15;
     var showMoreCnt = 0;
     if(typeof(page) == "undefined")
        page = 0;
    if(typeof(pagePart) == "undefined")
        pagePart = 0;
    
    $.post(root+"/ajax/case/cases-list-by-contact.php",{contact_id:contactId, 
        PageNum:pagePart,per_page_cnt:perPageCnt,PageNumShow:page,
    alpha_type:alphaType, is_more:isMore,field:field,sort_type:sortType},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            performCaseContactFun();
            return false;
        }
            var  res = data;
           var result = res.caseGrid;
           var totalRecords = res.NumberofRec;
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
        var headerContact = '<tr class="headerRow">\n\
                <th scope="col" class="actionColumn labelCol">Action</th>\n\
                 <th class="labelCol" scope="col">\n\
                <a title="Case Number" class="sortClass"  data-field ="Name"> Case Number</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Contact" class="sortClass" data-field ="Contact">Contact</a> </th>\n\
                <th class="labelCol" scope="col" >\n\
                <a title="Subject"   class="sortClass" data-field ="Subject__c">Subject</a></th>\n\
                  <th class="labelCol" scope="col">\n\
                <a title="Priority" data-field ="Priority__c" class="sortClass">Priority</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Date/Time Opened" data-field ="Priority__c" class="sortClass">Date/Time Opened</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Status" data-field ="Status__c" class="sortClass">Status</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Owner First Name" data-field ="FirstName" class="sortClass">Owner First Name</a></th>';
        headerContact += '</tr>';
        $(".headerCase").html(headerContact);
    
         for (var i = 0; i < len; i++)
        {
            
             var name = contact= id = dateOpen = statusM =
                 subject = priority = phone = owner = "";
             if (result[i] != null && typeof (result[i].Name) != "undefined")
                name = result[i].Name;
             if (result[i] != null && typeof (result[i].Id) != "undefined")
                id = result[i].Id;
             if (result[i] != null && typeof (result[i].Status__c) != "undefined")
                 statusM = result[i].Status__c;
             if (result[i] != null && typeof (result[i].Subject__c) != "undefined")
                 subject = result[i].Subject__c;
             if (result[i] != null && typeof (result[i].Priority__c) != "undefined")
                priority = result[i].Priority__c;   
            if (result[i] != null && typeof (result[i].Date_Time_Opened__c) != "undefined")
                dateOpen = getDateTimeFormat(result[i].Date_Time_Opened__c);
            if (result[i] != null && typeof (result[i].Contact__r) != "undefined" && typeof (result[i].Contact__r.Name) != "undefined")
                contact = result[i].Contact__r.Name;
            if (result[i] != null && typeof (result[i].Owner) != "undefined" && typeof (result[i].Owner.FirstName) != "undefined")
                owner = result[i].Owner.FirstName;
            showMoreCnt = i+1;
            responseHtml +='<tr  class="dataRow even first">';
            
            responseHtml +='<td class="actionColumn"><a  href="'+siteUrl+'/case?case-id='+id+'">Edit</a></td>';
            responseHtml +='<td class=" dataCell" scope="row"><a href="'+siteUrl+'/view-case?id='+id+'&cont_id='+contactId+'&cont_name='+contactName+'">'+name+'</a></td>';
            responseHtml +='<td class=" dataCell">'+contact+'</td>';
            responseHtml +='<td class=" dataCell">'+subject+'</td>';
            responseHtml +='<td class=" dataCell">'+priority+'</td>';
            responseHtml +='<td class=" dataCell">'+dateOpen+'</td>';
            responseHtml +='<td class=" dataCell">'+statusM+'</td>';
            responseHtml +='<td class=" dataCell">'+owner+'</td>';
            responseHtml +='</tr>';
        }
    }
    else
         responseHtml +='<tr><td class="error" colspan="5">No Records To Display</td></tr>';

    var totalPageCount = totalPageCnt(totalRecords,perPageCnt);
    
    page = parseInt(page)+1;
    var showMore = '';
    
    if(page < totalPageCount && totalRecords > perPageCnt)
     showMore = '<span class="showMoreCaseAct" data-cnt="'+showMoreCnt+'" data-page="'+page+'" data-pagepart="'+pagePart+'"  >Show '+perPageCnt+' more</span>&nbsp;&nbsp;';
     if(totalRecords >0){
        var responseShowList = '<div >'+showMore+'<span><a href="'+siteUrl+'/case-list?contact_id='+contactId+'&contact_name='+contactName+'">Go to List( '+totalRecords+' )</a></span></div>';
        $(".showMoreDivCase").html(responseShowList);
     }
    $(".case-list-res").html(responseHtml);
    
    //alert($(".contact-list-res tr").length);
          $(that).removeClass(classView);
          performCaseContactFun();
          hideLoader();
      },'json');
}
/**
 * Perform the case functionalities
 * @name performCaseContactFun
 * @returns {void}
 */
function performCaseContactFun()
{
    /**show more in cases in view account **/
    $(".showMoreCaseAct").on("click",function(e){
       e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var page = $.trim($(this).data("page"));
        var pagePart = $.trim($(this).data("pagepart"));
        getCaseTemplateByContact(this,classView,page,'all', pagePart);
    });
    /*** Fewer records in cases **/
    $(".fewerCaseContact").on("click",function(e){
        e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        //var type = $(this).data('types');
         $(this).addClass("activeCont");
        $(".moreCaseContact").removeClass("activeCont");
         var page = $.trim($(".showMoreServiceAct").data("page"));
        var pagePart = $.trim($(".showMoreServiceAct").data("pagepart"));
       //var type = $(".activeCont").data("type");
       getCaseTemplateByContact(this,classView,page,'all',pagePart,0);

    });
    /** More records in cases **/
    $(".moreCaseContact").on("click",function(e){
        e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        //var type = $(this).data('types');
         $(this).addClass("activeCont");
        $(".fewerCaseContact").removeClass("activeCont");
         var page = $.trim($(".showMoreCaseAct").data("page"));
        var pagePart = $.trim($(".showMoreCaseAct").data("pagepart"));
       //var type = $(".activeCont").data("type");
       getCaseTemplateByContact(this,classView,page,'all',pagePart,1);

    });
}
/**
 * Get services information for account
 * @name getServiceTemplateByAccount
 * @param {object} that
 * @param {string} classView
 * @param {int} isMore
 * @param {string} type
 * @param {int} page  for page show
 * @param {string} alphaType
 * @param {int} pagePart
 * @param {string} field
 * @param {string} sortType
 * @returns {void}
 */
function getServiceTemplateByAccount(that,classView,isMore,type,page,alphaType,pagePart,field,sortType)
{
    showLoader();
    if(typeof(type) =="undefined")
        type = '';
    if(typeof(page) == "undefined")
        page = 0;
    if(typeof(pagePart) == "undefined")
        pagePart = 0;
    var perPageCnt = 15;
    if(isMore == "1")
        perPageCnt = 100;
    var showMoreCnt = 0;
     var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val()); 
     var accountId = $(".new-contact-act-btn").data("id");
     var accountName = $(".new-contact-act-btn").data("name");
      if(typeof(isMore) == "undefined")
          isMore = 0;
    $.post(root+"/ajax/service/service-list-by-account.php",{is_more:isMore,
        PageNum:pagePart,account_id:accountId,type:type,per_page_cnt:perPageCnt,
        PageNumShow:page,alpha_type:alphaType,field:field, sort_type:sortType},
    function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayContacts();
          displayServicesByAcct();
            return false;
        }
            var  res = data;
           var result = res.serviceGrid;
           var totalRecords = res.NumberofRec;
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
       var h1Page = '.headerService';
        var bodyh1 = ".service-list-res";
        if(type== "live")
        {
            h1Page = ".headerLiveService";
            bodyh1 = ".headerLiveServiceRes";
        }                 
                        
    if(typeof(errorResult)!= "undefined" && typeof(errorResult.status)!="undefined" && errorResult.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="5">'+errorResult.message+'</td></tr>';
    }else if(len>0){
        var headerService = '<tr class="headerRow">\n\
                <th scope="col" class="actionColumn labelCol">Action</th>\n\
                 <th class="labelCol" scope="col">\n\
                <a title="Ref" class="sortClass"  data-field ="Name">Ref</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Service Provider Name" class="sortClass" data-field ="Contact">Service Provider Name</a> </th>\n\
                <th class="labelCol" scope="col" >\n\
                <a title="Chosen Product (if 20 03 01)"   class="sortClass" data-field ="Subject__c">Chosen Product (if 20 03 01)</a></th>\n\
                  <th class="labelCol" scope="col">\n\
                <a title="Container" data-field ="Priority__c" class="sortClass">Container</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Quantity" data-field ="Priority__c" class="sortClass">Quantity</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Size" data-field ="Status__c" class="sortClass">Size</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Service Start Date" data-field ="FirstName" class="sortClass">Service Start Date</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Service End Date" data-field ="FirstName" class="sortClass">Service End Date</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Type" data-field ="FirstName" class="sortClass">Type</a></th>';
        headerService += '</tr>';
        if(type == "live"){
        headerService = '<tr class="headerRow">\n\
                <th scope="col" class="actionColumn labelCol">Action</th>\n\
                <th class="labelCol" scope="col" >\n\
                <a title="Chosen Product (if 20 03 01)"   class="sortClass" data-field ="Subject__c">Chosen Product (if 20 03 01)</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Container" data-field ="Priority__c" class="sortClass">Container</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Size" data-field ="Status__c" class="sortClass">Size</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Quantity" data-field ="Priority__c" class="sortClass">Quantity</a></th>\n\
                <th class="labelCol" scope="col">\n\
                <a title="Service Provider Name" class="sortClass" data-field ="Contact">Service Provider Name</a> </th>\n\
                ';
        headerService += '</tr>';
        
    }
        $(h1Page).html(headerService);
    
         for (var i = 0; i < len; i++)
        {
            
             var   id= ref = serviceProvider = startDate = 
                     chosenProduct = container = qty = endDate = size = types = "";
             
             if (result[i] != null && typeof (result[i].Id) != "undefined")
                id = result[i].Id;
             if (result[i] != null && typeof (result[i].Name) != "undefined")
                ref = result[i].Name;
             if (result[i] != null && typeof (result[i].Service_Provider_Name__c) != "undefined")
                 serviceProvider = result[i].Service_Provider_Name__c;
             if (result[i] != null && typeof (result[i].Chosen_Product__c) != "undefined")
                 chosenProduct = result[i].Chosen_Product__c;
             if (result[i] != null && typeof (result[i].Container__c) != "undefined")
                container = result[i].Container__c;   
            if (result[i] != null && typeof (result[i].Quantity__c) != "undefined")
                qty =result[i].Quantity__c;
            if (result[i] != null && typeof (result[i].Size__c) != "undefined" )
                size = result[i].Size__c;
            if (result[i] != null && typeof (result[i].Type__c) != "undefined")
               types = result[i].Type__c;
           if (result[i] != null && typeof (result[i].Service_Start_Date__c) != "undefined")
               startDate = result[i].Service_Start_Date__c;
           if (result[i] != null && typeof (result[i].Service_End_Date__c) != "undefined")
               endDate = getDateTimeFormat(result[i].Service_End_Date__c);
        
            showMoreCnt = i+1;    
            responseHtml +='<tr  class="dataRow" data-serviceid="'+id+'">';
            
            
            //responseHtml +='<td class=" dataCell">'+size+'</td>';
            if(type == "live")
            {
                responseHtml +='<td class=" dataCell"><a href="'+siteUrl+'/view-service?id='+id+'&act_id='+accountId+'&act_name='+accountName+'">View</a></td>';
                responseHtml +='<td class=" dataCell">'+chosenProduct+'</td>';
                responseHtml +='<td class=" dataCell">'+container+'</td>';
                responseHtml +='<td class=" dataCell">'+size+'</td>';
                responseHtml +='<td class=" dataCell">'+qty+'</td>';
                responseHtml +='<td class=" dataCell">'+serviceProvider+'</td>';
            }else{
            responseHtml +='<td class="actionColumn"></td>';
            responseHtml +='<td class=" dataCell" scope="row"><a href="'+siteUrl+'/view-service?id='+id+'&act_id='+accountId+'&act_name='+accountName+'">'+ref+'</a></td>';
            responseHtml +='<td class=" dataCell">'+serviceProvider+'</td>';
            responseHtml +='<td class=" dataCell">'+chosenProduct+'</td>';
            responseHtml +='<td class=" dataCell">'+container+'</td>';
            responseHtml +='<td class=" dataCell">'+qty+'</td>';
            responseHtml +='<td class=" dataCell">'+size+'</td>';
            responseHtml +='<td class=" dataCell">'+startDate+'</td>';
            responseHtml +='<td class=" dataCell">'+endDate+'</td>';
            responseHtml +='<td class=" dataCell">'+types+'</td>';
         }
            responseHtml +='</tr>';
        }
    }if(len ==0){
     
        responseHtml +='<tr><td class="error" colspan="5">No Records To Display</td></tr>';
    }
    var totalPageCount = totalPageCnt(totalRecords,perPageCnt);
    page = parseInt(page)+1;
    
 var showMore = '';
    //if(totalRecords > 15)
    if(page < totalPageCount && totalRecords > perPageCnt )
     showMore = '<span class="showMoreServiceAct" data-cnt="'+showMoreCnt+'" data-type="'+type+'" data-page="'+page+'" data-pagepart="'+pagePart+'"  >Show '+perPageCnt+' more</span>&nbsp;&nbsp;';   
 var responseShowList = '<input type="hidden" id="serviceType" value="'+type+'" ><div >'+showMore+'\n\
<span><a href="'+siteUrl+'/service-list?act_id='+accountId+'&act_name='+accountName+'&type='+type+'">Go to List( '+totalRecords+' )</a></span></div>';
     var gotoCssEle = ".showMoreDivService";
     if(type == "live")
     gotoCssEle = ".showMoreDivLiveService";
        if(typeof(len) != "undefined" && len >0)
   $(gotoCssEle).html(responseShowList);
    /*   var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayContacts", alpha);
   */
    //$(".paginationLinks").html(paginationHtml);
   
    $(bodyh1).html(responseHtml);
    //alert($(".contact-list-res tr").length);
          $(that).removeClass(classView);
          displayContacts();
          displayServicesByAcct();
          popupLive();
          hideLoader();
          return false;
      },'json');
}
/**
 * @name displayServiceByAcct
 * @returns {void}
 */
function displayServicesByAcct()
{
    /** More Service Account **/
    $(".moreServiceAccount").on("click",function(e){
       e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        $(this).addClass("activeCont");
        $(".fewerServiceAccount").removeClass("activeCont");
        var serviceType = $.trim($("#serviceType").val());
        var page = $.trim($(".showMoreServiceAct").data("page"));
        var pagePart = $.trim($(".showMoreServiceAct").data("pagepart"));
        getServiceTemplateByAccount(this,classView,1,serviceType,page,'all',pagePart,"CreatedDate","desc");
    });
    /*** Fewer Service Account **/
    $(".fewerServiceAccount").on("click",function(e){
       e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        $(this).addClass("activeCont");
        $(".moreServiceAccount").removeClass("activeCont");
        var serviceType = $.trim($("#serviceType").val());
        var page = $.trim($(".showMoreServiceAct").data("page"));
        var pagePart = $.trim($(".showMoreServiceAct").data("pagepart"));
        getServiceTemplateByAccount(this,classView,0,serviceType,page,'all',pagePart,"CreatedDate","desc");
    });
    /** Show More link **/
    $(".showMoreServiceAct").on("click",function(e){
        e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
         var offset = $.trim($(this).data("cnt"));
        var page = $.trim($(this).data("page"));
        var pagePart = $.trim($(this).data("pagepart"));
        var type = $.trim($(this).data("type"));
        var isMore = $(".activeCont").data("type");
        getServiceTemplateByAccount(this,classView,isMore,type,page,'all',pagePart,"CreatedDate","desc");
    });
}
/**
 * Attach the file
 * @name attachFile
 * @param {string} className
 * @returns {void}
 */
function attachFile(className)
{
   
    try{
     var root = $.trim($("#rootTheme").val());
     var caseId = '';
     var fileName =  '';
     
  /* if (window.opener != null && !window.opener.closed) 
   {
       fileName =  window.opener.document.getElementById("afile").value;
       caseId = window.opener.document.getElementById("caseId").value;
   }*/
   fileName = $("#afile").val();
   caseId = $("#caseId").val();
    var fileArray = fileName.split(".");
        var len = fileArray.length;
        var ext = fileArray[len-1];
        ext = ext.toLowerCase();
        //var img = new Image();
        var msg = "Request Message";
        //var that = this;
       
        var size = 0;
       
        var dataFile = new FormData();
        $.each(files, function(key, value)
		{
                   size = value.size;
                  
                     //var file= value;   
                     dataFile.append(key, value);
                });
                
       //dataFile.set(fileName,fileName);
        var error = 0;
    
        //FIle Upload
        $.ajax({
            url: root + '/ajax/attach/upload-file.php?case_id='+caseId,
            type: 'POST',
            data: dataFile,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function (data, textStatus, jqXHR)
            {
                var attachDiv = '<label>You have just uploaded the following file</label>\n\
                    <div class="leftAttachesDiv">\n\
                        <div class="addAttachList"><label> File Name</label></div>\n\
                        <div class="addAttachList"><label>Size </label></div></div>\n\
                    <div class="rightAttachesDiv"><div id="attachFile">'+fileName+'</div><div class="clear clearAttach"  style="margin-top:20px"></div>\n\
                   <div >'+size+' </div><div class="clear clearAttach"></div></div></div>';
                 var attachDivs = '<label>You have just uploaded the following file</label>\n\
                    <table cellspacing="0" cellpadding="0" class="detailList detailListAddAttach">\n\
                        <tr><td class="labelCol"> File Name</td><td class="dataCol">'+fileName+'</td></tr>\n\
                        <tr><td class="labelCol">Size </td><td class="dataCol">'+size+'</td></tr></table>';
                $(".addAttachLists").html(attachDivs);
                attachWindow.close();
               
                /*try{
                    if(typeof(data) != "undefined" && typeof(data) != "null"  && typeof(data.errorCode) != "undefined" &&  data.errorCode != "")
                    { 
                        $(that).removeClass(className); 
                        itemAlertData(data.errorCode, data.message);
                        hideLoader();
                        return false;
                }else{
                    itemDets(".backToDets",root,className);
                }
            }catch(e){
                $(that).removeClass(className); 
                        itemAlertData("Request Message", "File Upload Probelm");
                        hideLoader();
                        return false;
            }*/
               
            }, //success of file closed
            error: function (jqXHR, textStatus, errorThrown)
            {
               /* itemAlertData(msg, "<p>File uploading probelm.</p>");
                hideLoader();
                return false;*/
            }
        }); //file ajax closed	
    
    }catch(e){}
        
       
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
/**
 * Display the hierarchy list
 * @name displayAccountHierarchy
 * @param {object} that
 * @param {string} classView
 * @returns {void}
 */
function displayAccountHiearchy(that,classView)
{
    showLoader();
    var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val()); 
     var accountId = $.trim($("#accountId").val());
     $.post(root+"/ajax/accounts/account-hierarchy-list.php",{account_id:accountId},function(data){
     
          var status = getConnectionError(data,that,classView);
        if(!status){
            displayContacts();
            return false;
        }
            var  res = data;
           var result = res.accountList;
           var totalRecords = res.NumberofRec;
            var msg = "Request Message";
            var len = res.pageRecords;
            
        if (typeof (res.error) != "undefined")
        {
            itemAlertData(msg, data.message);
            return false;
            hideLoader();
        }
        
        var responseHtml = '';
    var errorResult = res.response;
                        
                        
    if(typeof(errorResult)!= "undefined" && typeof(errorResult.status)!="undefined" && errorResult.status== "Failure")
            responseHtml +='<tr><td class="error" colspan="9">'+errorResult.message+'</td></tr>';
    else if(len>0)
    {
        
        var headerContact = '<tr class="headerRow">\n\
                 <th  scope="col">\n\
                <a title=" Account Name" class="sortClass"  data-field ="Name"> Account Name</a></th>\n\
                <th  scope="col">\n\
                <a title="Site" class="sortClass" data-field ="Site">Site</a> </th>\n\
                <th scope="col" >\n\
                <a title="Billing City" data-field ="BillingCity"  class="sortClass">Billing City</a></th>\n\
                <th  scope="col">\n\
                <a title="Billing State/Province" data-field ="BillingState" class="sortClass">Billing State/Province</a></th>\n\
                <th  scope="col">\n\
                 <a title="Account Owner" data-field ="Owner" class="sortClass" >Account Owner\n\</a></th>';
            headerContact += '</tr>';
            $(".headerAccountHierarchy").html(headerContact);
    
         for (var i = 0; i < len; i++)
        {
            console.log(result[i]);
             var name = id= billCity = site = billState = owner="";
             if (result[i] != null && typeof (result[i].Name) != "undefined")
                name = result[i].Name;
            if (result[i] != null && typeof (result[i].Parent) != "undefined" && typeof (result[i].Parent.Name) != "undefined")
                name = result[i].Parent.Name;
             if (result[i] != null && typeof (result[i].Id) != "undefined")
                id = result[i].Id;
            if (result[i] != null && typeof (result[i].Parent) != "undefined" && typeof (result[i].Parent.Id) != "undefined")
                id = result[i].Parent.Id;
            
             if (result[i] != null && typeof (result[i].BillingCity) != "undefined")
                 billCity = result[i].BillingCity;
             if (result[i] != null && typeof (result[i].Site) != "undefined")
                 site = result[i].Site;
             if (result[i] != null && typeof (result[i].BillingState) != "undefined")
                billState = result[i].BillingState;
            /*if (result[i] != null && typeof (result[i].Owner) != "undefined" && typeof (result[i].Owner.Alias) != "undefined")
                owner = result[i].Owner.Alias;  */
            if(  result[i] != null && typeof (result[i].Owner) != "undefined" && typeof (result[i].Owner.Name) != "undefined")
                 owner = result[i].Owner.Name;  
             console.log("owner"+owner)
            responseHtml +='<tr  class="dataRow even first">';
            responseHtml +='<td class=" dataCell"><a href="'+siteUrl+'/view-account?id='+id+'">'+name+'</a></td>';
            responseHtml +='<td class=" dataCell">'+site+'</td>';
            responseHtml +='<td class=" dataCell">'+billCity+'</td>';
            responseHtml +='<td class=" dataCell">'+billState+'</td>';
            responseHtml +='<td class=" dataCell">'+owner+'</td>';
            responseHtml +='</tr>';
        }
    }else
    responseHtml +='<tr><td class="error" colspan="9">No Records To Display</td></tr>';    
    
    $(".account-hierarchy-list-res").html(responseHtml);
    //alert($(".contact-list-res tr").length);
          $(that).removeClass(classView);
          displayContacts();
          hideLoader();
          
     },"json");
     
}
/**
 * Displays the all attach list
 * @name displayAttachList
 * @param {ele} that
 * @param {string} classView
 * @returns {void}
 */
function displayAttachList(that,classView)
{
    showLoader();
    var root = $.trim($("#rootTheme").val()); 
     var siteUrl = $.trim($("#siteTheme").val()); 
     var caseId = $.trim($("#caseId").val());
     var type = $.trim($("#attachType").val());
     $.post(root+"/ajax/attach/all-attach-list.php",{case_id:caseId,type:type},function(data){
     
          var status = getConnectionError(data,that,classView);
        if(!status){
            return false;
        }
            var  res = data;
           var result = res.contactGrid;
           var totalRecords = res.NumberofRec;
            var msg = "Request Message";
            var len = res.pageRecords;
            
        if (typeof (res.error) != "undefined")
        {
            itemAlertData(msg, data.message);
            return false;
            hideLoader();
        }
        
        var responseHtml = '';
    var errorResult = res.response;
    var headerContact = '<tr class="headerRow">\n\
               <th  scope="col"> Action</th>\n\
                 <th  scope="col">\n\
                <a title="Title" class="sortClass">Title</a></th>\n\
               <th scope="col" >\n\
                <a title="Note" class="sortClass">Note</a></th>\n\
                <th  scope="col">\n\
                <a title="File" class="sortClass">File</a></th>\n\
                <th  scope="col"><a title="Created Date" class="sortClass">Created Date</a></th>\n\
                <th  scope="col"><a title="Last Modified" class="sortClass">Last Modified</a></th>\n\
                <th  scope="col">\n\
                 <a title="Owner Alias"  class="sortClass" >Owner Alias</a></th>';
            headerContact += '</tr>';
            $(".headerAllList").html(headerContact);
                        
                        
    if(typeof(errorResult)!= "undefined" && typeof(errorResult.status)!="undefined" && errorResult.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="9">'+errorResult.message+'</td></tr>';
    }else{
         for (var i = 0; i < len; i++)
        {
           
             var name = accountName=id= titleP = mobile=email= postalCode =phone= owner="";
             if (result[i] != null && typeof (result[i].Name) != "undefined")
                name = result[i].Name;
            if (result[i] != null && typeof (result[i].Id) != "undefined")
                id = result[i].Id;
             if ((result[i] != null || result[i] != "undefined") && typeof (result[i].Account) != "undefined"  && typeof (result[i].Account.Name) != "undefined")
                 accountName = result[i].Account.Name;
             if (result[i] != null && typeof (result[i].Title) != "undefined")
                 titleP = result[i].Title;
             if (result[i] != null && typeof (result[i].Phone) != "undefined")
                 phone = result[i].Phone;
             if (result[i] != null && typeof (result[i].MobilePhone) != "undefined")
                mobile = result[i].MobilePhone;
             if (result[i] != null && typeof (result[i].Email) != "undefined")
                email = result[i].Email;   
            
            if (result[i] != null && typeof (result[i].MailingPostalCode) != "undefined")
                postalCode = result[i].MailingPostalCode;
              if (result[i] != null && typeof (result[i].Owner) != "undefined" && typeof (result[i].Owner.Alias) != "undefined")
                owner = result[i].Owner.Alias;  
            if(owner != "" &&  result[i] != null && typeof (result[i].Owner) != "undefined" && typeof (result[i].Owner.Name) != "undefined")
                 owner = result[i].Owner.Name;  
            responseHtml +='<tr  class="dataRow even first">';
            
            responseHtml +='<td class="actionColumn"><a  href="'+siteUrl+'/contact-form?id='+id+'">Edit</a></td>';
            responseHtml +='<td class=" dataCell" scope="row"><a href="'+siteUrl+'/view-contact?id='+id+'">'+name+'</a></td>';
            responseHtml +='<td class=" dataCell">'+accountName+'</td>';
            responseHtml +='<td class=" dataCell">'+titleP+'</td>';
            responseHtml +='<td class=" dataCell">'+phone+'</td>';
            responseHtml +='<td class=" dataCell">'+email+'</td>';
            responseHtml +='</tr>';
        }
    }
    $(".all-attach-list-res").html(responseHtml);
    //alert($(".contact-list-res tr").length);
          $(that).removeClass(classView);
          displayContacts();
          hideLoader();
          
     },"json");
     
}
/**
* @name getSelect
* @returns {void} 
* */
function getSelect(ele)
{ 
    try{
    $(ele).selectBox({
        mobile: true, 
        //width: "150px"
        width: "30%"
    });
    }catch(e){
        
    }
}

/**
 * Display the Service Templates
 * @name getServiceTemplate
 * @param {string} view
 * @param {object} that
 * @param {string} classView
 * @param {int} length
 * @param {int} page
 * @param {int} isMore
 * @param {string} field
 * @param {string} sortType
 * @param {string} alphaType
 * @returns {void}
 */
function getServiceTemplate(view,that,classView,length,page,isMore,field,sortType,alphaType)
{
    showLoader();
     var root = $.trim($("#rootTheme").val()); 
     var site = $.trim($("#siteTheme").val());
     var accountId = $.trim($("#accountId").val());
     var methodType = $.trim($("#type").val());
     var title = 'Current Services';
     if(view ==2)
           title = 'Ended Services';
     if(accountId != '')
              title = "Services";
     $(".bPageTitle h1").html(title);
     var siteT = getSiteName(document.title);
     document.title = title+" | "+siteT;
    $.post(root+"/ajax/service/service-list.php",{view:view,PageNum:page,is_more:isMore,
    field:field,sort_type:sortType,alpha_type:alphaType,
    account_id:accountId,type:methodType},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            return false;
        }
            var  res = data.serviceList;
            var result = data.response;
            var totalRecords = data.NumberofRec;
            var msg = "Request Message";
            var len = 0;
    try {
        len = data.pageRecords;
       
        if (typeof (res.error) != "undefined")
        {
            itemAlertData(msg, data.message);
            return false;
            hideLoader();
        }
    } catch (e) {

    }
    var responseHtml = '';
    var headerHtml = '<tr class="headerRow">';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Name")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        
        headerHtml +='<th scope="col">\n\
                        <a title="Ref - Click to '+sortC+'" data-field="Name" data-type="'+orderType+'" class="sortOrders" >Ref\n\
                        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                        </a></th>';
                  
       if(accountId != ""){
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Type__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
           headerHtml += '<th scope="col">\n\
   <a title="Type - Click to '+sortC+'" data-field="Type__c" data-type="'+orderType+'" class="sortOrders" >Type\n\
    <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
    </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Service_Provider_Name__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
           headerHtml += '<th scope="col">\n\
            <a title="Service Provider Name - Click to '+sortC+'" data-field="Service_Provider_Name__c" data-type="'+orderType+'" class="sortOrders" >Service Provider Name\n\
            <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Chosen_Product__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
           headerHtml += '<th scope="col">\n\
       <a title="Chosen Product (if 20 03 01) - Click to '+sortC+'" data-field="Chosen_Product__c" data-type="'+orderType+'" class="sortOrders" >Chosen Product (if 20 03 01)\n\
        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
         </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Container__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
           headerHtml += '<th scope="col">\n\
         <a title="Container - Click to '+sortC+'" data-field="Container__c" data-type="'+orderType+'" class="sortOrders" >Container\n\
        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Quantity__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
           headerHtml += '<th scope="col">\n\
           <a title="Quantity - Click to '+sortC+'" data-field="Quantity__c" data-type="'+orderType+'" class="sortOrders" >Quantity\n\
            <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
            </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Size__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
           headerHtml += '<th scope="col">\n\
          <a title="Size - Click to '+sortC+'" data-field="Size__c" data-type="'+orderType+'" class="sortOrders" >Size\n\
        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
            </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Service_Start_Date__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
           headerHtml += '<th scope="col">\n\
        <a title="Service Start Date - Click to '+sortC+'" data-field="Service_Start_Date__c" data-type="'+orderType+'" class="sortOrders" >Service Start Date\n\
        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Service_End_Date__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
           headerHtml += '<th scope="col">\n\
        <a title="Service End Date - Click to '+sortC+'" data-field="Service_End_Date__c" data-type="'+orderType+'" class="sortOrders" >Service End Date\n\
    <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
        </a></th>';
       }else{
           var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Customer__r.Name")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th scope="col">\n\
            <a title="Customer - Click to '+sortC+'" data-field="Customer__r.Name" data-type="'+orderType+'" class="sortOrders" >Customer\n\
        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Store_Number__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th scope="col"><a title="Store Number - Click to '+sortC+'" data-field="Store_Number__c" data-type="'+orderType+'" class="sortOrders" >Store Number\n\
        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Status__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th scope="col"><a title="Status - Click to '+sortC+'" data-field="Status__c" data-type="'+orderType+'" class="sortOrders" >Status\n\
            <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
            </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Waste_Type2__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th scope="col"><a title="Waste Type - Click to '+sortC+'" data-field="Waste_Type2__c" data-type="'+orderType+'" class="sortOrders" >Waste Type\n\
        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
            </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Container__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th scope="col"><a title="Container Image - Click to '+sortC+'" data-field="Container__c" data-type="'+orderType+'" class="sortOrders" >Container Image\n\
        <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
        </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Size__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th  scope="col"><a title="Size - Click to '+sortC+'" data-field="Size__c" data-type="'+orderType+'" class="sortOrders" >Size\n\
                <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
                </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Quantity__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th  scope="col"><a title="Quantity - Click to '+sortC+'" data-field="Quantity__c" data-type="'+orderType+'" class="sortOrders">Quantity\n\
            <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
            </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Service_Start_Date__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th  scope="col"><a title="Service Start Date - Click to '+sortC+'" data-field="Service_Start_Date__c" data-type="'+orderType+'" class="sortOrders" >Service Start Date\n\
            <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
            </a></th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Service_End_Date__c")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
       headerHtml += '<th  scope="col"><a title="Service End Date - Click to '+sortC+'" class="sortOrders" data-field="Service_End_Date__c" data-type="'+orderType+'" >Service End Date\n\
            <img title="'+sortTitle+'" class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">\n\
            </a></th>';
         }
       headerHtml += '</tr>';
        $(".displayServiceHeader").html(headerHtml);
    if(typeof(result)!= "undefined" && typeof(result.status)!="undefined" && result.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="10">'+result.message+'</td></tr>';
    }else{
         for (var i = 0; i < len; i++)
        {
             var name = id = customerName = custId = storeNo = statusS = 
                     wasteType = containerImg = size = qty= startDate = 
                     endDate = types = serviceProvider = chosenProduct = "";
             if (res[i] != null && typeof (res[i].Name) != "undefined")
                name = res[i].Name;
             if (res[i] != null && typeof (res[i].Id) != "undefined")
                id = res[i].Id;
            if (res[i] != null && typeof (res[i].Store_Number__c) != "undefined")
                storeNo = res[i].Store_Number__c;
            if (res[i] != null && typeof (res[i].Customer__r) != "undefined" && typeof (res[i].Customer__r.Name) != "undefined" )
                customerName = res[i].Customer__r.Name;
            if (res[i] != null && typeof (res[i].Customer__r) != "undefined" && typeof (res[i].Customer__r.Id) != "undefined" )
                custId = res[i].Customer__r.Id;
            if (res[i] != null && typeof (res[i].Status__c) != "undefined")
                statusS = res[i].Status__c;
            if (res[i] != null && typeof (res[i].Size__c) != "undefined")
                size = res[i].Size__c;
            if (res[i] != null && typeof (res[i].Quantity__c) != "undefined")
                qty = res[i].Quantity__c;
            if (res[i] != null && typeof (res[i].Service_Start_Date__c) != "undefined")
                startDate = getDayFormat(res[i].Service_Start_Date__c);
            if (res[i] != null && typeof (res[i].Service_End_Date__c) != "undefined")
                endDate = getDayFormat(res[i].Service_End_Date__c);
            var container = wasteTypes = '';
            if (res[i] != null && typeof (res[i].Waste_Type2__c) != "undefined")
                wasteTypes = $.trim(res[i].Waste_Type2__c);
            
            if (res[i] != null && typeof (res[i].Container__c) != "undefined")
                container = res[i].Container__c;
             if (res[i] != null && typeof (res[i].Type__c) != "undefined")
               types = res[i].Type__c;
           if (res[i] != null && typeof (res[i].Service_Provider_Name__c) != "undefined")
                 serviceProvider = res[i].Service_Provider_Name__c;
            if (res[i] != null && typeof (res[i].Chosen_Product__c) != "undefined")
                 chosenProduct = res[i].Chosen_Product__c; 
            if(wasteTypes != "")
             wasteType = '<img src="'+root+"/images/extended/waste-type/"+getWastetypeImage(wasteTypes)+'">';
           if(container != "")
             containerImg = '<img src="'+root+"/images/extended/container/"+getContainerImg(container)+'">';
            responseHtml +='<tr  class="dataRow even first">';
            responseHtml +='<td class=" dataCell  " scope="row"><a href="view-service?id='+id+'">'+name+'</a></td>';
            if(accountId != ""){
            responseHtml +='<td class=" dataCell  " scope="row">'+types+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+serviceProvider+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+chosenProduct+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+container+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+qty+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+size+'</td>';
            }else{
            responseHtml +='<td class=" dataCell  " scope="row"><a href="view-contact?id='+custId+'">'+customerName+'</a></td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+storeNo+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+statusS+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+wasteType+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+containerImg+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+size+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+qty+'</td>';
           // responseHtml +='<td class=" dataCell  " scope="row">'+startDate+'</td>';
            //responseHtml +='<td class=" dataCell  " scope="row">'+endDate+'</td>';
            }
             responseHtml +='<td class=" dataCell  " scope="row">'+startDate+'</td>';
            responseHtml +='<td class=" dataCell  " scope="row">'+endDate+'</td>';    
           
            responseHtml +='</tr>';
        }
    }
 
    /** Pagination Links ***/
     var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayServices", alpha);
    $(".paginationLinks").html(paginationHtml);
    /**** ****/
    
    $(".service-list-res").html(responseHtml);
        $(that).removeClass(classView);
          //getSelect("#serviceViewType");
          displayServicesList();
          hideLoader();
      },'json');
}
/**
 * Perform the service functionalities
 * @name displayServices
 */
function displayServicesList()
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
   $("#serviceViewType").on("change",function(e){
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
      getServiceTemplate(view,that,classView,100,0,type,field,orderType,alphaType);
   });
    /*** Services Pagination***/
   $(".displayServices").on("click",function(e){
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
      var view = $.trim($("#serviceViewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getServiceTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
   });
   
   /*** Click on the More Button **/
   $(".moreService").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      $(this).addClass("activeMore");
      
      var page = getPageNo("displayServices");  
      var length = 100;
      
      $(this).addClass("activeCont");
      $(".fewerService").removeClass("activeCont");
      
      var view = $.trim($("#serviceViewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getServiceTemplate(view,this,classView,length,page,1,field,orderType,alphaType);
   });
   /*** Fewer functionalities ***/
    $(".fewerService").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      $(this).addClass("activeFewer");
      showLoader();
      var page = getPageNo("displayServices");  
      var length = 100;
      
      $(this).addClass("activeCont");
      $(".moreService").removeClass("activeCont");
      
      var view = $.trim($("#serviceViewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
      var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
       getServiceTemplate(view,this,classView,length,page,0,field,orderType,alphaType);
   });
   /*** Alpha paginations***/
   $(".alphaService").on("click",function(e){
         e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      var page = getPageNo("displayServices");  
      var length = 100;
      var view = $.trim($("#serviceViewType").val());
      var alphaType = $.trim($(this).data('alphatype'));
      $(".listItem").removeClass("activeAlpha");
      $(".listItem[data-alphatype="+alphaType+"]").addClass("activeAlpha");
       var type = $(".activeCont").data("type");
       var ele = $(".activeSort").parent();
       var field = $.trim(ele.data("field"));
       var orderType = $.trim(ele.data("type"));
      getServiceTemplate(view,this,classView,length,page,type,field,orderType,alphaType);
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
      var page = getPageNo("displayServices");  
      var length = 100;
      var view = $.trim($("#serviceViewType").val());
      var alphaType = $.trim($(".activeAlpha").data('alphatype'));
       var type = $(".activeCont").data("type");
       var field = $.trim($(this).data("field"));
       getServiceTemplate(view,this,classView,length,page,type,field,orderBy,alphaType);
   });
}
/**
 * Get the date in date format first
 * @name getDayFormat
 * @param string givenDate
 * @return string
 */
function getDayFormat(givenDate)
{
    if(givenDate == "") return "";
    var dateArray = givenDate.split("-");
    var m = 0;
    var d =0;
    var y =0000;
     if(typeof(dateArray[2]) != "undefined")
         d = dateArray[2];
     if(typeof(dateArray[1]) != "undefined")
         m = dateArray[1];
     if(typeof(dateArray[0])!= "undefined")
         y = dateArray[0];
     
     return d+"/"+m+"/"+y;
}
/**
 * Get the Attachment list
 * @name getAttachList
 * @param {object} that
 * @param {string} classView
 * @param {string) pageType
 * @param {int} isMore
 * @param {int} page
 * @param {string} alphaType
 * @param {int} pagepart
 * @param {string} field
 * @param {string} sortType
 * @returns {void}
 */
function getAttachList(that,classView,pageType, isMore,page,alphaType,pagePart,field, sortType)
{
        showLoader();
        var root = $.trim($("#rootTheme").val());
        var site = $.trim($("#siteTheme").val());
        var caseId = $.trim($(".gotoLink").data("caseid"));
        var caseNo = $.trim($(".gotoLink").data("no"));
        var divEle = ".caseAttachDiv";
        var caseIdField = "case_id";
        var caseNoField = "case_no";
        if(pageType == "service")
        {
            divEle = ".serviceAttachDiv";
            caseIdField = "service_id";
            caseNoField = "service_no";
        }
         var perPageCnt = 15;
         if(isMore == "1")
        perPageCnt = 100;
        var showMoreCnt = 0;
         if(typeof(page) == "undefined")
        page = 0;
    if(typeof(pagePart) == "undefined")
        pagePart = 0;
        $.post(root+"/ajax/attach/attach-list.php",{case_id:caseId,type:pageType,
            is_more:isMore,PageNum:pagePart, PageNumShow:page, alpha_type:alphaType,
         per_page_cnt:perPageCnt, field:field, sort_type:sortType},function(data){
          var status = getConnectionError(data,that,classView);
          if(!status){
              hideLoader();
              return false;
          }
          var  res = data;
          var resultData = res.totalAttachList;
          var totalRecords = res.NumberofRec;
          var msg = "Request Message";
          var len =  res.pageRecords;
          var result = '';
             result +='<div>';
             result += '<div  class="pbBody">';    
             result += '<table cellspacing="0" cellpadding="0" border="0" class="list">';
             result += '<tbody>';
          if(len > 0)
          {
             
             result += '<tr class="headerRow headerNoteRow"><th  scope="col">Action</th>';
             result += '<th  scope="col">Title</th>';
             result += '<th  scope="col">Type</th>';
             result += '<th  scope="col">Last Modified</th>';
             result += '<th  scope="col">Created By</th>';
             result += '</tr>'; 
             for (var i = 0; i < len; i++)
             {
                 var  title = type =id = user= createdDate=  '';
                if (resultData[i] != null && typeof (resultData[i].DateBy) != "undefined")
                    createdDate = getDateTimeFormat(resultData[i].DateBy);   
                if (resultData[i] != null && typeof (resultData[i].CreatedBy) != "undefined" && typeof (resultData[i].CreatedBy.Name) != "undefined")
                    user = resultData[i].CreatedBy.Name; 
                if (resultData[i] != null && typeof (resultData[i].Id) != "undefined")
                    id = resultData[i].Id; 
                if (resultData[i] != null && typeof (resultData[i].Title) != "undefined" )
                    title = resultData[i].Title;
                if (resultData[i] != null && typeof (resultData[i].Type) != "undefined" )
                    type = resultData[i].Type;
                
                var editFile = site+"/edit-attachment?id="+id+"&case_id="+caseId+"&no="+caseNo;
                if(type == "Note")
                    editFile = site+"/new-note?id="+id+"&case_id="+caseId+"&no="+caseNo;
                
                showMoreCnt = i+1;
                result += '<tr  class=" dataRow">';
                result += '<td class=" dataCell" scope="row">\n\
                 <a href="'+editFile+'">Edit</a>';
                if(type != "Note")    
                result += '&nbsp;<a href="'+site+'/view-attach/?id='+id+'">View</a>';
                result += '&nbsp;<a class="delAttach" data-id="'+id+'" data-types="'+pageType+'" data-type="'+type+'">Delete</a></td>';
                result += '<td class=" dataCell" scope="row">'+title+'</td>';
                result += '<td class=" dataCell">'+type+'</td>';
                result += '<td class=" dataCell" scope="row">'+createdDate+'</td>';
                result += '<td class=" dataCell">'+user+'</td>';
                result += '</tr>';   
                
             }
             result += '</tbody></table>';
             result += '</div></div>';    
             $(divEle).html(result);
             //displayAttachFun();
          }else{
             result += '<tr class="headerRow"><td class="noRowsHeader" scope="col">No Records To Display</td></tr>';
             result += '</tbody></table>';
             result += '</div></div>';    
              $(divEle).html(result);
              $(".viewAllLink").hide();
              
          }
           var totalPageCount = totalPageCnt(totalRecords,perPageCnt);
    
    page = parseInt(page)+1;
    var showMore = '';
    
    if(page < totalPageCount && totalRecords > perPageCnt)
     showMore = '<span class="showMoreAttachAct" data-cnt="'+showMoreCnt+'" data-page="'+page+'" data-pagepart="'+pagePart+'"  data-types="'+pageType+'" >Show '+perPageCnt+' more</span>&nbsp;&nbsp;';
     if(totalRecords >0){
        var responseShowList = '<div >'+showMore+'<span><a href="'+site+'/attachment-list?'+caseIdField+'='+caseId+'&'+caseNoField+'='+caseNo+'">Go to List( '+totalRecords+' )</a></span></div>';
        $(".showMoreDivAttaches").html(responseShowList);
     }
          displayAttachFun();
          hideLoader();
        },'json');
 
}
/**
 * Perform the attach functionalities
 * @name displayAttachFun
 * @returns {void}
 */
function displayAttachFun()
{
    var root = $.trim($("#rootTheme").val());
    /*** Delete the Attachment **/
    $(".delAttach").on("click", function(e){
         e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var id = $.trim($(this).data("id"));
        var type = $.trim($(this).data("type"));
        var pageType = $.trim($(this).data("types"));
        var that = this;
        $.post(root+"/ajax/attach/del-attach.php",{id:id,type:type},function(data){
           var status = getConnectionError(data,that,classView);
         
          if(typeof(status) != "undefined" && !status){
              displayAttachFun();
              return false;
          }
          var isMore = $.trim($(".activeCont").data("type")); 
          var page = $.trim($(".showMoreAttachAct").data("page"));
          var pagePart = $.trim($(".showMoreAttachAct").data("pagepart"));
          if(typeof(page) == "undefined")
              page =0;
          if(typeof(pagePart) == "undefined")
              pagePart =0;
          getAttachList(that,classView,pageType,isMore,page,"all",pagePart,"CreatedDate","desc");
          $(that).removeClass(classView);
        });
    });
    
    
     /*** Click on the More Button **/
   $(".attachMoreList").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      showLoader();
      $(this).addClass("activeMore");
      $(this).addClass("activeCont");
      var type =  $.trim($(this).data("types"));
      $(".attachFewerList").removeClass("activeCont");
      var page = $.trim($(".showMoreAttachAct").data("page"));
      var pagePart = $.trim($(".showMoreAttachAct").data("pagepart"));
      if(typeof(page) == "undefined")
              page =0;
          if(typeof(pagePart) == "undefined")
              pagePart =0;
      getAttachList(this,classView,type,1,page,"all",pagePart,"CreatedDate","desc");
      
   });
   /*** Fewer functionalities ***/
    $(".fewerAccount").on("click",function(e){
        e.stopImmediatePropagation();
      var classView = "ajaxCall";
      if($(this).hasClass(classView))
      {
          return false;
      }
      $(this).addClass(classView);
      $(this).addClass("activeFewer");
      showLoader();
      
      $(this).addClass("activeCont");
      $(".attachMoreList").removeClass("activeCont");
      var type =  $.trim($(this).data("types"));
      var page = $.trim($(".showMoreAttachAct").data("page"));
      var pagePart = $.trim($(".showMoreAttachAct").data("pagepart"));
      if(typeof(page) == "undefined")
              page =0;
          if(typeof(pagePart) == "undefined")
              pagePart =0;
      getAttachList(this,classView,type,1,page,"all",pagePart,"CreatedDate","desc");
   });
       /**show more in cases in view account **/
    $(".showMoreAttachAct").on("click",function(e){
       e.stopImmediatePropagation();
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var type = $.trim($(this).data("types"));
      var isMore = $.trim($(".activeCont").data("type")); 
        var page = $.trim($(this).data("page"));
        var pagePart = $.trim($(this).data("pagepart"));
        if(typeof(page) == "undefined")
              page =0;
          if(typeof(pagePart) == "undefined")
              pagePart =0;
        getAttachList(this,classView,type,isMore,page,'all', pagePart,"");
        
    });
}
/**
 * Get the Waste Type Image
 * @name getWastetypeImage
 * @param string wasteType
 * @return string
 */
function getWastetypeImage(wasteType)
{
    var imgFile = '';
    switch(wasteType)
    {
        case "Aerosol": case "Solvents":
            imgFile = "aerosol.jpg";
        break;
        case "Antifreeze": case "Brake fluid":
        case "Exhaust": case "Fuel":
        case "Filters":
            imgFile = "auto.png";
        break;
        case "Batteries":case "Battery":
            imgFile = "batteries.png";
        break;
        case "Bricks": case "Construction":
            imgFile = "Buil.png";
        break;
        case "Cardboard": case"Cardboard Stickers":
            imgFile = "Card.png";
        break;
        case "Dry Mixed Recycling": 
            imgFile = "DMR.png";
        break;
        case "Electrical": 
            imgFile = "Elec.png";
        break;
        case "Engine Oil": 
            imgFile = "Eng.png";
        break;
        case "Fluorescent Tubes":
            imgFile = "Flu.png";
        break;
        case "Food":
            imgFile = "Food.png";
        break;
        case "General": case "General Waste":
            imgFile = "Gen.png";
        break;
        case "Glass":
            imgFile = "Gla.png";
        break;
        case "Green Waste":
            imgFile = "Gar.png";
        break;
        case "Hardcore": case "Rubble":
            imgFile = "Hard.png";
        break;
        case "Metal":
            imgFile = "Scra.png";
        break;
        case "Paper":
            imgFile = "Pap.png";
        break;
        case "Paper & Cardboard":
            imgFile = "Pape.png";
        break;
        case "Plasterboard":
            imgFile = "Pla.png";
        break;
        case "Plastic":
            imgFile = "Plas.png";
        break;
        case "Textiles":
            imgFile = "Tex.png";
        break;
        case "Toner":
            imgFile = "Ton.png";
        break;
        case "Tyres":
            imgFile = "Tyr.png";
        break;
        default:
            imgFile = "Other.png";
            break;
    }
    return imgFile;
}
/**
 * Get the Container image file
 * @name getContainerImg
 * @param string container
 * @return string
 */
function getContainerImg(container)
{
    var imgFile = "";
    switch(container)
    {
        case "Aggregate Bags":
            imgFile = "ABag.png";
        break;
        case "Bales":
            imgFile = "Bale.png";
        break;
        case "Barrel (oil)":
            imgFile = "Barr.png";
        break;
        case "Battery Box":
            imgFile = "BBox.png";
        break;
        case "Battery Can":
            imgFile = "BCan.png";
        break;
        case "Caddie":
            imgFile = "Cad.png";
        break;
        case "Cardboard Stickers":
            imgFile = "CStik.png";
        break;
        case "Closed Skip":
            imgFile = "CSkip.png";
        break;
        case "Drum":
            imgFile = "Drum.png";
        break;
        case "FEL":
            imgFile = "FEL.png";
        break;
        case "Flat Bed Trailer":
            imgFile = "FBT.png";
        break;
        case "Fluorescent Tube Coffin":
            imgFile = "FTub.png";
        break;
        case "Hazardous Box":
            imgFile = "HBox.png";
        break;
        case "IBC":
            imgFile = "IBC.png";
        break;
        case "Nappy Bin":
            imgFile = "NBin.png";
        break;
        case "Open Skip":
            imgFile = "OSkip.png";
        break;
        case "Pallets":
            imgFile = "Pal.png";
        break;
        case "Portable Compactor":
            imgFile = "PCom.png";
        break;
        case "Pre-Paid Bags":
            imgFile = "PPB.png";
        break;
        case "REL":
            imgFile = "REL.png";
        break;
        case "RORO":
            imgFile = "RORO.png";
        break;
        case "Sanitary Bin":
            imgFile = "SBin.png";
        break;
        case "Sharps Box":
            imgFile = "SBox.png";
        break;
        case "Toner Box":
            imgFile = "TBox.png";
        break;
        case "Wheeled Bin":
            imgFile = "WBin.png";
        break;
        case "Bulk Tank":
            imgFile = "BTank.png";
        break;
        case "Gas Canister":
            imgFile = "GCan.png";
        break;
        case "Gas Canister":
            imgFile = "GCan.png";
        break;
        case "Grab Loads":
            imgFile = "GLoad.png";
        break;
        case "Hand Dryer":
            imgFile = "HDry.png";
        break;
        case "Bottle Bank":
            imgFile = "BottleBank.png";
        break;
        case "Archive Boxes":
            imgFile = "archiveBoxes.jpg";
        break;
    }
    return imgFile;
}
/**
 * Get the recent items
 * @name getRecentItem
 * @returns {void}
 */
function getRecentItem()
{
    var root = $.trim($("#rootTheme").val());
    var site = $.trim($("#siteTheme").val());
    showLoader();
    $.post(root+"/ajax/recent-items.php",{},function(data){
        
        var status = getConnectionError(data,'','');
        if(!status){
            displayContacts();
            return false;
        }
            var  res = data;
           // console.log(res);
           var result = res;
           var totalRecords = res.length;
            var msg = "Request Message";
            
    try {
        var len = res.length;
       
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
    {
            responseHtml +='<div  class="recentItem">'+errorResult.message+'</div>';
    }else if(len>0){
        for (var i = 0; i < len; i++)
        {
    
             var name = id = type=  "";
             if(result[i] != null && typeof (result[i].Name) != "undefined")
                name = result[i].Name;
            if(result[i] != null && typeof (result[i].Id) != "undefined")
                id = result[i].Id;
             if(result[i] != null && typeof (result[i].attributes.type) != "undefined")
                type = result[i].attributes.type;
             var file = '';
             
             if(type== "Account")
                 file = "view-account/?id="+id;
             if(type== "Contact")
                 file = "view-contact/?id="+id;
             if(type== "Case_Custom__c")
                 file = "view-case/?id="+id;
             if(type== "Service__c")
                 file = "view-service/?id="+id;
             if(type== "Note")
                 file = "new-note/?id="+id;
             if( type == "Account" || type== "Contact" || type== "Case_Custom__c" ||
                     type== "Service__c" || type== "Note" ){
            responseHtml +='<div  class="recentItem">';
            responseHtml +='<a title="'+name+'" tabindex="0" accesskey="1"  href="'+file+'">\n\
                <img title="'+type+': '+name+'" class="mruIcon" alt="'+type+': '+name+'" src="'+root+'/images/extended/s.gif">\n\
                <span class="mruText">'+name+'</span></a>';
            responseHtml +='</div>';
             }
        }
    }
    $(".recentItemList").html(responseHtml);
          hideLoader();
    },'json');
    
}
/**
 * get the site name 
 * @name getSiteName
 * @param string title
 * @returns string
 */
function getSiteName(title)
{
    var siteT = '';
    var titleArray = title.split("-");
    if(typeof(titleArray[1]) != "undefined")
        siteT = titleArray[1];
    titleArray = title.split("|");
    if(typeof(titleArray[1]) != "undefined")
        siteT = titleArray[1];
    return siteT;
}
/**
 * Display the Attach Templates
 * @name getAttachTemplate
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
function getAttachTemplate(view,that,classView,length,page,isMore,field,sortType,alphaType)
{
    showLoader();
     var root = $.trim($("#rootTheme").val()); 
     var site = $.trim($("#siteTheme").val()); 
     var serviceId = $.trim($("#serviceId").val());
     var caseId = $.trim($("#caseId").val());
     var caseNo = $.trim($("#caseNo").val())
     var pageType = "case";
     if(caseId == ""){
         pageType = "service";
         caseId = serviceId;
     }
      
    $.post(root+"/ajax/attach/attach-list.php",{view:view,PageNum:page,is_more:isMore,
    field:field,sort_type:sortType,alpha_type:alphaType,case_id:caseId,
      service_id:serviceId,type:pageType, grid:"list"},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayAttaches();
            return false;
        }
            var  res = data;
           var result = res.totalAttachList;
           var totalRecords = res.NumberofRec;
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
    var headerAttach = '<tr class="headerRow">\n\
                        <th scope="col" class="actionColumn">Action</th>';
        var sortTitle = "Sorted Ascending";
        var sortC = "sort ascending";
        var orderType = "asc";
        var sortClass = "sortAsc";
        var activeClass = "";
        if(field == "Title")
        {
             activeClass = "activeSort";
            if(sortType== "desc"){
            sortTitle = "Sorted Descending";
            orderType = "desc";
            sortClass = "sortDesc";
            sortC = "sort descending";
            }
        }
        headerAttach += '<th class="" scope="col">\n\
                <a title="Title - Click to '+sortC+'" class="sortClass"  data-field ="Title" data-type="'+orderType+'"> Title\n\
                <!--<img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">-->\n\
                </a></th>';
      
        headerAttach += '<th class="" scope="col">\n\
                <a title="Type - Click to '+sortC+'" class="sortClass"  data-field ="Type" data-type="'+orderType+'"> Type\n\
                <!--<img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">-->\n\
                </a></th>';
        headerAttach += '<th class="" scope="col">\n\
                <a title="Last Modified - Click to '+sortC+'" class="sortClass"  data-field ="Type" data-type="'+orderType+'"> Last Modified\n\
                <!--<img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">-->\n\
                </a></th>';
      
        headerAttach += '<th class="" scope="col">\n\
                <a title="Created By - Click to '+sortC+'" class="sortClass"  data-field ="Type" data-type="'+orderType+'"> Created By \n\
                <!--<img title="'+sortTitle+'"   class="'+sortClass+' ' +activeClass+'" alt="'+sortTitle+'" src="'+root+'/images/extended/s.gif">-->\n\
                </a></th>';
            headerAttach += '</tr>';
            $(".attachHeader").html(headerAttach);
                        
                        
    if(typeof(errorResult)!= "undefined" && typeof(errorResult.status)!="undefined" && errorResult.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="9">'+errorResult.message+'</td></tr>';
    }else{
        
        //console.log(result);
         for (var i = 0; i < len; i++)
        {
           
              var  title = type =id = user= createdDate =  '';
                if (result[i] != null && typeof (result[i].DateBy) != "undefined")
                    createdDate = getDateTimeFormat(result[i].DateBy);   
                if (result[i] != null && typeof (result[i].CreatedBy) != "undefined" && typeof (result[i].CreatedBy.Name) != "undefined")
                    user = result[i].CreatedBy.Name; 
                if (result[i] != null && typeof (result[i].Id) != "undefined")
                    id = result[i].Id; 
                if (result[i] != null && typeof (result[i].Title) != "undefined" )
                    title = result[i].Title;
                if (result[i] != null && typeof (result[i].Type) != "undefined" )
                    type = result[i].Type;
                
                var editFile = site+"/edit-attachment?id="+id+"&case_id="+caseId+"&no="+caseNo;
                if(type == "Note")
                    editFile = site+"/new-note?id="+id+"&case_id="+caseId+"&no="+caseNo;
                responseHtml += '<tr  class=" dataRow">';
                responseHtml += '<td class=" dataCell" scope="row">\n\
                 <a href="'+editFile+'">Edit</a>';
                if(type != "Note")    
                responseHtml += '&nbsp;<a href="'+site+'/view-attach/?id='+id+'">View</a>';
                responseHtml += '&nbsp;<a class="delAttach" data-id="'+id+'" data-types="'+pageType+'" data-type="'+type+'">Delete</a></td>';
                responseHtml += '<td class=" dataCell" scope="row">'+title+'</td>';
                responseHtml += '<td class=" dataCell">'+type+'</td>';
                responseHtml += '<td class=" dataCell" scope="row">'+createdDate+'</td>';
                responseHtml += '<td class=" dataCell">'+user+'</td>';
                responseHtml += '</tr>';   
             
            
        }
    }
    
       var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayContacts", alpha);
   //$(".paginationLinks").html(paginationHtml);
     $(".attach-list-res").html(responseHtml);
    //alert($(".contact-list-res tr").length);
          $(that).removeClass(classView);
          displayAttaches();
          hideLoader();
      },'json');
}
/**
 * Perform the attachment functionalities
 * @name displayAttaches
 * @returns {void}
 */
function displayAttaches()
{
    
}
/**
 * Display the Case History Templates
 * @name getCaseHistoryTemplate
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
function getCaseHistoryTemplate(that,classView,length,page,isMore,field,sortType,alphaType)
{
    showLoader();
     var root = $.trim($("#rootTheme").val()); 
     var site = $.trim($("#siteTheme").val());
     var caseId = $.trim($("#caseId").val())
    $.post(root+"/ajax/case/case-history-list.php",{PageNum:page,is_more:isMore,
    field:field,sort_type:sortType, alpha_type:alphaType,case_id:caseId, grid: "list"},function(data){
         var status = getConnectionError(data,that,classView);
        if(!status){
            displayHistory();
            return false;
        }
            var  res = data.caseHistoryGrid;
            var result = data.response;
            var totalRecords = data.NumberofRec;
            var msg = "Request Message";
            var len = 0;
    try {
        len = data.pageRecords;
       
        if (typeof (res.error) != "undefined")
        {
            itemAlertData(msg, data.message);
            return false;
            hideLoader();
        }
    } catch (e) {

    }
    var responseHtml = '';
    
    var headerHtml = '<tr class="headerRow">';
       headerHtml += '<th  scope="col">Date</th>';
       headerHtml += '<th  scope="col">User</th>';
       headerHtml += '<th  scope="col">Connection</th>';
       headerHtml += '<th  scope="col">Action</th></tr>';
       headerHtml += '</tr>';
        $(".caseHistoryHeader").html(headerHtml);
       
    if(typeof(result)!= "undefined" && typeof(result.status)!="undefined" && result.status== "Failure")
    {
            responseHtml +='<tr><td class="error" colspan="9">'+result.message+'</td></tr>';
    }else if(len>0){
        var result = res;
         for (var i = 0; i < len; i++)
        {
             
             var createdDate = action= user = oldVal =  newVal = field = changedFieldNm =  '';
                if (result[i] != null && typeof (result[i].CreatedDate) != "undefined")
                    createdDate = getDateTimeFormat(result[i].CreatedDate);   
                if (result[i] != null && typeof (result[i].CreatedBy) != "undefined" && typeof (result[i].CreatedBy.Name) != "undefined")
                    user = result[i].CreatedBy.Name; 
                if (result[i] != null && typeof (result[i].Field) != "undefined" )
                    field = result[i].Field;
                if (result[i] != null && typeof (result[i].OldValue) != "undefined" )
                    oldVal = result[i].OldValue;
                if (result[i] != null && typeof (result[i].NewValue) != "undefined" )
                    newVal = result[i].NewValue;
                 changedFieldNm = getFieldForCase(field);
                if(changedFieldNm != "")
                {
                    if(field == "created")
                        action = '<strong>'+changedFieldNm+'</strong>';
                    else 
                        action = 'Changed <strong>'+changedFieldNm+'</strong>';
                }
                 if(field == "Description__c")
                    action = 'Changed Description';
                if(field == "Resolution__c")
                    action = 'Changed Resolution';
                showMoreCnt = i+1;
                if(oldVal != '' && oldVal != null)
                    action += ' from <strong>'+oldVal+'</strong>';
                if(newVal != '' && newVal != null)
                    action += ' to <strong>'+newVal+'</strong>';
                if(field != "created"  && field != "Account__c" &&  field != "Date_Time_Opened__c"  &&  oldVal != newVal){
                    responseHtml += '<tr  class=" dataRow">';
                    responseHtml += '<td class=" dataCell  " scope="row">'+createdDate+'</td>';
                    responseHtml += '<td class=" dataCell  ">'+user+'</td>';
                    responseHtml += '<td class=" dataCell  ">&nbsp;</td>';
                    responseHtml += '<td class=" dataCell  "> '+action+' </td>';
                    responseHtml += '</tr>';   
                }else if(field == "created" && field != "Date_Time_Opened__c" )
                {
                       responseHtml += '<tr  class=" dataRow">';
                    responseHtml += '<td class=" dataCell  " scope="row">'+createdDate+'</td>';
                    responseHtml += '<td class=" dataCell  ">'+user+'</td>';
                    responseHtml += '<td class=" dataCell  ">&nbsp;</td>';
                    responseHtml += '<td class=" dataCell  "> '+action+' </td>';
                    responseHtml += '</tr>';   
                }
        }
    }else{
         responseHtml +='<tr><td class="error" colspan="9">No Records To Display</td></tr>';
    }
    
    /** Pagination Links ***/
     var alpha = '';
       var paginationHtml = '';
    paginationHtml += paginationWC("",length, page, parseInt(totalRecords), len, "displayAccounts", alpha);
    $(".paginationLinks").html(paginationHtml);
    /**** ****/
   // $(".bPageTitle h1").html(title);
    
    $(".case-history-list-res").html(responseHtml);
     
   displayAccounts();
    hideLoader();
      },'json');
}
function popupLive()
{
    var root = $.trim($("#rootTheme").val());
    var scrollTop = '';
    var newHeight = '100';
    $(window).bind('scroll', function() {
		   scrollTop = $( window ).scrollTop();
		   newHeight = scrollTop + 100;
		});
    $('.headerLiveServiceRes tr').click(function (e) {
        e.stopImmediatePropagation();
        showLoader();
        
        var classView = "ajaxCall";
        if($(this).hasClass(classView))
        return false;
        $(this).addClass(classView);
        var popup= "#entry1";
       //Set the center alignment padding + border
       // var popMargTop = ($(popup).height() + 24) / 2; 
        var pos = $(popup).position();
        var top = pos.top;
        //var left = pos.left;
        var popMargTop = top/2+100; 
        var popMargLeft = "250px"; 

        $(popup).css({ 
            'margin-top' : -popMargTop,
            'margin-left' : -popMargLeft
        });
        var serviceId = $.trim($(this).data("serviceid"));
        var that = this;
    $.post(root+"/ajax/service/service-det.php", {service_id:serviceId},function(data){
        var result = [];
        if(typeof(data.serviceDet) != "undefined")
         result = data.serviceDet;
   
        if(result.length>0 || typeof(result.length) == "undefined"){
            var serviceProvider = dayCollection = deliveryDate =startDate =
                    endDate = freq = price = costModel = salePrice =
                    serviceModel ='';
            if ( typeof (result.Service_Start_Date__c) != "undefined")
               startDate = result.Service_Start_Date__c;
           if (typeof (result.Service_End_Date__c) != "undefined")
               endDate = getDateTimeFormat(result.Service_End_Date__c);
           if (typeof (result.Service_Delivery_Date__c) != "undefined")
               deliveryDate = getDateTimeFormat(result.Service_Delivery_Date__c);
           if ( typeof (result.Days_Collection__c) != "undefined")
                 dayCollection = result.Days_Collection__c;
           if ( typeof (result.Service_Provider_Name__c) != "undefined")
                 serviceProvider = result.Service_Provider_Name__c;
           if ( typeof (result.Collection_Interval__c) != "undefined")
                 freq = result.Collection_Interval__c;
           if ( typeof (result.Unit_Cost_Price__c) != "undefined")
                 price = result.Unit_Cost_Price__c;
           if ( typeof (result.Service_Model__c) != "undefined")
                 serviceModel = result.Service_Model__c;  
           if ( typeof (result.Costing_Model__c) != "undefined")
                 costModel = result.Costing_Model__c;    
            if ( typeof (result.Unit_Sales_Price__c) != "undefined")
                 salePrice = result.Unit_Sales_Price__c;     
            
        var content = '<div class="popServiceDets"><h4>Service Details</h4>\n\
                    <div class="popServiceDetsSub"><label>Service Partner</label>\n\
                        <span>'+serviceProvider+'</span></div>\n\
                    <div class="popServiceDetsSub"><label>Days Collection</label>\n\
                        <span>'+dayCollection+'</span></div>\n\
                    <div class="popServiceDetsSub"><label>Frequency</label>\n\
                        <span>'+freq+'</span></div>\n\
                        </div>\n\
                       </div>\n\
                    <div class="popServiceDets"><h4> Financial Details</h4>\n\
                    <div class="popServiceDetsSub">\n\
                        <label>Unit Cost Price</label>\n\
                        <span>'+price+'</span></div>\n\
                    <div class="popServiceDetsSub">\n\
                        <label> Costing Model</label>\n\
                        <span>'+costModel+'</span></div>\n\
                    <div class="popServiceDetsSub">\n\
                        <label> Unit Sales Price</label>\n\
                        <span>'+salePrice+'</span></div>\n\
                    </div><div class="clear"></div>\n\
                    <div class="popServiceDets"><h4>Model & Dates</h4>\n\
                    <div class="popServiceDetsSub">\n\
                     <label>Service Model</label>\n\
                    <span>'+serviceModel+'</span></div>\n\
                    <div class="popServiceDetsSub">\n\
                     <label> Service Delivery Date</label>\n\
                      <span>'+deliveryDate+'</span></div>\n\
                        <div class="popServiceDetsSub">\n\
                     <label>Service Start Date</label>\n\
                      <span>'+startDate+'</span></div>\n\
                        <div class="popServiceDetsSub">\n\
                     <label>Service End Date</label>\n\
                      <span>'+endDate+'</span></div>\n\
</div><div class="popServiceDets"></div>';
   $("#popupContent").html(content);
        }else {
             $("#popupContent").html('No Details are found');
        }
    // Add the mask to body
    $('div.container').append('<div id="mask"></div>');
    //$('#mask').fadeIn(300);
     $(popup).fadeIn(300);
     $(popup).show();
     hideLoader();
     $(that).removeClass(classView);
     //$('#mask').show();

      popupLive();
    return false;
    },'json');
    
    });
    /*$('.headerLiveServiceRes tr').mouseout(function (e) {
         /*$('#entry1').fadeOut(300, function () {
            $('#mask').remove();
        });*/
      /*  $('#entry1').hide();
        $('#mask').hide();
        
        return false;
    });*/
    $('a.close, #mask').on('click', function () {
            $('#entry1').fadeOut(300, function () {
            $('#mask').remove();
        });
        return false;
    });
}