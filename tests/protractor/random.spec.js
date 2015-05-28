"use strict";

var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Käyttäjä haluaa hakea satunnaisen sanan', function () {
    function haeSana() {
        var sanaSelitysSijainti = element(by.css('.sanaSelitys'));
        return sanaSelitysSijainti.getText();
    }

    function clickAt(linkText) {
        var random = element(by.buttonText(linkText));
        random.click();
    }

    beforeEach(function () {
        browser.get(PALVELIN_OSOITE);
        element(by.linkText('random sana')).click();
    });
    it('Randomin tulisi palauttaa jokin sana, kun sitä painetaan', function (done) {
        var sanaSelitys = haeSana();
        expect(sanaSelitys).not.toBe('');
        done();
    });
    it('Randomin tulisi palauttaa uusi sana, kun sitä painetaan', function (done) {
        var ekaSanaSelitys = haeSana();
        clickAt('Uusi random');
        var tokasanaSelitys = haeSana();
        expect(ekaSanaSelitys).not.toBe(tokasanaSelitys);
        done();
    });
    /**
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
     */
});
