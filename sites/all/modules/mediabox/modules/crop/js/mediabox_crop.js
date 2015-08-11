//
Drupal.behaviors.crop = {
  attach:function (context, settings) {
    if (!settings.crop) {
      return;
    }

    // Apply the MyBehaviour effect to the elements only once.
    var pane = jQuery('#' + settings.crop.wrapper_id, context);
    pane.once('crop', function () {

      var init_coords = settings.crop.coords;
      var cropImage = jQuery('img.jcrop-image', pane);
      var formsContext = pane.parent();

      if(settings.crop.ratio == 1) {
        var aspectRatio = (init_coords.x1 - init_coords.x) / (init_coords.y1 - init_coords.y);
      } else if(settings.crop.ratio == 0) {
        var aspectRatio = false;
      }

      jQuery(cropImage).Jcrop({
        'onChange':function (coords) {
          console.log(coords);
          jQuery('input.jcrop-x', formsContext).attr('value', coords.x);
          jQuery('input.jcrop-y', formsContext).attr('value', coords.y);
          jQuery('input.jcrop-x1', formsContext).attr('value', coords.x2);
          jQuery('input.jcrop-y1', formsContext).attr('value', coords.y2);
          jQuery('input.jcrop-height', formsContext).attr('value', coords.h);
          jQuery('input.jcrop-width', formsContext).attr('value', coords.w);
        },
        'onSelect':function (coords) {
          jQuery('input.jcrop-x', formsContext).attr('value', coords.x);
          jQuery('input.jcrop-y', formsContext).attr('value', coords.y);
          jQuery('input.jcrop-x1', formsContext).attr('value', coords.x2);
          jQuery('input.jcrop-y1', formsContext).attr('value', coords.y2);
          jQuery('input.jcrop-height', formsContext).attr('value', coords.h);
          jQuery('input.jcrop-width', formsContext).attr('value', coords.w);
        },
        'aspectRatio': aspectRatio,
        'setSelect':[init_coords.x, init_coords.y, init_coords.x1, init_coords.y1]
      });
    });

    pane.removeOnce('crop', function () {
    });

  }
}

// We need to initialize default crop states.
Drupal.behaviors.cropDefault = {
  attach:function (context, settings) {

    // Apply the MyBehaviour effect to the elements only once.
    jQuery('.crop-image-set').each(function (index, values) {
      var pane = jQuery(this);
      pane.once('cropDefault', function () {

        var dcoords = null;

        var cropImage = jQuery('img.jcrop-image', pane);

        var x = jQuery('input.jcrop-x', pane).attr('value');
        var y = jQuery('input.jcrop-y', pane).attr('value');
        var x1 = jQuery('input.jcrop-x1', pane).attr('value');
        var y1 = jQuery('input.jcrop-y1', pane).attr('value');
        var height = jQuery('input.jcrop-height', pane).attr('value');
        var width = jQuery('input.jcrop-width', pane).attr('value');

        var aspectRatio = false;
        if(jQuery(pane).parent().parent().find('input.ratio').is(':checked')) {
          aspectRatio = (x1 - x) / (y1 - y);
        }

        jQuery(cropImage).Jcrop({
          'onChange':function (coords) {
            jQuery('input.jcrop-x', pane).attr('value', coords.x);
            jQuery('input.jcrop-y', pane).attr('value', coords.y);
            jQuery('input.jcrop-x1', pane).attr('value', coords.x2);
            jQuery('input.jcrop-y1', pane).attr('value', coords.y2);
            jQuery('input.jcrop-height', pane).attr('value', coords.h);
            jQuery('input.jcrop-width', pane).attr('value', coords.w);
          },
          'onSelect':function (coords) {
            jQuery('input.jcrop-x', pane).attr('value', coords.x);
            jQuery('input.jcrop-y', pane).attr('value', coords.y);
            jQuery('input.jcrop-x1', pane).attr('value', coords.x2);
            jQuery('input.jcrop-y1', pane).attr('value', coords.y2);
            jQuery('input.jcrop-height', pane).attr('value', coords.h);
            jQuery('input.jcrop-width', pane).attr('value', coords.w);
          },
          'aspectRatio': aspectRatio,
          'setSelect':[x, y, x1, y1]
        });
      });
    });
  }
}
