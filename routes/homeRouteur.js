const express = require('express');
const homeRoute = express.Router();


//authentifications method
const authService = require('./authService');

//BD
var pg = require('pg');
var url = process.env.DATABASE_URL;

//DTO et DAO

var userDAO = require('../models/user/userDAO')(pg, url);

//accueil
homeRoute.get('/', function (req, res) {
    console.log('home');

    authService().authenticate(req, {
        success: function (id) {
            console.log(req);
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
            res.render('pages/index', {title: 'Zicotech', authenticated: false});
        }
    });
});

module.exports = homeRoute;
