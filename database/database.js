'use strict';

var pg = require('pg');
var config = require('../config').conf;
var connectionString = config.connectionString;

function queryWithValues(queryString, values, onend, onerror) {
    pg.connect(connectionString, function (err, client) {
        var query = client.query(queryString, values);
        if (typeof onend === "function") {
            query.on('end', onend);
        }
        if (err) {
            if (typeof onerror === "function") {
                onerror(err);
            }
            console.log(err);
        }
    });
}

module.exports.queryWithValues = queryWithValues;

function queryWithValuesAndReturn(queryString, values, onend) {
    var results = [];
    pg.connect(connectionString, function (err, client) {
        var query = values ? client.query(queryString, values) : client.query(queryString);
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
}

module.exports.queryWithValuesAndReturn = queryWithValuesAndReturn;

module.exports.queryWithReturn = function (queryString, onend) {
    queryWithValuesAndReturn(queryString, null, onend);
};
