describe('hakuKenttaController: ', function () {
    var controller, scope, location;

    beforeEach(function () {
        module('sanakirjaApp');

        inject(function ($controller, $rootScope, $location) {
            location = $location,
                    scope = $rootScope.$new();
            controller = $controller('hakuKenttaController', {
                $scope: scope,
                location: location,
                $routeParams: {sana: 'kissa'}
            });
        });

        var sanat = [{hakusana: 'lammas', selitys: 'lihoo'}];
        sessionStorage.setItem('sanalista', JSON.stringify(sanat));

    });

    after(function () {
        sessionStorage.clear();
    });

    it('tyhjentaa hakukentan kun painetaan tyhjenna hakukentta painiketta', function () {

        scope.hakuKentta = "aamen";
        scope.tyhjennahaku();
        expect(scope.hakuKentta).to.eql("");
    });

    it('asettaa sanan hakukenttaan', function () {
        expect(scope.hakuKentta).to.eql("kissa");
    });

    it('lisää sanat-urliin satunnaisen sanan', function () {
        scope.getRandom();
        scope.$apply();
        console.log("URL " + location.url());
        expect(location.url()).to.eql('/sanat/lammas');
    });
});