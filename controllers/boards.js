var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

// GET /boards displays a list of the boards the user has (i.e. "orange", "red")
router.get('/', function(req, res) {
  db.color.findAll()
  .then(function(colors) {
    res.render('boards/index', { colors: colors });
  });
});

// GET /boards/:color displays the products that have been added by the user
router.get('/:colorname', function(req, res) {
  db.color.find({
    where: {
      name: req.params.colorname
    },
    include: [db.item]
  }).then(function(colors) {
    // res.send(colors);
  res.render('boards/show', { colors: colors.items });
  });
});

// DELETE /boards lets you delete boards and renders the /boards page
// router.delete('/:colorname', function(req, res) {
//   var boardToDelete = req.params.colorname;
//   res.send("board deleted");
// });


// PUT /boards/:color lets you remove products from a board and renders the /boards/:color page
router.put('/:colorname', function(req, res) {
  res.render('boards/index');
});


module.exports = router;


