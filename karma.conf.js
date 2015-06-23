// Karma configuration
// Generated on Wed May 20 2015 10:55:32 GMT+0300 (EEST)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],
        // list of files / patterns to load in the browser
        files: [
            'public/components/angular/angular.js',
            'public/components/angular-route/angular-route.js',
            'public/components/angular-sanitize/angular-sanitize.js',
            'public/components/angular-cookies/angular-cookies.js',
            "public/components/angular-strap/dist/angular-strap.js",
            "public/components/angular-strap/dist/angular-strap.tpl.js",
            "public/components/angular-xeditable/dist/js/xeditable.js",
            "public/components/angular-animate/angular-animate.js",
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/karma-sinon-chai/bower_components/sinonjs/sinon.js',
            './public/javascripts/*.js',
            './public/javascripts/**/*.js',
            './tests/angular/*.js'
        ],
        // list of files to exclude
        exclude: [
            './tests/angular/postController.mocha.js',
             './public/javascripts/tyyliskriptit.js'
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
