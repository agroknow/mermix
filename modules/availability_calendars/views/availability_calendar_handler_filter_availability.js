(function($) {
  "use strict";

  /**
   * Initialization code based on the Drupal behaviors paradigm.
   *
   * Date popup pairs are coupled such that the maxDate or minDate setting is
   * changed when the other date field is changed.
   *
   * As the date popup module only creates the datepickers when the input fields
   * get the focus, we must set the maxValue and minValue options both in the
   * date popup module settings (drupal.settings.datePopup) (if not already
   * created) and in the datepicker object (if already created).
   */
  Drupal.behaviors.availabilityCalendarHandlerFilterAvailabilityCoupleDatePopups = {
    attach: function(context, settings) {
      // Inner function prevents jslint warning "creating function within loop".
      function coupleDatePopups(datePopup1, datePopup2) {
        var isTo1 = datePopup2.name.indexOf("[to1]") !== -1;
        // When the from date gets set, change the minDate of the to(1) date.
        settings.datePopup[datePopup1.id].settings.onClose = function(selectedDate) {
          if (isTo1) {
            // We have an arrival and departure date. The departure date should
            // be greater than the arrival date. Create a date from the date
            // string, add 1 day and format it back into a string. Use the
            // dateFormat options (or date popup setting if not yet created)
            // from both dates to parse resp. format the date.
            selectedDate = $.datepicker.parseDate($("#" + datePopup1.id).datepicker("option", "dateFormat"), selectedDate);
            selectedDate.setDate(selectedDate.getDate() + 1);
            selectedDate = $.datepicker.formatDate($("#" + datePopup2.id).datepicker("option", "dateFormat") || settings.datePopup[datePopup2.id].settings.dateFormat, selectedDate);
          }
          settings.datePopup[datePopup2.id].settings.minDate = selectedDate;
          $(datePopup2).datepicker("option", "minDate", selectedDate);
        };
        // When the to(1) date gets set, change the maxDate of the from date.
        settings.datePopup[datePopup2.id].settings.onClose = function(selectedDate) {
          if (isTo1) {
            selectedDate = $.datepicker.parseDate($("#" + datePopup2.id).datepicker("option", "dateFormat"), selectedDate);
            selectedDate.setDate(selectedDate.getDate() - 1);
            selectedDate = $.datepicker.formatDate($("#" + datePopup1.id).datepicker("option", "dateFormat") || settings.datePopup[datePopup1.id].settings.dateFormat, selectedDate);
          }
          settings.datePopup[datePopup1.id].settings.maxDate = selectedDate;
          $(datePopup1).datepicker("option", "maxDate", selectedDate);
        };
      }

      if (settings.datePopup) {
        var datePopupPairs = {};

        // Find date popup pairs, ie. 2 date-popups within the same filter.
        // Date popups that form a pair will have names like:
        // <views filter name>[from][date] and <views filter name>[to(1)][date].
        $(".views-widget-filter-available").once('availability-calendar-handler-filter-availability-couple-date-popups', function() {
          var inputs = $(".form-type-date-popup input", $(this)).find("input");
          // Check that we have 2 date popups, not 1 with a duration drop down.
          if (inputs.size() === 2) {
            var nameParts = this.name.split(/\[/);
            var filterName = nameParts[0];
            datePopupPairs[filterName] = [];
            // Store both as a date popup pair under the name of the filter.
            inputs.each(function() {
              datePopupPairs[filterName].push(this);
            });
          }
        });

        // Process the found date popup pairs.
        var key;
        for (key in datePopupPairs) {
          if (datePopupPairs.hasOwnProperty(key)) {
            if (datePopupPairs[key].length === 2) {
              coupleDatePopups(datePopupPairs[key][0], datePopupPairs[key][1]);
            }
          }
        }
      }
    }
  };

  /**
   * Initialization code based on the Drupal behaviors paradigm.
   *
   * If the form uses auto submit, we prevent that it does so on coupled
   * elements that together define a date range, by adding the
   * ctools-auto-submit-exclude class to the date inputs.
   * However, that means that we have to take that task over by triggering the
   * auto submit if both elements have a (correct) value.
   */
  Drupal.behaviors.availabilityCalendarHandlerFilterAvailabilityHandleAutoSubmit = {
    attach: function(context, settings) {
      // Copied (and adapted) from ctools/js/auto-submit.js.
      function triggerSubmit(form) {
        form = $(form);
        if (!form.hasClass('ctools-ajaxing')) {
          form.find('.ctools-auto-submit-click').click();
        }
      }

      function validate(value, format) {
        jQuery.ui.Datepicker.parseDate(format, value);
        return true;
      }

      $('.availability-calendar-auto-submit', context)
        .once('availability-calendar-handler-filter-availability-handle-auto-submit', function () {
          $(this)
            // This unbinds all events, also others not set by ctools'
            // auto-submit.js. But there's no way to only unbind that event.
            .unbind('keydown keyup')
            .unbind('keyup')
            .unbind('change')
            .bind('change', function(e) {
              if ($(e.target).is(':not(.ctools-auto-submit-exclude)')) {
                var elt = $(this);
                var value = elt.val();
                var format = elt.parents('[data-date-format]').attr('data-date-format');
                if (validate(value, format)) {
                  triggerSubmit(this.form);
                }
              }
            });
        });
    }
  };

}(jQuery));
