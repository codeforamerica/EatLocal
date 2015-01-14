(function () {
    'use strict';

    var app = angular.module('EatLocal', []);

    app.controller('MainCtrl', function($scope){
      $scope.colors = ['Blue Cadinal', 'Green Roof', 'Papaya Whit', 'Slate Gray', 'Ocean Breeze', 'Yellow Lamp'];
    });

}());
