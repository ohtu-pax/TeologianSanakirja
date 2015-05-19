var sanakirjaApp = angular.module('sanakirjaApp', ['ngRoute']);
sanakirjaApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'sanalistaController',
                templateUrl: 'javascripts/templates/list.html'
            })
            .when('/random', {
                controller: 'randomController',
                templateUrl: 'javascripts/templates/random.html'
            })
            .when('/post', {
                controller: 'postController',
                templateUrl: 'javascripts/templates/post.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    ;
});