var sanakirjaApp = angular.module('sanakirjaApp', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'ngAnimate']);
sanakirjaApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'getController',
                templateUrl: '/templates/list.html'
            })
            .when('/random', {
                controller: 'getController',
                templateUrl: '/templates/random.html'
            })
            .when('/sanat/:sana', {
                controller: 'getController',
                templateUrl: '/templates/list.html'
            })
            .when('/lista/:kirjain', {
                controller: 'getController',
                templateUrl: '/templates/kirjaimet.html'
            })
            .when('/history', {
                controller: 'historyController',
                templateUrl: '/templates/history.html'

            })
            .otherwise({
                redirectTo: '/'
            });

});