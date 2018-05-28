module.exports.controller = function (app, authService, pg, url) {







//DTO et DAO
    var Album = require('../models/user/user');
    var albumDAO = require('../models/album/albumDAO')(pg, url);

    var User = require('../models/user/user');
    var userDAO = require('../models/user/userDAO')(pg, url);


//afficher detail

    app.get('/album/:id', function (req, res) {
        console.log("detailAlbum");
        console.log(req.params.id);
        albumDAO.getById(req.params.id, {
            success: function (album) {
                authService.authenticate(req, {
                    success: function (idUser) {
                        userDAO.getById(idUser, {
                            success: function (user) {
                                res.status(200);
                                console.log(user.isadmin);
                                res.render('pages/album/detailAlbum', {
                                    locals: {
                                        title: album.nomalbum,
                                        authenticated: true,
                                        isadmin: user.isadmin,
                                        pseudo: user.login,
                                        album: album
                                    }
                                })

                            },
                            fail: function (err) {

                                res.status(500);
                                res.render('pages/error/error');
                            }
                        });
                    },

                    fail: function () {
                        res.status(200);
                        res.render('pages/album/detailAlbum', {
                            locals: {
                                title: album.nomalbum,
                                authenticated: false,
                                album: album
                            }
                        });
                    }
                })

            },

            fail: function () {
                res.redirect('/');
            }
        });

    });


}
