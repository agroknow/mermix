jQuery.fn.scrollTo = function(elem, speed) { 
    jQuery(this).animate({
        scrollTop:  jQuery(this).scrollTop() - jQuery(this).offset().top + jQuery(elem).offset().top 
    }, speed == undefined ? 1000 : speed); 
    return this; 
};
jQuery(document).ready(function() {
jQuery('#results-pagination a').click(function(){
    jQuery('#results-pagination a.active').removeClass('active');
    jQuery(this).addClass('active');
    var elem = '#position-' + jQuery(this).attr('data-elem');
    jQuery('.machine-results-listing').scrollTo(elem, 1000); //custom animation speed
    return false;
});
});


