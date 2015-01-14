(function () {
    'use strict';

    var app = angular.module('EatLocal', []);

    app.controller('MainCtrl', function($scope){
      $scope.places = [
          {
            name: "Don José Restaurant",
            phone: "555-555-1234",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            image: "http://placehold.it/100x100",
            address: "155 9th Street, San Francisco, CA 94104",
            category: "restaurant"
          },{
            name: "Bellicci Restaurant",
            phone: "555-555-1234",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            image: "http://placehold.it/100x100",
            address: "155 9th Street, San Francisco, CA 94104",
            category: "restaurant"
          },{
            name: "Indio Market",
            phone: "555-555-1234",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            image: "http://placehold.it/100x100",
            address: "155 9th Street, San Francisco, CA 94104",
            category: "restaurant"
          },{
            name: "Chino Restaurant",
            phone: "555-555-1234",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            image: "http://placehold.it/100x100",
            address: "155 9th Street, San Francisco, CA 94104",
            category: "restaurant"
          }

        ];

    });

}());
