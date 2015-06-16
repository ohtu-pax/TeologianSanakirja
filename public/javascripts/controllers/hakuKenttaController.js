sanakirjaApp.controller('hakuKenttaController', function ($scope, $routeParams, $location, sanakirjaAPIservice) {

    //Funktio filtterin putsaamiseen
    $scope.tyhjennahaku = function () {
        $scope.hakuKentta = "";
    };

    //Asetetaan hakukenttaan sana jos sellainen on routeParamssissa
    if ($routeParams) {
        $scope.hakuKentta = $routeParams.sana;
    }

    $scope.getRandom = function () {
        var sanalista = JSON.parse(sessionStorage.getItem('sanalista'));

        var randID = Math.floor(Math.random() * sanalista.length);
        $location.path('/sanat/' + sanalista[randID].hakusana);
    };

    if ($scope.tila === undefined) {
        $scope.tila = {};
    }

    sanakirjaAPIservice.isLoggedIn().then(function (data) {
        var res = !!parseInt(data, 10);
        $scope.tila.sisalla = res;
        console.log('Ollaan kirjauduttu sisään: ' + res);
    });

    $scope.logout = function () {
        sanakirjaAPIservice.logout().then(function (data) {
            var success = !!data;
            console.log('Uloskirjautuminen onnistui: ' + success);
            if (success === true) {
                $scope.tila.sisalla = false;
                $location.path('/');
            }
        });
    };
});
