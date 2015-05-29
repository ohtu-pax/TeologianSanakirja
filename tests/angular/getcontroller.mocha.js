
describe('GetController', function () {
   // var $httpBackend;
    var controller, scope;

    // Set up the module
    beforeEach(module('sanakirjaApp'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenGET('api/sanat/')
                .respond([{hakusana: 'aamen', 'selitys': 'totta'}, {hakusana: 'öylätti', 'selitys': 'eteinen'}]);

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('getController', {
                $scope: scope
            });
        });
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('http request should work', function () {
        scope.$apply();
        $httpBackend.flush();
    });
    it('should get word hakusana from list', function () {
        scope.$apply();
        $httpBackend.flush();
        expect(scope.sanalista[0].hakusana).eql("aamen");
        expect(scope.sanalista[0].selitys).eql("totta");
    });
});
