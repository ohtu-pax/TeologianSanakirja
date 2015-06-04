'use strict';

var express = require('express');
var router = express.Router();
var database = require('../database');
var lyhennysParser = require('../databaseParser');
var linkittajaClass = require('../linkParser').linkittaja;

router.get('/', function (req, res, next) {
    res.render('index');
});

var HAKUSANAT_KYSELY = 'SELECT * FROM hakusanat';
var SELITYKSET_KYSELY = 'SELECT * FROM selitykset';
var LINKIT_KYSELY = 'SELECT * FROM linkit';

var results = null;

router.get('/api/sanat', function (req, response) {
    //Supertestia varten
    if (results === null) {
        loadDatabase(function () {
            end(response);
        });
    } else {
        end(response);
    }
});

function end(response) {
    response.set('Content-Type', 'application/json');
    response.send(results);
}

function loadDatabase(onDone) {
    database.queryWithReturn(LINKIT_KYSELY, function (linkit) {
        var linkitSelitykseen = new Array(linkit.length);
        for (var i = 0; i < linkit.length; i++) {
            var curr = linkit[i];
            var linkitSelityksessa = linkitSelitykseen[curr.selitys];
            if (!linkitSelityksessa) {
                linkitSelityksessa = [];
                linkitSelitykseen[curr.selitys] = linkitSelityksessa;
            }
            linkitSelityksessa.push(curr);
        }

        function toMap(objects) {
            var map = new Array(objects.length);
            for (var i = 0; i < objects.length; i++) {
                var curr = objects[i];
                map[curr.id] = curr;
            }
            return map;
        }

        database.queryWithReturn(HAKUSANAT_KYSELY, function (hakusanat) {
            var hakusanatMap = toMap(hakusanat);

            database.queryWithReturn(SELITYKSET_KYSELY, function (selitykset) {
                var selityksetMap = toMap(selitykset);
                var res = new Array(hakusanat.length);

                for (var i = 0; i < hakusanat.length; i++) {

                    var sana = {};
                    res[i] = sana;
                    var hakusana = hakusanat[i];
                    sana.hakusana = hakusana.hakusana;

                    var selitys = selityksetMap[hakusana.selitys];
                    sana.selitys = lyhennysParser.lisaaLyhenne(selitys.selitys);
                    var linkit = linkitSelitykseen[selitys.id];
                    if (!linkit) {
                        continue;
                    }
                    var linkittaja = new linkittajaClass(linkit, hakusanatMap);
                    sana.selitys = linkittaja.linkita(sana.selitys);
                }
                results = JSON.stringify(res);
                console.log('Tietokanta ladattu muistiin');
                onDone();
            });
        });
    });
}

module.exports = router;
module.exports.loadDatabase = loadDatabase;
