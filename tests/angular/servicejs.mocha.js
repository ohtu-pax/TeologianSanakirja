'use strict';

describe('Service: ', function () {
    var service = null;
    var $httpBackend = null;
    var url = 'api/sanatuusi';

    beforeEach(function () {
        module('sanakirjaApp');
        inject(function (sanatService, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            service = sanatService;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("service should be defined", function () {
        expect(service).to.not.be.undefined;
    });

    it('should make a get request', (function () {
        var results = {};
        results.hakusanat = [{hakusana: 'koira', selitys: 0}];
        results.linkit = {};
        results.selitykset = [{id: 0, selitys: 'haukkuu'}];

        $httpBackend.whenGET(url).respond(results);

        service.sanalista().then(function (respond) {
            var eka = respond[0];
            expect(eka.hakusana).to.eql('koira');
            expect(eka.selitys).to.eql('haukkuu');
        });

        $httpBackend.flush();
    }));

    it('should stack promises', (function () {
        var results = {};
        results.hakusanat = [{hakusana: 'koira', selitys: 0}];
        results.linkit = {};
        results.selitykset = [{id: 0, selitys: 'haukkuu'}];

        $httpBackend.whenGET(url).respond(results);

        var res = 0;
        var max = 100;

        for (var i = 0; i < max; i++) {
            service.sanalista().then(function (respond) {
                res += respond.length;
            });
        }

        service.sanalista().then(function (respond) {
            var eka = respond[0];
            expect(eka.hakusana).to.eql('koira');
            expect(eka.selitys).to.eql('haukkuu');
        });

        $httpBackend.flush();

        expect(res).to.eql(max * results.hakusanat.length);
    }));

});
