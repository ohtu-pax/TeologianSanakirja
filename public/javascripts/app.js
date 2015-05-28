var sanakirjaApp = angular.module('sanakirjaApp', ['ngRoute','ngSanitize']);
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
          /**  .when('/post', {
                controller: 'postController',
                templateUrl: '/templates/post.html'
            })
            .otherwise({
                redirectTo: '/'
            });
            */
    ;
});