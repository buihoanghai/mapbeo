(function () {
  'use strict';
  function appController($scope) {
    $scope.test11 = "test3222";
  }
  appController.$inject = ['$scope'];
  angular.module('app').controller('app.appController', appController);
})();
