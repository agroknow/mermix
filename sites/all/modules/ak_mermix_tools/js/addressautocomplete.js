var options = {
  types: ['geocode'],
  componentRestrictions: {country: "gr"}
  };
//var pac_input = document.getElementById('edit-place');
//var pac_input2 = document.getElementById('edit-submitted-location-en');
var submit = false;
function pacSelectFirst(input){
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
	  //google.maps.event.trigger(autocomplete, 'place_changed');
        }
	if(event.which == 13){
	      event.preventDefault();
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

    return new google.maps.places.Autocomplete(input,options);
}

jQuery(function(){
  var coords = document.getElementById('coords');
  var distance = document.getElementById('distance');
  if(document.getElementById('edit-place')){
   var autocomplete = pacSelectFirst(document.getElementById('edit-place'));
   autocomplete.addListener('place_changed', fillInAddress);
  }
  if(document.getElementById('edit-submitted-location'))
   var autocomplete2 = pacSelectFirst(document.getElementById('edit-submitted-location'));
  if(document.getElementById('edit-submitted-location-en'))
   var autocomplete3 = pacSelectFirst(document.getElementById('edit-submitted-location-en'));

   function fillInAddress() {
	 var place = autocomplete.getPlace();
    // Get the place details from the autocomplete object.
    //lat,lon
    //place.geometry.viewport.getNorthEast().lng();
    coords.value = place.geometry.location.lat() + ',' + place.geometry.location.lng();
    var km = getDistanceFromLatLonInKm(place.geometry.location.lat(),place.geometry.location.lng(),place.geometry.viewport.getNorthEast().lat(),place.geometry.viewport.getNorthEast().lng());
    distance.value = Math.round(km);
  }

  jQuery("#edit-place").keyup(function(){
	if(jQuery(this).val() == "") {
	 coords.value = '';
	 distance.value = '';
	}
  }); 
    
  jQuery('.form-type-date-popup input').on('click',function(){
	var currid = jQuery(this).attr('id');
	if(currid.indexOf('from') > -1) {
	    var otherid = currid.replace('from','to');
	    if(jQuery( "#" + otherid ).datepicker('getDate')) {
		jQuery( "#" + currid ).datepicker( "option", "maxDate", jQuery( "#" + otherid ).datepicker('getDate') );
	    }
	} else {
	    var otherid = currid.replace('to','from');
	    if(jQuery( "#" + otherid ).datepicker('getDate')) {
		jQuery( "#" + currid ).datepicker( "option", "minDate", jQuery( "#" + otherid ).datepicker('getDate') );
	    }
	}
    });
});
      
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}