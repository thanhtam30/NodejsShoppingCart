var express = require('express');
var router = express.Router();
//var Ten = require('../models/ten');
var moment = require('moment');
var passport = require("passport");
router.get('/login', function(req, res, next) {
    var errors = req.flash('error');
    res.render('admin/login', { messages: errors, hasErrors: errors.length > 0 });
});
router.get('/admin', function(req, res, next) {

    res.render('admin/admin');
});

router.post('/login', loginValidation, passport.authenticate('local.login', {
    successRedirect: '/index/:page', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

function validate(req, res, next) {
    req.checkBody('email', 'Email không được rỗng').notEmpty();
    req.checkBody('email', 'Email không đúng').isEmail();
    req.checkBody('password', 'Mật khẩu không được rỗng').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach((error) => {
            messages.push(error.msg);
        });

        req.flash('error', messages);
        res.redirect('/signup');
    } else {
        return next();
    }
}
//kiem tra login
function loginValidation(req, res, next) {
    req.checkBody('email', 'Email không được rỗng').notEmpty();
    req.checkBody('email', 'Email không đúng').isEmail();
    req.checkBody('password', 'Mật khẩu không được rỗng').notEmpty();
    var loginErrors = req.validationErrors();
    if (loginErrors) {
        var messages = [];
        loginErrors.forEach((error) => {
            messages.push(error.msg);
        });

        req.flash('error', messages);
        res.redirect('/login');
    } else {
        return next();
    }
}
module.exports = router;