sanakirjaApp.controller('getController', function ($scope, $routeParams, sanakirjaAPIservice) {

    if (sessionStorage.length === 0) {
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
   
});



