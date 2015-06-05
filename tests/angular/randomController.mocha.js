
describe('randomController: ', function () {
    var controller, location, scope;

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function ($controller, $rootScope, _$q_, $location) {
        scope = $rootScope.$new(),
        $q = _$q_,
        location = $location;
        
        mockService = {}; 

        mockService.getSanalista = function () {
            var defer = $q.defer();
            var sanalista = [{hakusana: 'koira', selitys: 'haukkuu'}];
            defer.resolve(sanalista);
            sessionStorage.setItem('sanalista', JSON.stringify(sanalista));
            return defer.promise; 
        }
 
        controller = $controller('randomController', {
            location: location,
            sanakirjaAPIservice: mockService,
            
        });
    }));

    after(function () {
        sessionStorage.clear();
    });

    it('should redirect to url with a random word as a parameter', function () {
        scope.$apply();
        expect(location.url()).to.eql('/sanat/koira');
        
    });
});



