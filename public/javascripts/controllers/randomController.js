sanakirjaApp.controller('randomController', function ($location, sanakirjaAPIservice) {
    var getRandom = function (sanalista) {
        var randID = Math.floor(Math.random() * sanalista.length);
        $location.path('/sanat/' + sanalista[randID].hakusana);
    }

    if (sessionStorage.getItem('sanalista') === null) {
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



