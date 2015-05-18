'use strict';

var request = require('supertest');
var routes = require('.././routes/index');
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
    it('Tulisi palauttaa oikeita sanoja', function (done) {
        request(app)
                .get('/api/sanat')
                .set('Accept', 'application/json')
                .expect(function (res) {
                    var results = JSON.parse(res.text);
                    var sana = results[0];
                    if (!sana || !sana.id || !sana.sana || !sana.selitys) {
                        throw new Error('Virheellinen sana');
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
