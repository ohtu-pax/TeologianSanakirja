'use strict';

var express = require('express');
var router = express.Router();
var database = require('../database/database');

router.get('/', function (req, res, next) {
    res.render('index');
});

var HAKUSANAT_KYSELY = 'SELECT * FROM hakusanat ORDER BY hakusana';
var SELITYKSET_KYSELY = 'SELECT * FROM selitykset';
var LINKIT_KYSELY = 'SELECT * FROM linkit';
var ESIPUHE_KYSELY = 'SELECT * FROM esipuheOhje WHERE id=1';
var OHJE_KYSELY = 'SELECT * FROM esipuheOhje WHERE id=2';

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
router.get('/api/data/esipuhe', function (req,response){
    database.queryWithReturn(ESIPUHE_KYSELY,function(data){
        response.send(data);
    });
});

router.post('/api/data/esipuhe', function(req, res) {
    database.updateTeksti(req, 1);
    res.sendStatus(200);
});
router.get('/api/data/ohjeet', function (req,response){
    database.queryWithReturn(OHJE_KYSELY,function(data){
        response.send(data);
    });
});

router.post('/api/data/ohjeet', function(req, res) {
    database.updateTeksti(req, 2);
    res.sendStatus(200);
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
