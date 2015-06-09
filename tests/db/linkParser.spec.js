'use strict';

var linkittajaClass = require('../../database/linkParser').linkittaja;
var assert = require('assert');

describe('Linkki parseri', function () {
    it('Lisää linkin selitykseen', function (done) {

        var l1 = new Object();
        l1.linkkisana = 'selitys, jossa';
        l1.hakusana = 0;
        var h1 = new Object();
        h1.hakusana = 'jonnekin';

        var linkit = [l1];
        var hakusanat = [h1];
        var linkittaja = new linkittajaClass(linkit, hakusanat);

        var alkuPerainen = 'Test selitys, jossa on linkki muuaalle';
        var odotettu = 'Test <a href="/#/sanat/jonnekin">selitys, jossa</a> on linkki muuaalle';

        var tulos = linkittaja.linkita(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });

    it('Ei ylikirjoita eri linkkejä selityksessä', function (done) {

        var l1 = new Object();
        l1.linkkisana = 'test';
        l1.hakusana = 0;

        var l2 = new Object();
        l2.linkkisana = 'link2';
        l2.hakusana = 1;

        var h1 = new Object();
        h1.hakusana = 'link2';

        var h2 = new Object();
        h2.hakusana = 'adsss';

        var linkit = [l1, l2];
        var hakusanat = [h1, h2];
        var linkittaja = new linkittajaClass(linkit, hakusanat);

        var alkuPerainen = 'Test selitys, test jossa on linkki link2 muuaalle';
        var odotettu = 'Test selitys, <a href="/#/sanat/link2">test</a> jossa'
                + ' on linkki <a href="/#/sanat/adsss">link2</a> muuaalle';

        var tulos = linkittaja.linkita(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });

    it('Lisää kaksi eri linkkiä selitykseen', function (done) {

        var l1 = new Object();
        l1.linkkisana = 'test';
        l1.hakusana = 0;

        var l2 = new Object();
        l2.linkkisana = 'link2';
        l2.hakusana = 1;

        var h1 = new Object();
        h1.hakusana = 'jonnekin';

        var h2 = new Object();
        h2.hakusana = 'adsss';

        var linkit = [l1, l2];
        var hakusanat = [h1, h2];
        var linkittaja = new linkittajaClass(linkit, hakusanat);

        var alkuPerainen = 'Test selitys, test jossa on linkki link2 muuaalle';
        var odotettu = 'Test selitys, <a href="/#/sanat/jonnekin">test</a> jossa'
                + ' on linkki <a href="/#/sanat/adsss">link2</a> muuaalle';

        var tulos = linkittaja.linkita(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });

    it('Lisää kaksi eri linkkiä selitykseen rajoilla', function (done) {

        var l1 = new Object();
        l1.linkkisana = 'test';
        l1.hakusana = 0;

        var l2 = new Object();
        l2.linkkisana = 'link2';
        l2.hakusana = 1;

        var l3 = new Object();
        l3.linkkisana = 'adsss';
        l3.hakusana = 2;

        var h1 = new Object();
        h1.hakusana = 'jonnekin';

        var h2 = new Object();
        h2.hakusana = 'adsss';

        var h3 = new Object();
        h3.hakusana = 'test';

        var linkit = [l1, l2, l3];
        var hakusanat = [h1, h2, h3];
        var linkittaja = new linkittajaClass(linkit, hakusanat);

        var alkuPerainen = 'testTest selitys, jossa on linkki muuaallelink2adsss';
        var odotettu = '<a href="/#/sanat/jonnekin">test</a>'
                + 'Test selitys, jossa on linkki muuaalle<a href="/#/sanat/adsss">link2</a>'
                + '<a href="/#/sanat/test">adsss</a>';


        var tulos = linkittaja.linkita(alkuPerainen);

        assert.strictEqual(tulos, odotettu);
        done();
    });
});
