sanakirjaApp.controller('getOneWordController', function ($scope, $routeParams) {
    var sanalista = $scope.$parent.sanalista;
    
    $scope.sana = $routeParams.sana;
 
   for (var i = 0; i < sanalista.length; i++) {
        if (sanalista[i].hakusana === $scope.sana) {
            $scope.selitys = sanalista[i].selitys;
            break;
        }
    }
    
});

