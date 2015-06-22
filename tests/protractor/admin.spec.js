'use strict';

var PALVELIN_OSOITE = 'http://localhost:3000/#';
var conf = require('../../config.js').conf;

describe('Admin: ', function () {

    var name = element(by.css('.loginName'));
    var password = element(by.css('.loginPassword'));
    var loginInput = element(by.css('.loginClick'));
    var adminLinkki = element(by.linkText('Tee muutoksia sanakirjaan'));

    var ADMIN_USERNAME = conf.adminName;
    var ADMIN_PASSWORD = conf.adminPassword;

    beforeEach(function () {
        browser.ignoreSynchronization = false;
        browser.driver.manage().deleteAllCookies();
        browser.get(PALVELIN_OSOITE + "/login");

        kirjauduSisaan(ADMIN_USERNAME, ADMIN_PASSWORD);
        adminLinkki.click();
    });

    function kirjauduSisaan(names, passwords) {
        name.sendKeys(names).then(function () {
            password.sendKeys(passwords).then(function () {
                loginInput.click();
            });
        });
    }

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

    it('Lomake tyhjenee kun tyhjennä-nappia painetaan', function (done) {
        var adminSanahaku = element(by.css('#adminSanahaku'));
        var tekijaInput = element(by.css('#tekijaInput'));
        var tyhjennaNappi = element(by.css('#adminTyhjenna'));
        var adminSelitys = element(by.css('#adminSelitys'));

        adminSanahaku.sendKeys('aamen').then(function () {
            tekijaInput.sendKeys('Olli').then(function () {
                tyhjennaNappi.click().then(function () {
                    adminSanahaku.getAttribute('value').then(function (teksti) {
                        expect(teksti).toEqual('');

                    });
                    tekijaInput.getAttribute('value').then(function (teksti) {
                        expect(teksti).toEqual('');

                    });
                    adminSelitys.getAttribute('value').then(function (teksti) {
                        expect(teksti).toEqual('');

                    });
                });
            });
        });
        done();
    });

    it('jos yritetään siirtyä osoiteriviltä admin-näkymään, kun käyttäjä ei ole kirjautuneena sisään, \n\
        siirrytään etusivulle eikä admin-templatea näytetä', function (done) {
        element(by.linkText('Kirjaudu ulos')).click().then(function () {
            browser.get(PALVELIN_OSOITE + "/admin").then(function () {

                browser.getCurrentUrl().then(function (url) {
                    var osoitteenKolmeVikaaMerkkia = url.substr(url.length - 3)
                    expect(osoitteenKolmeVikaaMerkkia).toEqual('/#/');
                })

                expect(element(by.css("#admin")).isPresent()).toBe(false);
            });
        });
        done();
    });
});
