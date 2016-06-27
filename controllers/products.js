var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();


// GET /products -- displays all home decor products? Probably won't be used...?
router.get('/', function(req, res) {
  res.render('products/index');
});

// GET /products/:color  -- displays products that are a certain color
router.get('/:color', function(req, res) {
  res.render('products/show');
});





module.exports = router;
