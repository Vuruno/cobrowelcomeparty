var express = require('express');
var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;
const mongoose = require('mongoose');
var crypto = require('crypto');
const { doesNotMatch } = require('assert');
const { isntLoggedIn, isLoggedIn } = require('../settings/isAuth')
require('dotenv').config()

passport.use(new PassportLocal(function (username, password, cb) {
    if ((username == 'Ale' || username == 'Mateo' || username == 'Sofia' || username == 'Bruno') && password == process.env.PASSWORD) {
        return cb(null, { username: username })
    }

    cb(null, false)
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
    process.nextTick(function () {
        return cb(null, { username });
    });
});

var router = express.Router();

router.get('/login', isntLoggedIn, function (req, res, next) {
    res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', function (req, res, next) {
    req.logout()
    res.redirect('/');
});

module.exports = router;