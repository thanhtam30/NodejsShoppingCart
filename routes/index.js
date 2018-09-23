var express = require('express');
var router = express.Router();
var Sanpham = require('../models/sanpham');
var Nhasx = require('../models/nhasx');
var GioHang = require('../models/giohang');
var passport = require("passport");
var Dondathang = require('../models/Dondathang');


router.get('/index/:page', function(req, res, next) {
    var perPage = 4; /* perPage - số dòng dữ liệu trên mỗi trang */
    var page = parseInt(req.params.page) || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
    Sanpham.find({}).limit(perPage).skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
        .exec(function(err, sanpham) {
            Sanpham.count().exec(function(err, count) { /* dùng count để tính số trang */
                if (err) return next(err)
                res.render('pages/index', {
                    sanpham: sanpham,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    user: req.user // get the user out of session and pass to template });

                })
            });
        });
});
router.get('/themgiohang/:id', function(req, res, next) {
    var idSanPham = req.params.id;
    var giohang = new GioHang(req.session.giohang ? req.session.giohang : {});
    Sanpham.findById(idSanPham, function(err, sanpham) {
        if (err) {
            return res.render('/index/:page');
        }
        giohang.add(sanpham, sanpham.id);
        req.session.giohang = giohang;
        console.log(req.session.giohang);
        res.redirect('/index/:page');
    });

});
router.get('/xemgiohang', function(req, res, next) {
    if (!req.session.giohang) {
        return res.render('giohang/xemgiohang', { sanpham: null });
    }
    let giohang = new GioHang(req.session.giohang);
    res.render('giohang/xemgiohang', { sanpham: giohang.generateArray(), Tonggia: giohang.Tonggia });
});
router.get('/thanhtoan', function(req, res, next) {
    if (!req.session.giohang) {
        return res.render('giohang/xemgiohang', { sanpham: null });
    }
    let giohang = new GioHang(req.session.giohang);
    res.render('giohang/thanhtoan', { sanpham: giohang.generateArray(), Tonggia: giohang.Tonggia });
});
router.post('/thanhtoan', function(req, res, next) {
    if (!req.session.giohang) {
        return res.render('giohang/xemgiohang', { sanpham: null });
    }
    var giohang = new GioHang(req.session.giohang);
    var dondathang = new Dondathang({
        user: req.user,
        giohang: giohang,
        Hoten: req.body.hoten,
        sodienthoai: req.body.sodienthoai,
        diachi: req.body.diachi
    });
    dondathang.save(function(err, result) {
        req.flash('success', 'Thanh Toán thành công');
        req.session.giohang = null;
        res.redirect('/index/:page');
        console.log(dondathang);

    })

})
router.get('/them1/:id', function(req, res, next) {
    var idSanPham = req.params.id;
    var giohang = new GioHang(req.session.giohang ? req.session.giohang : {});
    giohang.them1(idSanPham);
    req.session.giohang = giohang;
    res.redirect('/xemgiohang');
});
router.get('/Xoa1/:id', function(req, res, next) {
    var idSanPham = req.params.id;
    var giohang = new GioHang(req.session.giohang ? req.session.giohang : {});
    giohang.tru1(idSanPham);
    req.session.giohang = giohang;
    res.redirect('/xemgiohang');
});
router.get('/XoaTatCa/:id', function(req, res, next) {
    let IdSanpham = req.params.id;
    let giohang = new GioHang(req.session.giohang ? req.session.giohang : {});

    giohang.Xoatatca(IdSanpham);
    req.session.giohang = giohang;
    res.redirect('/xemgiohang');
});
router.get('/signup', function(req, res, next) {
    var errors = req.flash('error');
    res.render('admin/signup', { messages: errors, hasErrors: errors.length > 0 });

});

router.post('/signup', validate, passport.authenticate('local.signup', {
    successRedirect: '/index/:page', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
router.get('/login', function(req, res, next) {
    var errors = req.flash('error');
    res.render('admin/login', { messages: errors, hasErrors: errors.length > 0 });
});

router.post('/login', loginValidation, passport.authenticate('local.login', {
    successRedirect: '/index/:page', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/index/:page');
});
router.get('/profile', function(req, res, next) {
    res.render('admin/profile')
        //kiem tra rong hay khong

});
//kiem tra signup
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
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/signup');
});
//Dang nhap google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/index/:page',
        failureRedirect: '/'
    }));
router.get('/unlink/google', function(req, res) {
    var user = req.user;
    user.google.token = undefined;
    user.save(function(err) {
        res.redirect('/index/:page');
    });
});



  
//db.sanphams.aggregate([{ $lookup: {from: 'sanphams', localField: 'nhasx', foreignField: 'nhasx',as: 'sanphams'}])
module.exports = router;