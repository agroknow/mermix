var pac_input = document.getElementById('edit-place');
var submit = false;
(function pacSelectFirst(input){
    // store the original event binding function
    var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

    function addEventListenerWrapper(type, listener) {
    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
    // and then trigger the original listener.

    if (type == "keydown") {
      var orig_listener = listener;
      listener = function (event) {
        var suggestion_selected = jQuery(".pac-item-selected").length > 0;
        if ((event.which == 13 || event.which == 9)  && !suggestion_selected) {
          var simulated_downarrow = jQuery.Event("keydown", {keyCode:40, which:40})
          orig_listener.apply(input, [simulated_downarrow]);
	  if(event.which == 13){
	      event.preventDefault();
	  }
	  //google.maps.event.trigger(autocomplete, 'place_changed');
        }
        orig_listener.apply(input, [event]);
      };
    }
    // add the modified listener
    _addEventListener.apply(input, [type, listener]);
  }

  if (input.addEventListener)
    input.addEventListener = addEventListenerWrapper;
  else if (input.attachEvent)
    input.attachEvent = addEventListenerWrapper;
})(pac_input);

jQuery(function(){
  var coords = document.getElementById('coords');
  //coords.value = '';
  var autocomplete = new google.maps.places.Autocomplete(pac_input);
  autocomplete.addListener('place_changed', fillInAddress);
    function fillInAddress() {
    // Get the place details from the autocomplete object.
    //lat,lon
    var coordArr = [];
    //console.log(autocomplete.getPlace().geometry.location);
    for (var key in autocomplete.getPlace().geometry.location) {
    coordArr.push(autocomplete.getPlace().geometry.location[key]);
    }
    coords.value = coordArr[0] + ',' + coordArr[1];
  }
});