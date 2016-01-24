'use strict';

angular.module('meanAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.users', {
        url: '/users',
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl as userCtrl'
      });
  });
