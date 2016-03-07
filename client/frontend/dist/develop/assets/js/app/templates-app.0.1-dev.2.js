angular.module('templates-app', ['app/home/_tpls/home.tpl.html']);

angular.module("app/home/_tpls/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/home/_tpls/home.tpl.html",
    "<div><input type=\"checkbox\" checked></div>");
}]);
