module.exports.controller = function (app, authService) {




//BD
    var pg = require('pg');
    var url = process.env.DATABASE_URL;


//DTO et DAO
    var User = require('../models/user/user');
    var userDAO = require('../models/user/userDAO')(pg, url);


//inscription

    app.get('/user/signup', function(req, res) {
        res.render('pages/user/signup', {title: 'Inscription'});
    });

    app.post('/user/signup', function (req, res) {
        console.log("adduser");
        var user = new User(null, req.body.login, authService.hashPassword(req.body.password), req.body.email, false, null);
        userDAO.create(user, {
            success: function (savedUser) {
                var token = authService().createToken(savedUser.iduser);
                res.cookie('Zicotech', token, {expires: new Date(Date.now() + 900000), httpOnly: true});
                res.status(200);
                res.redirect('/');
            },

            fail: function (errors) {
                res.status(500);
            }
        });
    });

//connexion
    app.get('/user/signin', function (req, res) {
      res.render('pages/user/signin', {title: 'Connexion'});
    });

    app.post('/user/signin', function (req, res) {
        console.log("signin");

        var user = new User(null, req.body.login, authService.hashPassword(req.body.password), req.body.email, false, null);
        userDAO.getByPseudo(req.body.pseudo, {
            success: function (user) {
                if (authService.checkPassword(req.body.password, user.password)) {
                    var token = authService.createToken(user.iduser);
                    res.cookie('Zicotech', token, {expires: new Date(Date.now() + 900000), httpOnly: true});
                    res.status(200);
                    res.redirect('/');

                } else {
                    res.status(401);
                }
            },
            fail: function (errors) {
                res.status(500);
            }
        });
    });
}
