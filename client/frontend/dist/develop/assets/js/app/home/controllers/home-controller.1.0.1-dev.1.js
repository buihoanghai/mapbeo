(function () {
  'use strict';
  function homeController($scope) {
    $scope.test = "abc";
  }
  homeController.$inject = ['$scope'];
  angular.module('app.home').controller('app.home.homeController', homeController);
})();
