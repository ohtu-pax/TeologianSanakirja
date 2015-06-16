sanakirjaApp.controller('hakuKenttaController', function ($scope, $routeParams, $location, sanakirjaAPIservice, sanatService) {

    //Funktio filtterin putsaamiseen
    $scope.tyhjennahaku = function () {
        $scope.hakuKentta = "";
    };

    //Asetetaan hakukenttaan sana jos sellainen on routeParamssissa
    if ($routeParams) {
        $scope.hakuKentta = $routeParams.sana;
    }

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
        console.log('Ollaan kirjauduttu sisään: ' + res);
    });

    $scope.logout = function () {
        sanakirjaAPIservice.logout().then(function (data) {
            var kirjauduttuUlos = !!data;
            console.log('Uloskirjautuminen onnistui: ' + kirjauduttuUlos);
            if (kirjauduttuUlos === true) {
                $scope.tila.sisalla = false;
            }
        });
    };
});
