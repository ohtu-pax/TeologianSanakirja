sanakirjaApp.controller('adminController', function ($scope, sanatService, $filter, $location) {

    if ($scope.tila.sisalla) {
        $location.path('/admin');
    }
    else {
        $location.path('/');
        return;
    }

    sanatService.sanalista().then(function(result) {
        $scope.sanalista = result;
    });

    $scope.adminSanat = [{id: '1', hakusana: ''}];

    $scope.hallinnoiRiveja = function (id) {
        //jos toiseksi viimeinen ja se on tyhjä ja sitä seuraava tyhjä, poistetaan vika tyhä
        if(id === $scope.adminSanat.length - 1 && $scope.adminSanat[id - 1].hakusana === '' && $scope.adminSanat[id].hakusana === '') {
            $scope.adminSanat.pop();
            
        //jos viimeinen sana lisätään tyhjä rivi
        } else if (id === $scope.adminSanat.length) {
            var uusiSana = {id: $scope.adminSanat.length + 1 + "", hakusana: ''};
            $scope.adminSanat.push(uusiSana);
        }
    };

    $scope.sanaSelitys = function () {
        var tulos = $filter('filter')($scope.sanalista, $scope.adminSanat[0].hakusana, true);

        if (tulos.length === 1) {
              $scope.adminSelitys =  tulos[0].selitys;
        } else {
             $scope.adminSelitys = '';
        }
    };
    
    $scope.tyhjenna = function ()   {
        $scope.adminSanat = [{id: '1', hakusana: ''}];
        $scope.adminSelitys = '';
        $scope.tekijaInput = '';
    };
});
