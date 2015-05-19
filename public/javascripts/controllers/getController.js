sanakirjaApp.controller('getController', function ($scope, $http) {
    var randID = Math.floor(Math.random() * 6) + 1;
    $http.get('api/sanat/')
            .success(function (data) {
                $scope.random = data[randID];
                $scope.sanalista = data;
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });

});