const express = require('express');
const userRoute = express.Router();


//authentifications method
const authService = require('./authService');


//BD
var pg = require('pg');
var url = process.env.DATABASE_URL;


//DTO et DAO
var User = require('../models/user/user');
var userDAO = require('../models/user/userDAO')(pg, url);

//inscription
userRoute.post('/add', function (req, res) {

  var user = new User(null, req.body.login, authService().hashPassword(req.body.password), req.body.email, false, null);
  userDAO.create(user, {
    success: function (savedUser) {
      var token = authService().createToken(savedUser.iduser);
      res.cookie('userToken', token, {expires: new Date(Date.now() + 900000), httpOnly: true});
      res.status(200).json(savedUser);
    },

    fail: function (errors) {
      res.status(500);
    }
  });
});

//connexion

userRoute.post('/signin', function (req, res) {
 console.log("signin");

  var user = new User(null, req.body.login, authService().hashPassword(req.body.password), req.body.email, false, null);
  userDAO.getByName(req.body.pseudo, {
    success: function (user) {
      if(authService().checkPassword(req.body.password,user.password)) {
        var token = authService().createToken(user.iduser);
        res.cookie('userToken', token, {expires: new Date(Date.now() + 900000), httpOnly: true});
        res.status(200).json(user);
      } else {
        res.status(401);
      }
    },
    fail: function (errors) {
      res.status(500);
    }
  });
});


module.exports = userRoute;
