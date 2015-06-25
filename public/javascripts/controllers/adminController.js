'use strict';

sanakirjaApp.controller('adminController', function ($scope, sanatService, $filter, $location) {

    if ($scope.tila.sisalla) {
        $location.path('/admin');
    }
    else {
        $location.path('/');
        return;
    }

    $scope.muutos = function () {
        return muutos;
    };

    function Muutos(alkuSelitys, alkuperainenTekija, alkuHakusana) {

        if (alkuSelitys === null) {
            this.uusiSelitys = '';
            this.alkuSelitys = null;
        } else {
            this.alkuSelitys = alkuSelitys;
            this.uusiSelitys = alkuSelitys.selitys;
        }

        this.alkuperainenTekija = alkuperainenTekija;
        this.alkuperaisetHakusanat = [];
        this.nykyisetHakusanat = [];

        //this.alkuperaisetLinkit = [];

        this.lisaaAlkuHakusana(new Muutettava(0, alkuHakusana));
    }

    Muutos.prototype.lisaaAlkuHakusana = function (val) {
        this.alkuperaisetHakusanat.push(val);
        this.nykyisetHakusanat.push(val);
    };

    Muutos.prototype.lisaaHakusana = function (val) {
        this.nykyisetHakusanat.push(val);
    };

    Muutos.prototype.hakusanat = function () {
        return this.nykyisetHakusanat;
    };

    Muutos.prototype.onUusi = function () {
        return this.alkuSelitys === null;
    };

    Muutos.prototype.poistaHakusana = function (val) {
        var index = this.nykyisetHakusanat.indexOf(val);
        this.nykyisetHakusanat.splice(index, 1);
    };

    var muutos = null;

    function Muutettava(paikka, alkuperainen) {
        this.paikka = paikka;

        if (alkuperainen === null) {
            this.alkuperainen = null;
            this.muutettu = '';
        } else {
            this.alkuperainen = alkuperainen;
            this.muutettu = alkuperainen.hakusana;
            if (this.muutettu === undefined) {
                console.error('UNDEF ' + String(alkuperainen));
                console.dir(alkuperainen);
            }
        }
    }

    Muutettava.prototype.poistaAlkuperainen = function () {
        this.alkuperainen = null;
    };

    Muutettava.prototype.hakusana = function () {
        return this.muutettu;
    };

    Muutettava.prototype.onUusi = function () {
        return this.alkuperainen === null;
    };

    Muutettava.prototype.muutettuSana = function () {
        var trimmed = this.muutettu.trim();
        if (trimmed.length === 0) {
            return null;
        }
        return trimmed;
    };

    sanatService.muokkaamatonSanalista().then(function (result) {
        $scope.sanalista = result;
    });

    tyhjenna();

    $scope.hae = function () {
        var eka = $scope.haku;
        muutos.hakusanat()[0].muutettu = eka;

        var tulos = $filter('filter')($scope.sanalista.hakusanat, {hakusana: eka}, true);
        if (tulos.length === 1) {
            var selitys = $filter('filter')($scope.sanalista.selitykset, {id: tulos[0].selitys}, true)[0];

            var ekaHakusana = {};
            ekaHakusana.id = tulos[0].id;
            ekaHakusana.hakusana = tulos[0].hakusana;
            ekaHakusana.selitys = tulos[0].selitys;

            muutos = new Muutos(selitys, null, ekaHakusana);

            var kaikkiHakusanat = $filter('filter')($scope.sanalista.hakusanat, {selitys: selitys.id}, true);
            for (var i = 0, max = kaikkiHakusanat.length; i < max; i++) {
                var curr = kaikkiHakusanat[i];
                if (curr.hakusana !== eka) {
                    muutos.lisaaAlkuHakusana(new Muutettava(1 + i, curr));
                }
            }
        } else if (muutos.hakusanat().length > 0 && eka.length > 0) {
            muutos.hakusanat()[0].poistaAlkuperainen();
        }
        tarkistaKenttienMaara();
    };

    $scope.tarkistaKenttienMaara = tarkistaKenttienMaara;

    function tarkistaKenttienMaara() {
        var hs = muutos.hakusanat();
        var poistettavat = [];
        for (var i = 0, max = hs.length - 1; i < max; i++) {
            var curr = hs[i];
            if (curr.hakusana() === '') {
                poistettavat.push(curr);
                console.log('poistetaan ' + i + ' ' + curr.hakusana());
            } else {
                console.log('ei poisteta ' + curr.hakusana());
            }
            if (i === 0) {
                $scope.haku;
            }
        }
        for (var i = 0, max = poistettavat.length; i < max; i++) {
            muutos.poistaHakusana(poistettavat[i]);
        }
        hs = muutos.hakusanat();
        var ekaSana = hs[0].hakusana();
        if (ekaSana !== $scope.haku) {
            $scope.haku = ekaSana;
        }

        if (hs.length === 0) {
            return;
        }

        var l = hs.length - 1;
        if (hs.length === 1 || hs[l].hakusana() !== '') {
            console.log('Uusi hakusana');
            muutos.lisaaHakusana(new Muutettava(-1, null));
        }
    }

    function tyhjenna() {
        muutos = new Muutos(null, '', null);
        $scope.haku = '';
    }

    $scope.tyhjenna = tyhjenna;

    $scope.poistaSelitys = function () {
        if (muutos.alkuSelitys !== null) {
            sanatService.poistaSelitys(muutos.alkuSelitys.id);
        }
        tyhjenna();
        $location.path('/admin');
    };

    $scope.tallennaSelitys = function () {
        if (muutos.onUusi()) {
            tallennaUusiSelitys();
        } else {
            paivitaVanhaSelitys();
        }
    };

    function tallennaUusiSelitys() {
        sanatService.lisaaSelitys(muutos.uusiSelitys, 1).then(function (id) {
            var hs = muutos.hakusanat();
            for (var i = 0, max = hs.length; i < max; i++) {
                lisaaHakusana(id, hs[i]);
            }
        });
    }

    function paivitaHakusana(hakusanaID, hakusana) {
        var muutettu = hakusana.muutettuSana();
        if (muutettu !== null) {
            sanatService.muokkaaHakusana(hakusanaID, muutettu);
        }
    }

    function lisaaHakusana(selitysID, hakusana) {
        var muutettu = hakusana.muutettuSana();
        if (muutettu !== null) {
            sanatService.lisaaHakusana(muutettu, selitysID);
        }
    }

    function poistaHakusana(hakusanaID) {
        sanatService.poistaHakusana(hakusanaID);
    }

    function paivitaVanhaSelitys() {
        var selitysID = muutos.alkuSelitys.id;
        sanatService.muokkaaSelitys(selitysID, muutos.uusiSelitys, 1);
        var hs = muutos.hakusanat();

        var muutetut = {};

        lisaaUudetJaMuokatutHakusanat();
        poistaVanhatHakusanat();

        function lisaaUudetJaMuokatutHakusanat() {
            for (var i = 0, max = hs.length - 1; i < max; i++) {
                var curr = hs[i];
                var muutettu = curr.muutettuSana();

                if (muutettu === null) {
                    continue;
                }
                if (!curr.onUusi()) {
                    muutetut[curr.alkuperainen.id] = true;
                }
                if (curr.onUusi()) {
                    lisaaHakusana(selitysID, curr);
                } else {
                    paivitaHakusana(curr.alkuperainen.id, curr);
                }
            }
        }

        function poistaVanhatHakusanat() {
            var alku = muutos.alkuperaisetHakusanat;
            for (var i = 0, max = alku.length; i < max; i++) {
                var curr = alku[i];
                if (!muutetut[curr.alkuperainen.id] && !contains(curr)) {
                    console.log('pois ' + curr.hakusana());
                    poistaHakusana(curr.alkuperainen.id);
                } else {
                    console.log(!muutetut[curr.alkuperainen.id]);
                    console.log(!contains(curr));
                    console.log(!contains(curr) && !muutetut[curr.alkuperainen.id]);
                }
            }
        }

        function contains(value) {
            for (var i = 0, max = hs.length - 1; i < max; i++) {
                if (hs[i].hakusana() === value.hakusana()) {
                    return true;
                }
            }
            return false;
        }
    }
});
