'use strict';

var childprocess = require('child_process');
var spawn = childprocess.spawn;
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

var cleaned = false;

var wdm = null;
var p = null;
var server = null;

server = spawn('node', ['./bin/www'], {
    detached: true,
    stdio: 'inherit'
});

setTimeout(function () {
    if (cleaned === true) {
        return;
    }
    wdm = spawn('node_modules/protractor/bin/webdriver-manager', ['start', '--standalone'], {
        detached: true,
        stdio: 'inherit'
    });

    setTimeout(function () {
        if (cleaned === true) {
            return;
        }
        p = spawn('node_modules/protractor/bin/protractor', ['tests/protractor/conf.js'], {
            detached: true,
            stdio: 'inherit'
        });
        p.on('exit', quit);
        p.on('SIGINT', quit);
        p.on('uncaughtException', quit);
        p.on('close', quit);

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
    if (cleaned === true) {
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
    var seleniumPID = childprocess.execSync('lsof -i:4444 -t');
    console.log('PID: ' + seleniumPID);
    childprocess.execSync('kill -9 ' + seleniumPID);
    console.log("Lopetetaan Selenium");
}
