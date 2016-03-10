angular.module('app', [
  'ui.router',
  'common.routeConfig',
  'app.home',
  'templates-app',
  'templates-common',
  'ngSanitize'
]).config([
 function appConfig() {
   
}]).run();