'use strict';

describe('Controller: ReportCtrl', function () {

  // load the controller's module
  beforeEach(module('meanAppApp'));

  var ReportCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportCtrl = $controller('ReportCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
