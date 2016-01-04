var $ = jQuery;

/**
 * 
 */
( function( $ ) {
	
	//$( "#multiselectbuttons" ).buttonset();

	//$( "#format" ).buttonset(); 

	var btn = $.fn.button.noConflict(); // reverts $.fn.button to jqueryui btn
    $.fn.btn = btn; // assigns bootstrap button functionality to $.fn.btn


} )( jQuery );



