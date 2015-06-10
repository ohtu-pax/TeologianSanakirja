'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/loggedin', function (req, res) {
    console.log('Logged in ' + req.user);
    res.send(req.isAuthenticated() ? '1' : '0');
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    console.log('Now: ' + req.user);
    res.send(req.user);
});

router.post('/logout', function (req, res) {
    if (req.isAuthenticated()) {
        req.logOut();
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
