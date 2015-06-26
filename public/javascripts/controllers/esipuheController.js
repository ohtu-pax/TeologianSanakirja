sanakirjaApp.controller('esipuheController', function ($scope, sanakirjaAPIservice, $http) {
    if (sessionStorage.getItem('esipuhe') === null) {
        var servicePromise = sanakirjaAPIservice.getTekstit("esipuhe");

        servicePromise.then(function (result) {
            $scope.esipuhe = result[0].nimi;
        }).catch(function (error) {
            console.log("Error at getController: " + error);
        });
    } else {
        var esipuhe = JSON.parse(sessionStorage.getItem('esipuhe'));
        $scope.esipuhe = esipuhe[0].nimi;
    }

    if ($scope.tila === undefined) {
        $scope.tila = {};
    }

    sanakirjaAPIservice.isLoggedIn().then(function (data) {
        var res = !!parseInt(data, 10);
        $scope.tila.sisalla = res;
        console.log('Ollaan kirjauduttu sisään: ' + res);
    });

    $scope.sendPost = function () {
        var data = {
            data: $scope.esipuhe
            };
        $http.post("/api/data/esipuhe", data);
    };
});