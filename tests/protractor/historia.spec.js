"use strict";

var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Käyttäjä haluaa nähdä hakuhistorian', function () {
    var historiaLinkit = [];
    var hakukentta = element(by.model('hakuKentta'));

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.get(PALVELIN_OSOITE);
    });

    afterEach(function () {
        historiaLinkit = [];
        browser.executeScript('window.sessionStorage.removeItem(\'historia\');');
    });

    it('Hakuhistoria avaa hakuhistorian kun sitä painetaan ja hakuhistoria on tyhjä', function (done) {
        element(by.linkText('Hakuhistoria')).click().then(function () {
            historiaLinkit = element.all(by.css('.historiaLinkit'));
            historiaLinkit.getText().then(function (linkit) {
                expect(linkit).toEqual([]);
            });
            done();
        });
    });

    it('Hakuhistoria avaa hakuhistorian kun sitä painetaan ja hakuhistoriassa on linkkejä', function (done) {
        hakukentta.sendKeys('aamen');
        hakukentta.clear();
        hakukentta.sendKeys('pax').then(function () {
            element(by.linkText('Hakuhistoria')).click().then(function () {
                historiaLinkit = element.all(by.css('.historiaLinkit'));
                historiaLinkit.getText().then(function (linkit) {
                    expect(linkit).toEqual(['pax', 'aamen']);
                    done();
                });
            });
        });
    });

    it('Lisätään yksi oikea ja yksi väärä sana ja hakuhistoriassa on vain yksi oikea sana', function (done) {
        hakukentta.sendKeys('aamen');
        hakukentta.clear();
        hakukentta.sendKeys('koira').then(function () {
            element(by.linkText('Hakuhistoria')).click().then(function () {
                historiaLinkit = element.all(by.css('.historiaLinkit'));
                historiaLinkit.getText().then(function (linkit) {
                    expect(linkit).toEqual(['aamen']);
                    done();
                });
            });
        });
    });

    it('Kun klikataan hakuhistorian linkkiä, siirrytään sanan selitykseen', function (done) {
        hakukentta.sendKeys('aamen').then(function () {
            element(by.linkText('Hakuhistoria')).click().then(function () {
                historiaLinkit = element.all(by.css('.historiaLinkit'));
                historiaLinkit.first().click().then(function () {
                    browser.getCurrentUrl().then(function (url) {
                        console.log("URL: " + url);
                        expect(url).toContain(['/#/sanat/aamen']);
                        done();
                    });
                });
            });
        });
    });
});
