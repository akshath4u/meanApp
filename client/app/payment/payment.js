'use strict';

angular.module('meanAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.payment', {
        url: '/payment',
        templateUrl: 'app/payment/payment.html',
        controller: 'PaymentCtrl as paymentCtrl'
      });
  });
