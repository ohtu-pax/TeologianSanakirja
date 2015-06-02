'use strict';

var spawn = require('child_process').spawn;
var childprocess = require('child_process');
var exit = process.exit;
var kill = process.kill;

console.log('Aloitetaan integraatio testit');

var ODOTUS_AIKA = 3000;
var TIMEOUT = ODOTUS_AIKA * 15;
var vastauksiaOnTullut = true;


process.exitCode = 1;
process.on('exit', cleanup);
process.on('SIGINT', cleanup);
process.on('uncaughtException', cleanup);

var seleniumPID = -1;
var cleaned = false;

var wdm = null;
var p = null;
var server = null;

server = spawn('node', ['./bin/www']);
log(server, 'SERVER');

aikaKatkaisu();

function aikaKatkaisu() {
    if (vastauksiaOnTullut === false) {
        console.log('Aikakatkaisu');
        exit();
    }
    vastauksiaOnTullut = false;
    setTimeout(aikaKatkaisu, TIMEOUT);
}

setTimeout(function () {
    wdm = spawn('node_modules/protractor/bin/webdriver-manager', ['start']);
    log(wdm, 'WEB_DRIVER');

    setTimeout(function () {
        p = spawn('node_modules/protractor/bin/protractor', ['tests/protractor/conf.js']);
        p.on('exit', quit);
        p.on('SIGINT', quit);
        p.on('uncaughtException', quit);
        p.on('close', quit);
        p.stdout.on('data', function (data) {
            vastauksiaOnTullut = true;
            process.stdout.write('PROTRACTOR: ' + data);
        });
    }, ODOTUS_AIKA);
}, ODOTUS_AIKA);

function quit(code) {
    if (code !== undefined && code !== null) {
        console.log('Exit code set ' + code);
        process.exitCode = code;
    }
    exit();
}

function cleanup() {
    if (cleaned) {
        return;
    }
    cleaned = true;
    console.log('Lopetetaan integraatio testit ' + (process.exitCode === 0 ? 'ONNISTUNEESTI' : 'EPÄONNISTUNEESTI'));
    if (server !== null) {
        server.kill();
        console.log("Lopetetaan server");
    }
    if (wdm !== null) {
        wdm.kill();
    }
    if (p !== null) {
        p.kill();
    }
    if (seleniumPID !== -1) {
        console.log("Lopetetaan Selenium");
        kill(seleniumPID);
    }
}

function log(proc, name) {
    proc.stdout.on('data', function (data) {
        var str = String(data);
        process.stdout.write(name + ': ' + str);
        if (~str.indexOf('seleniumProcess.pid: ')) {
            var pid = str.replace('seleniumProcess.pid:', '');
            seleniumPID = parseInt(pid, 10);
            console.log('TESTS: Selenium pid on ' + seleniumPID);
        }
    });
    proc.on('close', function (code) {
        if (code) {
            console.log(name + ' exited with code ' + code);
        }
    });
}
