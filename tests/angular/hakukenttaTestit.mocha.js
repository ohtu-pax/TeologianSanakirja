'use strict';

describe('hakuKenttaController: ', function () {

    var scope = null, location = null;

    beforeEach(function () {
        module('sanakirjaApp');

        inject(function ($controller, $rootScope, $location, _$q_) {
            location = $location;
            scope = $rootScope.$new();
            var sanatMock = {};
            sanatMock.sanalista = function () {
                return init(_$q_);
            };
            var api = {};
            api.isLoggedIn = function () {
                var defer = _$q_.defer();
                defer.resolve('0');
                return defer.promise;
            };


            api.getSanalista = function () {
                return _$q_.defer().promise;
            };

            $controller('hakuKenttaController', {
                $scope: scope,
                location: location,
                $routeParams: {sana: 'kissa'},
                sanatService: sanatMock,
                sanakirjaAPIservice: api
            });
        });
    });

    it('tyhjentaa hakukentan kun painetaan tyhjenna hakukentta painiketta', function () {

        scope.hakuKentta.sana = "aamen";
        scope.tyhjennahaku();
        expect(scope.hakuKentta.sana).to.eql("");
    });

    it('asettaa sanan hakukenttaan', function () {
        expect(scope.hakuKentta.sana).to.eql("kissa");
    });

    it('lisää sanat-urliin satunnaisen sanan', function () {
        scope.getRandom();
        scope.$apply();
        expect(location.url()).to.eql('/sanat/koira');
    });
});
