module.exports.controller = function (app, authService, pool) {







//DTO et DAO
    var User = require('../models/user/user');
    var userDAO = require('../models/user/userDAO')(pool);


//inscription

    app.get('/user/signup', function(req, res) {
        res.render('pages/user/signup', {title: 'Inscription'});
    });

    app.post('/user/signup', function (req, res) {
        console.log("adduser");
        userDAO.getByPseudo(req.body.login, {
            success: function(user) {
                res.render('pages/user/signup', {locals:{title: 'Inscription', alreadyExist: true}});
            },

            fail: function() {
                var user = new User(null, req.body.login, authService.hashPassword(req.body.password), req.body.email, false, null);
                userDAO.create(user, {
                    success: function (savedUser) {
                        var token = authService.createToken(savedUser.iduser);
                        res.cookie('Zicotech', token, {expires: new Date(Date.now() + 900000), httpOnly: true});
                        res.status(200);
                        res.redirect('/');
                    },

                    fail: function (errors) {
                        res.status(500);
                    }
                });
            }
        });

    });

//connexion
    app.get('/user/signin', function (req, res) {
      res.render('pages/user/signin', {title: 'Connexion'});
    });

    app.post('/user/signin', function (req, res) {

        userDAO.getByPseudo(req.body.pseudo, {

            success: function (user) {
                if (authService.checkPassword(req.body.password, user.password)) {
                    var token = authService.createToken(user.iduser);
                    res.cookie('Zicotech', token, {expires: new Date(Date.now() + 900000), httpOnly: true});
                    res.status(200);
                    res.redirect('/');

                } else {
                    res.status(401);
                    res.render('pages/user/signin', {locals:{title: 'Connexion', wrongPassword: true}});
                }
            },
            fail: function (errors) {
                res.status(401);
                res.render('pages/user/signin', {locals:{title: 'Connexion', wrongPseudo: true}});

            }
        });
    });

    //deconnexion
    app.get('/user/signout', function(req, res){
        res.clearCookie('Zicotech');
        res.redirect('/');
    })






}
