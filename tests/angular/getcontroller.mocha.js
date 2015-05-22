// testing controller
describe('MyController', function () {
    var $httpBackend;
    var scope;
    var controller;
    var assert = chai.assert,
            expect = chai.expect,
            should = chai.should();

    // Set up the module
    beforeEach(module('sanakirjaApp'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.expectGET('api/sanat/')
                .respond({hakusana: 'aamen', 'selitys': 'totta'});

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


    it('should get hakusana from list', function () {
        expect(scope.hakusana, "aamen");
        $httpBackend.flush();
    });

});
