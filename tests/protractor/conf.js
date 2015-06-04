"use strict";

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path,
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    },
  specs: [ 'random.spec.js','kirjaimet.spec.js','haku.spec.js'],
};
