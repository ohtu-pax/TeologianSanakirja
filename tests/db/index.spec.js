'use strict';

var request = require('supertest');
var routes = require('../../routes/index');
var express = require('express');

var app = express();
app.use('/', routes);

var START_TIMEOUT = 6000;
var TIMEOUT = 50;

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
    function tarkistaOlemassaOlo(sana) {
        var hakusana = sana.hakusana;
        var selitys = sana.selitys;
        if (!sana || !hakusana || !selitys || hakusana.length === 0 || selitys.length === 0) {
            throw new Error('Virheellinen sana');
        }
    }

    it('Tulisi palauttaa oikeita sanoja', function (done) {
        this.timeout(TIMEOUT);
        request(app)
                .get('/api/sanat')
                .set('Accept', 'application/json')
                .expect(function (res) {
                    var results = JSON.parse(res.text);
                    var len = results.length;
                    if (len === 0) {
                        throw new Exception('Tulos tyhja');
                    }
                    console.log('Tarkistetaan ' + len + ' sanaa');
                    for (var i = 0; i < len; i++) {
                        tarkistaOlemassaOlo(results[i]);
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
