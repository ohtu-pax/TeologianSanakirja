'use strict';

var express = require('express');
var router = express.Router();
var database = require('../database'); //
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

var HAKUSANAT_KYSELY = 'SELECT * FROM hakusanat';
var SELITYKSET_KYSELY = 'SELECT * FROM selitykset';
var LINKIT_KYSELY = 'SELECT * FROM linkit';

var results = null;

loadDatabase(function () {
    console.log('Tietokanta ladattu muistiin');
});

router.get('/api/sanat', function (req, response) {

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

function loadDatabase(onEnd) {
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
                    sana.selitys = selitys.selitys;

                    var linkit = linkitSelitykseen[selitys.id];
                    if (!linkit) {
                        continue;
                    }
                    var kaytetyt = [];
                    for (var k = 0; k < linkit.length; k++) {
                        var linkki = linkit[k];
                        if (kaytetyt[linkki.linkkisana]) {
                            continue;
                            kaytetyt[linkki.linkkisana] = true;}
                        sana.selitys = sana.selitys.replace(linkki.linkkisana,
                                ' <a href="/#/sanat/' + hakusanatMap[linkki.hakusana].hakusana + '">'
                                + linkki.linkkisana + '</a> ');
                    }
                }
                results = JSON.stringify(res);
                onEnd();
            });
        });
    });
}

module.exports = router;
