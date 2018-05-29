module.exports.controller = function (app, authService, pg, url) {


//DTO et DAO
    var Album = require('../models/user/user');
    var albumDAO = require('../models/album/albumDAO')(pg, url);

    var User = require('../models/user/user');
    var userDAO = require('../models/user/userDAO')(pg, url);

    var Review = require('../models/review/review');
    var reviewDAO = require('../models/review/reviewDAO')(pg, url);


//afficher detail

    app.get('/album/:id', function (req, res) {
        console.log("detailAlbum");

        albumDAO.getById(req.params.id, {
            success: function (album) {
                reviewDAO.getByAlbum(album.idalbum, {
                    success: function (reviews) {

                        authService.authenticate(req, {
                            success: function (idUser) {
                                userDAO.getById(idUser, {
                                    success: function (user) {
                                        res.status(200);
                                        console.log(reviews.rows);


                                        res.render('pages/album/detailAlbum', {
                                            locals: {
                                                title: album.nomalbum,
                                                authenticated: true,
                                                isadmin: user.isadmin,
                                                pseudo: user.login,
                                                album: album,
                                                reviews: reviews.rows
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
                                console.log(reviews.rows);
                                res.status(200);
                                res.render('pages/album/detailAlbum', {
                                    locals: {
                                        title: album.nomalbum,
                                        authenticated: false,
                                        album: album,
                                        reviews: reviews.rows
                                    }
                                });
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
                res.redirect('/');
            }
        });

    });

    //ajouter une review à l'album

    app.post('/album/addreview', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                console.log(req.body);
                var review = new Review(null, req.body.commentaire, req.body.note, null, idUser, req.body.idalbum);
                reviewDAO.create(review, {
                    success: function (savedReview) {
                        res.status(200);
                        res.redirect('/album/' + savedReview.idalbum);
                    },

                    fail: function () {
                        res.status(500);
                        res.render('pages/error/error');
                    }
                })

            },
            fail: function () {
                res.status(403);
                res.redirect('/');
            }
        });

    });

    app.delete('/album/delete/:id', function (req, res) {
        console.log('_______delete______');
        authService.authenticate(req, {
            success: function (id) {
                console.log('connecté');
                userDAO.getById(id, {
                    success: function (user) {
                        if (user.isadmin) {
                            albumDAO.delete(req.params.id, {
                                success: function (result) {
                                    console.log('delete success');
                                    res.status(200);
                                    res.redirect('/album');
                                },
                                fail: function (err) {
                                    console.log('delete tag fail');
                                    res.status(500);
                                    res.render('pages/error', {locals: {error: err, title: error, authenticated: true, isadmin: user.isadmin}});
                                }
                            });
                        } else {
                            console.log('access forbidden');
                            res.status(403);
                            res.render('pages/403', {locals: {title: 'error 403', authenticated: true}});
                        }
                    },
                    fail: function (err) {
                        console.log('getbyid  fail');
                        res.status(500);
                        res.render('pages/error', {locals: {error: err, title: error}});
                    }
                })
            },
            fail: function (error) {
                console.log('deconnecté')
                console.log('non connecté');
                res.status(403);
                res.render('pages/403', {locals: {title: 'error 403'}});
            }
        })
    });


}
