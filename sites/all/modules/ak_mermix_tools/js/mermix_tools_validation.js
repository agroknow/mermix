jQuery.validator.setDefaults({ ignore: ":hidden:not(select)" }); //for all select
jQuery.validator.addMethod("eitherEmailPhone", function(value, element) {
            isPhone = (this.optional(element) || /^\d+$/.test(value)) && this.getLength(jQuery.trim(value), element) <= 12 && this.getLength(jQuery.trim(value), element) >= 10 ;
            isEmail = this.optional(element) || /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);

            return isPhone || isEmail;

        }, "Please enter either phone or e-mail");
jQuery.validator.addMethod("phoneNumber", function(value, element) {
            isPhone = this.optional(element) || ( /^\d+$/.test(value) && this.getLength(jQuery.trim(value), element) <= 12 && this.getLength(jQuery.trim(value), element) >= 10 );
            return isPhone;

}, "Please enter valid phone number");
jQuery("#machinery-search-form").validate({
  rules: {
    'date_to[date]': {
    required: function(element){
            return jQuery("#edit-date-from-datepicker-popup-0").val()!="";
        }
    },
    'date_from[date]': {
    required: function(element){
            return jQuery("#edit-date-to-datepicker-popup-0").val()!="";
        }
    }
  }
});
jQuery(".webform-client-form-301,.webform-client-form-298,.webform-client-form-294").validate({
  rules: {
    'submitted[date_to][date]': {
    required: function(element){
            return jQuery("#edit-submitted-date-from-datepicker-popup-0").val()!="";
        }
    },
    'submitted[date_from][date]': {
    required: function(element){
            return jQuery("#edit-submitted-date-to-datepicker-popup-0").val()!="";
        }
    },
    'submitted[type]' : {
	required: true
    },
    'submitted[email_or_phone]' : {
    eitherEmailPhone: true
    }
  }
});

jQuery("#machinery-add-form").validate({
  rules: {
    machine_name: {
    required: true
    },
    machine_type: {
    required: true
    },
    place: {
    required: true
    },
    'machine_cultivation[]': {
    required: true
    }
  }
});
jQuery("#user-register-form,#user-profile-form").validate({
  rules: {
    'field_phone_number[und][0][value]': {
    phoneNumber: true
    }
  }
});
jQuery(document).ready(function(){

 //    jQuery('#field-multiprice-values .field-name-field-multiprice-unit select').each(function(index,value){
	// jQuery(this).find('option').eq(index+1).prop('selected',true);
	// jQuery(this).trigger("liszt:updated");
 //    });
    jQuery('#field-multiprice-values tr.draggable').each(function(index,value){
	var elem_to_remove = jQuery(this).find('td:eq(1)');
	if(elem_to_remove.text().length == 0)
	    jQuery(this).remove();
    });
});

