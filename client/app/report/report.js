'use strict';

angular.module('meanAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.report', {
        url: '/report',
        templateUrl: 'app/report/report.html',
        controller: 'ReportCtrl'
      });
  });
