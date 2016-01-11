/* =========================================================
 * init.js
 * Copyright 2015 Matt Frazee
 * ========================================================= */
 
//init vars
/*var altmediaVehicles=[
	//{text:'Landing Page',value:'AltLP'},
	//{text:'Print',value:'AltPrint'},
	{text:'Radio',value:'Radio'},
	//{text:'Space AD (FSI)',value:'AltFSI'},
	//{text:'Space AD (Advertorial)',value:'AltAdvert'},
	//{text:'Space AD (Native)',value:'AltNative'},
	{text:'Print',value:'Print'},
	{text:'TV',value:'TV'},
	{text:'Video',value:'Video'}
];*/



//format tag: abc 123=ABC_123
function formatTag(tag) {
    return tag.toUpperCase().replace(/^\s+|\s+$/g, '').replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '');
}



//format url: ABc 123=abc-123
function formatURL(url) {
    return url.toUpperCase().replace(/^\s+|\s+$/g, '').replace(/\s+/g, '-').replace(/[^A-Z0-9_]/g, '').toLowerCase();
}



//format id: abC 123=abc_123
function formatID(str) {
    return str.toUpperCase().replace(/^\s+|\s+$/g, '').replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '_').toLowerCase();
}



//dynamic form creation
function createHiddenField(options){
	return '<input type="hidden" name="'+options.name+'" id="'+options.id+'"></label></div>';
}



function createTextInputField(options){
	return '<div class="'+(options.columns?options.columns:'large-12')+' columns"><label for="'+options.id+'">'+(options.required?'<span class="label error alert right radius">Required</span>':'')+'<strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="'+options.tip+(options.required?'&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;':'')+'"> '+options.label+'</strong><input class="radius" type="text" placeholder="'+options.tip+'" name="'+options.name+'" id="'+options.id+'" '+(options.required?'required':'')+'></label></div>';
}



function createTextareaField(options){
	return '<div class="'+(options.columns?options.columns:'large-12')+' columns"><label for="'+options.id+'">'+(options.required?'<span class="label error alert right radius">Required</span>':'')+'<strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="'+options.tip+(options.required?'&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;':'')+'"> '+options.label+'</strong><textarea class="radius '+(options.size?options.size:'small')+'" type="text" placeholder="'+options.tip+'" name="'+options.name+'" id="'+options.id+'" '+(options.required?'required':'')+'></textarea></label></div>';
}



function createCheckboxField(options){
	return '<div class="'+(options.columns?options.columns:'large-12')+' columns"><label for="'+options.id+'"><strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="'+options.tip+(options.required?'&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;':'')+'"> '+options.label+'</strong></label><div class="switch radius with-label">'+(options.required?'<span class="label error alert right radius">Required</span>':'')+'<input name="'+options.name+'" id="'+options.id+'" value="'+options.value+'" type="checkbox" '+(options.required?'required':'')+' '+(options.checked?'checked':'')+'><label for="'+options.id+'"><span class="active">YES</span><span class="inactive">NO</span></label></div></div>';
}



function createRadioField(options){
	return '<div class="'+(options.columns?options.columns:'large-12')+' columns"><label for="'+options.id+'"><strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="'+options.tip+(options.required?'&lt;br&gt;&lt;small&gt;&lt;em&gt;This field is required.&lt;/em&gt;&lt;/small&gt;':'')+'"> '+options.label+'</strong></label><div class="switch radius with-label">'+(options.required?'<span class="label error alert right radius">Required</span>':'')+'<input name="'+options.name+'" id="'+options.id+'" value="'+options.value+'" type="radio" '+(options.required?'required':'')+' '+(options.checked?'checked':'')+'><label for="'+options.id+'"><span class="active">YES</span><span class="inactive">NO</span></label></div></div>';
}



//set project name
function setProjectName(index,value){
	var str=	($('[name="brand"]').val()?$('[name="brand"]').val().toUpperCase():"BRAND")+"-"+
			($('[name="due_date"]').val()?$('[name="due_date"]').val().split('/')[0]+$('[name="due_date"]').val().split('/')[2].substr(2,4):"MMYY")+"-"+
			($('[name="vehicle"]').val()?formatTag($('[name="vehicle"]').val()):"VEHICLE")+
			($('[name="tag"]').val()?"-"+formatTag($('[name="tag"]').val()):"");
	$('[name="project_name"],[name="tmp_project_name"]').val(str);
}



//init foundation framework
$(document).foundation({
	abide:{
		//live_validate : false,
		//validate_on_blur : false
		patterns:{
			phone:/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
			job_id: /^JOB-[0-9]{7}$/i
		}
	}
});



//start jquery
$(document).ready(function(e) {
	
	
	
	//reset form
	if($('#request_form').length){
		$('#request_form').get(0).reset();
		$('#request_form label span.label.alert,#request_form .switch span.label.alert').addClass('error');
	}
	
	
	
	//due date/broadcast date
	$('.calendar.button').click(function(e) {
        $(this).parent().parent().parent().find('input').focus()
    });
	
	
	
	//date functions
	function firstDayInMonth(day,month,year){
		var year=year!=undefined?year:new Date(Date.now()).getFullYear(),
			month=month!=undefined?month:new Date(Date.now()).getMonth()-1;
		return new Date(year,month,1+(day-new Date(year,month,1).getDay()+7)%7);
	}
	function nthDayInMonth(nth,day,month,year){
		var year=year!=undefined?year:new Date(Date.now()).getFullYear();
		var month=month!=undefined?month:new Date(Date.now()).getMonth();
		var day=firstDayInMonth(day,month,year);
		return new Date(day.getFullYear(),day.getMonth(),day.getDate()+(nth-1)*7);
	}
	
	
	
	//static holidays
	var holidays=[
		'1/1',
		'1/'+nthDayInMonth(3,1,0).getDate(),
		'5/'+nthDayInMonth(4,1,4).getDate(),
		'7/4',
		'11/11',
		'11/'+nthDayInMonth(4,4,10).getDate(),
		'12/25'
	];
	
	
	
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate()-1, 0, 0, 0, 0);
	var due_date = $('#due_date').fdatepicker({
		daysOfWeekDisabled: [0,6],
		onRender: function (date) {
			//var tmp=(date.getMonth()+1)+'/'+(date.getDate()==1?1:date.getDate()+1);
			var tmp=(date.getMonth()+1)+'/'+(date.getDate()+1);
			//console.log(date.getDate(),tmp);
			//no holidays or past dates
			return holidays.indexOf(tmp)>-1 || date.valueOf() < now.valueOf() ? 'disabled' : '';
			//not in past
			//return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function (ev) {
		if (ev.date.valueOf() > broadcast_date.date.valueOf()) {
			var newDate = new Date(ev.date)
			newDate.setDate(newDate.getDate() + 1);
			broadcast_date.update(newDate);
		}
		due_date.hide();
		$('#broadcast_date').removeAttr('disabled');
		$('#broadcast_date')[0].focus();
		var datefmt=$('#due_date').val().split('/');
		setProjectName(1,datefmt[0]+''+datefmt[2].substr(2,4));
	}).data('datepicker');
	//console.log($('#due_date').fdatepicker('getDate'))
	
	
	
	//go live date field
	var broadcast_date = $('#broadcast_date').fdatepicker({
		onRender: function (date) {
			var tmp=(date.getMonth()+1)+'/'+(date.getDate()+1);
			//no holidays or past dates
			//return holidays.indexOf(tmp)>-1 || date.valueOf() < due_date.date.valueOf() ? 'disabled' : '';
			return date.valueOf() < due_date.date.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function (ev) {
		broadcast_date.hide();
	}).data('datepicker');



	//exp date field
	var expiration_date = $('.expiration-date').fdatepicker({
		onRender: function (date) {
			//no past dates
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).data('datepicker');
	
	
	
	//toggle full-width
	$('#toggle_full_width').click(function(e) {
		$(this).children('i').toggleClass('fi-arrows-in').toggleClass('fi-arrows-out');
        $('.toggle-full-width').toggleClass('full-width');
    });
	
	
	
	//toggle job type fields
	$('[name=job_type]').click(function(e) {
		var jt_selectors="";
		switch($(this).val()){
			case "New Job":
			//enable fields
			$(jt_selectors).removeAttr('disabled');
			break;
			case "Revision":
			//disable fields
			$(jt_selectors).attr('disabled',true);
			break;
		}
    });
	
	
	
	//toggle visibility (clears textarea)
	$('#is_campaign,#is_test').click(function(e) {
		if($(this).is(':checked')){
			$(this).parent().parent().find('textarea').val('');
		}
    });
	
	
	
	//toggle disabled field
	$('#is_copywriting').click(function(e) {
		$(this).parent().parent().find('select').prop('disabled',function(id,prop){
			//console.log(this,id,prop);
			if(prop==false)
				$(this).parent().removeClass('error').parent().removeClass('error');
			return !prop;
		});
    });
	
	
	
	//visibility
	$('[data-toggle-visibility]').click(function(e) {
		//if(!$(this).attr('data-toggle-visibility-bubble'))
			//e.preventDefault();
        $($(this).attr('data-toggle-visibility')).toggleClass('hide');
    });
	$('[data-hide-visibility]').click(function(e) {
		e.preventDefault();
        $($(this).attr('data-hide-visibility')).addClass('hide');
    });
	$('[data-show-visibility]').click(function(e) {
		e.preventDefault();
        $($(this).attr('data-show-visibility')).removeClass('hide');
    });
	//
	$('[data-toggle-option]').change(function(e) {
		console.log(e);
		$($(this).children(':selected').attr('data-show')).removeClass('hide');
		$($(this).children(':selected').attr('data-hide')).addClass('hide');
    });
	
	
	
	//toggle field disabling
	$(document).on('click','[data-toggle-fields]',function(e) {
		e.preventDefault();
		$(this).parent().find('input,textarea,select').prop('disabled',function(id,prop){
			return !prop;
		});
		$(this).html($(this).html()=='Disable'?'Enable':'Disable');
		$(this).next('.row').toggleClass('hide').next('h5').toggleClass('hide');
    });	
	
	
	
	//brand select
	$('[name="brand"]').change(function(e) {
		var val=$(this).find('option:selected').val();
		if(val)
			setProjectName(0,val);
    });
	
	
	
	//channel select
	$('[name="channel_type"]').change(function(e) {
		var val=$(this).find('option:selected').val().toLowerCase();
		//$('.print-vehicle,.web-vehicle,.altmedia-vehicle').html('');
		$('.print-vehicle,.web-vehicle').html('');
		$(".active-sections > div").appendTo(".inactive-sections");
		switch(val){
			default:
			case "web":
				$("#web_section").appendTo(".active-sections");
			break;
			case "print":
				$("#print_section").appendTo(".active-sections");
			break;
			/*case "altmedia":
				$("#altmedia_section").appendTo(".active-sections");
			break;*/
		}
		$('select[name="vehicle"]').html($('<option>', { 
			text: 'Select Vehicle',
			value: ''
		})).removeAttr('disabled');
		$.each(eval(val+"Vehicles"), function (id, option) {
			$('[name="vehicle"]').append($('<option value="'+option.value+'">'+option.text+'</option>'));
		});
		$(document).foundation('abide', 'reflow');
    });
	
	
	
	//tag
	$('[name="tag"]').on('keyup blur',function(e){
		var val=formatTag(e.target.value);
		//$('[name="tag"]').val(val);
		setProjectName(3,val);
	});
	
	
	
	//vehicle select
	$('select[name="vehicle"]').change(function(e) {
		//select template
		switch($('select[name="channel_type"]').val().toLowerCase()){
			case "web":
				webTemplates($(this).find('option:selected').val());
			break;
			case "print":
				printTemplates($(this).find('option:selected').val());
			break;
		}
		//set project name
		var val=$(this).find('option:selected').val();
		if(val)
			setProjectName(2,formatTag(val));
    });
	
	
	
	
	//disable null anchor
	$('a[href="#"]').click(function(e) {
        e.preventDefault();
    });
	
	
	
	//close modal
	$(document).on('click','.close-modal',function(e) {
		e.preventDefault();
        $(this).closest('.reveal-modal').children('.close-reveal-modal:first').click();
    });
	
	
	
	//file handling
	$('.upload-container input').change(function(e) {
        if (typeof(FileReader)) {
			$('.upload-container .number-of-files').html($(this).get(0).files.length+' file'+($(this).get(0).files.length==1?'':'s')+' selected');
			if(!$(this).get(0).files.length)
				$(".upload-container .number-of-files").html('');
		}
    });
	
	
	
	//form submit modal
	doSubmit=false;
	$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
		if(doSubmit==true){
			$('#request_form').get(0).submit();
			doSubmit=false;
		}
	});
	//form submission
	$('#modal_confirm a.success').click(function(e) {
		e.preventDefault();
		$('#request_form').submit();
    });
	$('#request_form').on('invalid', function () {
		//var invalid_fields = $(this).find('[data-invalid]');
		//console.log(invalid_fields);
		//$('#modal_confirm.open .close-reveal-modal').click();
		modal('Nice try...','We have found some errors in the form. You will need to fix them before submitting again.<br><br><a href="#" class="close-modal button small radius remove-bottom">Back to the drawing board</a>');
	}).on('valid', function () {
		//console.log('valid!');
		//console.log($.parseJSON("{\""+unescape($(this).serialize().split('&').join("\",\"").split("=").join("\":\""))+"\"}").replace('+',' '));
		//modal('Please wait...',' The data is processing and you will be redirected when this is complete.');
		doSubmit=true;
		$('button.submit,a.submit').attr('disabled',true);
		$('#modal').removeClass('small medium large').addClass('small');
		$('#modal div').html('<h1 class="text-center"><i class="fi-widget"></i></h1><h3 class="text-center">Please wait...</h3><p class="remove-bottom text-center">The form data is processing and the browser will be redirected when the process is complete.</p>');
		$('#modal').foundation('reveal', 'open');
		
		//upload then submit
		/*function sendform(){
			$.post('php/process.php', $('#request_form').serialize(), function (res) {
				if(jQuery.parseJSON(res).error)
					modal('Ummm something happened...','The job request could not be sent, please try again.');
				else {
					modal('Thank You','Your request has been submitted successfully! Please allow up to 2 business days for a response.');
					$('#request_form').get(0).reset();
					$('#request_form label span.label.alert,#request_form .switch span.label.alert').addClass('error');
					
				}
				$('button.submit').removeAttr('disabled');
			});
		}*/
	});
	
	//modal function
	function modal(title,message,size){
		$('#modal').removeClass('small medium large').addClass((size?size:'small'));
		$('#modal div').html('<h3>'+title+'</h3><p class="remove-bottom">'+message+'</p>');
		$('#modal').foundation('reveal', 'open');
	}

	//contact form handler
	$('#contact_form').on('valid',function (e) {
		$.post('php/contact.php', $(this).serialize(), function (res) {
			if(jQuery.parseJSON(res).error)
				modal('Ummm something happened...','Maybe a dog ate your message, please try again.');
			else {
				modal('Sweet!','Your feedback has been sent!');
				$('#contact_form').get(0).reset();
				$('#contact_form label span.label.alert').addClass('error');
			}
		});
	});
	$(document).on('closed', '#modal_contact', function () {
		$('#contact_form').get(0).reset();
		$('#contact_form label span.label.alert').addClass('error');
	});
	
	//contact form handler
	$('#search_form,#search_form_modal').on('valid',function (e) {
		document.location='assets/'+$(this).find('#job_id').val().toLowerCase();
	});
	
	//animated scroll
	/*$('html, body').animate({
		scrollTop: $(".active-sections").offset().top-25
	}, 1000);*/



	/*$('#request_form').submit(function(e){
		e.preventDefault();
		//console.log($.parseJSON("{\""+unescape($(this).serialize().split('&').join("\",\"").split("=").join("\":\""))+"\"}"));
		//alert($(this).serialize()));
	});*/
	
	
	
});