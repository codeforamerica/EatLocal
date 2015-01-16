(function () {
  'use strict';

  var app = angular.module('EatLocal', []);

  app.controller('MainCtrl', function($scope){
    var activateLayer = function(layer) {
      map.removeLayer(theaters);
      map.removeLayer(farmersMarkets);
      map.addLayer(layer);
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
          default:
            layer = theaters;
        }
        console.log(layer);
        map.setView(L.latLng(place.Longitude, place.Latitude));
        activateLayer(layer);
        layer.openPopup();
      } else {
        alert('Sorry. We are uncertain where this place is on the map.');
      }
    };
  });
}());
