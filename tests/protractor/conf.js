"use strict";

exports.config = {
  seleniumAddress: 'http://localhost:4444/',
    capabilities: {
      'browserName': 'phantomjs'
  },
  specs: ['haku.spec.js'],
  

};
