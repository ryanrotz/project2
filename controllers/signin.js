var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

// GET -- render the sign in page
router.get('/', function(req, res) {
  res.render('signin.ejs');
});

// POST -- if login info is correct, (change the session?) and redirect to previous page user was at
router.post('/', function(req, res) {
  res.send("login is successful!");
});

module.exports = router;
