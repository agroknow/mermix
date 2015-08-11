Drupal.behaviors.takealookFieldsetSummeries = {
  attach:function (context) {
    jQuery('fieldset', context).drupalSetSummary(function (context) {
      var state = jQuery('input', context).serialize();

      setInterval(function () {
        if (state != jQuery('input', context).serialize()) {
          console.log(jQuery('input', context).serialize());
          console.log(state);
          state = jQuery('input', context).serialize();

          if (jQuery('input.save:checked', context).length) {
            jQuery(context).closest('fieldset').drupalSetSummary(function (context) {
              console.log('pica');
              return '<span class="green">' + Drupal.t('Changed. Marked for save.') + '</span>'
            });
          } else {
            jQuery(context).closest('fieldset').drupalSetSummary(function (context) {
              return '<span class="red">' + Drupal.t('Changed. Not marked for save.') + '</span>'
            });
          }
        }
      }, 500);

      return '<span>' + Drupal.t('Original state') + '</span>'
    });
  }
}
