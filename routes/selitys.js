'use strict';

var router = require('express').Router();
var database = require('../database/database');

router.post('/', function (req, res) {
    var id = req.body.id;
    var selitys = req.body.selitys;
    var tekija = req.body.tekija;


    function end(status) {
        res.sendStatus(status);
        res.end();
    }

    if (typeof selitys === 'string') {
        var trimmed = selitys.trim();
        if (trimmed.length > 2 && isInt(id) && isInt(tekija)) {
            try {
                database.queryWithValues('UPDATE selitykset SET selitys = $1 WHERE id = $2'
                        , [selitys, parseInt(id)], function (result) {
                    /*database.queryWithValues('UPDATE selitykset SET selitys = $1, tekija = $2 WHERE id = $3'
                     , [selitys, tekija, parseInt(id)], function (result) {*/
                    if (result.rowCount !== 1) {
                        end(400);
                    } else {
                        end(200);
                    }
                }, function () {
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

    function end(status) {
        res.sendStatus(status);
        res.end();
    }

    var selitys = req.body.selitys;
    var tekija = req.body.tekija;

    if (typeof selitys === 'string') {
        var trimmed = selitys.trim();
        if (trimmed.length > 2 && isInt(tekija)) {
            try {
                database.queryWithValuesAndReturn('INSERT INTO selitykset (selitys) VALUES ($1) RETURNING id'
                        //database.queryWithValuesAndReturn('INSERT INTO selitykset (selitys, tekija) VALUES ($1, $2) RETURNING id'
                        //, [selitys, parseInt(tekija)], function (result) {
                        , [selitys], function (result) {
                    if (result.length !== 1) {
                        end(400);
                    } else {
                        res.statusCode = 200;
                        res.write(String(result[0].id));
                        res.end();
                    }
                }, function (err) {
                    console.error(err);
                    end(405);
                });
            }
            catch (e) {
                console.error(e);
                end(500);
            }
            return;
        }
    }
    end(400);
});

router.delete('/:id', function (req, res) {
    var id = req.params.id;

    function end(status) {
        res.sendStatus(status);
        res.end();
    }

    if (isInt(id) === true) {
        try {
            database.queryWithValues("DELETE FROM selitykset WHERE id=($1)", [parseInt(id)], function (result) {
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

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isInt(value) {
    return !isNaN(value)
            && parseInt(Number(value), 10) == value
            && !isNaN(parseInt(value, 10));
}

module.exports = router;
