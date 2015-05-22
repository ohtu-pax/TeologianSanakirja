"use strict";

exports.config = {
  seleniumAddress: 'http://www.localhost:4444/',
    capabilities: {
      'browserName': 'phantomjs'
  },
  specs: ['haku.spec.js'],
  

};
