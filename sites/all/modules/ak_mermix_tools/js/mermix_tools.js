jQuery(document).ready(function(){
    var mapid = 'gmap-field-address-und-0';
    var $addressfield = jQuery('.toggle-address-field');
    var userLat = Drupal.settings.userPlace.lat;
    var userLon = Drupal.settings.userPlace.lon;
    if(jQuery('.enable-user-address').is(":checked")) {
	$addressfield.slideUp();
	geofield_gmap_data[mapid].lat.val(userLat);
	geofield_gmap_data[mapid].lng.val(userLon);
    }
    jQuery('.enable-user-address').click(function(){
	if(jQuery(this).is(":checked")) {
	$addressfield.slideUp();
	//change lat/lon
	geofield_gmap_data[mapid].lat.val(userLat);
	geofield_gmap_data[mapid].lng.val(userLon);
	} else {
	var pos = new google.maps.LatLng(Drupal.settings.geofield_gmap[mapid].lat, Drupal.settings.geofield_gmap[mapid].lng);
	$addressfield.slideDown();  
	//change lat/lon
	geofield_gmap_data[mapid].lat.val(Drupal.settings.geofield_gmap[mapid].lat);
	geofield_gmap_data[mapid].lng.val(Drupal.settings.geofield_gmap[mapid].lng);
	//geofield_gmap_data[mapid].marker.setPosition(pos);
	//geofield_gmap_data[mapid].map.setCenter(pos);
	}
    });
});