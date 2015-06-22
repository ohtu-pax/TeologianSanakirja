'use strict';

var router = require('express').Router();
var passport = require('passport');
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
            database.queryWithValues('UPDATE selitykset SET selitys = $1, tekija = $2 WHERE id = $3'
                    , [selitys, tekija, id], function (result) {
                if (result.rowCount !== 1) {
                    end(400);
                    return;
                }
                end(defaultStatus);
                return;
            }, function () {
                end(403);
            });
            return;
        }
    }
    end(403);


    /*doQuery(res, 200, function (onend, onerr, para1, para2, para3) {
     database.queryWithValues('UPDATE selitykset SET selitys = $1, tekija = $2 WHERE id = $3'
     , [para1, para2, para3], onend, onerr);
     }, selitys, tekija, id);*/

    //doQuery(200, 'UPDATE selitykset SET selitys = $1 WHERE id = $2', hakusana, id, res);
});

router.put('/', function (req, res) {
    var hakusana = req.body.hakusana;
    var selitys = req.body.selitys;
    var tekija = req.body.tekija;
    //doQuery(201, 'INSERT INTO selitykset (hakusana, selitys) VALUES ($1, $2)', hakusana, selitys, res);

    doQuery(res, 201, function (onend, onerr, para1, para2, para3) {
        database.queryWithValues('INSERT INTO selitykset (selitys, tekija) VALUES ($1, $2)'
                , [para1, para2, para3], onend, onerr);
    }, selitys, tekija, hakusana);
});

/*function doQuery(res, defaultStatus, doQuery, string1, int2, int3) {
 
 function end(status) {
 res.sendStatus(status);
 res.end();
 }
 
 if (typeof string1 === 'string') {
 var trimmed = string1.trim();
 if (trimmed.length > 2 && isInt(int2) && isInt(int3)) {
 doQuery(function (result) {
 if (result.rowCount !== 1) {
 end(400);
 return;
 }
 end(defaultStatus);
 return;
 }, function () {
 end(403);
 return;
 }, string1, int2, int3);
 }
 } else {
 end(403);
 }
 }*/

router.delete('/', function (req, res) {
    var id = req.body.id;
    var status = 204;

    if (isInt(id) === true) {
        database.queryWithValues("DELETE FROM hakusanat WHERE id=($1)", [id], function (result) {
            if (result.rowCount !== 1) {
                status = 400;
            }
            res.sendStatus(status);
            res.end();
        }, function (err) {
            status = 403;
        });
    } else {
        status = 403;
        res.sendStatus(status);
        res.end();
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
