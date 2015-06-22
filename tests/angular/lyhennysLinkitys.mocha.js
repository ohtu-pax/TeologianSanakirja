'use strict';

describe('lyhenne parseri', function () {

    beforeEach(module('sanakirjaApp'));

    var lyhentaja = new lyhentajaClass();

    it('Lisää lyhenteiden selitykset', function (done) {
        var alkuPerainen = 'Tässä on selitys, kr, ja siinä tulisi olla lyhenne';
        var odotettu = 'Tässä on selitys, <span class="lyhenne" title="kreikka, kreikan">kr</span>, ja siinä tulisi olla lyhenne';
        var tulos = lyhentaja.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });

    it('Lisää lyhenteiden selitykset rajoilla', function (done) {
        var alkuPerainen = 'kr Tässä on selitys, ja siinä tulisi olla lyhenne kr';
        var odotettu = '<span class="lyhenne" title="kreikka, kreikan">kr</span> Tässä on selitys, ja siinä tulisi olla lyhenne <span class="lyhenne" title="kreikka, kreikan">kr</span>';
        var tulos = lyhentaja.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });

    it('Ei lisää lyhenteiden selityksiä keskelle sanoja', function (done) {
        var alkuPerainen = 'tkrTässä on selityskr, vika, krja slatiinä tulisi okrlla lyhennekr';
        var odotettu = alkuPerainen;
        var tulos = lyhentaja.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });

    it('Lisää kun ainoa', function (done) {
        var alkuPerainen = 'lat';
        var odotettu = '<span class="lyhenne" title="latina, latinan">lat</span>';
        var tulos = lyhentaja.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });

    it('Toimii tyhjällä', function (done) {
        var alkuPerainen = '';
        var odotettu = '';
        var tulos = lyhentaja.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });

});
