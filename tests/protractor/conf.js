"use strict";

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path,
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 25000
    },
  specs: ['haku.spec.js', 'random.spec.js','kirjaimet.spec.js'],
};
