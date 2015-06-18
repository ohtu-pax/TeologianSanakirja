sanakirjaApp.controller('hakuKenttaController', function ($rootScope, $scope, $routeParams, $location, sanakirjaAPIservice) {
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
    
    console.log("KUSTUTAAN HAKUKENTTACONTROLLERIA");
    //Funktio filtterin putsaamiseen
    $rootScope.tyhjennahaku = function () {
        $rootScope.hakuKentta = "";
    };

    //Asetetaan hakukenttaan sana jos sellainen on routeParamssissa
    if ($routeParams) {
        $rootScope.hakuKentta = $routeParams.sana;
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
