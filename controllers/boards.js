var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

// GET /boards displays a list of the boards the user has (i.e. "orange", "red")
router.get('/', function(req, res) {
  res.render('boards/index');
});

// DELETE /boards lets you delete boards and renders the /boards page
router.delete('/', function(req, res) {
  res.send("board deleted");
});

// GET /boards/:color displays the products that have been added by the user
router.get('/:color', function(req, res) {
  res.render('boards/show');
});

// PUT /boards/:color lets you remove products from a board and renders the /boards/:color page
router.put('/:color', function(req, res) {
  res.render('boards/index');
});


module.exports = router;
