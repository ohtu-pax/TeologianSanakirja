"use strict";

var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Käyttäjä haluaa hakea satunnaisen sanan', function () {
    var hakukentta = element(by.model('hakuKentta.sana'));

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.get(PALVELIN_OSOITE);
    });

    it('Randomin tulisi palauttaa jokin sana, kun sitä painetaan', function (done) {
        element(by.css('.valikkoNappi')).click().then(function () {
            element(by.linkText('Satunnainen sana')).click().then(function () {
                expect(hakukentta.getAttribute('value')).not.toBe('');
            });
        });
        done();
    });

    it('Randomin tulisi palauttaa uusi sana, kun sitä painetaan', function (done) {
        var ekaHakusana = '';

        element(by.css('.valikkoNappi')).click().then(function () {
            element(by.linkText('Satunnainen sana')).click().then(function () {
                ekaHakusana = hakukentta.getAttribute('value');
            });
        });

        element(by.css('.valikkoNappi')).click().then(function () {
            element(by.linkText('Satunnainen sana')).click().then(function () {
                var tokaHakusana = hakukentta.getAttribute('value');
                expect(tokaHakusana).not.toBe('');
                expect(ekaHakusana).not.toBe(tokaHakusana);
                done();
            });
        });
    });
});
