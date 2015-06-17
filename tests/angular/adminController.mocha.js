'use strict';

describe('adminController: ', function () {
    var scope = null, routeParams = null, $q = null, mockService = null;

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function ($controller, $rootScope, _$q_, $routeParams) {
        scope = $rootScope.$new();
        $q = _$q_;
        routeParams = $routeParams;

        mockService = {};

        mockService.sanalista = function () {
            return init($q);
        };

        $controller('adminController', {
            $scope: scope,
            sanatService: mockService,
            $routeParams: routeParams
        });
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
        scope.$apply();
        scope.adminSanat[0].hakusana = 'koi';
        scope.sanaSelitys();
        expect(scope.adminSelitys).eql('');
    });

    it('kun haetaan sanalla \'koira\', selitys on \'haukkuu\'', function () {
        scope.$apply();
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
});



