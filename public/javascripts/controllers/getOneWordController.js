sanakirjaApp.controller('getOneWordController', function ($scope, $routeParams, sanakirjaAPIservice) {
    var sanalista = JSON.parse(sessionStorage.getItem('sanalista'));

    var asetaSanaJaSelitys = function (sana, sanalista) {
        for (var i = 0; i < sanalista.length; i++) {
            if (sanalista[i].hakusana === sana) {
                $scope.sana = sana;
                $scope.selitys = sanalista[i].selitys;
                break;
            }
        }
    }

    if (sanalista === null) {
        var sanalistaPromise = sanakirjaAPIservice.getSanalista();

        sanalistaPromise.then(function (result) {
            sanalista = result;
            asetaSanaJaSelitys($routeParams.sana, sanalista);
        }).catch(function (error) {
            console.log("Error at getOneWordController, sanalistaPromise: " + error);
        });

    } else {
        asetaSanaJaSelitys($routeParams.sana, sanalista);
    }
});