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

    var Order = require('../models/order/order');
    var orderDAO = require('../models/order/orderDAO')(pool);

    //ajout dans le panier

    app.get('/order/create', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                lineCartDAO.getByUser(idUser, {
                    success: function (cart) {
                        order = new Order(null, null, idUser);
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


};