/* =========================================================
 * web-init.js
 * Copyright 2015 Matt Frazee
 * ========================================================= */
 
//init vars
var webVehicles=[
	{text:'Affiliates',value:'Affiliates'},
	//{text:'Amazon',value:'Amazon'},
	//{text:'Banners',value:'Banners'},
	//{text:'Content Directory Networks',value:'Content Directory Networks'},
	{text:'Copywriting',value:'Copywriting'},
	{text:'Email (Catalog)',value:'Email (Catalog)'},
	{text:'Email (Flash Sale)',value:'Email (Flash Sale)'},
	{text:'Email (Magalog)',value:'Email (Magalog)'},
	{text:'Email (Product)',value:'Email (Product)'},
	{text:'Email (Sale Series)',value:'Email (Sale Series)'},
	{text:'Email (Template/Trigger)',value:'Email (Template/Trigger)'},
	{text:'Email (Other)',value:'Email (Other)'},
	//{text:'Email Module',value:'Email Module'},
	//{text:'Email Template',value:'Email Template'},
	{text:'E-News',value:'E-News'},
	//{text:'HD Marketplace',value:'HD Marketplace'},
	{text:'Landing Page',value:'Landing Page'},
	{text:'Magalog Landing Page',value:'Magalog Landing Page'},
	//{text:'Main Website',value:'Main Website'},
	{text:'Microsite',value:'Microsite'},
	//{text:'New Graphic Element',value:'New Graphic Element'},
	//{text:'PPC',value:'PPC'},
	{text:'Product Page',value:'Product Page'},
	//{text:'Retargeting',value:'Retargeting'},
	//{text:'SEO',value:'SEO'},
	{text:'Social Media',value:'Social Media'},
	{text:'Website Banner',value:'Website Banner'},
	{text:'Website Edits',value:'Website Edits'},
	{text:'Other',value:'Other'}
];

//web specs
var emailModuleSpecs=[
	{text:'600x600',value:'600x600'},
	{text:'600x400',value:'600x400'},
	{text:'600x200',value:'600x200'},
	{text:'600x100',value:'600x100'},
	{text:'400x400',value:'400x400'},
	{text:'400x200',value:'400x200'},
	{text:'300x200',value:'300x200'},
	{text:'200x400',value:'200x400'},
	{text:'200x200',value:'200x200'}
];
var saleSeriesSpecs=[
	{text:'Email (Desktop and Mobile)',value:'Email (Desktop and Mobile)'},
	{text:'Homepage Rotator (1200x375)',value:'Homepage Rotator (1200x375)'},
	{text:'Homepage Rotator (950x500)',value:'Homepage Rotator (950x500)'},
	{text:'Global Banner (1200x72)',value:'Global Banner (1200x72)'},
	{text:'Global Banner (747x117)',value:'Global Banner (747x117)'},
	{text:'Category Page Banner (890x300)',value:'Category Page Banner (890x300)'},
	{text:'Other',value:'Other'}
];
var websiteBannerSpecs=[
	{text:'Homepage Rotator (1200x375)',value:'Homepage Rotator (1200x375)'},
	{text:'Homepage Rotator (950x500)',value:'Homepage Rotator (950x500)'},
	//{text:'Homepage Rotator (747x747)',value:'Homepage Rotator (747x747)'},
	{text:'Homepage Callout (460x307)',value:'Homepage Callout (460x307)'},
	{text:'Special Offers Callout (560x320)',value:'Special Offers Callout (560x320)'},
	{text:'Global Banner (1200x72)',value:'Global Banner (1200x72)'},
	{text:'Global Banner (747x117)',value:'Global Banner (747x117)'},
	{text:'Category Page Banner (890x300)',value:'Category Page Banner (890x300)'},
	{text:'Lightbox (747x747)',value:'Lightbox (747x747)'},
	{text:'Other',value:'Other'}
];
var socialMediaSpecs=[
	{text:'Facebook Ad (1200x628)',value:'Facebook Ad (1200x628)'},
	{text:'Facebook Cover Photo (851x315)',value:'Facebook Cover Photo (851x315)'},
	{text:'Facebook Profile Picture (180x180)',value:'Facebook Profile Picture (180x180)'},
	{text:'Facebook Highlighted Image (1200x717)',value:'Facebook Highlighted Image (1200x717)'},
	{text:'Facebook Shared Image (1200x630)',value:'Facebook Shared Image (1200x630)'},
	{text:'Facebook Shared Link (1200x627)',value:'Facebook Shared Link (1200x627)'},
	{text:'Facebook App Image (111x74)',value:'Facebook App Image (111x74)'},
	{text:'Google+ Cover Photo (2120x1192)',value:'Google+ Cover Photo (2120x1192)'},
	{text:'Google+ Profile Picture (250x250)',value:'Google+ Profile Picture (250x250)'},
	{text:'Google+ Shared Image (800x600)',value:'Google+ Shared Image (800x600)'},
	{text:'Google+ Shared Link (150x150)',value:'Google+ Shared Link (150x150)'},
	{text:'Twitter Header Image (1500x500)',value:'Twitter Header Image (1500x500)'},
	{text:'Twitter Profile Photo (400x400)',value:'Twitter Profile Photo (400x400)'},
	{text:'Twitter In-Stream Photo (1024x512)',value:'Twitter In-Stream Photo (1024x512)'},
	{text:'YouTube Channel Cover Photo (2560x1440)',value:'YouTube Channel Cover Photo (2560x1440)'},
	{text:'Other',value:'Other'}
];

function webTemplates(val){
	//create container and set label
	$('.repeatable').appendTo('.inactive-sections');
	//<a href="#" class="right button tiny radius secondary toggle-fields" data-toggle-fields>Disable</a>
	$('.web-vehicle').html('<div class="large-12"><fieldset><legend>'+val+'</legend><div class="row"></div></fieldset></div>');
	//$('.repeatable').clone().appendTo('.web-vehicle fieldset');
	$('[name="web_specifications_spec[]"]').html($('<option value="">Select specification</option>'));
	switch(val){
		
		/*case "Email Module":
			$('.repeatable').appendTo('.web-vehicle fieldset');
			$.each(emailModuleSpecs, function (id, option) {
				$('[name="web_specifications_spec[]"]').append($('<option value="'+option.value+'">'+option.text+'</option>'));
			});
		break;*/
		
		case "Email (Catalog)":
		case "Email (Flash Sale)":
		case "Email (Magalog)":
		case "Email (Product)":
		case "Email (Sale Series)":
		case "Email (Template/Trigger)":
		case "Email (Other)":
			$('.repeatable').appendTo('.web-vehicle fieldset');
			$.each(saleSeriesSpecs, function (id, option) {
				$('[name="web_specifications_spec[]"]').append($('<option value="'+option.value+'">'+option.text+'</option>'));
			});
		break;
		
		case "Website Banner":
			$('.repeatable').appendTo('.web-vehicle fieldset');
			$.each(websiteBannerSpecs, function (id, option) {
				$('[name="web_specifications_spec[]"]').append($('<option value="'+option.value+'">'+option.text+'</option>'));
			});
		break;
		
		case "Social Media":
			$('.repeatable').appendTo('.web-vehicle fieldset');
			$.each(socialMediaSpecs, function (id, option) {
				$('[name="web_specifications_spec[]"]').append($('<option value="'+option.value+'">'+option.text+'</option>'));
			});
		break;
		
		default:
			$('.web-vehicle .row:last').html(
			createTextareaField({
				columns:'small-12',id:'web_specifications',name:'web_specifications',required:true,size:'medium',
				label:'Detailed Specifications*',
				tip:'Please provide every detail.'
			}));
		break;
	}
	//validate
	$(document).foundation('abide', 'reflow');
}

//start jquery
$(document).ready(function(e) {
	
	//vehicle select for web only
	$('select[name="vehicle"]').change(function(e) {
		if($('select[name="channel_type"]').val()=="Web"){
			
			//reset required fields
			$('#web_item_numbers,#disclaimer,#web_promo_codes').attr('required',false).closest('label').removeClass('error').closest('.columns').removeClass('error');
			$('#web_expiration_date').attr('required',false);
			$('label[for=web_expiration_date]').removeClass('error');
			$('label[for=web_item_numbers] strong').text($('label[for=web_item_numbers] strong').text().replace('*',''));
			$('label[for=disclaimer] strong').text($('label[for=disclaimer] strong').text().replace('*',''));
			$('label[for=web_promo_codes] strong').text($('label[for=web_promo_codes] strong').text().replace('*',''));
			$('label[for=web_expiration_date] strong').text($('label[for=web_expiration_date] strong').text().replace('*',''));
			//set required fields
			switch($(this).find('option:selected').val()){
				
				case "E-News":
				case "Landing Page":
				case "Magalog Landing Page":
				case "Microsite":
				case "Product Page":
					$('#web_item_numbers').attr('required',true);
					$('label[for=web_item_numbers] strong').append('*');
				break;
				
				case "Email (Flash Sale)":
				case "Email (Sale Series)":
					$('#disclaimer,#web_promo_codes,#web_expiration_date').attr('required',true);
					$('label[for=disclaimer] strong,label[for=web_promo_codes] strong,label[for=web_expiration_date] strong').append('*');
				break;
				
			}
			$(document).foundation('abide', 'reflow');
		}
    });
	
	//web repeatable rows
	$('.duplicate').on('click','.remove', function(e) {
		e.preventDefault();
		if($('.duplicate').children().length>1)
			$(this).closest('.row').remove();
			//$(this).parent().parent().remove();
		$(document).foundation('abide', 'reflow');
    });
	$('.repeatable').on('click', '.add', function(e) {
		e.preventDefault();
		$(".repeatable > .duplicate .row:last").clone().appendTo(".repeatable .duplicate").find('input').val("");
		$(".repeatable > .duplicate .row:last .columns").removeClass('error');
		$(document).foundation('abide', 'reflow');
    });


});