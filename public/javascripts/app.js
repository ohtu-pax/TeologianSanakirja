var sanakirjaApp = angular.module('sanakirjaApp', ['ngRoute','ngSanitize','mgcrea.ngStrap','ngAnimate']);
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
            .otherwise({
                redirectTo: '/'
            });

    /*  .when('/post', {
     controller: 'postController',
     templateUrl: '/templates/post.html'
     })
     
     */
    ;
});

sanakirjaApp.filter('unsafe_html', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);

