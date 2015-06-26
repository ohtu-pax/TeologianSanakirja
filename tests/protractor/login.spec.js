'use strict';

var PALVELIN_OSOITE = 'http://localhost:3000/#/login';
var conf = require('../../config.js').conf;

describe('Kirjautumistestaus: ', function () {

    var name = element(by.css('.loginName'));
    var password = element(by.css('.loginPassword'));
    var loginInput = element(by.css('.loginClick'));
    var sisallaViesti = element(by.css('.sisallaViesti'));

    var ADMIN_USERNAME = conf.adminName;
    var ADMIN_PASSWORD = conf.adminPassword;

    beforeEach(function () {
        browser.ignoreSynchronization = false;
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
        testWithValues(ADMIN_USERNAME, ADMIN_PASSWORD, 'Pääkäyttäjä', done);
    });

    it('Väärällä käyttäjätunnuksella ja oikealla salasanalla ei voi kirjautua sisään', function (done) {
        testWithValues(ADMIN_USERNAME + 'asdasdaeasd fds', ADMIN_PASSWORD, '', done);
    });

    it('Oikealla käyttäjätunnuksella ja väärällä salasanalla ei voi kirjautua sisään', function (done) {
        testWithValues(ADMIN_USERNAME, ADMIN_PASSWORD + 's aåtprä', '', done);
    });

    it('Väärällä käyttäjätunnuksella ja väärällä salasanalla ei voi kirjautua sisään', function (done) {
        testWithValues('asdrtfg ä' + ADMIN_USERNAME, 's aåtprä' + ADMIN_PASSWORD, '', done);
    });

    it('Tyhjällä käyttäjätunnuksella ja tyhjällä salasanalla ei voi kirjautua sisään', function (done) {
        testWithValues('', '', '', done);
    });

    it('"Kirjaudu ulos" -painiketta painaessa kirjaudutaan ulos', function (done) {
        name.sendKeys(ADMIN_USERNAME).then(function () {
            password.sendKeys(ADMIN_PASSWORD).then(function () {
                loginInput.click().then(function () {
                    element(by.css('.valikkoNappi')).click().then(function () {
                        element(by.linkText('Kirjaudu ulos')).click().then(function () {
                            expect(sisallaViesti.getText()).toEqual('');
                            browser.getCurrentUrl().then(function (url) {
                                var kolmeVikaaMerkkia = url.substr(url.length - 3)
                                expect(kolmeVikaaMerkkia).toEqual('/#/');
                                done();
                            });

                        });
                    });
                });
            });
        });
    });
});
