"use strict";

var PALVELIN_OSOITE = 'http://localhost:3000';

describe('Käyttäjä haluaa hakea satunnaisen sanan', function () {
    var hakusana = element(by.css('.hakusana'));
    var selitys = element(by.css('.selitys'));
    //var uusiRandom = element(by.buttonText('Uusi random'));

    beforeEach(function () {
        browser.get(PALVELIN_OSOITE);
        element(by.linkText('random sana')).click();
    });

    it('Randomin tulisi palauttaa jokin sana, kun sitä painetaan', function (done) {
        expect(selitys.getText()).not.toBe('');
        expect(hakusana.getText()).not.toBe('');
        done();
    });

    //phantomjs jumittuu click():iin, chrome ei koskaan lopeta.

    /*it('Randomin tulisi palauttaa uusi sana, kun sitä painetaan', function (done) {
     var ekaHakusana = hakusana.getText();
     var ekaSelitys = selitys.getText();
     
     var uusiRandom = element(by.buttonText('Uusi random'));
     console.log(1);
     browser.sleep(2500).then(function () {
     console.log(2);
     uusiRandom.click().then(function () {
     console.log(3);
     browser.sleep(2500).then(function () {
     console.log(4);
     var tokaHakusana = hakusana.getText();
     var tokaSelitys = selitys.getText();
     expect(ekaHakusana).not.toBe(tokaHakusana);
     console.log(5);
     expect(ekaSelitys).not.toBe(tokaSelitys);
     console.log(6);
     done();
     console.log(7);
     });
     });
     });
     });*/

    /*it('Uuden randomin tulisi palauttaa uusi sana, kun sitä painetaan', function (done) {
     var ekaHakusana = hakusana.getText();
     var ekaSelitys = selitys.getText();
     
     uusiRandom.click();
     var tokaHakusana = hakusana.getText();
     var tokaSelitys = selitys.getText();
     
     uusiRandom.click();
     var kolmasHakusana = hakusana.getText();
     var kolmasSelitys = selitys.getText();
     
     expect(kolmasHakusana).not.toBe(ekaHakusana);
     expect(kolmasSelitys).not.toBe(ekaSelitys);
     expect(kolmasHakusana).not.toBe(tokaHakusana);
     expect(kolmasSelitys).not.toBe(tokaSelitys);
     
     done();
     });*/
});
