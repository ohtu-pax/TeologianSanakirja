'use strict';

var PALVELIN_OSOITE = 'http://localhost:3000/#/login';

describe('Kirjatumis testaus: ', function () {

    var name = element(by.css('.loginName'));
    var password = element(by.css('.loginPassword'));
    var loginInput = element(by.css('.loginClick'));
    var sisallaViesti = element(by.css('.sisallaViesti'));

    beforeEach(function () {
        browser.driver.manage().deleteAllCookies();
        browser.get(PALVELIN_OSOITE);
    });

    function testWithValues(names, passwords, expected, done) {
        name.sendKeys(names).then(function () {
            password.sendKeys(passwords).then(function () {
                loginInput.click().then(function () {
                    expect(sisallaViesti.getText()).toEqual(expected);
                    done();
                });
            });
        });
    }

    it('Oikealla käyttäjätunnuksella ja salasanalla voi kirjautua sisään', function (done) {
        testWithValues('admin', 'admin', 'Pääkäyttäjä', done);
    });

    it('Väärällä käyttäjätunnuksella ja oikealla salasanalla ei voi kirjautua sisään', function (done) {
        testWithValues('asdasdaeasd fds', 'admin', '', done);
    });

    it('Oikealla käyttäjätunnuksella ja väärällä salasanalla ei voi kirjautua sisään', function (done) {
        testWithValues('admin', 's aåtprä', '', done);
    });

    it('Väärällä käyttäjätunnuksella ja väärällä salasanalla ei voi kirjautua sisään', function (done) {
        testWithValues('asdrtfg ä', 's aåtprä', '', done);
    });
});
