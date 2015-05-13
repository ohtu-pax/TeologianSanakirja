'use strict';

var pg = require('pg');
var connectionString = "postgres://ackprmsigyevpu:Xr2OAYPV1l1GAVW6MMMtVWUhIF@ec2-23-23-81-221.compute-1.amazonaws.com:5432/d4lr4f1ndusjb?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory";

module.exports.queryWithValues = function (queryString, values, onend) {
    pg.connect(connectionString, function (err, client) {
        var query = client.query(queryString, values);
        query.on('end', onend);
        if (err) {
            console.log(err);
        }
    });
};

module.exports.queryWithReturn = function (queryString, onend) {
    var results = [];
    pg.connect(connectionString, function (err, client) {
        var query = client.query(queryString);
        query.on('row', function (row) {
            results.push(row);
        });
        query.on('end', function () {
            onend(results);
        });
        if (err) {
            console.log(err);
        }
    });
};
