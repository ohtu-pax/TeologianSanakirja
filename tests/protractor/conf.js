"use strict";

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 25000
    },
    
    //olettavasti historian tulee olla esimmäinen, testit eivät nulla historiaa välissä
    specs: [
        'historia.spec.js',
        'haku.spec.js',
        'kirjaimet.spec.js',
        'random.spec.js',
        'login.spec.js',
        'admin.spec.js'
    ]
};
