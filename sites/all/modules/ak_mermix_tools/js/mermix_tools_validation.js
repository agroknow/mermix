jQuery.validator.setDefaults({ ignore: ":hidden:not(select)" }); //for all select
jQuery.validator.addMethod("eitherEmailPhone", function(value, element) {
            isPhone = (this.optional(element) || /^\d+$/.test(value)) && this.getLength(jQuery.trim(value), element) <= 12 && this.getLength(jQuery.trim(value), element) >= 10 ;
            isEmail = this.optional(element) || /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);

            return isPhone || isEmail;

        }, "Please enter either phone or e-mail");
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
jQuery(".webform-client-form-301,webform-client-form-298,webform-client-form-294").validate({
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
    place: {
    required: true
    },
    'machine_cultivation[]': {
    required: true
    }
  }
});
