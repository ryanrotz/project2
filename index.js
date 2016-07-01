var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var request = require('request');
var util = require('util');
var OperationHelper = require('apac').OperationHelper;
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());    // whenever someone logs in, it saves it in a session (using the user id, generated from ppConfig.js)
app.use(flash());     // it's important to have flash after session
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {

res.render('index');
});


app.get('/profile', function(req, res) {
  res.render('profile');
});


app.use('/auth', require('./controllers/auth'));
app.use('/products', require('./controllers/products'));
app.use('/boards', require('./controllers/boards'));
app.use('/signup', require('./controllers/signup'));
app.use('/signin', require('./controllers/signin'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
