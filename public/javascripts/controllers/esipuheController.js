sanakirjaApp.controller('esipuheController', function ($scope, $filter, sanakirjaAPIservice) {
    $scope.esipuhe = 'aamen';

    if ($scope.tila === undefined) {
        $scope.tila = {};
    }

    sanakirjaAPIservice.isLoggedIn().then(function (data) {
        var res = !!parseInt(data, 10);
        $scope.tila.sisalla = res;
        console.log('Ollaan kirjauduttu sisään: ' + res);
    });
});