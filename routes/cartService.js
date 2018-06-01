module.exports = function(pool){



    const module = {};
    //DTO et DAO
    var Cart = require('../models/cart/cart');
    var lineCartDAO = require('../models/cart/lineCartDAO')(pool);

    var Order = require('../models/order/order');
    var orderDAO = require('../models/order/orderDAO')(pool);



    //callback succeed if authenticate succeed, otherwise callback fail
    module.addProduct = function (idUser, idAlbum, callback) {
            lineCartDAO.addProduct(idUser, idAlbum, {
                success: function () {
                    callback.success();

                },
                fail: function(err) {
                    callback.fail(err);
                }
        });
    };

    module.deleteProduct = function (idLineCart, callback) {
        lineCartDAO.deleteProduct(idLineCart, {
            success: function () {
                callback.success();

            },
            fail: function(err) {
                callback.fail(err);
            }
        });
    }

    module.fillOrder = function (order, iduser, cart, callback) {
        lineCartDAO.getByUser(iduser, {
            success:  function () {
                var err = false;
                cart.forEach( async function(linecart) {
                    await orderDAO.fill(linecart, order, {
                        success: function() {
                            console.log('success fill');
                        },
                        fail: function (err) {
                            console.log('error fill');
                            err = true;
                        }
                    })
                });
                if (!err) {
                    callback.success();
                }else {
                    callback.fail();
                }
            },
            fail: function(err) {
                callback.fail(err);
            }
        });
    }




    return module;
};
