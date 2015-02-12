var poModule = angular.module('poModule', ['ngRoute', 'routeControllers']);

poModule.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    jsonURLConverter($httpProvider);

    $routeProvider.when('/mainView', {
        templateUrl: '/livelink/llisapi.dll/open/dashboardViewMain',
        controller: 'resultsController'
    }).otherwise({ redirectTo: '/mainView' });

}]);
