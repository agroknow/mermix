(function ($) {
  Drupal.behaviors.akMermixTools = {
    attach: function (context, settings) {
	var banner = $('.banner-container');
	if($.cookie('banner-closed') == '1') {
	    //hide
	    banner.hide();
	} else {
	    banner.fadeIn();
	}
    $('.banner-container .close-btn', context).click(function () {
      $.cookie('banner-closed','1');
      banner.fadeOut();
    });
    }
  };
})(jQuery);