'use strict';

describe('loggedInController: ', function () {
    
    beforeEach(module('sanakirjaApp'));

    var rootscope = null;
    var localScope = null;

    function initialize(isLoggedIn) {
        inject(function (_$controller_, $rootScope, _$q_) {
            rootscope = $rootScope;
            var api = {};
            localScope = {};
            var loggednInf = function () {
                var defer = _$q_.defer();
                defer.resolve(isLoggedIn ? '1' : '0');
                return defer.promise;
            };
            api.isLoggedIn = loggednInf;
            _$controller_('hakuKenttaController', {
                $scope: localScope,
                sanakirjaAPIservice: api
            });
        });
    }

    it('asettaa tilan näkymättömäksi, kun ei olla kirjauduttu', function () {
        initialize(false);
        rootscope.$apply();
        assert.isFalse(localScope.tila.sisalla);
    });

    it('asettaa tilan näkyväksi, kun ollaan kirjauduttu', function () {
        initialize(true);
        rootscope.$apply();
        assert.isTrue(localScope.tila.sisalla);
    });
});
