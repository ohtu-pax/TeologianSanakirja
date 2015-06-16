'use strict';

var express = require('express');
var router = express.Router();
var database = require('../database/database');
var lyhennysParser = require('../database/lyhenneParser').lyhentaja;
var linkittajaClass = require('../database/linkParser').linkittaja;

router.get('/', function (req, res, next) {
    res.render('index');
});

var HAKUSANAT_KYSELY = 'SELECT * FROM hakusanat';
var SELITYKSET_KYSELY = 'SELECT * FROM selitykset';
var LINKIT_KYSELY = 'SELECT * FROM linkit';

var res = null;

router.get('/api/sanatuusi', function (req, response) {
    //Supertestia varten
    if (res === null) {
        loadDatabase(function () {
            end(response);
        });
    } else {
        end(response);
    }
});

router.get('/api/sanat', function (req, response) {
    //Supertestia varten
    /*if (results === null) {
     loadDatabase(function () {
     end(response);
     });
     } else {
     end(response);
     }*/
    end(response);
});

function end(response) {
    response.set('Content-Type', 'application/json');
    response.send(res);
}

function loadDatabase(onDone) {
    database.queryWithReturn(LINKIT_KYSELY, function (linkit) {
        database.queryWithReturn(HAKUSANAT_KYSELY, function (hakusanat) {
            database.queryWithReturn(SELITYKSET_KYSELY, function (selitykset) {
                var tulos = {};
                tulos.linkit = linkit;
                tulos.hakusanat = hakusanat;
                tulos.selitykset = selitykset;
                res = JSON.stringify(tulos);
                onDone();
            });
        });
    });
}

module.exports = router;
module.exports.loadDatabase = loadDatabase;
