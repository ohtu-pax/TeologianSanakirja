
"use strict";

var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Admin: ', function () {


    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.get(PALVELIN_OSOITE + "/#/admin");
    });

    it('Kun alimpaan sanakenttään kirjoitetaan jotakin, lisätään uusi tyhjä hakukenttä', function (done) {
        var adminSanahaku = element(by.css('#adminSanahaku'));

        adminSanahaku.sendKeys('a').then(function () {
            expect(element(by.css('#adminSana2')).isPresent()).toBe(true);
        });
        done();
    });

    it('Kun toiseksi viimeisen kentän tyhjentää, niin viimeinen tyhjä kenttä poistetaan', function (done) {
        var adminSanahaku = element(by.css('#adminSanahaku'));

        adminSanahaku.sendKeys('a').then(function () {
            adminSanahaku.clear().then(function () {
                expect(element(by.css('#adminSana2')).isPresent()).toBe(false);
            });

        });
        done();
    });
});

//    it('Randomin tulisi palauttaa uusi sana, kun sitä painetaan', function (done) {
//        var ekaHakusana = '';
//
//        element(by.linkText('Satunnainen sana')).click().then(function () {
//            ekaHakusana = hakukentta.getAttribute('value');
//        });
//
//        element(by.linkText('Satunnainen sana')).click().then(function () {
//            var tokaHakusana = hakukentta.getAttribute('value');
//            expect(tokaHakusana).not.toBe('');
//            expect(ekaHakusana).not.toBe(tokaHakusana);
//            done();
//        });
//    })
