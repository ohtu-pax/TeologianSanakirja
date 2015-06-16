'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? '1' : '0');
    res.end();
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.send(req.user ? '1' : '0');
    res.end();
});

router.post('/logout', function (req, res) {
    if (req.isAuthenticated()) {
        res.sendStatus(200);
        req.session.destroy();
    } else {
        res.sendStatus(401);
    }
    res.end();
});

module.exports = router;
