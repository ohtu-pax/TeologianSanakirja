'use strict';

describe('loginController: ', function () {
    
    beforeEach(module('sanakirjaApp'));

    var rootScope = null;
    var scope = null;
    var location = null;

    var TEST_KAYTTAJA_NIMI = 'admin';
    var TEST_SALASANA = 'admin';

    beforeEach(inject(function (_$controller_, $rootScope, _$q_) {
        var $controller = _$controller_;
        rootScope = $rootScope;
        var $q = _$q_;

        scope = {};

        var api = {};
        api.login = function (name, password) {
            var defer = $q.defer();
            if (name === TEST_KAYTTAJA_NIMI && password === TEST_SALASANA) {
                defer.resolve('1');
            } else {
                defer.reject('0');
            }
            return defer.promise;
        };

        location = {};
        location.path = function (val) {
            location.redirect = val;
        };

        $controller('loginController', {$scope: scope, sanakirjaAPIservice: api, $location: location});
    }));

    function testWithValues(name, password, expected) {
        scope.name = name;
        scope.password = password;
        scope.login();

        rootScope.$digest();

        assert.strictEqual(location.redirect, expected);
    }

    it('Uudelleen ohjaa kun kirjaudutaan ', function () {
        testWithValues(TEST_KAYTTAJA_NIMI, TEST_SALASANA, '/');
    });

    it('Ei uudelleen ohjata kun epäonnistutaan ', function () {
        testWithValues('dasdsa', 'asadewedmin', undefined);
    });
});
