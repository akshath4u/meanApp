'use strict';

angular.module('meanAppApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/main/home'
    },{
      'title': 'Users',
      'link': '/main/users'
    },{
      'title': 'Report',
      'link': '/main/report'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });