'use strict';

var pg = require('pg');
var config = require('../config').conf;
var connectionString = config.connectionString;

function queryWithValues(queryString, values, onend, onerror) {
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.error(err);
            done();
            return;
        }
        var query = client.query(queryString, values, function () {
            done();
        });
        if (typeof onend === "function") {
            query.on('end', onend);
        }
        if (typeof onerror === "function") {
            query.on('error', onerror);
        } else {
            query.on('error', function (err) {
                console.error(err);
            });
        }
    });
}

module.exports.queryWithValues = queryWithValues;

function queryWithValuesAndReturn(queryString, values, onend) {
    var results = [];
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.error(err);
            done();
            return;
        }
        var query = values ? client.query(queryString, values, function () {
            done();
        }) : client.query(queryString, function () {
            done();
        });
        query.on('row', function (row) {
            results.push(row);
        });
        query.on('end', function () {
            onend(results);
        });
        query.on('error', function (err) {
            console.error(err);
        });
    });
}

function updateTeksti(req, id) {
    var data = {data: req.body.data};
    pg.connect(connectionString, function (err, client, done) {
        client.query("UPDATE esipuheOhje SET teksti = $1 WHERE id =$2", [data.data, id], function () {
            done();
        });

        if (err) {
            done();
            console.log(err);
        }
    });
}
module.exports.queryWithValuesAndReturn = queryWithValuesAndReturn;
module.exports.queryWithReturn = function (queryString, onend) {
    queryWithValuesAndReturn(queryString, null, onend);
};
module.exports.updateTeksti = updateTeksti;
