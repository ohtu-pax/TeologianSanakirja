'use strict';

describe('GetController: ', function () {
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

        $controller('getController', {
            $scope: scope,
            sanatService: mockService,
            $routeParams: routeParams
        });
    }));

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
