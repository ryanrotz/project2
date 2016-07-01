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

// app.get('/', function(req, res) {

//     var qs = {
//       s: 'star wars'
//     };

//   request({
//     url: 'http://www.omdbapi.com',
//     qs: qs
//   }, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var dataObj = JSON.parse(body);
//       res.send(dataObj.Search);
//     }
//   });
//   // res.render('index');
// });

app.get('/', function(req, res) {

// var opHelper = new OperationHelper({
//     awsId: process.env.AWS_ID,
//     awsSecret: process.env.AWS_SECRET,
//     assocId: process.env.ASSOC_ID,
// });

// opHelper.execute('ItemSearch', {
//   'SearchIndex': 'HomeGarden',
//   'Keywords': 'orange',  // change to req.body
//   'ResponseGroup': 'ItemAttributes,Offers,VariationMatrix',
//   'Sort': 'titlerank'
// }).then((response) => {
//   // This returns "yellow". This parameter excludes a lot of products that match the color. Don't use it.
//   // res.send(response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.Color);
//   // res.send(response.result);
// var itemArr = response.result.ItemSearchResponse.Items.Item;
//   // res.render('products/index', {itemArr: itemArr});
//   res.send(itemArr);

  // console.log("Results object: ", response.result);
  // console.log("Raw response body: ", response.responseBody);
// }).catch((err) => {
//     console.error("Something went wrong! ", err);
// });

res.render('index');
});



// creates a board on the user's board page and redirects to products/:color
// app.post('/', function(req, res) {
//   console.log('posted color: ' + req.body.color);
//     res.render('products/index');
// });



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
