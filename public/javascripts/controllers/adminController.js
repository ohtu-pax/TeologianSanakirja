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

        if (alkuperainenTekija === null) {
            this.alkuperainenTekija = null;
            if ($scope.sanalista && $scope.sanalista.tekijat) {
                this.nykyinenTekija = $scope.sanalista.tekijat[0];
            } else {
                this.nykyinenTekija = null;
            }
        } else {
            this.alkuperainenTekija = alkuperainenTekija;
            this.nykyinenTekija = alkuperainenTekija;
        }
        this.alkuperaisetHakusanat = [];
        this.nykyisetHakusanat = [];

        this.alkuperaisetLinkit = [];
        this.nykyisetLinkit = [];

        this.lisaaAlkuHakusana(new Muutettava(alkuHakusana));

        this.lisaaLinkki({linkkisana: '', hakusana: ''});
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

    Muutos.prototype.linkit = function () {
        return this.nykyisetLinkit;
    };

    Muutos.prototype.lisaaAlkuLinkki = function (val) {
        this.alkuperaisetLinkit.push(val);
        this.nykyisetLinkit.push(val);
    };

    Muutos.prototype.poistaLinkki = function (val) {
        var index = this.nykyisetLinkit.indexOf(val);
        this.nykyisetLinkit.splice(index, 1);
    };

    Muutos.prototype.lisaaLinkki = function (val) {
        this.nykyisetLinkit.push(val);
    };

    Muutos.prototype.katkaiseYhteys = function () {
        this.alkuperaisetLinkit = [];
        this.alkuperaisetHakusanat = [];
        this.alkuSelitys = null;
        this.alkuperainenTekija = null;
    };

    var muutos = null;

    function Muutettava(alkuperainen) {
        if (alkuperainen === null) {
            this.alkuperainen = null;
            this.muutettu = '';
        } else {
            this.alkuperainen = alkuperainen;
            this.muutettu = alkuperainen.hakusana;
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

    tyhjenna();

    sanatService.muokkaamatonSanalista().then(function (result) {
        $scope.sanalista = result;
        if (muutos !== null && muutos.nykyinenTekija === null) {
            muutos.nykyinenTekija = result.tekijat[0];
        }
    });

    $scope.hae = function () {
        var eka = $scope.haku;
        muutos.hakusanat()[0].muutettu = eka;

        var tulos = $filter('filter')($scope.sanalista.hakusanat, {hakusana: eka}, true);
        if (tulos.length > 0) {
            var selitys = $filter('filter')($scope.sanalista.selitykset, {id: tulos[0].selitys}, true)[0];

            var ekaHakusana = {};
            ekaHakusana.id = tulos[0].id;
            ekaHakusana.hakusana = tulos[0].hakusana;
            ekaHakusana.selitys = tulos[0].selitys;

            var tekija = $filter('filter')($scope.sanalista.tekijat, {id: selitys.tekija}, true)[0];

            muutos = new Muutos(selitys, tekija, ekaHakusana);

            var kaikkiHakusanat = $filter('filter')($scope.sanalista.hakusanat, {selitys: selitys.id}, true);
            for (var i = 0, max = kaikkiHakusanat.length; i < max; i++) {
                var curr = kaikkiHakusanat[i];
                if (curr.hakusana !== eka) {
                    muutos.lisaaAlkuHakusana(new Muutettava(curr));
                }
            }

            var linkitSelitykseen = $filter('filter')($scope.sanalista.linkit, {selitys: selitys.id}, true);
            for (var i = 0, max = linkitSelitykseen.length; i < max; i++) {
                var curr = linkitSelitykseen[i];

                var linkki = {};
                linkki.id = curr.id;
                linkki.linkkisana = curr.linkkisana;
                var kohde = $filter('filter')($scope.sanalista.hakusanat, {id: curr.hakusana}, true)[0];
                linkki.hakusana = kohde.hakusana;
                linkki.hakusanaID = kohde.id;

                muutos.lisaaAlkuLinkki(linkki);
            }

        } else {
            muutos.katkaiseYhteys();
        }
        tarkistaKenttienMaara();
        tarkistaLinkkienMaara();
    };

    $scope.tarkistaKenttienMaara = tarkistaKenttienMaara;

    function tarkistaKenttienMaara() {
        var hs = muutos.hakusanat();
        var poistettavat = [];
        for (var i = 0, max = hs.length - 1; i < max; i++) {
            var curr = hs[i];
            if (curr.hakusana() === '') {
                poistettavat.push(curr);
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

        if (hs.length === 1 || hs[hs.length - 1].hakusana() !== '') {
            muutos.lisaaHakusana(new Muutettava(null));
        }
    }

    $scope.tarkistaLinkkienMaara = tarkistaLinkkienMaara;

    function tarkistaLinkkienMaara() {
        var linkit = muutos.linkit();
        var poistettavat = [];
        for (var i = 0, max = linkit.length - 1; i < max; i++) {
            var curr = linkit[i];
            if (curr.linkkisana === '' && curr.hakusana === '') {
                poistettavat.push(curr);
            }
        }
        for (var i = 0, max = poistettavat.length; i < max; i++) {
            muutos.poistaLinkki(poistettavat[i]);
        }

        var vika = linkit[linkit.length - 1];
        if (vika.linkkisana !== '' || vika.hakusana !== '') {
            var linkki = {};
            linkki.linkkisana = '';
            linkki.hakusana = '';
            muutos.lisaaLinkki(linkki);
        }
    }

    function tyhjenna() {
        muutos = new Muutos(null, null, null);
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
        var tekijat = $filter('filter')($scope.sanalista.tekijat, {tekija: muutos.nykyinenTekija.nimi}, true);
        if (tekijat.length > 0) {
            console.log(muutos.nykyinenTekija.nimi + ' : ' + tekijat[0].id);
            tallenSelitys(tekijat[0].id);
        } else {
            console.log(muutos.nykyinenTekija.nimi);
            sanatService.lisaaTekija(muutos.nykyinenTekija.nimi).then(function (res) {
                console.log(res);
                tallenSelitys(parseInt(res, 10));
            });
        }

        function tallenSelitys(tekijaID) {
            console.log(tekijaID);
            sanatService.lisaaSelitys(muutos.uusiSelitys, tekijaID).then(function (id) {
                var hs = muutos.hakusanat();
                for (var i = 0, max = hs.length; i < max; i++) {
                    lisaaHakusana(id, hs[i]);
                }
                var linkit = muutos.linkit();
                for (var i = 0, max = linkit.length; i < max; i++) {
                    var curr = linkit[i];
                    var hakusana = $filter('filter')($scope.sanalista.hakusanat, {hakusana: curr.hakusana}, true)[0];
                    if (hakusana) {
                        var linkki = {linkkisana: curr.linkkisana, hakusanaID: hakusana.id};
                        lisaaLinkki(id, linkki);
                    }
                }
                sanatService.forceReload();
            });
        }
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

    function lisaaLinkki(selitysID, linkki) {
        sanatService.lisaaLinkki(selitysID, linkki.linkkisana, linkki.hakusanaID);
    }

    function poistaLinkki(linkkiID) {
        sanatService.poistaLinnki(linkkiID);
    }

    function paivitaLinkki(linkkiID, selitysID, linkkiSana, hakusanaID) {
        sanatService.muokkaaLinkki(linkkiID, hakusanaID, selitysID, linkkiSana);
    }

    function paivitaVanhaSelitys() {
        var selitysID = muutos.alkuSelitys.id;
        sanatService.muokkaaSelitys(selitysID, muutos.uusiSelitys, 1);
        var hs = muutos.hakusanat();

        var muutetut = {};
        var muutetutLinkit = {};

        lisaaUudetJaMuokatutHakusanat();
        poistaVanhatHakusanat();
        lisaaUudetLinkit();
        poistaVanhatLinkit();

        sanatService.forceReload();

        function lisaaUudetJaMuokatutHakusanat() {
            for (var i = 0, max = hs.length - 1; i < max; i++) {
                var curr = hs[i];
                var muutettu = curr.muutettuSana();

                if (muutettu === null) {
                    continue;
                }
                if (curr.onUusi()) {
                    lisaaHakusana(selitysID, curr);
                } else {
                    var id = curr.alkuperainen.id;
                    muutetut[id] = true;
                    paivitaHakusana(id, curr);
                }
            }
        }

        function poistaVanhatHakusanat() {
            var alku = muutos.alkuperaisetHakusanat;
            for (var i = 0, max = alku.length; i < max; i++) {
                var curr = alku[i];
                if (!muutetut[curr.alkuperainen.id] && !contains(curr)) {
                    poistaHakusana(curr.alkuperainen.id);
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

        function lisaaUudetLinkit() {
            var linkit = muutos.linkit();
            for (var i = 0, max = linkit.length; i < max; i++) {
                var curr = linkit[i];
                var linkkiOnUusi = curr.id === undefined;
                if (linkkiOnUusi) {
                    var hakusana = $filter('filter')($scope.sanalista.hakusanat, {hakusana: curr.hakusana}, true)[0];
                    if (hakusana) {
                        var linkki = {linkkisana: curr.linkkisana, hakusanaID: hakusana.id};
                        lisaaLinkki(selitysID, linkki);
                    }
                } else {
                    muutetutLinkit[curr.id] = true;
                    paivitaLinkki(curr.id, selitysID, curr.linkkisana, curr.hakusanaID);
                }
            }
        }

        function poistaVanhatLinkit() {
            var alkuLinkit = muutos.alkuperaisetLinkit;
            for (var i = 0, max = alkuLinkit.length; i < max; i++) {
                var curr = alkuLinkit[i];

                if (!containsLinkki(curr) && !muutetutLinkit(curr.id)) {
                    poistaLinkki(curr.id);
                }
            }
        }

        function containsLinkki(value) {
            var linkit = muutos.linkit();
            for (var i = 0, max = linkit.length - 1; i < max; i++) {
                if (linkit[i].linkkisana === value.linkkisana &&
                        linkit[i].hakusana === value.hakusana) {
                    return true;
                }
            }
            return false;
        }
    }
});
