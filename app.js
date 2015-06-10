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

app.use('/api/admin', login);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

passport.serializeUser(function (user, done) {
    done(null, !!user);
});

passport.deserializeUser(function (ser, done) {
    if (ser === true) {
        done(null, true);
    }
    done(null, false);
});

passport.use(new localStrategy({},
        function (user, password, done) {
            console.log('Yritetään kirjautua, tunnus: ' + user + ' salasana : ' + password);
            if (user !== 'admin' || password !== 'admin') {
                return done(null, false, 'Tunnus tai salasana on väärä.');
            }
            return done(null, true);
        }
));


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
