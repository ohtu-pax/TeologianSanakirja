
describe('getOneWordController: ', function () {
    var $controller, scope, mockService;

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function (_$controller_, $rootScope, _$q_) {
        scope = $rootScope.$new(),
                $q = _$q_,
                $controller = _$controller_,
                mockService = {};

        mockService.getSanalista = function () {
            var defer = $q.defer();
            var sanalista = [{hakusana: 'koira', selitys: 'haukkuu'}, {hakusana: 'kissa', selitys: 'maukuu'}];
            defer.resolve(sanalista);
            sessionStorage.setItem('sanalista', JSON.stringify(sanalista));
            return defer.promise;
        }
    }));

    after(function () {
        sessionStorage.clear();
    });
    
    describe('with an existing word', function () {

        beforeEach(function () {
            $controller('getOneWordController', {
                $scope: scope,
                $routeParams: {sana: 'kissa'},
                sanakirjaAPIservice: mockService
            });
        });

        it('should find the word from sanalista', function () {
            scope.$apply();

            expect(scope.sana).eql("kissa");
            expect(scope.selitys).eql("maukuu");
        });
    });

    describe('with a non-existing word', function () {

        beforeEach(function () {
            $controller('getOneWordController', {
                $scope: scope,
                $routeParams: {sana: 'laiva'},
                sanakirjaAPIservice: mockService
            });
        });

        it('should leave the fields undefined', function () {
            scope.$apply();

            expect(scope.sana).eql(undefined);
            expect(scope.selitys).eql(undefined);
        });
    });
});