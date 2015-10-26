(function ($) {
  Drupal.behaviors.akMermixTools = {
    attach: function (context, settings) {
	var filters = ["day","stremma","hour"];
	var filters_translated = ["ημέρα","στρέμμα","ώρα"];
	    for (var i = 0; i < filters.length; i++) {
	    $('.field-name-field-multiprice-unit .field-item:contains("'+filters[i]+'"),.field-name-field-multiprice-unit .field-item:contains("'+filters_translated[i]+'")').closest('li').addClass(filters[i]);
	    }
	var filter = '';
	var filterSelected = $('#views-exposed-form-machine-results-page #edit-field-multiprice-field-multiprice-unit-tid option:selected');
	if(filterSelected.val() == 'All'){
	    filter = 'All';
	} else {
	    $('.views-field-field-multiprice ul li').hide();
	    filter = filterSelected.text();
	    var index = filters.indexOf(filter);
	    if(index == -1){
		index = filters_translated.indexOf(filter);
	    }
	    $('.views-field-field-multiprice ul').find('li.'+ filters[index]).show(); 
	}
	var timer;
	$('.view-machine-results .result-item').hover(
		
	function() {
	    var elm = $(this);
	    timer = setTimeout(function(){
	    elm.find('.views-field-field-multiprice').animate({top:"70px"},1200,"easeOutBounce");
	    },  1000);
	}, function() {
	    var elm = $(this);
	  clearTimeout(timer);
	  elm.find('.views-field-field-multiprice').animate({top:"-200px"});
	}
      );
    }
  };
})(jQuery);