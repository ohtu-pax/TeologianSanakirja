'use strict';

describe('GetController: ', function () {
    var controller, scope, routeParams, $q, mockService;

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function ($controller, $rootScope, _$q_, $routeParams) {
        scope = $rootScope.$new();
        $q = _$q_;
        routeParams = $routeParams;

        mockService = {};

        mockService.getSanalista = function () {
            var defer = $q.defer();
            var sanalista = [{hakusana: 'koira', selitys: 'haukkuu'}];
            defer.resolve(sanalista);
            sessionStorage.setItem('sanalista', JSON.stringify(sanalista));
            return defer.promise;
        }

        controller = $controller('getController', {
            $scope: scope,
            sanakirjaAPIservice: mockService,
            $routeParams: routeParams
        });
    }));

    after(function () {
        sessionStorage.clear();
    });

    it('should put sanalista into scope.sanalista', function () {
        scope.$apply();
        expect(scope.sanalista[0].hakusana).eql("koira");
        expect(scope.sanalista[0].selitys).eql("haukkuu");
    });

    it('should find k When routeParams is K and hakusana is Koira', function () {
        routeParams.kirjain = "K";
        scope.$apply();
        expect(scope.kirjainFilter(scope.sanalista[0])).valueOf().contains("k");
        expect(scope.kirjainFilter(scope.sanalista[0])).not.eql(null);
    });

    it('it should return null when routeParams is not K', function () {
        routeParams.kirjain = "A";
        scope.$apply();
        expect(scope.kirjainFilter(scope.sanalista[0])).eql(null);
    });


});
