'use strict';

var router = require('express').Router();
var passport = require('passport');
var database = require('../database/database');

router.post('/', function (req, res) {
    var body = req.body;
    var selitys = body.selitys;
    var hakusanat = body.hakusanat;
    var linkit = body.linkit;


    res.send(req.isAuthenticated() ? '1' : '0');
    res.end();
});

router.put('/hakusana', passport.authenticate('local'), function (req, res) {
    res.send(req.user ? '1' : '0');
    res.end();
});

router.delete('/', function (req, res) {
    var body = req.body;
    var selitys = body.selitys;
    var hakusanat = body.hakusanat;
    var linkit = body.linkit;

    if (Array.isArray(hakusanat) === true) {
        deleteRow(hakusanat, 'hakusanat');
    }

    var selitysMaaritelty =
            isDefined(selitys) === true
            && isInt(selitys.id) === true
            && isDefined(selitys.selitys) === true;

    if (selitysMaaritelty === true) {
        database.queryWithValues("DELETE FROM selitykset WHERE id=($1)", selitys.id);
    }

    if (Array.isArray(linkit) === true) {
        deleteRow(linkit, 'linkit');
    }

    /*if (req.isAuthenticated()) {
     res.sendStatus(200);
     req.session.destroy();
     } else {
     res.sendStatus(401);
     }*/
    res.sendStatus(200);
    res.end();
}
);

function isDefined(value) {
    return value !== undefined && value !== null;
}

function deleteRow(values, table) {

    var qstring = "DELETE FROM " + table + " WHERE id=($1)";

    for (var i = 0, max = values.length; i < max; i++) {
        var curr = values[i];
        if (isDefined(curr) === true) {
            var currid = curr.id;
            if (isInt(currid) === true) {
                database.queryWithValues(qstring, currid);
            }
        }
    }
}

function isInt(value) {
    return !isNaN(value)
            && parseInt(Number(value), 10) == value
            && !isNaN(parseInt(value, 10));
}

module.exports = router;
