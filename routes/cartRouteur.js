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

    var Linecart = require('../models/cart/lineCart');
    var lineCartDAO = require('../models/cart/lineCartDAO')(pool);

    //ajout dans le panier

    app.get('/cart/add/:idalbum', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                cartService.addProduct(idUser, escape(req.params.idalbum), {
                    success: function () {
                        res.status(200);
                        res.redirect('/cart');
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

    app.delete('/cart/deletelinecart/:idlinecart', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                cartService.deleteProduct(escape(req.params.idlinecart), {
                    success: function () {
                        res.status(200);
                        res.redirect('/cart');
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
                lineCartDAO.getByUser(idUser, {
                    success: function (cart) {
                        lineCartDAO.getPrice(idUser, {
                            success: function (price) {
                                userDAO.getById(idUser, {
                                    success: function (user) {
                                        res.status(200);
                                        res.render('pages/panier/panier', {
                                            locals: {
                                                title: 'Panier',
                                                authenticated: true,
                                                cart: cart.rows,
                                                isadmin: user.isadmin,
                                                pseudo: user.login,
                                                price: price

                                            }
                                        });
                                    },
                                    fail: function (err) {
                                        res.status(500);
                                        res.render('pages/error/error');
                                    }
                                });
                            },
                            fail: function (err) {
                                res.status(500);
                                res.render('pages/error/error');
                            }
                        });
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
};