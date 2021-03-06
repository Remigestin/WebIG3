module.exports.controller = function (app, authService, pool) {

    const escape = require("html-escape");

//DTO et DAO
    var Album = require('../models/album/album');
    var albumDAO = require('../models/album/albumDAO')(pool);

    var userDAO = require('../models/user/userDAO')(pool);

    var Review = require('../models/review/review');
    var reviewDAO = require('../models/review/reviewDAO')(pool);


//afficher la page d'un album

    app.get('/album/detail/:id', function (req, res) {

        albumDAO.getById(req.params.id, {
            success: function (album) {
                reviewDAO.getByAlbum(album.idalbum, {
                    success: function (reviews) {
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
                var review = new Review(null, req.body.commentaire, req.body.note, null, idUser, req.body.idalbum);
                reviewDAO.create(review, {
                    success: function (savedReview) {
                        res.status(200);
                        res.redirect('/album/detail/' + savedReview.idalbum);
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

    //supprimer un album
    app.delete('/album/delete/:id', function (req, res) {

        authService.authenticate(req, {
            success: function (id) {
                userDAO.getById(id, {
                    success: function (user) {
                        if (user.isadmin) {
                            albumDAO.delete(req.params.id, {
                                success: function (result) {
                                    res.status(200);
                                    res.redirect('/album');
                                },
                                fail: function (err) {
                                    res.status(500);
                                    res.render('pages/error/error', {
                                        locals: {
                                            error: err,
                                            title: error,
                                            authenticated: true,
                                            isadmin: user.isadmin
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(403);
                            res.render('pages/error/403', {locals: {title: 'error 403', authenticated: true}});
                        }
                    },
                    fail: function (err) {
                        console.log('getbyid  fail');
                        res.status(500);
                        res.render('pages/error/error', {locals: {error: err, title: error}});
                    }
                })
            },
            fail: function (error) {
                console.log('deconnecté');
                res.status(403);
                res.render('pages/403', {locals: {title: 'error 403'}});
            }
        })
    });

    //accéder au formulaire d'ajout d'un album
    app.get('/album/add', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                userDAO.getById(idUser, {
                    success: function (user) {
                        if (user.isadmin) {
                            res.status(200);
                            res.render('pages/album/ajoutAlbum', {
                                locals: {
                                    title: "Ajout Album",
                                    authenticated: true,
                                    isadmin: user.isadmin
                                }
                            });
                        }
                        else {

                            res.status(500);
                            res.render('pages/error/error');
                        }
                    },
                    fail: function (err) {
                        res.status(500);
                        res.render('pages/error/error');
                    }
                });
            },
            fail: function (err) {
                console.log('non connecté');
                res.status(403);
                res.render('pages/403', {locals: {title: 'error 403'}});
            }
        });
    });

//ajouter un album
    app.post('/album/add', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                userDAO.getById(idUser, {
                    success: function (user) {
                        if (user.isadmin) {
                            var album = new Album(null, escape(req.body.nomalbum), escape(req.body.nomartiste), escape(req.body.prixalbum), escape(req.body.imagealbum), escape(req.body.descriptionalbum), escape(req.body.anneealbum), escape(req.body.genrealbum));
                            albumDAO.create(album, {
                                success: function (savedAlbum) {
                                    res.status(200);
                                    res.redirect('/album/detail/' + savedAlbum.idalbum);
                                },
                                fail: function (err) {
                                    res.status(500);
                                    res.render('pages/error/error');
                                }
                            })
                        }
                        else {
                            res.status(500);
                            res.render('pages/error/error');
                        }

                    },
                    fail: function (err) {
                        res.status(500);
                        res.render('pages/error/error');
                    }
                })

            },
            fail: function (err) {
                console.log('non connecté');
                res.status(403);
                res.render('pages/403', {locals: {title: 'error 403'}});
            }

        });
    });

//accéder au formulaire de modification d'un album
    app.get('/album/update/:id', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                userDAO.getById(idUser, {
                    success: function (user) {
                        if (user.isadmin) {
                            albumDAO.getById(req.params.id, {
                                success: function (album) {
                                    res.status(200);
                                    res.render('pages/album/modifAlbum', {
                                        locals: {
                                            title: "Modifier Album",
                                            authenticated: true,
                                            isadmin: user.isadmin,
                                            album: album
                                        }
                                    });
                                },
                                fail: function (err) {
                                    res.status(403);
                                    res.render('pages/error/403');
                                }
                            });
                        }
                        else {
                            res.status(403);
                            res.render('pages/error/403');
                        }
                    },
                    fail: function (err) {
                        res.status(500);
                        res.render('pages/error/error');
                    }
                });
            },
            fail: function (err) {
                res.status(403);
                res.render('pages/error/403', {locals: {title: 'error 403'}});
            }
        });
    });

    //modifier un album
    app.put('/album/update', function (req, res) {
        authService.authenticate(req, {
            success: function (idUser) {
                userDAO.getById(idUser, {
                    success: function (user) {
                        if (user.isadmin) {
                            var album = new Album(escape(req.body.idalbum), escape(req.body.nomalbum), escape(req.body.nomartiste), escape(req.body.prixalbum), escape(req.body.imagealbum), escape(req.body.descriptionalbum), escape(req.body.anneealbum), escape(req.body.genrealbum));
                            albumDAO.update(album, {
                                success: function () {
                                    res.status(200);
                                    res.redirect('/album/detail/' + album.idalbum);
                                },
                                fail: function (err) {
                                    res.status(500);
                                    res.render('pages/error/error');
                                }
                            })
                        }
                        else {
                            res.status(500);
                            res.render('pages/error/error');
                        }

                    },
                    fail: function (err) {
                        res.status(500);
                        res.render('pages/error/error');
                    }
                })

            },
            fail: function (err) {
                res.status(403);
                res.render('pages/error/403', {locals: {title: 'error 403'}});
            }
        });
    });
}