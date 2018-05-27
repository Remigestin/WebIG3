module.exports.controller = function (app, authService) {





//BD
    var pg = require('pg');
    var url = process.env.DATABASE_URL;

//DTO et DAO

    var userDAO = require('../models/user/userDAO')(pg, url);
    var albumDAO = require('../models/album/albumDAO')(pg, url);

//accueil
    app.get('/', function (req, res) {
        console.log('home');

        albumDAO.getAll({
            success: function (albums) {
                authService.authenticate(req, {
                    success: function (id) {
                        console.log('check oui');
                        userDAO.getById(id, {
                            success: function (user) {
                                res.status(200);
                                res.render('pages/index', {
                                    title: 'Zicotech',
                                    authenticated: true,
                                    albums: albums.rows,
                                    isadmin: user.isadmin,
                                    pseudo: user.pseudo
                                });
                            },
                            fail: function (err) {

                                res.status(500);
                                res.render('pages/error/error');
                            }
                        });
                    },

                    fail: function () {
                        console.log('check non');
                        res.status(200);
                        res.render('pages/index', {title: 'Zicotech', authenticated: false, albums: albums.rows});
                    }
                });
            },
            fail: function (err) {
                res.status('500');
                res.render('pages/error/error');
            }
        });

    });

}
