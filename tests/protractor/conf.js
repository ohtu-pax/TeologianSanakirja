"use strict";

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path,
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 12000
    },
    specs: ['historia.spec.js'],
    //specs: ['haku.spec.js', 'random.spec.js', 'historia.spec.js'],
};
