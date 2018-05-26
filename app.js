var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    passport = require('passport');
    engine = require('ejs-locals');

// express-myconnection module

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
const port = process.env.PORT || 4000;

//view engine setup
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// router
var router = require('./routes/mainRouteur');
// routes


app.use('*',router);

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Resource Not Found');
    err.status = 404;
    next(err);
});

//Port d'écoute du fichier
const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});

module.exports = app;
