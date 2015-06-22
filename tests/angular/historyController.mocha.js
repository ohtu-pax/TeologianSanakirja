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

        if (scope.hakuKentta === undefined) {
            scope.hakuKentta = {};
        }
    });
    
    after(function() {
        sessionStorage.removeItem('historia');
    });

    it('tallentaa yhden sanan historiaan ', function () {
        scope.hakuKentta.sana = 'koira';
        scope.$apply();

        expect(JSON.parse(sessionStorage.getItem('historia'))).to.deep.equal(["koira"]);
    });

    it('tallentaa kolme peräkkäistä hakusanaa historiaan', function () {
        scope.hakuKentta.sana = 'kissa';
        scope.$apply();

        scope.hakuKentta.sana = 'lehmä';
        scope.$apply();

        expect(JSON.parse(sessionStorage.getItem('historia'))).to.deep.equal(["koira", "kissa", "lehmä"]);
    });
});
