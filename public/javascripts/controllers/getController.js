sanakirjaApp.controller('getController', function ($scope, sanakirjaAPIservice, $routeParams) {
    if (sessionStorage.getItem('sanalista') === null) {
        var servicePromise = sanakirjaAPIservice.getSanalista();

        servicePromise.then(function (result) {
            $scope.sanalista = result;
        }).catch(function (error) {
            console.log("Error at getController: " + error);
        });
    } else {
        var sanalista = JSON.parse(sessionStorage.getItem('sanalista'));
        $scope.sanalista = sanalista;
    }

    $scope.tyhjennaKirjainHaku = function () {
        $scope.kirjainHakuKentta = "";
    }

    if ($scope.hakuKentta === undefined) {
        $scope.hakuKentta = {};
    }

    //tyhjennetään hakukenttä aina, kun kutsutaan getControlleria, eli silloin kun siirrytään listausnäkymään
    $scope.hakuKentta.sana = "";

    $scope.kirjainFilter = function (sanat) {
        return sanat.hakusana.substring(0, 1).match($routeParams.kirjain.toLowerCase()) || sanat.hakusana.substring(0, 1).match($routeParams.kirjain);
    };
});



