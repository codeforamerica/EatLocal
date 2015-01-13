/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	L.Icon.Default.imagePath = 'images/';

	/* create leaflet map */
	var map = L.map('map', {
		center: [52.5377, 13.3958],
		zoom: 4
	});

	/* add default stamen tile layer */
	var layer = new L.StamenTileLayer('watercolor');
	map.addLayer(layer);


	L.marker([52.5, 13.4]).addTo(map);

}(window, document, L));
