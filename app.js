var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    passport = require('passport');
    engine = require('ejs-locals');
    favicon = require('serve-favicon');
    cookieParser = require('cookie-parser');

// express-myconnection module

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
const port = process.env.PORT || 4000;

app.use(cookieParser());


// get static files such as CSS
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/icone.png'));


//view engine setup
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

require('./routes/homeRouteur').controller(app);
require('./routes/userRouteur').controller(app);

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Resource Not Found');
    err.status = 404;
    next(err);
});

// error handling
app.use(function(err, req, res, next) {
    console.log('Erreur : \n' + err);
    if(err.status == 404) {
        res.render('pages/error/404', {
            title: 'Erreur', error: err
        });
    }
    else {
        res.render('pages/error/error', {
            title: 'Erreur',
            error: err
        });
    }
});


//Port d'écoute du fichier
const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});

module.exports = app;
