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

var connectionString = env.connectionString;

if (connectionString === undefined) {
    config.connectionString =
            'postgres://ohtu:teologia@localhost:5432/sanakirja';

    /*'postgres://localhost:5432';
     'postgres://ackprmsigyevpu:Xr2OAYPV1l1GAVW6MMMtVWUhIF'
     + '@ec2-23-23-81-221.compute-1.amazonaws.com:5432/d4lr4f1ndusjb'
     + '?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory*/

} else {
    config.connectionString = connectionString;
}

module.exports.conf = config;
