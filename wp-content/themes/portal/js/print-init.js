/* =========================================================
 * print-init.js
 * Copyright 2015 Matt Frazee
 * ========================================================= */
 
//init vars
var printVehicles=[
	{text:'BRE/CRE',value:'BRE/CRE'},
	{text:'Brochure',value:'Brochure'},
	{text:'Buckslip',value:'Buckslip'},
	{text:'Carrier',value:'Carrier'},
	{text:'Carton',value:'Carton'},
	{text:'Catalog',value:'Catalog'},
	{text:'Copywriting',value:'Copywriting'},
	{text:'Flyer (One-Sheet)',value:'Flyer'},
	{text:'Insert',value:'Insert'},
	{text:'Label',value:'Label'},
	{text:'Letter',value:'Letter'},
	{text:'Magalog (New)',value:'Magalog (New)'},
	{text:'Magalog (Edits)',value:'Magalog (Edits)'},
	{text:'Newsletter',value:'Newsletter'},
	{text:'Packing Slip',value:'Packing Slip'},
	{text:'Postcard',value:'Postcard'},
	{text:'Print Ad (Display)',value:'Print Ad (Display)'},
	{text:'Print Ad (Advertorial)',value:'Print Ad (Advertorial)'},
	{text:'Print Ad (Native)',value:'Print Ad (Native)'},
	{text:'Report',value:'Report'},
	{text:'Stock-Up',value:'Stock-Up'},
	{text:'Other',value:'Other'}
];


//print templates
function printTemplates(val,bypass){
	
	//create container and set label
	if(!bypass)
		$('.print-vehicle').html('');
	if(val!='Stock-Up')
		$('.print-vehicle').append('<div class="large-12"><fieldset><legend>'+val+'</legend>'+(bypass?'<a href="#" class="right button tiny radius secondary toggle-fields" data-toggle-fields>Disable</a>':'')+'<div class="row"></div>'+(bypass?'<h5 class="hide"><small><em>Inactive</em></small></h5>':'')+'</fieldset></div>');
	
	//find template
	switch(val){
		
		
		case "BRE/CRE":
			$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:true,
				label:'Paper Stock*',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:true,
				label:'Inventory Code*',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_color',name:formatID(val)+'_color',required:true,
				label:'Color*',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_size',required:true,name:formatID(val)+'_size',
				label:'Size*',
				tip:'#10, #11, #14, 6 x 9.5, etc...'
			}));
		break;
		
		
		case "Brochure":
		case "Buckslip":
			$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:'small-12 medium-6',id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:true,
				label:'Paper Stock*',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_color',name:formatID(val)+'_color',required:true,
				label:'Color*',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:true,
				label:'Inventory Code*',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_flat_size',name:formatID(val)+'_flat_size',required:true,
				label:'Flat Size*',
				tip:'Flat Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_finished_size',name:formatID(val)+'_finished_size',required:true,
				label:'Finished Size*',
				tip:'Finished Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_fold_type',name:formatID(val)+'_fold_type',required:true,
				label:'Fold Type*',
				tip:'Fold Type'
			}) +
			createCheckboxField({
				columns:'small-6 medium-3',id:formatID(val)+'_bleed',name:formatID(val)+'_bleed',required:false,checked:false,value:'Yes',
				label:'Bleed',
				tip:'Yes or No'
			}));
		break;
		
		
		case "Carrier":
		case "Flyer":
		case "Packing Slip":
			$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:(val=='Carrier'?'small-6':'small-12'),id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:true,
				label:'Paper Stock*',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...' ,
			}) +
			(val=='Carrier'?createTextInputField({
				columns:'small-6',id:formatID(val)+'_location',name:formatID(val)+'_location',required:true,
				label:'Window Location*',
				tip:'Standard Left or Standard Right' ,
			}):'')+
			createTextInputField({
				columns:'medium-3 small-6',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:true,
				label:'Inventory Code*',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createTextInputField({
				columns:'medium-3 small-6',id:formatID(val)+'_color',name:formatID(val)+'_color',required:true,
				label:'Color*',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_size',required:true,name:formatID(val)+'_size',
				label:'Size*',
				tip:'#10, #11, #14, 6 x 9.5, etc...'
			}) +
			createCheckboxField({
				columns:'medium-3 small-6',id:formatID(val)+'_bleed',name:formatID(val)+'_bleed',required:false,checked:false,value:'Yes',
				label:'Bleed',
				tip:'Yes or No'
			}));
		break;
		
		
		case "Carton":
		case "Label":
			$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:false,
				label:'Paper Stock',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_color',name:formatID(val)+'_color',required:true,
				label:'Color*',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_size',required:true,name:formatID(val)+'_size',
				label:'Size*',
				tip:'#10, #11, #14, 6 x 9.5, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:false,
				label:'Inventory Code',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_line_screen',required:true,name:formatID(val)+'_line_screen',
				label:'Line Screen*',
				tip:'85, 130, 200, 300, etc...'
			}) +
			createCheckboxField({
				columns:'small-6 medium-3',id:formatID(val)+'_bleed',name:formatID(val)+'_bleed',required:false,checked:false,value:'Yes',
				label:'Bleed',
				tip:'Yes or No'
			}) +
			createRadioField({
				columns:'small-6 medium-3',id:formatID(val)+'_flexo',name:formatID(val)+'_printing_process',required:true,checked:false,value:'Flexo',
				label:'Print with Flexo?*',
				tip:'Yes or No'
			})  +
			createRadioField({
				columns:'small-6',id:formatID(val)+'_litho',name:formatID(val)+'_printing_process',required:true,checked:false,value:'Litho',
				label:'Print with Litho?*',
				tip:'Yes or No'
			}) );
		break;
		
		
		case "Catalog":
			$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:'small-12 medium-6',id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:true,
				label:'Paper Stock*',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_color',name:formatID(val)+'_color',required:true,
				label:'Color*',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:true,
				label:'Inventory Code*',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_flat_size',name:formatID(val)+'_flat_size',required:true,
				label:'Flat Size*',
				tip:'Flat Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_finished_size',name:formatID(val)+'_finished_size',required:true,
				label:'Finished Size*',
				tip:'Finished Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_pages',name:formatID(val)+'_pages',required:true,
				label:'Pages*',
				tip:'16 pg., 24 pg., 32 pg., 36 pg., etc...'
			}) +
			createCheckboxField({
				columns:'small-6 medium-3',id:formatID(val)+'_bleed',name:formatID(val)+'_bleed',required:false,checked:false,value:'Yes',
				label:'Bleed',
				tip:'Yes or No'
			}));
		break;
		
		
		
		case "Insert":
		case "Letter":
		case "Liftnote":
		case "Newsletter":
		case "Reply":
			$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:true,
				label:'Paper Stock*',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_color',name:formatID(val)+'_color',required:true,
				label:'Color*',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_flat_size',name:formatID(val)+'_flat_size',required:true,
				label:'Flat Size*',
				tip:'Flat Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_finished_size',name:formatID(val)+'_finished_size',required:true,
				label:'Finished Size*',
				tip:'Finished Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_fold_type',name:formatID(val)+'_fold_type',required:true,
				label:'Fold Type*',
				tip:'Fold Type'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_pages',name:formatID(val)+'_pages',required:true,
				label:'Pages*',
				tip:'16 pg., 24 pg., 32 pg., 36 pg., etc...'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:true,
				label:'Inventory Code*',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createCheckboxField({
				columns:'small-6',id:formatID(val)+'_bleed',name:formatID(val)+'_bleed',required:false,checked:false,value:'Yes',
				label:'Bleed',
				tip:'Yes or No'
			}));
		break;
		
		
		
		case "Magalog (New)":
			$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:true,
				label:'Paper Stock*',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_color',name:formatID(val)+'_color',required:true,
				label:'Color*',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_flat_size',name:formatID(val)+'_flat_size',required:true,
				label:'Flat Size*',
				tip:'Flat Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_finished_size',name:formatID(val)+'_finished_size',required:true,
				label:'Finished Size*',
				tip:'Finished Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:'magalog_type',name:'magalog_type',required:true,
				label:'Magalog Type*',
				tip:'Digest, Slim Jim, Tabloid, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_pages',name:formatID(val)+'_pages',required:true,
				label:'Pages*',
				tip:'16 pg., 24 pg., 32 pg., 36 pg., etc...'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:true,
				label:'Inventory Code*',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createCheckboxField({
				columns:'small-6',id:formatID(val)+'_bleed',name:formatID(val)+'_bleed',required:false,checked:false,value:'Yes',
				label:'Bleed',
				tip:'Yes or No'
			}));
		break;
		
		
		
		
		case "Magalog (Edits)":
			$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:false,
				label:'Paper Stock',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_color',name:formatID(val)+'_color',required:false,
				label:'Color',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_flat_size',name:formatID(val)+'_flat_size',required:false,
				label:'Flat Size',
				tip:'Flat Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_finished_size',name:formatID(val)+'_finished_size',required:false,
				label:'Finished Size',
				tip:'Finished Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:'magalog_type',name:'magalog_type',required:true,
				label:'Magalog Type*',
				tip:'Digest, Slim Jim, Tabloid, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_pages',name:formatID(val)+'_pages',required:true,
				label:'Pages*',
				tip:'16 pg., 24 pg., 32 pg., 36 pg., etc...'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:true,
				label:'Inventory Code*',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createCheckboxField({
				columns:'small-6',id:formatID(val)+'_bleed',name:formatID(val)+'_bleed',required:false,checked:false,value:'Yes',
				label:'Bleed',
				tip:'Yes or No'
			}));
		break;
		
		
		case "Postcard":
			$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:true,
				label:'Paper Stock*',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_color',name:formatID(val)+'_color',required:true,
				label:'Color*',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:true,
				label:'Inventory Code*',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_flat_size',name:formatID(val)+'_flat_size',required:true,
				label:'Flat Size*',
				tip:'Flat Size'
			}) +
			createCheckboxField({
				columns:'small-12 medium-6',id:formatID(val)+'_bleed',name:formatID(val)+'_bleed',required:false,checked:false,value:'Yes',
				label:'Bleed',
				tip:'Yes or No'
			}));
		break;
		
		case "Report":
		$('.print-vehicle .row:last').html(
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_stock',name:formatID(val)+'_stock',required:true,
				label:'Paper Stock*',
				tip:'Coated, Uncoated, 24# Uncoated Text, 40# Coated Text, etc...'
			}) +
			createTextInputField({
				columns:'small-6',id:formatID(val)+'_color',name:formatID(val)+'_color',required:true,
				label:'Color*',
				tip:'1-Color, 2-Color, 3-Color, 4-Color, Other'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_flat_size',name:formatID(val)+'_flat_size',required:true,
				label:'Flat Size*',
				tip:'Flat Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_finished_size',name:formatID(val)+'_finished_size',required:true,
				label:'Finished Size*',
				tip:'Finished Size'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_fold_type',name:formatID(val)+'_fold_type',required:true,
				label:'Fold Type*',
				tip:'Fold Type'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_pages',name:formatID(val)+'_pages',required:true,
				label:'Pages*',
				tip:'16 pg., 24 pg., 32 pg., 36 pg., etc...'
			}) +
			createTextInputField({
				columns:'small-12 medium-6',id:formatID(val)+'_binding',name:formatID(val)+'_binding',required:true,
				label:'Binding*',
				tip:'Binding'
			}) +
			createTextInputField({
				columns:'small-6 medium-3',id:formatID(val)+'_inventory',name:formatID(val)+'_inventory',required:true,
				label:'Inventory Code*',
				tip:'OQRSR-0315, OQRSC-0315, etc...'
			}) +
			createCheckboxField({
				columns:'small-6 medium-3',id:formatID(val)+'_bleed',name:formatID(val)+'_bleed',required:false,checked:false,value:'Yes',
				label:'Bleed',
				tip:'Yes or No'
			}));
		break;
		
		case "Print Ad (Display)":
		case "Print Ad (Advertorial)":
		case "Print Ad (Native)":
		case "Other":
			$('.print-vehicle .row:last').html(
			createTextareaField({
				columns:'small-12',id:'vehicle_other',name:'vehicle_other',required:true,size:'medium',
				label:val+"*",
				tip:'Please provide every detail.'
			}));
		break;
		
		case "Stock-Up":
			$('.print-vehicle').html('');
			printTemplates('Carrier',true);
			printTemplates('Letter',true);
			printTemplates('Reply',true);
			printTemplates('Liftnote',true);
			printTemplates('Brochure',true);
		break;
		
		
		
	}
	//reflow items
	$(document).foundation('tooltip', 'reflow');
	$(document).foundation('abide', 'reflow');
}