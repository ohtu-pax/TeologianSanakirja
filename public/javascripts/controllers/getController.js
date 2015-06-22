
sanakirjaApp.controller('getController', function ($scope, $routeParams, sanatService) {

    sanatService.sanalista().then(function (sanat) {
        $scope.sanalista = sanat;
    });

    $scope.tyhjennaKirjainHaku = function () {
        $scope.kirjainHakuKentta = "";
    }

    if ($scope.hakuKentta === undefined) {
        $scope.hakuKentta = {};
    }

    //tyhjennetään hakukenttä aina, kun kutsutaan getControlleria, eli silloin kun siirrytään listausnäkymään
    $scope.hakuKentta.sana = "";

    $scope.kirjainFilter = function (sanat) {
        return sanat.hakusana.substring(0, 1).match($routeParams.kirjain.toLowerCase())
                || sanat.hakusana.substring(0, 1).match($routeParams.kirjain);
    };
});
