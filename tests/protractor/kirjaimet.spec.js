"use strict";

var AAMEN_HAKUSANA = 'aamen';
var AAMEN_SELITYS = '(hepr totisesti, niin olkoon), sana, jolla seurakunta vahvistaa ja omaksuu rukouksen, kiitoksen t ylistyksen. Kristus, joka itse on Aamen (Ilm 3: 14), vahvistaa a-sanalla oman puheensa.';
var BAASIS_HAKUSANA = 'baasis';
var BAASIS_SELITYS ='(kr basis), perusta, (esim Kirkkojen Maailmanneuvoston) jäsenyyspohja, -edellytykset.';
var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Haku testaus', function () {
    var hakusanat = element.all(by.css('.hakusana'));
    var selitykset = element.all(by.css('.selitys'));

    beforeEach(function () {
        browser.get(PALVELIN_OSOITE);
        browser.ignoreSynchronization = true;
        //alle oleva rivi hakee 'B':n AAKKOSET listasta ja clickkaa sitä, vaadittu koska ng-repeat. 
        element.all(by.repeater('kirjain in AAKKOSET')).then(function (kirjain) {
            kirjain[1].click();
        });


    });

    it('Olemme oikealla sivulla', function (done) {
        expect(browser.getCurrentUrl())
                .toBe(PALVELIN_OSOITE + '/#/lista/B');
        done();
    });
       it('Ei löydä mitään haettaessa täydelistä A:lla alkavaa sanaa', function (done) {
        element(by.model('hakuKentta')).sendKeys('aamen').then(function () {

            function filteroiTeksti(elements, expected) {
                return elements.filter(function (elem) {
                    return elem.getText().then(function (text) {
                        return text === expected;
                    });
                });
            }

            var toivottuHakuSana = filteroiTeksti(hakusanat, AAMEN_HAKUSANA);
            var toivottuSelitys = filteroiTeksti(selitykset, AAMEN_SELITYS);

            expect(toivottuHakuSana.count()).toBe(0);
            expect(toivottuSelitys.count()).toBe(0);

            done();
        });
    });
           it('Löytää oikein yhden B:llä alkavan sanat', function (done) {
        element(by.model('hakuKentta')).sendKeys('baasis').then(function () {

            function filteroiTeksti(elements, expected) {
                return elements.filter(function (elem) {
                    return elem.getText().then(function (text) {
                        return text === expected;
                    });
                });
            }

            var toivottuHakuSana = filteroiTeksti(hakusanat, BAASIS_HAKUSANA);
            var toivottuSelitys = filteroiTeksti(selitykset, BAASIS_SELITYS);

            expect(toivottuHakuSana.count()).toBe(1);
            expect(toivottuSelitys.count()).toBe(1);

            done();
        });
    });
});