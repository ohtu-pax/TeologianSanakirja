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
    it('Randomin tulisi palauttaa uusi sana, kun sitä painetaan', function () {
        browser.get(PALVELIN_OSOITE);
        var random = element(by.linkText('random sana'));

        random.click();
        var ekaSanaSelitys = haeSana();

        var uusiRandom = element(by.buttonText('Uusi random'));
        uusiRandom.click();
        var tokasanaSelitys = haeSana();

        expect(ekaSanaSelitys).not.toBe(tokasanaSelitys);
    });

    it('Uuden randomin tulisi palauttaa uusi sana, kun sitä painetaan', function () {
        browser.get(PALVELIN_OSOITE);
        var random = element(by.linkText('random sana'));

        random.click();
        var ekaSanaSelitys = haeSana();

        var uusiRandom = element(by.buttonText('Uusi random'));
        uusiRandom.click();
        var tokaSanaSelitys = haeSana();

        uusiRandom.click();
        var kolmasSanaSelitys = haeSana();

        expect(ekaSanaSelitys).not.toBe(kolmasSanaSelitys);
        expect(tokaSanaSelitys).not.toBe(kolmasSanaSelitys);
    });
});
