'use strict';

var parser = require('../../databaseParser');
var assert = require('assert');

describe('lyhenne parseri', function () {
    it('Lisää lyhenteiden selitykset', function (done) {
        var alkuPerainen = 'Tässä on selitys, kr, ja siinä tulisi olla lyhenne';
        var odotettu = 'Tässä on selitys, <span title="kreikka, kreikan">kr</span>, ja siinä tulisi olla lyhenne';
        var tulos = parser.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });
    it('Lisää lyhenteiden selitykset rajoilla', function (done) {
        var alkuPerainen = 'kr Tässä on selitys, ja siinä tulisi olla lyhenne kr';
        var odotettu = '<span title="kreikka, kreikan">kr</span> Tässä on selitys, ja siinä tulisi olla lyhenne <span title="kreikka, kreikan">kr</span>';
        var tulos = parser.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });
    it('Ei lisää lyhenteiden selityksiä keskelle sanoja', function (done) {
        var alkuPerainen = 'krTässä on selityskr, krja slatiinä tulisi okrlla lyhennekr';
        var odotettu = alkuPerainen;
        var tulos = parser.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });
    it('Lisää kun ainoa', function (done) {
        var alkuPerainen = 'lat';
        var odotettu = '<span title="latina, latinan">lat</span>';
        var tulos = parser.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });
    it('Toimii tyhjällä', function (done) {
        var alkuPerainen = '';
        var odotettu = '';
        var tulos = parser.lisaaLyhenne(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });
});
