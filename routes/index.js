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
var TEKIJA_KYSELY = 'SELECT * FROM tekijat ORDER BY nimi';

//var res = null;



router.get('/api/sanatuusi', function (req, response) {
    database.queryWithReturn(LINKIT_KYSELY, function (linkit) {
        database.queryWithReturn(HAKUSANAT_KYSELY, function (hakusanat) {
            database.queryWithReturn(SELITYKSET_KYSELY, function (selitykset) {
                database.queryWithReturn(TEKIJA_KYSELY, function (tekijat) {
                    var tulos = {};
                    tulos.linkit = linkit;
                    tulos.hakusanat = hakusanat;
                    tulos.selitykset = selitykset;
                    //tulos.tekijat = [{id: 1, tekija: 'Seppo A. Teinonen'}, {id: 2, tekija: 'Olli Hallamaa'}];
                    tulos.tekijat = tekijat;
                    var res = JSON.stringify(tulos);
                    response.set('Content-Type', 'application/json');
                    response.send(res);
                    //console.log('Tietokanta välimuistissa');
                    //onDone();
                });
            });
        });
    });
    //Supertestia varten
    /*if (res === null) {
     loadDatabase(function () {
     end(response);
     });
     } else {
     end(response);
     }*/
});
router.get('/api/data/esipuhe', function (req, response) {
    database.queryWithReturn(ESIPUHE_KYSELY, function (data) {
        response.send(data);
    });
});

router.post('/api/sana/esipuhe', function (req, res) {
    database.updateTeksti(req, 1);
    res.sendStatus(200);
});
router.get('/api/data/ohjeet', function (req, response) {
    database.queryWithReturn(OHJE_KYSELY, function (data) {
        response.send(data);
    });
});

router.post('/api/sana/ohjeet', function (req, res) {
    database.updateTeksti(req, 2);
    res.sendStatus(200);
});

function end(response) {
    response.set('Content-Type', 'application/json');
    response.send(res);
}

function loadDatabase(onDone) {
    onDone();
    return;
    /*database.queryWithReturn(LINKIT_KYSELY, function (linkit) {
        database.queryWithReturn(HAKUSANAT_KYSELY, function (hakusanat) {
            database.queryWithReturn(SELITYKSET_KYSELY, function (selitykset) {
                database.queryWithReturn(TEKIJA_KYSELY, function (tekijat) {
                    var tulos = {};
                    tulos.linkit = linkit;
                    tulos.hakusanat = hakusanat;
                    tulos.selitykset = selitykset;
                    //tulos.tekijat = [{id: 1, tekija: 'Seppo A. Teinonen'}, {id: 2, tekija: 'Olli Hallamaa'}];
                    tulos.tekijat = tekijat;
                    res = JSON.stringify(tulos);
                    console.log('Tietokanta välimuistissa');
                    onDone();
                });
            });
        });
    });*/
}

module.exports = router;
module.exports.loadDatabase = loadDatabase;
