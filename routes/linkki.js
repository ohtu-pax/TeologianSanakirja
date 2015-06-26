'use strict';

var router = require('express').Router();
var database = require('../database/database');

router.post('/', function (req, res) {
    var id = req.body.id;
    var hakusana = req.body.hakusana;
    var selitysID = req.body.selitys;
    var linkkisana = req.body.linkkisana;

    function end(status) {
        res.sendStatus(status);
        res.end();
    }

    if (typeof linkkisana === 'string') {
        var trimmed = linkkisana.trim();
        if (trimmed.length > 0 && isInt(id) && isInt(hakusana) && isInt(selitysID)) {
            try {
                database.queryWithValues('UPDATE linkit SET hakusana = $1, linkkisana = $2, selitys = $3 WHERE id = $4',
                        [parseInt(hakusana, 10), trimmed, parseInt(selitysID, 10), parseInt(id, 10)],
                        function (result) {
                            if (result.rowCount !== 1) {
                                end(400);
                            } else {
                                end(200);
                            }
                        },
                        function (err) {
                            console.error(err);
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

router.put('/', function (req, res) {
    var hakusana = req.body.hakusana;
    var selitysID = req.body.selitys;
    var linkkisana = req.body.linkkisana;

    function end(status) {
        res.sendStatus(status);
        res.end();
    }

    if (typeof linkkisana === 'string') {
        var trimmed = linkkisana.trim();
        if (trimmed.length > 0 && isInt(hakusana) && isInt(selitysID)) {
            try {
                database.queryWithValues('INSERT INTO linkit (hakusana, linkkisana, selitys) VALUES ($1, $2, $3)',
                        [parseInt(hakusana, 10), trimmed, parseInt(selitysID, 10)],
                        function (result) {
                            if (result.rowCount !== 1) {
                                end(400);
                            } else {
                                end(201);
                            }
                        },
                        function (err) {
                            console.error(err);
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

router.delete('/:id', function (req, res) {
    var id = req.params.id;

    function end(status) {
        res.sendStatus(status);
        res.end();
    }

    if (isInt(id) === true) {
        try {
            database.queryWithValues("DELETE FROM linkit WHERE id=($1)", [parseInt(id, 10)], function (result) {
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
