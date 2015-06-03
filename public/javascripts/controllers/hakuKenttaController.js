sanakirjaApp.controller('hakuKenttaController', function ($scope, $routeParams) {
     
    //Funktio filtterin putsaamiseen
    $scope.tyhjennahaku = function() {
        $scope.hakuKentta = "";       
    };
    
    //Asetetaan hakukenttaan sana jos sellainen on routeParamssissa
    if($routeParams)    {
        $scope.hakuKentta = $routeParams.sana;       
    }
    
});

