sanakirjaApp.controller('esipuheController', function ($scope, sanakirjaAPIservice) {
    if (sessionStorage.getItem('esipuhe') === null) {
        var servicePromise = sanakirjaAPIservice.getEsipuhe();

        servicePromise.then(function (result) {
            $scope.esipuhe = result; 
        }).catch(function (error) {
            console.log("Error at getController: " + error);
        });
    } else {
        var esipuhe = JSON.parse(sessionStorage.getItem('esipuhe'));
         $scope.esipuhe = esipuhe; 
    }

    if ($scope.tila === undefined) {
        $scope.tila = {};
    }

    sanakirjaAPIservice.isLoggedIn().then(function (data) {
        var res = !!parseInt(data, 10);
        $scope.tila.sisalla = res;
        console.log('Ollaan kirjauduttu sisään: ' + res);
    });
});