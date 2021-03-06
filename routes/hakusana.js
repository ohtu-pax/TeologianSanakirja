'use strict';

var router = require('express').Router();
var database = require('../database/database');

router.post('/', function (req, res) {
    var id = req.body.id;
    var hakusana = req.body.hakusana;
    doQuery(200, 'UPDATE hakusanat SET hakusana = $1 WHERE id = $2', hakusana, id, res);
});

router.put('/', function (req, res) {
    var hakusana = req.body.hakusana;
    var selitys = req.body.selitys;
    doQuery(201, 'INSERT INTO hakusanat (hakusana, selitys) VALUES ($1, $2)', hakusana, selitys, res);
});

function doQuery(defaultStatus, query, stringParam, intParam, res) {

    function end(status) {
        res.sendStatus(status);
        res.end();
    }

    if (typeof stringParam === 'string') {
        var trimmed = stringParam.trim();
        if (trimmed.length > 2 && isInt(intParam)) {
            try {
                database.queryWithValues(query, [trimmed, parseInt(intParam)],
                        function (result) {
                            if (result.rowCount !== 1) {
                                end(400);
                            } else {
                                end(defaultStatus);
                            }
                        }, function (err) {
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
}

router.delete('/:id', function (req, res) {
    var id = req.params.id;

    function end(status) {
        res.sendStatus(status);
        res.end();
    }

    if (isInt(id) === true) {
        try {
            database.queryWithValues("DELETE FROM hakusanat WHERE id=($1)", [parseInt(id)], function (result) {
                if (result.rowCount !== 1) {
                    end(400);
                } else {
                    end(204);
                }
            }, function (err) {
                end(403);
            });
        }
        catch (e) {
            console.error(e);
            end(500);
        }
    } else {
        end(403);
    }
}
);

function isInt(value) {
    return !isNaN(value)
            && parseInt(Number(value), 10) == value
            && !isNaN(parseInt(value, 10));
}

module.exports = router;
