describe('postController', function () {
    var controller, scope, service;

    beforeEach(function () {

        module('sanakirjaApp');

        inject(function ($controller, $rootScope, _sanakirjaAPIservice_) {
            scope = $rootScope.$new();
            service: _sanakirjaAPIservice_;

            controller = $controller('postController', {
                $scope: scope,
                _sanakirjaAPIservice_: service
            });
        });

    });
//
//    it('lisaa sanan ja sen selityksen', function () {
//    });
//
//    it('ei lisaa sanaa ja sen selitystä, jos jompikumpi on tyhjä', function () {
//    });

    it('tyhjentaa lomakkeen kentat sanan ja sen merkityksen lisaamisen jalkeen', function () {

        scope.formData.sana = "aurinko";
        scope.formData.selitys = "paistaa taivaalla";

        scope.lisaaSana();

        expect(scope.formData.sana).to.eql("");
        expect(scope.formData.selitys).to.eql("");

    });
});
