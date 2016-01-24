'use strict';

angular.module('meanAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });
  });
