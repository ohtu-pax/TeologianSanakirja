var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = "postgres://ackprmsigyevpu:Xr2OAYPV1l1GAVW6MMMtVWUhIF@ec2-23-23-81-221.compute-1.amazonaws.com:5432/d4lr4f1ndusjb?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory";

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/api/sanat', function (req, res) {
    var data = {sana: req.body.sana, selitys: req.body.selitys};
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query('INSERT INTO sanat(sana, selitys) VALUES ($1, $2)', [data.sana, data.selitys]);
        query.on('end', function () {
            res.end();
        });
        if (err) {
            console.log(err);
        }
    });
});

router.get('/api/sanat', function (req, res) {


    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM sanat");

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }

    });
});
module.exports = router;