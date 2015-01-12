'use strict';

/**
 * @ngdoc function
 * @name angappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angappApp
 */
angular.module('angappApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
