describe('Service: ', function () {
    var service,
            $httpBackend,
            url = 'api/sanat/';

    beforeEach(module('sanakirjaApp'));

    beforeEach(inject(function (sanakirjaAPIservice, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        service = sanakirjaAPIservice;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        sessionStorage.clear();
    });

    it("service should be defined", function () {
        expect(service).to.not.be.undefined;
    });

    it('should make a get request', (function () {
        var result = {};

        var promise = service.getSanalista();

        promise.then(function (respond) {
            result = respond;
        });

        $httpBackend.whenGET(url).respond([{hakusana: 'koira', selitys: 'haukkuu'}]);
        $httpBackend.flush();

        expect(result[0].hakusana).to.eql('koira');
    }));

    it('should save data to session storage', (function () {
        service.getSanalista();

        $httpBackend.whenGET(url).respond([{hakusana: 'koira', selitys: 'haukkuu'}]);
        $httpBackend.flush();

        var sanalista = JSON.parse(sessionStorage.getItem('sanalista'));
        expect(sessionStorage.length).to.equal(1);
        expect(sanalista[0].hakusana).to.eql('koira');
    }));


//    it('should get error message', (function () {
//        var result = {};
//        
//        var promise = service.getSanalista();      
//        promise.then(function(respond) {
//            result = respond;
//        });
//        
//        $httpBackend.whenGET('api/kukkuu').respond([{hakusana: 'koira', selitys: 'haukkuu'}]);
//        $httpBackend.flush();
//        console.log($httpBackend.calls);
//        //expect(result[0].hakusana).to.eql('koira');
//    }));
});