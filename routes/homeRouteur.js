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

//accueil
userRoute.get('/', function (req, res) {
    console.log('home');

    authService().authenticate(req, {
        success: function (id) {
            userDAO.getById(id, {
                success: function (user) {
                    res.status(200)
                    res.render('pages/index', {title: 'Zicotech', authenticated: true, isadmin: user.isadmin});
                },
                fail: function (err) {
                    res.render('pages/error');
                }
            });
        },

        fail: function () {
            res.status(200);
            res.render('pages/index', {title: 'Zicotech', authenticated: true, isadmin: user.isadmin});
        }
    });
});

module.exports = userRoute;
