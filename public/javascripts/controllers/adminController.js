sanakirjaApp.controller('adminController', function ($scope, sanakirjaAPIservice, $filter) {

    if (sessionStorage.getItem('sanalista') === null) {
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
        var tulos = $filter('filter')($scope.sanalista, $scope.adminSanahaku, true);

        if (tulos.length === 1) {
              $scope.adminSelitys =  tulos[0].selitys;
        } else {
             $scope.adminSelitys = '';
        }
    };
});



