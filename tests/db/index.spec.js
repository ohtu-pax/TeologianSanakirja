'use strict';

var request = require('supertest');
var routes = require('../../routes/index');
var express = require('express');

var app = express();
app.use('/', routes);

describe('api/sanat', function () {
    it('Palautuu JSON muodossa', function (done) {
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

    function tarkistaOlemassaOlo(sana) {
        if (!sana || !sana.id || !sana.sana || !sana.selitys) {
            throw new Error('Virheellinen sana');
        }
    }

    it('Tulisi palauttaa oikeita sanoja', function (done) {
        request(app)
                .get('/api/sanat')
                .set('Accept', 'application/json')
                .expect(function (res) {
                    var results = JSON.parse(res.text);
                    var sana = results[0];
                    tarkistaOlemassaOlo(sana);
                    return false;
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
    });
    it('Tulisi palauttaa tietty sana sitä pyytäessä', function (done) {
        request(app)
                .get('/api/sanat')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        var results = JSON.parse(res.text);
                        var sana = results[results.length - 1];
                        tarkistaOlemassaOlo(sana);
                        request(app)
                                .get('/api/sanat/' + sana.id)
                                .set('Accept', 'application/json')
                                .expect(function (singleRes) {
                                    var singleResult = JSON.parse(singleRes.text);
                                    var lenght = singleResult.length;
                                    if (lenght !== 1) {
                                        throw new Error('Liikaa vastauksia: ' + singleResult.length);
                                    }
                                    var saatuSana = singleResult[0];
                                    tarkistaOlemassaOlo(saatuSana);
                                    if (sana.id !== saatuSana.id || sana.sana !== saatuSana.sana
                                            || sana.selitys !== saatuSana.selitys) {
                                        throw new Error('Sanat eivät täsmää');
                                    }
                                    return false;
                                })
                                .end(function (err, res) {
                                    if (err) {
                                        return done(err);
                                    }
                                    done();
                                });
                    }
                });
    });
});
