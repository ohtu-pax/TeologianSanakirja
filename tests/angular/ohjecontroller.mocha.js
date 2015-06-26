
describe('OhjeController: ', function () {
    var scope, $q, mockService, controller;
    var $httpBackend = null;
    beforeEach(module('sanakirjaApp'));

    beforeEach(function () {
        inject(function (_$httpBackend_, $rootScope, $controller, _$q_) {
            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $q = _$q_;

            var dataa = [
                {
                    id: 10,
                    nimi: "testohje"
                }
            ];

            mockService = {};

            mockService.getTekstit = function () {

                return $q(function (resolve) {
                    sessionStorage.setItem('ohjeet', JSON.stringify(dataa));
                    resolve(dataa);
                });
            };

            mockService.isLoggedIn = function () {

                return $q(function (resolve) {
                    resolve(0);
                });
            };
            controller = $controller('ohjeController', {
                $scope: scope,
                sanakirjaAPIservice: mockService
            });
        });
    });

    after(function () {
        sessionStorage.removeItem('ohjeet');
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should sen right data to backend ', function () {
        var data = {
            data: scope.ohjeet
        };

        $httpBackend.expectPOST('/api/data/ohjeet', data).respond(200);
        scope.sendPost();
        scope.$apply();
        $httpBackend.flush();
    });
    
    it('shuld get right data from backend and sessionStorage', function(){
        var angularonParas = JSON.parse(sessionStorage.getItem('ohjeet'));
        expect(angularonParas[0].nimi).to.eql('testohje');
    });
}); 