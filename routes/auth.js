var express = require('express');
var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;
var crypto = require('crypto');
const { doesNotMatch } = require('assert');

passport.use(new PassportLocal(function(username, password, cb) {
    if (username == 'bruno' && password == '123') {
        
        return cb(null, { id: 1, username: 'Daniel' })
    }

    cb(null, false)
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    process.nextTick(function () {
        return cb(null, { id: 1, username: 'Daniel' });
    });
});

var router = express.Router();

router.get('/login', function (req, res, next) {
    res.render('login');
});


router.post('/login/password', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;