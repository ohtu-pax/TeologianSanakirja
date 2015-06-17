
describe('adminController - sisaan kirjautunut kayttaja: ', function () {
    var controller, scope, routeParams, location;

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function ($controller, $rootScope, _$q_, $routeParams, $location) {
        scope = $rootScope.$new();
        $q = _$q_;
        routeParams = $routeParams;
        location = $location;

        mockService = {};

        scope.tila = {sisalla: true};

        mockService.getSanalista = function () {
            var defer = $q.defer();
            var sanalista = [{hakusana: 'koira', selitys: 'haukkuu'}];
            defer.resolve(sanalista);
            sessionStorage.setItem('sanalista', JSON.stringify(sanalista));
            return defer.promise;
        }

        controller = $controller('adminController', {
            $location: location,
            $scope: scope,
            sanakirjaAPIservice: mockService,
            $routeParams: routeParams
        });
    }));

    after(function () {
        sessionStorage.clear();
    });

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
        expect(scope.adminSelitys).eql('');
    });

    it('kun haetaan sanalla \'koira\', selitys on \'haukkuu\'', function () {
        scope.adminSanat[0].hakusana = 'koira';
        scope.sanaSelitys();
        expect(scope.adminSelitys).eql('haukkuu');
    });

    it('lomake tyhjenee kun kutsutaan tyhjenna funktiota', function () {
        scope.adminSanat[0].hakusana = 'koira';
        scope.tekijaInput = 'Seppo Teppo';
        scope.tyhjenna();
        expect(scope.adminSanat[0].hakusana).eql('');
        expect(scope.adminSelitys).eql('');
        expect(scope.tekijaInput).eql('');
    });

    it('kun ollaan kirjauduttu sisään ja osoiteriville kirjoitetaan /admin, näytetään admin-template', function () {
        expect(location.url()).to.eql('/admin');
    });

});

describe('adminController - kirjautumaton kayttaja: ', function () {
    var controller, scope, routeParams, location;

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function ($controller, $rootScope, _$q_, $routeParams, $location) {
        scope = $rootScope.$new();
        $q = _$q_;
        routeParams = $routeParams;
        location = $location;

        mockService = {};

        scope.tila = {sisalla: false};

        mockService.getSanalista = function () {
            var defer = $q.defer();
            var sanalista = [{hakusana: 'koira', selitys: 'haukkuu'}];
            defer.resolve(sanalista);
            sessionStorage.setItem('sanalista', JSON.stringify(sanalista));
            return defer.promise;
        }

        controller = $controller('adminController', {
            $location: location,
            $scope: scope,
            sanakirjaAPIservice: mockService,
            $routeParams: routeParams
        });
    }));

    after(function () {
        sessionStorage.clear();
    });

    it('kun osoiteriville kirjoitetaan /admin, ohjataan etusivulle', function () {
        expect(location.url()).to.eql('/');
    });
});


