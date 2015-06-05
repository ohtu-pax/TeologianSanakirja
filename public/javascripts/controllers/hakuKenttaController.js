sanakirjaApp.controller('hakuKenttaController', function ($scope, $routeParams, $location) {

    //Funktio filtterin putsaamiseen
    $scope.tyhjennahaku = function () {
        $scope.hakuKentta = "";
    };

    //Asetetaan hakukenttaan sana jos sellainen on routeParamssissa
    if ($routeParams) {
        $scope.hakuKentta = $routeParams.sana;
    }
    
    $scope.getRandom = function () {
        var sanalista = JSON.parse(sessionStorage.getItem('sanalista'));
        var randID = Math.floor(Math.random() * sanalista.length);
        $location.path('/sanat/' + sanalista[randID].hakusana);
    };    
});

