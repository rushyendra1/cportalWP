$ = jQuery.noConflict();
$(document).ready(function(){
   $(".column-username a").removeAttr("href");
   $(".row-actions").html("");
   $("#bulk-action-selector-top option[value=delete]").html("");
   $("#submit").remove();
   $("#wp-admin-bar-edit-profile").remove();
   $(".add-new-h2").remove();
});