'use strict';

var assert = require("assert");
var request = require('supertest')
var http = require('http');
var routes = require('.././routes/index');
var databaseStore = require('../databaseStore');
var express = require('express');
var router = express.Router();
var app = express();
app.use('/', routes);

var server = null;
databaseStore.setDatabase(null);

function startServer()
{
    server = http.createServer(function (request, response) {
        console.log(request.url);
        server.serve(request, response);
    }).listen(3198);
    server.on("listening", function () {
        console.log("Server started");
    });
}

function closeServer() {
    if (server !== null) {
        server.close();
        console.log("Server Stopped");
    }
}

describe('api/sanat', function () {
    before(function () {
        console.log('Before');
        startServer();
    });
    after(function () {
        closeServer();
        console.log('After');
    });
    /*beforeEach(function () {
     console.log('beforeEach');
     });
     afterEach(function () {
     console.log('afterEach');
     });*/
    it('respond with json', function (done) {
        request(app)
                .get('/api/sanat')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
    });
    it('Tulisi palauttaa oikeita sanoja', function (done) {
        request(app)
                .get('/api/sanat')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
    });
});
