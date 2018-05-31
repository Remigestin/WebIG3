module.exports.controller = function (app, authService, pool) {

    const escape = require("html-escape");
    var cartService = require('../routes/cartService')(pool);


//DTO et DAO
    var Album = require('../models/album/album');
    var albumDAO = require('../models/album/albumDAO')(pool);

    var User = require('../models/user/user');
    var userDAO = require('../models/user/userDAO')(pool);

    var Review = require('../models/review/review');
    var reviewDAO = require('../models/review/reviewDAO')(pool);

    //ajout dans le panier

    app.get('/cart/add/:idalbum', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                cartService.addProduct(idUser, escape(req.params.idalbum), {
                    success: function () {
                        res.status(200);
                        res.redirect('/');
                    },
                    fail: function (err) {
                        res.status(500);
                        res.render('pages/error/error');
                    }
                })

            },
            fail: function (err) {
                res.status(403);
                res.render('pages/error/error');
            }
        });

    });

    app.get('/cart', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                cartService.getCart(idUser, {
                    success: function (cart) {
                        res.status(200);
                        res.redirect('/');
                    },
                    fail: function (err) {
                        res.status(500);
                        res.render('pages/error/error');
                    }
                });

            },
            fail: function (err) {
                res.status(200);
                res.redirect('/user/signin');
            }
        });

    });
}