var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = "postgres://ackprmsigyevpu:Xr2OAYPV1l1GAVW6MMMtVWUhIF@ec2-23-23-81-221.compute-1.amazonaws.com:5432/d4lr4f1ndusjb?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/tixtixti';

router.get('/api/tixtixti', function(req, res) {

    
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM products");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
});
module.exports = router;