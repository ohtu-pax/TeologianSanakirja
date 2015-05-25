sanakirjaApp.controller('getController', function ($scope, $http, $route) {
    var randID = Math.floor(Math.random() * 3360) + 1;
    var datalista;
    $http.get('api/sanat/', {cache: true})
            .success(function (data) {
                datalista = data;
                $scope.sanalista = data;
                $scope.random = data[randID];
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });

    $scope.reloadRoute = function () {
        $route.reload();
    };
});