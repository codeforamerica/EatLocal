'use strict';

/**
 * @ngdoc function
 * @name angappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angappApp
 */
angular.module('eatlocalApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'Restaurats',
      'AngularJS',
      'Karma'
    ];
  });
