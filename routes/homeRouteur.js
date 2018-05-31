module.exports.controller = function (app, authService, pool) {


//DTO et DAO

    var userDAO = require('../models/user/userDAO')(pool);
    var albumDAO = require('../models/album/albumDAO')(pool);

//accueil
    app.get('/', function (req, res) {
        console.log('home');

        albumDAO.getAll({
            success: function (albums) {
                authService.authenticate(req, {
                    success: function (id) {
                        userDAO.getById(id, {
                            success: function (user) {
                                res.status(200);
                                res.render('pages/index', {locals: {
                                        title: 'Zicotech',
                                        authenticated: true,
                                        albums: albums.rows,
                                        isadmin: user.isadmin,
                                        pseudo: user.login
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
                        res.status(200);
                        res.render('pages/index', {locals: {title: 'Zicotech', authenticated: false, albums: albums.rows}});
                    }
                });
            },
            fail: function (err) {
                res.status('500');
                res.render('pages/error/error');
            }
        });

    });

    //barre de recherche
    app.post('/', function (req, res) {
        console.log('homeSearch');

        albumDAO.getBySearch(req.body.search,{
            success: function (albums) {
                authService.authenticate(req, {
                    success: function (id) {
                        console.log('check oui');
                        userDAO.getById(id, {
                            success: function (user) {
                                res.status(200);
                                res.render('pages/index', {locals: {
                                        title: 'Zicotech',
                                        authenticated: true,
                                        albums: albums.rows,
                                        isadmin: user.isadmin,
                                        pseudo: user.login
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
                        res.status(200);
                        console.log(albums.rows);
                        res.render('pages/index', {locals: {title: 'Zicotech', authenticated: false, albums: albums.rows}});
                    }
                });
            },
            fail: function (err) {
                res.status(200);
                res.render('pages/index', {locals: {title: 'Zicotech', authenticated: false, albums: []}});
            }
        });

    });

}
