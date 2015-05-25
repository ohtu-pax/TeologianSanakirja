"use strict";

var spawn = require('child_process').spawn;
var childprocess = require('child_process');
var exit = process.exit;
var kill = process.kill;

console.log('STARTING TESTS');

var seleniumPID = 0;
var server = spawn('node', ['./bin/www']);
log(server, 'SERVER');

setTimeout(function () {
    var wdm = spawn('node_modules/protractor/bin/webdriver-manager', ['start']);
    log(wdm, 'WEB_DRIVER');

    setTimeout(function () {
        var p = spawn('node_modules/protractor/bin/protractor', ['tests/protractor/conf.js']);
        p.on('close', function (code) {
            console.log('ENDING TESTS with code ' + code);
            server.kill();
            wdm.kill();
            exit(code);
        });
        p.stdout.on('data', function (data) {
            console.log('PROTRACTOR: ' + data);
        });
    }, 3000);
}, 3000);

function log(proc, name) {
    proc.stdout.on('data', function (data) {
        if (!data) {
            return;
        }
        data = '' + data;
        console.log(name + ':' + data);
        if (~data.indexOf('seleniumProcess.pid: ')) {
            var pid = data.replace('seleniumProcess.pid:', '');
            seleniumPID = parseInt(pid, 10);
            console.log('TESTS: Selenium pid on ' + seleniumPID);
            process.on('exit', function () {
                console.log("TESTS: Lopetetaan Selenium");
                kill(seleniumPID);
            });
        }
    });
    proc.on('close', function (code) {
        console.log(name + ' exited with code ' + code);
    });
}
