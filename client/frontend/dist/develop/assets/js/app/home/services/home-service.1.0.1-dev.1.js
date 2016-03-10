(function () {
  'use strict';
  homeService.$inject = [];
  function homeService() {
    var revealed = {
      simpleFunc: simpleFunc
    };
    function simpleFunc(a,b) {
      return a + b;
    }
    return revealed;
  }
  angular.module('app.home').service('app.home.homeService', homeService);
})();
