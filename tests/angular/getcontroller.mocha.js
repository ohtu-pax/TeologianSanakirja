
describe('GetController: ', function () {
    var controller, scope;

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function ($controller, $rootScope, _$q_) {
        scope = $rootScope.$new();
        $q = _$q_;

        mockService = {};

        mockService.getSanalista = function () {
            var defer = $q.defer();
            var sanalista = [{hakusana: 'koira', selitys: 'haukkuu'}]; 
            defer.resolve(sanalista);
            sessionStorage.setItem('sanalista', JSON.stringify(sanalista));
            return defer.promise;
        }

        controller = $controller('getController', {
            $scope: scope,
            sanakirjaAPIservice: mockService
        });
    }));
    
    after(function () {
        sessionStorage.clear();
    });

    it('should put sanalista into scope.sanalista', function () {
        scope.$apply();
        expect(scope.sanalista[0].hakusana).eql("koira");
        expect(scope.sanalista[0].selitys).eql("haukkuu");
    });

    it('should put random sana into scope.random', function () {
        scope.$apply(); 
        
        expect(scope.random.hakusana).eql("koira");   
        expect(scope.random.selitys).eql("haukkuu");  
    });
    

});
