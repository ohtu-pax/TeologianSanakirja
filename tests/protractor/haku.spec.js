"use strict";

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

var ODOTETUT_HAKUSANA_EHDOTUKSET = [
    'aamen', 'abjuraatio', 'abrenuntiaatio', 'adekvaatti', 'adoraatio', 'affirmaatio'
];

var AAMEN_HAKUSANA = 'aamen';
var AAMEN_SELITYS = '(hepr totisesti, niin olkoon), sana, jolla seurakunta vahvistaa ja omaksuu rukouksen, kiitoksen t ylistyksen. Kristus, joka itse on Aamen (Ilm 3: 14), vahvistaa a-sanalla oman puheensa.';

var DEUS_ABSCONDITUS_HAKUSANA = 'deus absconditus';
var DEUS_ABSCONDITUS_SELITYS = '(lat), Jumala. D absconditus, salattu Jumala, D revelatus, ilmoitettu Jumala, d ex machina (jumala koneesta), odottamaton ratkaisu, helppo ratkaisu, d otiosus, toimeton jumala (kaukainen jumala, joka ei enää puutu asioihin), deus sive natura, jumala eli luonto (Spinozan käsitys).';

var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Haku testaus', function () {
    var hakusanat = element.all(by.css('.hakusana'));
    var selitykset = element.all(by.css('.selitys'));

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.get(PALVELIN_OSOITE);
    });

    it('title oikein', function (done) {
        expect(browser.getTitle()).toEqual('Teologian Sanakirja');
        done();
    });

    it('löytää kaikkien sanojen kolmannen sanan oikein', function (done) {
        element(by.model('hakuKentta')).sendKeys('pax').then(function () {
            function tarkistaOikeellisuusKaikki(sanat, odotetutSanat) {
                sanat.each(function (element, index) {
                    expect(element.getText()).toEqual(odotetutSanat[index]);
                });
            }

            tarkistaOikeellisuusKaikki(hakusanat, ODOTETUT_HAKUSANAT);
            tarkistaOikeellisuusKaikki(selitykset, ODOTETUT_SELITYKSET);

            done();
        });
    });

    function tarkistaDisplay(elementit) {
        elementit.each(function (element) {
            expect(element.isDisplayed()).toBe(false);
        });
    }

    it('ei löydä mitään sanoja kahdella painalluksella', function (done) {
        element(by.model('hakuKentta')).sendKeys('aa').then(function () {

            tarkistaDisplay(hakusanat);
            tarkistaDisplay(selitykset);

            done();
        });
    });

    it('löytää täydellisellä osumalla vain yhden sanan', function (done) {
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

            expect(toivottuHakuSana.count()).toBe(1);
            expect(toivottuSelitys.count()).toBe(1);

            done();
        });
    });

    it('linkittää sanan oikein', function (done) {
        element(by.model('hakuKentta')).sendKeys('abyssos').then(function () {
            element(by.linkText('deus absconditus')).click().then(function () {

                var hakusana = element(by.css('.hakusana'));
                var selitys = element(by.css('.selitys'));

                expect(hakusana.getText()).toBe(DEUS_ABSCONDITUS_HAKUSANA);
                expect(selitys.getText()).toBe(DEUS_ABSCONDITUS_SELITYS);

                done();
            });
        });
    });

    it('tyhjentää hakupalki oikein', function (done) {
        element(by.model('hakuKentta')).sendKeys('aamen').then(function () {
            element(by.buttonText('Tyhjennä haku')).click().then(function () {

                tarkistaDisplay(hakusanat);
                tarkistaDisplay(selitykset);

                done();
            });
        });
    });

    it('näyttää dropdownissa oikein sanat', function (done) {
        element(by.model('hakuKentta')).sendKeys('aa').then(function () {
            browser.sleep(500).then(function () {
                element.all(by.css('.ng-binding')).filter(function (elem, index) {
                    return elem.getAttribute('role').then(function (text) {
                        return text === 'menuitem';
                    });
                }).then(function (results) {
                    for (var i = 0, max = ODOTETUT_HAKUSANA_EHDOTUKSET.length; i < max; i++) {
                        expect(
                                results[i]
                                .getText())
                                .toBe(ODOTETUT_HAKUSANA_EHDOTUKSET[i]);
                    }

                    done();
                });
            });
        });
    });
});
