'use strict';

angular.module('meanAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'dx',
  'ui.bootstrap.modal',
  'angularUtils.directives.dirPagination',
  'toaster'
])
  .filter('cmdate', [
        '$filter', function($filter) {
            return function(input, format) {
                return $filter('date')(new Date(input), format);
            };
        }
    ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/main/home');

    $locationProvider.html5Mode(true);
  });