'use strict';

var spawn = require('child_process').spawn;
var childprocess = require('child_process');
var exit = process.exit;
var kill = process.kill;

console.log('Aloitetaan integraatio testit');

var ODOTUS_AIKA = 3000;

var seleniumPID = 0;
var server = spawn('node', ['./bin/www']);
log(server, 'SERVER');

setTimeout(function () {
    var wdm = spawn('node_modules/protractor/bin/webdriver-manager', ['start']);
    log(wdm, 'WEB_DRIVER');

    setTimeout(function () {
        var p = spawn('node_modules/protractor/bin/protractor', ['tests/protractor/conf.js']);
        p.on('close', function (code) {
            console.log('Lopetetaan integraatio testit ' + (code ? 'EPÄONNISTUNEESTI' : 'ONNISTUNEESTI'));
            server.kill();
            wdm.kill();
            exit(code);
        });
        p.stdout.on('data', function (data) {
            process.stdout.write('PROTRACTOR: ' + data);
        });
    }, ODOTUS_AIKA);
}, ODOTUS_AIKA);

function log(proc, name) {
    proc.stdout.on('data', function (data) {
        var str = String(data);
        process.stdout.write(name + ': ' + str);
        if (~str.indexOf('seleniumProcess.pid: ')) {
            var pid = str.replace('seleniumProcess.pid:', '');
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
