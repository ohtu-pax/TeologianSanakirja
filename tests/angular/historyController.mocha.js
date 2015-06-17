'use strict';

describe('historyController: ', function () {
    var scope = null;

    beforeEach(function () {
        module('sanakirjaApp');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            $controller('historyController', {
                $scope: scope
            });
        });
    });

    afterEach(function () {
        sessionStorage.clear();
    });

    it('tallentaa yhden sanan historiaan ', function () {
        scope.hakuKentta = 'koira';
        scope.$apply();

        expect(JSON.parse(sessionStorage.getItem('historia'))).to.deep.equal(["koira"]);
    });

    it('tallentaa kolme peräkkäistä hakusanaa historiaan', function () {
        scope.hakuKentta = 'koira';
        scope.$apply();

        scope.hakuKentta = 'kissa';
        scope.$apply();

        scope.hakuKentta = 'lehmä';
        scope.$apply();

        expect(JSON.parse(sessionStorage.getItem('historia'))).to.deep.equal(["koira", "kissa", "lehmä"]);
    });

    it('asettaa scope.historia-kentän arvoksi historian nurinpäin', function () {
        scope.hakuKentta = 'koira';
        scope.$apply();

        scope.hakuKentta = 'kissa';
        scope.$apply();

        scope.hakuKentta = 'lehmä';
        scope.$apply();

        expect(scope.historia()).to.deep.equal(["lehmä", "kissa", "koira"]);
    });
});

