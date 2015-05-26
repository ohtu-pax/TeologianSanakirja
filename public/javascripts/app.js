var sanakirjaApp = angular.module('sanakirjaApp', ['ngRoute']);
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
            .when('/:sana', {
                controller: 'getController',
                templateUrl: '/templates/one_word.html'
            });
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