var sanakirjaApp = angular.module('sanakirjaApp', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'ngAnimate']);
sanakirjaApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'getController',
                templateUrl: '/templates/list.html'
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
            .when('/admin', {
                controller: 'adminController',
                templateUrl: '/templates/admin.html'
            })
            .when('/login', {
                controller: 'loginController',
                templateUrl: '/templates/login.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});
sanakirjaApp.filter('unsafe_html', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);


