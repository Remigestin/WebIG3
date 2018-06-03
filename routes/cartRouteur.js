module.exports.controller = function (app, authService, pool) {

    const escape = require("html-escape");
    var cartService = require('../routes/cartService')(pool);


//DTO et DAO

    var userDAO = require('../models/user/userDAO')(pool);

    var lineCartDAO = require('../models/cart/lineCartDAO')(pool);

    //ajout dans d'un album dans le panier
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

    //suppresion d'un album du panier
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

    //afficher le panier
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