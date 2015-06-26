
sanakirjaApp.controller('hakuKenttaController', function ($scope, $routeParams, $location, sanakirjaAPIservice, sanatService) {
    sanatService.sanalista().then(function (sanat) {
        $scope.sanalista = sanat;
    });

    if ($scope.hakuKentta === undefined) {
        $scope.hakuKentta = {};
    }

    if ($routeParams) {
        $scope.hakuKentta.sana = $routeParams.sana;
    }

    $scope.tyhjennahaku = function () {
        $scope.hakuKentta.sana = "";
    };

    $scope.naytaLista = function () {
        //jos ei olla juuressa tai /sanat-osoitteessa, tiedetään ettei lista-template ole esillä. siirrytään siihen.
        if ($location.path() !== '/' || $location.path().substring(0, 7) !== '/sanat') {
            $location.path('/');
        }
    };

    $scope.getRandom = function () {
        sanatService.sanalista().then(function (sanalista) {
            var randID = Math.floor(Math.random() * sanalista.length);
            $location.path('/sanat/' + sanalista[randID].hakusana);
        });
    };

    if ($scope.tila === undefined) {
        $scope.tila = {};
        $scope.tila.sisalla = false;
    }

    sanakirjaAPIservice.isLoggedIn().then(function (data) {
        var res = !!parseInt(data, 10);
        $scope.tila.sisalla = res;
    });

    $scope.logout = function () {
        sanakirjaAPIservice.logout().then(function (data) {
            var kirjauduttuUlos = !!data;
            if (kirjauduttuUlos === true) {
                $scope.tila.sisalla = false;
                $location.path('/');
            }
        });
    };
});
