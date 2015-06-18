sanakirjaApp.controller('hakuKenttaController', function ($scope, $routeParams, $location, sanakirjaAPIservice) {
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

    if ($scope.hakuKentta === undefined) {
        $scope.hakuKentta = {};
    }
    
    if ($routeParams) {
        $scope.hakuKentta.sana = $routeParams.sana;
    }

    $scope.tyhjennahaku = function () {
        $scope.hakuKentta.sana = "";
    };
    
    $scope.naytaLista = function() {
        //jos ei olla juuressa tai /sanat-osoitteessa, tiedetään ettei lista-template ole esillä. siirrytään siihen.
      if ($location.path() !== '/' || $location.path().substring(0, 7) !== '/sanat')  {
          $location.path('/');
      }
    };

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
