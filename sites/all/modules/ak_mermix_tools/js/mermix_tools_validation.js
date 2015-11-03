jQuery.validator.setDefaults({ ignore: ":hidden:not(select)" }); //for all select
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
jQuery(".webform-client-form").validate({
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
