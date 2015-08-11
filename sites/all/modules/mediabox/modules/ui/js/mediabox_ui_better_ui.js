(function ($) {

"use strict";

/**
 * Constructor.
 *
 * @param jQuery $field
 *   Mediabox field for we are attaching better UI.
 * @param object settings
 *   Settings better UI object.
 * @returns
 */
var MediaboxBetterUI = function($field, settings) {
  this.$field = $field;
  this.settings = settings;
  
  // Selected thumb delete button.
  this.$deleteButton = $('<input class="form-submit" type="button">');

  if (parseInt(settings.fieldCardinality) === 1) {
    this.mediaboxOneItem();
  }
  else {
    this.mediaboxMultipleItems($field);
  }
}

/**
 * Handle delete button click event.
 *
 * @param $element
 *   jQuery element that can have deleted state.
 */
MediaboxBetterUI.prototype.deleteButtonClicked = function($element) {
  $element.toggleClass('mediabox-deleted');

  var $checkbox = $element.find('.mediabox-remove').find('.form-type-checkbox input');
  $checkbox.attr('checked', !$checkbox.is(':checked'));

  this.deleteButtonText($element);
};

/**
 * Update delete button text based on selected thumb status.
 *
 * @param $element
 *   jQuery element that can have deleted state.
 */
MediaboxBetterUI.prototype.deleteButtonText = function($element) {
  if ($element.hasClass('mediabox-deleted')) {
    this.$deleteButton.val(this.settings.restoreItemText);
  }
  else {
    this.$deleteButton.val(this.settings.deleteItemText);
  }
};

/**
 * Field with multiple items (cardinality more then 1) handling.
 *
 * @param $field
 *   jQuery field object.
 */
MediaboxBetterUI.prototype.mediaboxMultipleItems = function($field) {
  var mediaboxUI = this;

  // Dont use tr selector directly because new popup item edit feature is
  // actually changing table tr content.
  var $mediaboxContainer = $field.find('.field-multiple-table tbody');

  var getItem = function (index) {
    return $mediaboxContainer.find('tr')[index];
  };

  // Holds selected thumbnail.
  var $selectedThumb = null;

  // Create new or reuse current thumbnails sortable control.
  var $thumbsWrapper = $('.mediabox-better-ui-thumbs-wrapper');
  if ($thumbsWrapper.size() === 0) {
    $thumbsWrapper = $('<tr class="mediabox-better-ui-thumbs-wrapper"><td colspan="3"><div class="mediabox-better-ui-thumbs"></div></td></tr>');
  }
  var $thumbs = $thumbsWrapper.find('.mediabox-better-ui-thumbs');
  $thumbs.empty();
  $field.find('.field-multiple-table thead').append($thumbsWrapper);

  // Move 'Add new items' button on top of thumbnails control.
  $field.find('.description').insertBefore($thumbs);

  // Move 'Add new items' button on top of thumbnails control.
  $field.find('.mediabox-browser-modal').parent().insertBefore($thumbs);

  this.$deleteButton.insertBefore($thumbs);
  this.$deleteButton.click(function () {
    // @todo - for now we are not handling a case when some items are
    // deleted but then user add new images - we will loose information
    // about deleted images.
    $selectedThumb.toggleClass('mediabox-deleted');
    var $item = $(getItem($selectedThumb.data('mediabox-item-index')));
    mediaboxUI.deleteButtonClicked($item);
  });

  // Process items.
  $mediaboxContainer.find('tr').each(function (index) {
    var $item = $(this);
    var $image = $item.find('img.mediabox-image');

    // If we do not have image element in this item lets return.
    if ($image.size() === 0) {
      return;
    }

    // Items are hiden by default, visibility is controled by thumbnails.
    $item.hide();

    // Create thumbnail from mediabox item images.
    var $thumbImage = $('<img class="mediabox-image" />');
    // We can have two images from Jcrop so always take the first one.
    $thumbImage.attr('src', $image.get(0).src);

    // Save item index position in thumbnail for thumbnail operations.
    $thumbImage.data('mediabox-item-index', index);

    // On thumbnail click show mediabox item for this thumbnail.
    $thumbImage.click(function () {
      // Unselect previously selected thumb.
      if ($selectedThumb !== null) {
        $selectedThumb.toggleClass('mediabox-selected');
        $(getItem($selectedThumb.data('mediabox-item-index'))).hide();
      }

      $item.show();
      $thumbImage.toggleClass('mediabox-selected');
      
      $selectedThumb = $thumbImage;
      mediaboxUI.deleteButtonText($item);
    });

    if (mediaboxUI.settings.itemInPopup === 1) {
      $mediaboxContainer.hide();
      $thumbImage.dblclick(function () {
        $.fancybox({
          titleShow: false,
          autoscale: false,
          autoDimensions: true,
          scrolling: 'no',
          type: 'html',
          transitionIn: 'none',
          transitionOut: 'none',
          speedIn: 0,
          speedOut: 0,
          content: $item,
          onCleanup: function () {
            // Fancybox will take it content out of the DOM - that is why we need
            // to return content back to the DOM on fancybox close.
            var content = $('#fancybox-content').contents();
            var position = $thumbImage.data('mediabox-item-index');
            if(position === 0) {
              $mediaboxContainer.prepend(content);
            }
            else {
              $mediaboxContainer.find('tr:nth-child(' + position + ')').after(content);
            }
          }
        });
      });
    }

    $thumbs.append($thumbImage);

    // First item is selected by default.
    if (index === 0) {
      $thumbImage.click();
    }
  });

  // Thumbnails are sortable.
  $thumbs.sortable({
    distance: 3,
    opacity: 0.5,
    placeholder: 'ui-state-highlight mediabox-image',
    deactivate: function(event, ui) {
      // When thumbnail sorting is finished lets update items delta.
      $thumbs.find('.mediabox-image').each(function (index) {
        var itemIndex = $(this).data('mediabox-item-index');
        $('.form-delta-order', getItem(itemIndex)).val(index);
      });
    }
  });
};

/**
 * Field with one item (cardinality 1) handling.
 *
 * @param $field
 *   jQuery field object.
 */
MediaboxBetterUI.prototype.mediaboxOneItem = function() {
  var $element = this.$field.find('.mediabox-element');
  if(this.$field.find('img.mediabox-image').size() !== 0) {
    this.$deleteButton.insertBefore($element);
    var mediaboxUI = this;
    this.$deleteButton.click(function () {
      mediaboxUI.deleteButtonClicked($element);
    });
    this.deleteButtonText($element);
  }
}

/**
 * Better mediabox field UI.
 */
Drupal.behaviors.mediaboxBetterUI = {
  attach:function (context, settings) {
    // Attach better UI functionality to all mediabox fields.
    for (var field in Drupal.settings.mediabox_ui.fields) {
      if (Drupal.settings.mediabox_ui.fields.hasOwnProperty(field)) {
        $('#edit-' + field + ' .mediabox-form-wrapper', context).once('mediabox-better-ui', function () {
          var $field = $(this);

          // Hide default drag/remove control because we will use different solution.
          $field.find('.mediabox-remove').hide().next().attr('colspan', 3);
          
          new MediaboxBetterUI($field, Drupal.settings.mediabox_ui.fields[field]);
        });
      }
    }
  }
};

})(jQuery);
