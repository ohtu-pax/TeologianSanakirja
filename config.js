'use strict';

var env = process.env;
var config = {};

var name = env.adminName;

if (name === undefined) {
    config.adminName = 'admin';
} else {
    config.adminName = name;
}

var password = env.adminPassword;

if (password === undefined) {
    config.adminPassword = 'admin';
} else {
    config.adminPassword = password;
}

module.exports.conf = config;
