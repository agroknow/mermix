function geolocation(cookie) {
    if (typeof cookie === 'undefined') {cookie = true;}
    if (navigator.geolocation) {
    var startPos;
    var geoOptions = {
    	maximumAge: 5 * 60 * 1000,
    }

    var geoSuccess = function(position) {
      startPos = position;
      if(cookie) {
        jQuery.cookie("geolocation",startPos.coords.latitude +","+startPos.coords.longitude, { path: '/' });
      } else {
        window.location.href = 'machine-results/' + startPos.coords.latitude +","+startPos.coords.longitude;
      }
    };
    var geoError = function(error) {
      console.log('Error occurred. Error code: ' + error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    } 
}