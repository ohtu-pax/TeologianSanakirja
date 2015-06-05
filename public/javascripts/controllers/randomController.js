sanakirjaApp.controller('randomController', function ($location) {
    var getRandom = function (sanalista) {
        var randID = Math.floor(Math.random() * sanalista.length);
        $location.path('/sanat/' + sanalista[randID].hakusana);
    }

    if (sessionStorage.length === 0) {
        var servicePromise = sanakirjaAPIservice.getSanalista();

        servicePromise.then(function (result) {
            getRandom(result);
        }).catch(function (error) {
            console.log("Error at getController: " + error);
        });
    } else {
        var sanalista = JSON.parse(sessionStorage.getItem('sanalista'));
        getRandom(sanalista);
    }
});



