"use strict";

var ODOTETUT_SANAT = [
    'Sana: aamen\nSelitys: (hepr totisesti, niin olkoon), sana, jolla seurakunta vahvistaa ja omaksuu rukouksen, kiitoksen t ylistyksen. Kristus, joka itse on Aamen (Ilm 3: 14), vahvistaa a-sanalla oman puheensa.',
    'Sana: Abgrenzungstheologie\nSelitys: (saks), rajausteologia, ➞ eksklusiivinen teol, joka korostaen kristinuskon erityislaatuisuutta vetää jyrkän rajan suhteessa kulttuuriin ja yhteiskuntaan. Vrt ➞ Anknüpfungstheologie.',
    'Sana: abjuraatio\nSelitys: (lat abiuratio), jonkin valallinen kieltäminen, todistajain läsnäollessa suoritettu esim harhaopin hylkääminen.'
];

describe('Haku testaus', function () {
    it('title oikein', function () {
        browser.get('http://www.localhost:4444');
        expect(browser.getTitle()).toEqual('Teologian Sanakirja');
    });
    it('aloittaa sanat oikein', function () {
        browser.get('http://www.localhost:4444');

        element(by.model('hakuKentta')).sendKeys('aa');

        var tulokset = element.all(by.css('.sanaSelitys'));
        for (var i = 0; i < ODOTETUT_SANAT.length; i++) {
            expect(tulokset.get(i).getText()).toEqual(ODOTETUT_SANAT[i]);
        }
    });
});

