describe('historyController: ', function () {
    var controller, scope;

    beforeEach(function () {
        module('sanakirjaApp');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('historyController', {
                $scope: scope
            });
        });
    });

    it('tallentaa yhden sanan historiaan ', function () {
        scope.hakuKentta = 'koira';
        scope.$apply();

        expect(JSON.parse(sessionStorage.getItem('historia'))).to.deep.equal(["koira"]);
    });

    it('tallentaa kolme peräkkäistä hakusanaa historiaan', function () {
        scope.hakuKentta = 'kissa';
        scope.$apply();

        scope.hakuKentta = 'lehmä';
        scope.$apply();

        expect(JSON.parse(sessionStorage.getItem('historia'))).to.deep.equal(["koira", "kissa", "lehmä"]);
    });

    it('asettaa scope.historia-kentän arvoksi historian nurinpäin', function () {  
        expect(scope.historia).to.deep.equal(["lehmä", "kissa", "koira"]);
    });
});

