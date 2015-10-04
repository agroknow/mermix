jQuery('.description').each(function(){
	var $description = jQuery(this);
	var $target = jQuery(this).closest('.form-wrapper');
	$description.hide();
	new Opentip($target, $description.text(),'',{target:true,tipJoint:'right'});
	});