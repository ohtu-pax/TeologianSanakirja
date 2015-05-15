
sanakirjaApp.controller('sanalistaController', function ($scope, $http, sanakirjaAPIservice) {

    $http.get('api/sanat')
            .success(function (data) {
                console.log(data);
                $scope.sanalista = data;
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
});


sanakirjaApp.controller('testiController', function ($scope) {
    $scope.title = "Teologian sanakirja";
});