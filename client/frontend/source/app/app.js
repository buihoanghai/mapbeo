angular.module('app', [
  'ui.router',
  'common.routeConfig',
  'app.home',
  'templates-app',
  'templates-common'
]).config([
    '$locationProvider',
    '$urlRouterProvider',
     '$stateProvider',
    'common.routeConfig.routeConfigServiceProvider',
    '$compileProvider',
 function appConfig($locationProvider, $urlRouterProvider, $stateProvider, routeConfigServiceProvider, $compileProvider) {
   var route = routeConfigServiceProvider;
   $compileProvider.aHrefSanitizationWhitelist(
      /^\s*(https?|ftp|mailto|primus):/);
   $stateProvider
      .state(
        'home',
        route.config('/home', 'home'));
  //- If the URL does not match any state
  $urlRouterProvider.otherwise('/home');
  //- Set html5mode and use '!' as url-prefix for legacy browsers
  $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(false);
}]).run();