angular.module('templates-app', ['app/home/_tpl/home.tpl.html']);

angular.module("app/home/_tpl/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/home/_tpl/home.tpl.html",
    "<div class=\"home\"><div>Your point:</div><span ng-bind=\"score\"></span><div class=\"container\" ng-keypress=\"keyPress($event)\"><button ng-click=\"newGame()\" id=\"new-game\">New Game</button><div class=\"box-content\" ng-class=\"{'game-over':gameOver}\"><div ng-repeat=\"item in points\" class=\"box\" ng-class=\"item.classes\" ng-bind-html=\"item.value || '&#160;&#160;&#160;&#160;&#160;'\"></div></div></div></div>");
}]);
