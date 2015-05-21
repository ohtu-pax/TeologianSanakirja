'use strict';

var express = require('express');
var router = express.Router();
var database = require('../database');
var pg = require('pg');
var connectionString = "postgres://localhost:5432"; 
// var connectionString = "postgres://ackprmsigyevpu:Xr2OAYPV1l1GAVW6MMMtVWUhIF@ec2-23-23-81-221.compute-1.amazonaws.com:5432/d4lr4f1ndusjb?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory";

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});
/*
 * Post dataa tietokantaan
 */
router.post('/api/sanat', function (req, res) {
    var data = {sana: req.body.sana, selitys: req.body.selitys};
    database.queryWithValues('INSERT INTO sanat(sana, selitys) VALUES ($1, $2)', [data.sana, data.selitys], function () {
        res.end();
    });
});
/*
 * Hae kaikki sanat kannasta, GET ALL
 */
router.get('/api/sanat', function (req, res) {
    database.queryWithReturn('SELECT * FROM hakusanat, selitykset WHERE hakusanat.selitys = selitykset.id', function (results) {
        return res.json(results);
        res.end();
        //n , selitykset WHERE hakusanat.selitys = selitykset.id
    });
});

//hakee yksittäisin sanan sanan ID:n perusteella. 
router.get('/api/sanat/:sana_id', function (req, res) {
    var id = req.params.sana_id;
    database.queryWithValuesAndReturn('SELECT * FROM sanat WHERE id=($1)', [id], function (results) {
        return res.json(results);
        res.end();
    });
});

module.exports = router;
