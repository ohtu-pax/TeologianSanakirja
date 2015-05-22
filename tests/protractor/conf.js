"use strict";

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
      'browserName': 'phantomjs'
  },
  specs: ['haku.spec.js'],
  

};
