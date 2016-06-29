var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

// GET /signup -- just render the signup page
router.get('/', function(req, res) {
  res.render('signup.ejs');
});

// POST /signup -- create a new account and redirect to previous page user was at
router.post('/', function(req, res) {
  res.send("new account created!");
});


module.exports = router;
