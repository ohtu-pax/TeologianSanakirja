'use strict';

var express = require('express');
var router = express.Router();
var database = require('../database/database');

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
                tulos.tekijat = [{id: 1, tekija: 'Seppo A. Teinonen'}, {id: 2, tekija: 'Olli Hallamaa'}];
                res = JSON.stringify(tulos);
                console.log('Tietokanta välimuistissa');
                onDone();
            });
        });
    });
}

module.exports = router;
module.exports.loadDatabase = loadDatabase;
