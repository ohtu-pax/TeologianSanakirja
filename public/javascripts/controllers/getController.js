sanakirjaApp.controller('getController', function ($scope, $routeParams, sanatService) {

    sanatService.sanalista().then(function (sanat) {
        $scope.sanalista = sanat;
    });

    $scope.kirjainFilter = function (sanat) {
        return sanat.hakusana.substring(0, 1).match($routeParams.kirjain.toLowerCase())
                || sanat.hakusana.substring(0, 1).match($routeParams.kirjain);
    };
});
