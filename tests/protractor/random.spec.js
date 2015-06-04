"use strict";

var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Käyttäjä haluaa hakea satunnaisen sanan', function () {
    var hakusana = element(by.css('.hakusana'));
    var selitys = element(by.css('.selitys'));
    var uusiRandom = element(by.buttonText('Uusi random'));

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.get(PALVELIN_OSOITE);
        element(by.linkText('Satunnainen sana')).click();
    });

    it('Randomin tulisi palauttaa jokin sana, kun sitä painetaan', function (done) {
        expect(selitys.getText()).not.toBe('');
        expect(hakusana.getText()).not.toBe('');
        done();
    });

    it('Randomin tulisi palauttaa uusi sana, kun sitä painetaan', function (done) {
        var ekaHakusana = hakusana.getText();
        var ekaSelitys = selitys.getText();

        uusiRandom.click().then(function () {

            var tokaHakusana = hakusana.getText();
            var tokaSelitys = selitys.getText();
            expect(ekaHakusana).not.toBe(tokaHakusana);
            expect(ekaSelitys).not.toBe(tokaSelitys);
            
        });
        done();
    });

    it('Uuden randomin tulisi palauttaa uusi sana, kun sitä painetaan', function (done) {
        hakusana.getText().then(function (h1) {
            selitys.getText().then(function (s1) {
                uusiRandom.click().then(function () {
                    hakusana.getText().then(function (h2) {
                        selitys.getText().then(function (s2) {
                            uusiRandom.click();
                            var kolmasHakusana = hakusana.getText();
                            var kolmasSelitys = selitys.getText();

                            expect(kolmasHakusana).not.toBe(h1);
                            expect(kolmasSelitys).not.toBe(s1);
                            expect(kolmasHakusana).not.toBe(h2);
                            expect(kolmasSelitys).not.toBe(s2);

                            done();
                        });
                    });
                });
            });
        });
    });
});
