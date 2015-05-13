'use strict';

var dataBase = require('database');

module.exports.setDatabase = function (db) {
    this.dataBase = db;
};

module.exports.getDatabase = function () {
    return this.dataBase;
};
