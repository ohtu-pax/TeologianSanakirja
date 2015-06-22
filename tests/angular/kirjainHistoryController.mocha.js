describe('kirjainHistoryController: ', function () {
    var controller, scope;

    beforeEach(function () {
        module('sanakirjaApp');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('kirjainHistoryController', {
                $scope: scope
            });
        });
    });
    
    after(function() {
        sessionStorage.removeItem('historia');
    });

    it('tallentaa yhden sanan historiaan ', function () {
        scope.kirjainHakuKentta = 'koira';
        scope.$apply();

        expect(JSON.parse(sessionStorage.getItem('historia'))).to.deep.equal(["koira"]);
    });

    it('tallentaa kolme peräkkäistä hakusanaa historiaan', function () {
        scope.kirjainHakuKentta = 'kissa';
        scope.$apply();

        scope.kirjainHakuKentta = 'lehmä';
        scope.$apply();

        expect(JSON.parse(sessionStorage.getItem('historia'))).to.deep.equal(["koira", "kissa", "lehmä"]);
    });
});
