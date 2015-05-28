sanakirjaApp.controller('getController', function ($scope, sanakirjaAPIservice) {
    var asetetaanSanalistaJaRandom = function (sanalista) {
        var randID = Math.floor(Math.random() * sanalista.length) + 1;

        $scope.sanalista = sanalista;
        $scope.random = sanalista[randID];
    };

    if (sessionStorage.length === 0) {
        var servicePromise = sanakirjaAPIservice.getSanalista();

        servicePromise.then(function (result) {
            asetetaanSanalistaJaRandom(result);
        }).catch(function (error) {
            console.log("Error at getController: " + error);
        });
    } else {
        var sanalista = JSON.parse(sessionStorage.getItem('sanalista'));
        asetetaanSanalistaJaRandom(sanalista);
    }
});



