'use strict';

var express = require('express');
var router = express.Router();
var databaseStore = require('../databaseStore');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/api/sanat', function (req, res) {
    var data = {sana: req.body.sana, selitys: req.body.selitys};
    var database = databaseStore.getDatabase();
    database.queryWithValues('INSERT INTO sanat(sana, selitys) VALUES ($1, $2)', [data.sana, data.selitys], function () {
        res.end();
    });
});

router.get('/api/sanat', function (req, res) {
    var database = databaseStore.getDatabase();
    database.queryWithReturn('SELECT * FROM sanat', function (results) {
        return res.json(results);
        res.end();
    });
});

module.exports = router;
