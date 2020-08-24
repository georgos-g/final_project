/* --------------------------------------------------
	Google Maps Settings
-------------------------------------------------- */



$(document).ready(function(){

	
	function initGMap() {
		'use strict';

		var mapOptions = {
		// How zoomed in you want the map to start at (always required)
		zoom: 15,
		scrollwheel: false,

		// The latitude and longitude to center the map (always required)
		center: new google.maps.LatLng(50.9187379,6.9561363), // Cologne

		// Styling of the map in JSON object
		styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#cdd2d4"},{"visibility":"on"}]}]
		};
		var map = new google.maps.Map(document.getElementById('map-canvas'),
		  mapOptions);

		// Map marker 
		var image = 'https://www.dancingbear.de/assets/images/map-pin.png';
		var myLatLng = new google.maps.LatLng(50.9187379,6.9561363);
		var beachMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: image
		});
	} // initGMap

	google.maps.event.addDomListener(window, 'load', initGMap);

});