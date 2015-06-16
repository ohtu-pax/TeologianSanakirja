var sanakirjaApp = angular.module('sanakirjaApp', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'ngAnimate','xeditable']);
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
            .when('/random', {
                controller: 'randomController',
                templateUrl: '/templates/list.html'
            })

            .when('/admin', {
                controller: 'adminController',
                templateUrl: '/templates/admin.html'
            })
            .when('/login', {
                controller: 'loginController',
                templateUrl: '/templates/login.html'
            })
             .when('/esipuhe', {
                controller: 'esipuheController',
                templateUrl: '/templates/esipuhe.html'
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
sanakirjaApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});


