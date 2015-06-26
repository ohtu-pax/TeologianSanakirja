'use strict';

describe('adminController - sisaan kirjautunut kayttaja: ', function () {

    var scope = null, routeParams = null, $q = null, mockService = null, location = null;

    var lisatytHakusanat = [];
    var muokatutHakusanat = [];
    var muokatutSelitykset = [];
    var lisatytSelitykset = [];

    var uusiID = 436345;

    var TEST_HAKUSANA = 'koira';
    var TEST_HAKUSANA_2 = 'dog';
    var TEST_SELITYS = 'haukkuu';
    var SELITYS_ID = 445;

    var poistettuID = 0;

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function ($controller, $rootScope, _$q_, $routeParams, $location) {
        scope = $rootScope.$new();
        $q = _$q_;
        routeParams = $routeParams;
        location = $location;

        lisatytHakusanat = [];
        muokatutHakusanat = [];
        lisatytSelitykset = [];
        muokatutSelitykset = [];
        poistettuID = 0;

        mockService = {};
        scope.tila = {sisalla: true};

        mockService.muokkaamatonSanalista = function () {
            var defer = $q.defer();
            var res = {};
            res.hakusanat = [
                {id: 1, hakusana: 'test', selitys: 545},
                {id: 234, hakusana: TEST_HAKUSANA, selitys: SELITYS_ID},
                {id: 543, hakusana: TEST_HAKUSANA_2, selitys: SELITYS_ID}
            ];
            res.selitykset = [
                {id: 545, selitys: 'testataan kaikkea', tekija: 2354},
                {id: SELITYS_ID, selitys: TEST_SELITYS, tekija: 343}
            ];
            defer.resolve(res);
            return defer.promise;
        };

        mockService.lisaaHakusana = function (hakusana, selitys) {
            lisatytHakusanat.push({hakusana: hakusana, selitys: selitys});
        };

        mockService.muokkaaHakusana = function (id, hakusana) {
            muokatutHakusanat.push({id: id, hakusana: hakusana});
        };

        mockService.muokkaaSelitys = function (id, selitys, tekija) {
            muokatutSelitykset.push({id: id, selitys: selitys, tekija: tekija});
        };

        mockService.lisaaSelitys = function (selitys, tekija) {
            var defer = $q.defer();
            lisatytSelitykset.push({selitys: selitys, tekija: tekija});
            defer.resolve(uusiID);
            return defer.promise;
        };

        mockService.poistaSelitys = function (id) {
            poistettuID = id;
        };


        $controller('adminController', {
            $location: location,
            $scope: scope,
            sanatService: mockService,
            $routeParams: routeParams
        });

        scope.$apply();
    }));

    it('kun kirjoitetaan viimeiseen kenttään, lisätään uusi kenttä', function () {
        scope.hallinnoiRiveja(1);
        expect(scope.adminSanat.length).eql(2);
    });

    it('kun tyhjennetään toiseksi viimeinen kenttä, poistetaan viimeinen tyhjä rivi', function () {
        //muutos ekassa rivissä, lisätään tyhjä rivi
        scope.hallinnoiRiveja(1);
        //muutos ekassa rivissä, kaksi tyhjää riviä peräkkäin
        scope.hallinnoiRiveja(1);
        expect(scope.adminSanat.length).eql(1);
    });

    it('kun haetaan sanalla \'koi\', selitys on tyhjä', function () {
        scope.adminSanat[0].hakusana = 'koi';
        scope.sanaSelitys();
        expect(scope.adminSelitys).to.be.null;
    });

    it('kun haetaan sanalla \'koira\', selitys on \'haukkuu\'', function () {
        scope.adminSanat[0].hakusana = 'koira';
        scope.sanaSelitys();
        expect(scope.adminSelitys.selitys).eql('haukkuu');
    });

    it('lomake tyhjenee kun kutsutaan tyhjenna funktiota', function () {
        scope.adminSanat[0].hakusana = 'koira';
        scope.tekijaInput = 'Seppo Teppo';
        scope.tyhjenna();
        expect(scope.adminSanat[0].hakusana).eql('');
        expect(scope.adminSelitys.selitys).eql('');
        expect(scope.tekijaInput).eql('');
    });

    it('kun ollaan kirjauduttu sisään ja osoiteriville kirjoitetaan /admin, näytetään admin-template', function () {
        expect(location.url()).to.eql('/admin');
    });

    it('Hakusana merkitään vanhaksi, jos se on vanha', function () {
        scope.adminSanat[0] = {hakusana: 'koira', uusiSana: true};
        scope.sanaSelitys();
        expect(scope.adminSanat[0].uusiSana).to.be.false;
    });

    it('Hakusanaa ei merkitä vanhaksi, jos se on uusi', function () {
        scope.adminSanat[0] = {hakusana: 'asdddddd', uusiSana: true};
        scope.sanaSelitys();
        expect(scope.adminSanat[0].uusiSana).to.be.true;
    });

    it('Selitys on null, jos hakusana on uusi', function () {
        scope.adminSanat[0] = {hakusana: 'asdddddd', uusiSana: true};
        scope.sanaSelitys();
        expect(scope.adminSelitys).to.be.null;
    });

    it('Täysin uusi selitys lisätään', function () {
        var hsana = 'kissa';
        var selitys = 'Haluaa maitoa';
        var tekija = '!!="¤##"¤#"¤#"%¤#"%RE';

        scope.adminSanat[0] = {hakusana: hsana, uusiSana: true};
        scope.sanaSelitys();
        scope.tekijaInput = tekija;
        scope.adminSelitys = {selitys: selitys};
        scope.tallennaSelitys();

        scope.$apply();

        var uusiHakusana = lisatytHakusanat[0];
        var uusiSelitys = lisatytSelitykset[0];

        expect(muokatutSelitykset.length).eql(0);
        expect(muokatutHakusanat.length).eql(0);
        expect(lisatytHakusanat.length).eql(1);
        expect(lisatytSelitykset.length).eql(1);

        expect(uusiHakusana.hakusana).eql(hsana);
        expect(uusiHakusana.selitys).eql(uusiID);

        expect(uusiSelitys.selitys).eql(selitys);
        expect(uusiSelitys.tekija).eql(1);//tekija
    });


    it('Olemassa olevaa hakusanaa ja selitystä muokataan', function () {
        var tekija = '!!="¤##"¤#"¤#"%¤#"%RE';
        var expectedSelitys = TEST_SELITYS + 'muokattuaaa';
        var expectedHakusana = TEST_HAKUSANA + 'äådsa';

        scope.adminSanat[0] = {hakusana: TEST_HAKUSANA, uusiSana: false};
        scope.sanaSelitys();
        scope.tekijaInput = tekija;
        scope.adminSelitys.selitys = expectedSelitys;
        scope.adminSanat[0].hakusana = expectedHakusana;
        scope.tallennaSelitys();

        scope.$apply();

        var muokattuHakusana = muokatutHakusanat[0];
        var muokattuSelitys = muokatutSelitykset[0];

        expect(lisatytHakusanat.length).eql(0);
        expect(lisatytSelitykset.length).eql(0);
        expect(muokatutHakusanat.length).eql(1);
        expect(muokatutSelitykset.length).eql(1);

        expect(muokattuHakusana.hakusana).eql(expectedHakusana);
        expect(muokattuSelitys.selitys).eql(expectedSelitys);
    });


    it('Olemassa olevaa hakusanaa ja selitystä muokataan, uudet hakusanat lisätään', function () {
        var tekija = '!!="¤##"¤#"¤#"%¤#"%RE';
        var expectedSelitys = TEST_SELITYS + 'muokattuaaa';
        var expectedHakusana = TEST_HAKUSANA + 'äådsa';
        var expectedUusiHakusana1 = 'Uusi hakusana';
        var expectedUusiHakusana2 = 'Uusi hakusana2';

        scope.adminSanat[0] = {hakusana: TEST_HAKUSANA, uusiSana: false};
        scope.sanaSelitys();
        scope.tekijaInput = tekija;
        scope.adminSelitys.selitys = expectedSelitys;
        scope.adminSanat[0].hakusana = expectedHakusana;
        scope.adminSanat[1] = {hakusana: expectedUusiHakusana1, uusiSana: true};
        scope.adminSanat[2] = {hakusana: expectedUusiHakusana2, uusiSana: true};
        scope.tallennaSelitys();

        scope.$apply();

        var muokattuHakusana = muokatutHakusanat[0];
        var muokattuSelitys = muokatutSelitykset[0];

        expect(lisatytHakusanat.length).eql(2);
        expect(lisatytSelitykset.length).eql(0);
        expect(muokatutHakusanat.length).eql(1);
        expect(muokatutSelitykset.length).eql(1);

        expect(lisatytHakusanat[0].hakusana).eql(expectedUusiHakusana1);
        expect(lisatytHakusanat[1].hakusana).eql(expectedUusiHakusana2);
        expect(muokattuHakusana.hakusana).eql(expectedHakusana);
        expect(muokattuSelitys.selitys).eql(expectedSelitys);
    });

    it('Olemassa oleva selitys poistetaan', function () {
        scope.adminSanat[0] = {hakusana: TEST_HAKUSANA, uusiSana: false};
        scope.sanaSelitys();
        scope.poistaSelitys();

        expect(poistettuID).to.eql(SELITYS_ID);
    });
});

describe('adminController - kirjautumaton kayttaja: ', function () {

    var location = null;

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function ($controller, $rootScope, $location) {
        var scope = $rootScope.$new();
        location = $location;

        scope.tila = {sisalla: false};

        $controller('adminController', {
            $location: location,
            $scope: scope
        });
    }));

    it('kun osoiteriville kirjoitetaan /admin, ohjataan etusivulle', function () {
        expect(location.url()).to.eql('/');
    });
});
