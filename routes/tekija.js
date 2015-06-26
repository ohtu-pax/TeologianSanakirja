'use strict';

var router = require('express').Router();
var database = require('../database/database');

router.put('/', function (req, res) {
    var tekija = req.body.tekija;

    function end(status) {
        res.sendStatus(status);
        res.end();
    }

    if (typeof tekija === 'string') {
        var trimmed = tekija.trim();
        if (trimmed.length > 2) {
            try {
                database.queryWithValuesAndReturn('INSERT INTO tekijat (nimi) VALUES ($1) RETURNING id', [trimmed],
                        function (result) {
                            if (result.length !== 1) {
                                end(400);
                            } else {
                                res.statusCode = 200;
                                res.write(String(result[0].id));
                                res.end();
                            }
                        },
                        function (err) {
                            end(403);
                        });
            } catch (e) {
                console.error(e);
                end(500);
            }
            return;
        }
    }
    end(403);
});

function isInt(value) {
    return !isNaN(value)
            && parseInt(Number(value), 10) == value
            && !isNaN(parseInt(value, 10));
}

module.exports = router;
