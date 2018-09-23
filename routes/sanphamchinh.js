var express = require('express');
var router = express.Router();
var moment = require('moment')
var Sanphamchinh = require('../models/sanphamchinh');
router.get('/themsanphamchinh', function(req, res, next) {
    res.render('sanphamchinh/themsanphamchinh', { errors: null });
});
router.post('/themsanphamchinh', function(req, res, next) {
    req.checkBody('ten', 'Ten san pham khong duoc rong').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.render('sanphamchinh/themsanphamchinh', { errors: errors });
    } else {
        var sanphamchinh = new Sanphamchinh({
            tensanphamchinh: req.body.ten
        });
        sanphamchinh.save().then(function() {
            req.flash('success_msg', 'Đã Thêm Thành Công');
            console.log(sanphamchinh);
            res.redirect('/sanphamchinh/hienthisanphamchinh');
        });
    }
});
router.get('/hienthisanphamchinh', function(req, res, next) {
    Sanphamchinh.find().then(function(sanphamchinh) {
        res.render('sanphamchinh/hienthisanphamchinh', { sanphamchinh: sanphamchinh, moment: moment })
    });
});
module.exports = router;