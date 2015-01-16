(function () {
  'use strict';

  var app = angular.module('EatLocal', []);

  app.controller('MainCtrl', function($scope){
    var activateLayer = function(layer) {
      map.removeLayer(theaters);
      map.removeLayer(farmersMarkets);
      map.removeLayer(csas);
      map.removeLayer(wineries);
      map.removeLayer(agritourism);
      map.addLayer(layer);
    },
    activatePopup = function(layer, place) {
      var pins = layer.getLayers(),
        pinCount = pins.length;
      for (var i = 0; i < pinCount; i++) {
        if (pins[i].getLatLng().lat === place.Longitude
          && pins[i].getLatLng().lng === place.Latitude) {
          pins[i].openPopup();
        }
      }
    };

    if (window.awfulHackDataStore) {
      $scope.places = window.awfulHackDataStore;
    } else {
      var originalCallback = window.awfulHackCallback;
      window.awfulHackCallback = function() {
        $scope.places = window.awfulHackDataStore;
        $scope.$digest();
        if (originalCallback) {
          originalCallback();
        }
      }
    }

    $scope.jumpMapTo = function(place) {
      if (typeof place.Latitude === 'number' && typeof place.Longitude === 'number') {
        var layer;
        switch (place.Type) {
          case 'Restaurant':
            layer = theaters;
            break;
          case 'Farmers Market':
            layer = farmersMarkets;
            break;
          case 'CSA':
            layer = csas;
            break;
          case 'Winery':
            layer = wineries;
            break;
          case 'Agritourism':
            layer = agritourism;
            break;
          default:
            layer = theaters;
        }
        map.setView(L.latLng(place.Longitude, place.Latitude));
        activateLayer(layer);
        activatePopup(layer, place);
      } else {
        alert('Sorry. We are uncertain where this place is on the map.');
      }
    };
  });
}());
