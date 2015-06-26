'use strict';

var pg = require('pg');
var config = require('../config').conf;
var connectionString = config.connectionString;

function queryWithValues(queryString, values, onend, onerror) {
    pg.connect(connectionString, function (err, client) {
        if (err) {
            console.error(err);
            return;
        }
        var query = client.query(queryString, values);
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
    pg.connect(connectionString, function (err, client) {
        if (err) {
            console.error(err);
            return;
        }
        var query = values ? client.query(queryString, values) : client.query(queryString);
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
    pg.connect(connectionString, function (err, client) {

        client.query("UPDATE esipuheOhje SET nimi = '" + data.data + "' WHERE id =" + id);

        if (err) {
            console.log(err);
        }
    });
}
module.exports.queryWithValuesAndReturn = queryWithValuesAndReturn;
module.exports.queryWithReturn = function (queryString, onend) {
    queryWithValuesAndReturn(queryString, null, onend);
};
module.exports.updateTeksti = updateTeksti;
