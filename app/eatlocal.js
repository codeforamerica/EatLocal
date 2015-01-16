(function () {
  'use strict';

  var app = angular.module('EatLocal', []);

  app.controller('MainCtrl', function($scope){
    var activateLayer = function(layer) {
      map.removeLayer(theaters);
      map.removeLayer(farmersMarkets);
      map.addLayer(layer);
      layer.openPopup();
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
        map.setView(L.latLng(place.Longitude, place.Latitude));
        switch (place.Type) {
          case 'Restaurant':
            activateLayer(theaters);
            break;
          case 'Farmers Market':
            activateLayer(farmersMarkets);
            break;
          default:
            activateLayer(theaters);
        }
      } else {
        alert('Sorry. We are uncertain where this place is on the map.');
      }
    };
  });
}());
