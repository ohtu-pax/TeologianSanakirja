'use strict';

var request = require('supertest');
var routes = require('../../routes/index');
var express = require('express');

var app = express();
app.use('/', routes);

var START_TIMEOUT = 6000;
var TIMEOUT = 6000;

describe('api/sanat', function () {
    before(function (done) {
        this.timeout(START_TIMEOUT);
        request(app)
                .get('/api/sanat')
                .set('Accept', 'application/json')
                .end(done);
    });
    it('Palautuu JSON muodossa', function (done) {
        this.timeout(TIMEOUT);
        request(app)
                .get('/api/sanat')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err)
                        return done(err);
                    done();
                });
    });

    function maaritelty(value) {
        return value !== undefined && value !== null;
    }

    function kenttaOlemassa(kentta) {
        return maaritelty(kentta) && kentta.length > 0;
    }

    function selitysOnOlemasssa(selitys) {
        return maaritelty(selitys.id) && kenttaOlemassa(selitys.selitys);// && kenttaOlemassa(selitys.tekija);
    }

    function hakusanaOnOlemasssa(hakusana) {
        return maaritelty(hakusana.id) && kenttaOlemassa(hakusana.hakusana) && maaritelty(hakusana.selitys);
    }

    it('Tulisi palauttaa oikeita sanoja', function (done) {
        this.timeout(TIMEOUT);
        request(app)
                .get('/api/sanatuusi')
                .set('Accept', 'application/json')
                .expect(function (res) {
                    var tulos = JSON.parse(res.text);
                    if (!maaritelty(tulos)) {
                        throw new Error('Tulos tyhja');
                    }

                    var linkit = tulos.linkit;
                    var hakusanat = tulos.hakusanat;
                    var selitykset = tulos.selitykset;

                    if (!kenttaOlemassa(linkit) || !kenttaOlemassa(hakusanat) || !kenttaOlemassa(selitykset)) {
                        throw new Error('Tulos tyhja');
                    }

                    var lenh = hakusanat.length;
                    console.log('Tarkistetaan ' + lenh + ' hakusanaa');
                    for (var i = 0; i < lenh; i++) {
                        if (!hakusanaOnOlemasssa(hakusanat[i])) {
                            throw new Error('Virheellinen sana');
                        }
                    }

                    var lens = selitykset.length;
                    console.log('Tarkistetaan ' + lens + ' selitys');
                    for (var i = 0; i < lens; i++) {
                        if (!selitysOnOlemasssa(selitykset[i])) {
                            throw new Error('Virheellinen sana ' + selitykset[i]);
                        }
                    }
                    return false;
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
    });
});
