//Google Maps API
var map, infoWindow;

   function initMap() {

     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
         pos = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         };

         infoWindow = new google.maps.InfoWindow();
         marker = new google.maps.Marker({
           map: map
         })

         map = new google.maps.Map(document.getElementById('map'), {
             center: {lat: 44.9778, lng: -93.2650},
             zoom: 13
           });

         marker.setPosition(pos);
         infoWindow.open(map);
         map.setCenter(pos);
         var request = {
           placeId: 'placeIds'
         };
         
           var service = new google.maps.places.PlacesService(map);
           service.nearbySearch({
             rankBy: google.maps.places.RankBy.DISTANCE,
             keyword: "coffee shop",
             location: pos,                
           }, callback);

       }, function() {
         handleLocationError(true, infoWindow, map.getCenter());
       });
     } else {
       // Browser doesn't support Geolocation
       handleLocationError(false, infoWindow, map.getCenter());
     };
   

   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
     infoWindow.setPosition(pos);
     infoWindow.setContent(browserHasGeolocation ?
                           'Error: The Geolocation service failed.' :
                           'Error: Your browser doesn\'t support geolocation.');
     infoWindow.open(map);
   };
 };

   function callback(results, status) {
    showMoreResults = results;
    var placeIds = [];
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < 4; i++) {
        placeIds.push(results[i].id);
        createMarker(results[i]);
        //console.log(placeIds);
      }
    }
  };
  function showMore(results) {
    //console.log('here');
    for (var i=4; i <results.length; i++) {
      createMarker(results[i]);
    }
  }
   function createMarker(place) {
     //console.log(place);
     var placeLoc = place.geometry.location;
     var marker = new google.maps.Marker({
       map: map,
       position: place.geometry.location
     });

     if (place.opening_hours.open_now = true) {
       var openNow = "Currently Open";
     } 
     else {
       var openNow = "Currently Closed"
     };

     $("#result").append("<div id='places'><h5 class='placeName'>" + place.name + "</h5><p class='address'><a href='https://www.google.com/maps/dir/?api=1&origin=" + pos.lat + "," + pos.lng + "&destination=coffee&destination_place_id=" + place.place_id + "&dir_action=navigate' target='_blank'>" + place.vicinity + "</a></p>" + "<p class='ratingOpenNow'>Rating: " + place.rating + " Stars&nbsp;&nbsp;|&nbsp;&nbsp;" + openNow + "</p></div>")

     google.maps.event.addListener(marker, 'click', function() {
       infoWindow.setContent(place.name);
       infoWindow.open(map, this);
     });
     google.maps.event.addListener(marker, 'click', function() {

           infoWindow.setContent("<div><h5 class='placeName'>" + place.name + "</h5><p class='address'><a href='https://www.google.com/maps/dir/?api=1&origin=" + pos.lat + "," + pos.lng + "&destination=coffee&destination_place_id=" + place.place_id + "&dir_action=navigate' target='_blank'>" +
             place.vicinity + "</a></p><p class='ratingOpenNow'>" +
             place.rating + " Stars&nbsp;&nbsp;|&nbsp;&nbsp;" + openNow + "</p></div>");

           infoWindow.open(map, this);
         });
   };