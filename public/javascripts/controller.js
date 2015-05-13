
sanakirjaApp.controller('sanalistaController', function($scope, sanakirjaAPIservice) {
    $scope.sanalista = [];

    sanakirjaAPIservice.getSanat().success(function (response) {
        $scope.sanalista = JSON.parse(response);
    });
  });


sanakirjaApp.controller('testiController', function($scope){
    $scope.title = "teologian sanakirja";
});