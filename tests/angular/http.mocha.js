describe('http', function () {
    var service;
    var httpBackend;


    beforeEach(function () {
        module('sanakirjaApp');

        beforeEach(inject(function (_sanakirjaAPIservice_) {
            service = _sanakirjaAPIservice_;
        }));
        inject(function (_$httpBackend_) {
            httpBackend = _$httpBackend_;

        });
    });

    describe('when sending a message', function () {
        beforeEach(function () {
            httpBackend.expectPOST('/api/sanat', {sana: 'Aamen', selitys: 'totta'})
                    .respond(200);
            var data = {sana: 'Aamen', selitys: 'totta'};
            service.postSana(data);
            httpBackend.flush();
        });

        it('should send an HTTP POST request', function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
});


