sanakirjaApp.controller('getController', function ($scope, sanakirjaAPIservice, $routeParams) {
    console.log("KUTSUTAAN GETCONTROLLERIA");
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
    
    $scope.tyhjennaKirjainHaku = function() {
        $scope.kirjainHakuKentta = "";
    }
    
    $scope.hakuKentta.sana ="";

    $scope.kirjainFilter = function (sanat) {
        return sanat.hakusana.substring(0, 1).match($routeParams.kirjain.toLowerCase()) || sanat.hakusana.substring(0, 1).match($routeParams.kirjain);
    };
});



