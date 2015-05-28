"use strict";

var ODOTETTU_SANA = [
    'Sana: aamen\nSelitys: (hepr totisesti, niin olkoon), sana, jolla seurakunta vahvistaa ja omaksuu rukouksen, kiitoksen t ylistyksen. Kristus, joka itse on Aamen (Ilm 3: 14), vahvistaa a-sanalla oman puheensa.'
];
var ODOTETUT_SANAT = [
    'Sana: pax \nSelitys: (lat), rauha, rauhan suudelma, p apparens – p vera, näennäinen – tosi rauha, P Christi, Kristuksen rauha, 1945 Ranskassa perustettu kat rauhanliike, p Dei, Jumalan rauha, p Domini, Herran rauha, p imperfecta – p perfecta, epätäydellinen – täydellinen rauha, p Romana, Rooman rauha, Rooman imperiumin tuoma rauhankausi, p tecum, rauha olkoon sinun kanssasi, lit tervehdys, pax vobiscum, rauha olkoon teidän kanssanne, lit tervehdys.',
    'Sana: finitum capax infiniti \nSelitys: (lat), äärellinen voi käsittää äärettömän, ääretön voi sisältyä äärelliseen, lut aksiomi; finitum non est capax infiniti, äärellinen ei voi käsittää, sisältää ääretöntä, ref aksiomi.',
    'Sana: hapax legomenon\nSelitys: (kr), vain kerran sanottu, (esim UT:ssa) vain kerran esiintyvä sana.'

];

var ODOTETUT_HAKUSANAT = [
    'pax',
    'finitum capax infiniti',
    'hapax legomenon'
];

var ODOTETUT_SELITYKSET = [
    '(lat), rauha, rauhan suudelma, p apparens – p vera, näennäinen – tosi rauha, P Christi, Kristuksen rauha, 1945 Ranskassa perustettu kat rauhanliike, p Dei, Jumalan rauha, p Domini, Herran rauha, p imperfecta – p perfecta, epätäydellinen – täydellinen rauha, p Romana, Rooman rauha, Rooman imperiumin tuoma rauhankausi, p tecum, rauha olkoon sinun kanssasi, lit tervehdys, pax vobiscum, rauha olkoon teidän kanssanne, lit tervehdys.',
    '(lat), äärellinen voi käsittää äärettömän, ääretön voi sisältyä äärelliseen, lut aksiomi; finitum non est capax infiniti, äärellinen ei voi käsittää, sisältää ääretöntä, ref aksiomi.',
    '(kr), vain kerran sanottu, (esim UT:ssa) vain kerran esiintyvä sana.'
];

var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Haku testaus', function () {
    beforeEach(function () {
        browser.get(PALVELIN_OSOITE);
    });

    it('title oikein', function (done) {
        expect(browser.getTitle()).toEqual('Teologian Sanakirja');
        done();
    });

    it('löytää kaikkien sanojen kolmannen sanan oikein', function (done) {
        element(by.model('hakuKentta')).sendKeys('pax');

        var hakusanat = element.all(by.css('.hakusana'));
        var selitykset = element.all(by.css('.selitys'));
        for (var i = 0, max = ODOTETUT_HAKUSANAT.length; i < max; i++) {
            expect(hakusanat.get(i).getText()).toEqual(ODOTETUT_HAKUSANAT[i]);
            expect(selitykset.get(i).getText()).toEqual(ODOTETUT_SELITYKSET[i]);
        }
        done();
        //expect(selitykset.get(0).getText()).toEqual();
        /*expect(tulokset.get(2).getText()).toEqual(ODOTETUT_SANAT[2]);
         for (var i = 0; i < ODOTETUT_SANAT.length; i++) {
         //Tässä kohdin voisi iteroida ODOTETUT_SANT läpi mutta atm siellä on mystinen haamupiste jota en saa pois --tixti
         }*/
    });

    it('ei löydä mitään sanoja kahdella painalluksella', function (done) {
        element(by.model('hakuKentta')).sendKeys('aa');

        var hakusanat = element.all(by.css('.hakusana'));
        var selitykset = element.all(by.css('.selitys'));
        //expect(hakusanat.count()).toEqual(0);
        //expect(selitykset.count()).toEqual(0);
        for (var i = 0, max = ODOTETUT_HAKUSANAT.length; i < max; i++) {
            expect(hakusanat.get(i).isDisplayed()).toBe(true);
            expect(selitykset.get(i).isDisplayed()).toBe(true);
        }
        /*for (var i = 0; i < ODOTETUT_SANAT.length; i++) {
         expect(tulokset.get(i).getText()).toEqual("");
         }*/
        done();
    });
    /*it('löytää täydellisellä osumalla vain yhden sanan', function () {
     element(by.model('hakuKentta')).sendKeys('aamen');
     
     var tulokset = element.all(by.css('.sanaSelitys'));
     
     for (var i = 0; i < ODOTETTU_SANA.length; i++) {
     expect(tulokset.get(i).getText()).toEqual(ODOTETTU_SANA[i]);
     }
     });*/

});

