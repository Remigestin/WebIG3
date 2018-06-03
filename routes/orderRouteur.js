module.exports.controller = function (app, authService, pool) {

    const escape = require("html-escape");
    var cartService = require('../routes/cartService')(pool);


//DTO et DAO

    var User = require('../models/user/user');
    var userDAO = require('../models/user/userDAO')(pool);

    var Linecart = require('../models/cart/lineCart');
    var lineCartDAO = require('../models/cart/lineCartDAO')(pool);

    var Order = require('../models/order/order');
    var orderDAO = require('../models/order/orderDAO')(pool);


    app.get

    app.get('/order/create', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                lineCartDAO.getByUser(idUser, {
                    success: function (cart) {
                        var order = new Order(null, null, idUser);
                        orderDAO.create(order, {
                            success: function (savedOrder) {
                                cartService.fillOrder(savedOrder, idUser, cart.rows, {
                                    success: function () {
                                        res.status(200);
                                        res.redirect('/');
                                    },
                                    fail: function () {
                                        res.status(500);
                                        res.render('pages/error/error');
                                    }
                                });

                            },
                            fail: function (err) {
                                res.status(500);
                                res.render('pages/error/error');
                            }
                        })
                    },
                    fail: function (err) {
                        res.status(500);
                        res.render('pages/error/error');
                    }
                });
            },
            fail: function (err) {
                res.status(403);
                res.render('pages/error/error');
            }
        });
    });

    app.get('/orders', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                orderDAO.getByUser(idUser, {
                    success: function (orders) {
                        userDAO.getById(idUser, {
                            success: function (user) {
                                res.status(200);
                                res.render('pages/order/listcommande', {
                                    locals: {
                                        title: 'Mes Commandes',
                                        authenticated: true,
                                        orders: orders.rows,
                                        isadmin: user.isadmin,
                                        pseudo: user.login,

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
                res.status(403);
                res.render('pages/error/error');
            }
        });

    });

    app.get('/order/detail/:id', function (req, res) {
        console.log("detailorder");
        authService.authenticate(req, {
            success: function (idUser) {
                orderDAO.getById(escape(req.params.id), idUser, {
                    success: function (order) {
                        orderDAO.getPrice(escape(req.params.id), {
                            success: function (price) {
                                userDAO.getById(idUser, {
                                    success: function (user) {
                                        res.status(200);
                                        res.render('pages/order/detailOrder', {
                                            locals: {
                                                title: 'Detail Commande',
                                                authenticated: true,
                                                isadmin: user.isadmin,
                                                pseudo: user.login,
                                                order: order.rows,
                                                price: price
                                            }
                                        })
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

                    fail: function () {
                        res.status(403);
                        res.render('pages/error/error');
                    }
                })
            },
            fail: function (err) {
                res.status(500);
                res.render('pages/error/error');
            }
        });
    });


};