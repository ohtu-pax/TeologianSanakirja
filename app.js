/**
 * 
 * Moduulit
 */
'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); //turha 
var bodyParser = require('body-parser'); //turha 
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var conf = require('./config.js').conf;

var routes = require('./routes/index');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'tätäKäytetäänHashinLaskentaan',
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/api/admin', login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.eurl = req.url;
    err.status = 404;
    next(err);
});

passport.serializeUser(function (user, done) {
    done(null, !!user);
});

passport.deserializeUser(function (ser, done) {
    if (ser === true) {
        done(null, true);
    } else {
        done(null, false);
    }
});

passport.use(new localStrategy({},
        function (user, password, done) {
            if (user !== conf.adminName || password !== conf.adminPassword) {
                return done(null, false, 'Tunnus tai salasana on väärä.');
            }
            return done(null, true);
        }
));

app.get('env') === 'development'

app.use(function (err, req, res, next) {
    if (err.eurl.indexOf('favicon') === -1) {
        console.log(err.status + ' when requested (' + err.eurl + '): ' + err.message + '\n' + err.stack);
    }
    if (res.headersSent) {
        console.log('Viesti lähetetty, ei yritetä uudestaan...');
        if (next) {
            next();
        }
    } else {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
            //error: err
       });
    }
});


module.exports = app;
