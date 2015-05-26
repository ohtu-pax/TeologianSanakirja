"use strict";

var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Käyttäjä haluaa hakea satunnaisen sanan', function () {
    function haeSana() {
        var sanaSelitysSijainti = element(by.css('.sanaSelitys'));
        return sanaSelitysSijainti.getText();
    }

    it('Randomin tulisi palauttaa jokin sana, kun sitä painetaan', function () {
        browser.get(PALVELIN_OSOITE);
        var random = element(by.linkText('random sana'));
        random.click();

        var sanaSelitys = haeSana();
        expect(sanaSelitys).not.toBe('');
    });
});
