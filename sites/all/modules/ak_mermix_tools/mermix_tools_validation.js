jQuery("#machinery-search-form").validate({
  rules: {
    'date_to[date]': {
    required: function(element){
            return jQuery("#edit-date-from-datepicker-popup-0").val()!="";
        }
    }
  }
});
jQuery("#webform-client-form-301").validate({
  rules: {
    'submitted[date_to][date]': {
    required: function(element){
            return jQuery("#edit-submitted-date-from-datepicker-popup-0").val()!="";
        }
    }
  }
});