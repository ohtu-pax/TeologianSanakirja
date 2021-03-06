"use strict";

var AAMEN_HAKUSANA = 'aamen';
var AAMEN_SELITYS = '(hepr totisesti, niin olkoon), sana, jolla seurakunta vahvistaa ja omaksuu rukouksen, kiitoksen t ylistyksen. Kristus, joka itse on Aamen (Ilm 3: 14), vahvistaa a-sanalla oman puheensa.';
var BAASIS_HAKUSANA = 'baasis';
var BAASIS_SELITYS = '(kr basis), perusta, (esim Kirkkojen Maailmanneuvoston) jäsenyyspohja, -edellytykset.';
var PALVELIN_OSOITE = 'http://localhost:3000/#/lista/B';

describe('Kirjaimet testaus', function () {
    var hakusanat = element.all(by.css('.hakusana'));
    var selitykset = element.all(by.css('.selitys'));

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.get(PALVELIN_OSOITE);

        //kaatuu nykybuidlissa TODO jos ehtii. 
        /**
         //alle oleva rivi hakee 'B':n AAKKOSET listasta ja clickkaa sitä, vaadittu koska ng-repeat. 
         element.all(by.repeater('kirjain in AAKKOSET')).then(function (kirjain) {
         kirjain[1].click();
         
         });
         */

    });

    function filteroiTeksti(elements, expected) {
        return elements.filter(function (elem) {
            return elem.getText().then(function (text) {
                return text === expected;
            });
        });
    }

    //HUOM REPEATER EI TOIMI! Kovakoodattu fix osoiteeksi #/lista/B 
    it('Olemme oikealla sivulla', function (done) {
        expect(browser.getCurrentUrl())
                .toBe(PALVELIN_OSOITE);
        done();
    });

    it('Ei löydä mitään haettaessa täydelistä A:lla alkavaa sanaa', function (done) {
        element(by.model('kirjainHakuKentta')).sendKeys('aamen').then(function () {

            var toivottuHakuSana = filteroiTeksti(hakusanat, AAMEN_HAKUSANA);
            var toivottuSelitys = filteroiTeksti(selitykset, AAMEN_SELITYS);

            expect(toivottuHakuSana.count()).toBe(0);
            expect(toivottuSelitys.count()).toBe(0);

            done();
        });
    });
    
    it('Löytää oikein yhden B:llä alkavan sanat', function (done) {
        element(by.model('kirjainHakuKentta')).sendKeys('baasis').then(function () {


            var toivottuHakuSana = filteroiTeksti(hakusanat, BAASIS_HAKUSANA);
            var toivottuSelitys = filteroiTeksti(selitykset, BAASIS_SELITYS);

            expect(toivottuHakuSana.count()).toBe(1);
            expect(toivottuSelitys.count()).toBe(1);

            done();
        });
    });
});