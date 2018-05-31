module.exports = function(pg, url){



    const module = {};
    //DTO et DAO
    var Cart = require('../models/cart/cart');
    var lineCartDAO = require('../models/cart/lineCartDAO')(pg, url);



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
        lineCartDAO.deleteProduct(idUser, idAlbum, {
            success: function () {
                callback.success();

            },
            fail: function(err) {
                callback.fail(err);
            }
        });
    }

    //return the hashed version of the password
    module.hashPassword = function (plainPassword) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainPassword, salt);
    };

    //return true if hash(plainPassword) == password
    module.checkPassword = function (plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword)
    };

    // return the jsonWebToken as string
    module.createToken = function (payload) {
        return jwt.sign(payload, randomSecretKey);
    };


    return module;
};
