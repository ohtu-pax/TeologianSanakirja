 sanakirjaApp.controller('getController', function ($scope, $http) {
    var randID = Math.floor(Math.random() * 3360) + 1;
$http.get('api/sanat/',{cache: true})
            .success(function (data) {
                $scope.sanalista = data;
                $scope.random = data[randID];
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });        
});
