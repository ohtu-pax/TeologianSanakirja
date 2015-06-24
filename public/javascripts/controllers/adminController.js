'use strict';

sanakirjaApp.controller('adminController', function ($scope, sanatService, $filter, $location) {

    if ($scope.tila.sisalla) {
        $location.path('/admin');
    }
    else {
        $location.path('/');
        return;
    }

    var oikeaSelitys = null;

    sanatService.muokkaamatonSanalista().then(function (result) {
        $scope.sanalista = result;
    });

    $scope.adminSanat = [{id: '1', hakusana: '', uusiSana: true}];

    $scope.hallinnoiRiveja = function (id) {
        //jos toiseksi viimeinen ja se on tyhjä ja sitä seuraava tyhjä, poistetaan vika tyhä
        if (id === $scope.adminSanat.length - 1 && $scope.adminSanat[id - 1].hakusana === '' && $scope.adminSanat[id].hakusana === '') {
            $scope.adminSanat.pop();

            //jos viimeinen sana lisätään tyhjä rivi
        } else if (id === $scope.adminSanat.length) {
            var uusiSana = {id: $scope.adminSanat.length + 1 + "", hakusana: '', uusiSana: true};
            $scope.adminSanat.push(uusiSana);
        }
    };

    /*function valittuSelitys() {
     var hakusana = $filter('filter')($scope.sanalista.hakusanat, $scope.adminSanat[0].hakusana, true);
     return $filter('filter')($scope.sanalista.selitykset, {id: hakusana[0].selitys}, true);
     }*/

    $scope.sanaSelitys = function () {
        var ensimmainen = $scope.adminSanat[0];
        var tulos = $filter('filter')($scope.sanalista.hakusanat, ensimmainen.hakusana, true);
        if (tulos.length === 1) {
            var selitys = $filter('filter')($scope.sanalista.selitykset, {id: tulos[0].selitys}, true);
            ensimmainen.uusiSana = false;
            oikeaSelitys = selitys[0];
            $scope.adminSelitys = {id: oikeaSelitys.id, selitys: oikeaSelitys.selitys, tekija: oikeaSelitys.tekija};
        } else {
            ensimmainen.uusiSana = true;
            $scope.adminSelitys = null;
            oikeaSelitys = null;
        }
    };

    $scope.tyhjenna = function () {
        $scope.adminSanat = [{id: '1', hakusana: ''}];
        $scope.adminSelitys = {selitys: ''};
        $scope.tekijaInput = '';
        oikeaSelitys = null;
    };

    $scope.tallennaSelitys = function () {
        var tekija = $scope.tekijaInput;
        var selitys = $scope.adminSelitys;
        if (!selitys || !selitys.selitys || !tekija) {
            console.log('epäkelpo');
            return;
        }


        var id = $scope.adminSelitys.id;
        var sanaOnUusi = id === undefined;

        if (sanaOnUusi === true) {
            console.log('uusi');
            luoUusi(selitys.selitys, tekija);
        } else {
            console.log('vanha');
            paivita($scope.adminSelitys, selitys.selitys, tekija);
        }
    };

    function luoUusi(selitys, tekija) {
        //tekija
        sanatService.lisaaSelitys(selitys, 1).then(function (id) {
            tallennaHakusanat(id, 0);
        });
    }

    function tallennaHakusanat(id, i) {
        var hakusanat = $scope.adminSanat;
        for (var max = hakusanat.length; i < max; i++) {
            var curr = hakusanat[i].hakusana.trim();
            if (curr.length > 2) {
                sanatService.lisaaHakusana(curr, id);
            }
        }
    }

    function paivita(selitysAlkuperainen, selitys, tekija) {
        var vanhaSelitys = oikeaSelitys.selitys;
        var uusiSelitys = selitys.trim();

        if (uusiSelitys !== vanhaSelitys) {
            sanatService.muokkaaSelitys(oikeaSelitys.id, uusiSelitys, 1);
        }

        paivitaHakusana($scope.adminSanat[0]);
        tallennaHakusanat(selitysAlkuperainen.id, 1);
    }

    function paivitaHakusana(hakusana) {
        var alkuperainenHakusana = $filter('filter')($scope.sanalista.hakusanat, {hakusana: hakusana.hakusana}, true);
        var uusi = hakusana.hakusana.trim();
        if (alkuperainenHakusana.hakusana !== uusi) {
            sanatService.muokkaaHakusana(alkuperainenHakusana.id, uusi);
        }
    }

    $scope.poistaSelitys = function () {
        sanatService.poistaSelitys($scope.adminSelitys.id);
        $location.path('/admin');
    };
});
