   sanakirjaApp.controller('reloadController', function ($scope, $route) {
        $scope.reloadRoute = function () {
        $route.reload();
    };
   });
