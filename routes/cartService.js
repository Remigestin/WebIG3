module.exports = function(pool){



    const module = {};
    //DTO et DAO

    var lineCartDAO = require('../models/cart/lineCartDAO')(pool);

    var orderDAO = require('../models/order/orderDAO')(pool);


//ajoute un album au panier
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

    //supprmime un album du panier
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

    //remplit une commande avec les produits du panier
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
