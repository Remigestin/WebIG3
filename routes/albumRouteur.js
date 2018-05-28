module.exports.controller = function (app, authService, pg, url) {


//DTO et DAO
    var Album = require('../models/user/user');
    var albumDAO = require('../models/album/albumDAO')(pg, url);

    var User = require('../models/user/user');
    var userDAO = require('../models/user/userDAO')(pg, url);

    var Review = require('../models/review/review');
    var reviewDAO = require('../models/review/reviewDAO')(pg,url);


//afficher detail

    app.get('/album/:id', function (req, res) {
        console.log("detailAlbum");

        albumDAO.getById(req.params.id, {
            success: function (album) {
                authService.authenticate(req, {
                    success: function (idUser) {
                        userDAO.getById(idUser, {
                            success: function (user) {
                                res.status(200);

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

    //ajouter une review à l'album

    app.post('/album/addreview', function(req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                console.log(req.body);
                var review = new Review(null, req.body.commentaire, req.body.note, idUser, req.body.idalbum);
                reviewDAO.create(review, {
                    success: function (savedReview) {
                        res.status(200);
                        res.redirect('/album/' + savedReview.idalbum);
                    },

                    fail: function() {
                        res.status(500);
                        res.render('pages/error/error');
                    }
                })

            },
            fail: function() {
                res.status(403);
                res.redirect('/');
            }
        });

    });


}
