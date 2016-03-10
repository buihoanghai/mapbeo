(function () {
  'use strict';
  homeService.$inject = [];
  function homeService() {
    var revealed = {
      simpleFunc: simpleFunc,
      simpleFunc2: simpleFunc2
    };
    function simpleFunc(a,b) {
      return a + b;
    }
    function simpleFunc2(a, b) {
      if (a > b) {
        return a + b;
      }
      return a - b;
    }
    return revealed;
  }
  angular.module('app.home').service('app.home.homeService', homeService);
})();
