sanakirjaApp.controller('ohjeController', function ($scope, sanakirjaAPIservice, $http) {
    if (sessionStorage.getItem('ohjeet') === null) {
        var servicePromise = sanakirjaAPIservice.getTekstit("ohjeet");

        servicePromise.then(function (result) {
            $scope.ohjeet = result[0].nimi;
        }).catch(function (error) {
            console.log("Error at getController: " + error);
        });
    } else {
        var ohjeet = JSON.parse(sessionStorage.getItem('ohjeet'));
        $scope.ohjeet = ohjeet[0].nimi;
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
            data: $scope.ohjeet
            };
        $http.post("/api/sana/ohjeet", data);
    };
});