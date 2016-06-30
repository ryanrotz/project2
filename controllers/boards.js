var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

// GET /boards displays a list of the boards the user has (i.e. "orange", "red")
router.get('/', isLoggedIn, function(req, res) {
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
router.post('/:colorname', function(req, res) {
  db.color.findOne({
    where: {
      name: req.params.colorname
    }
  }).then(function(color) {
    color.setItems(null).then(function() {      // deleting items from join table
      db.color.destroy({                    // then delete the color
        where: {
          name: req.params.colorname
        },
        // include: [db.item]
      })
      .then(function(color) {
        res.redirect("/boards");
      });
    });
  });
});

router.post('/items/:id', function(req, res) {
  db.item.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(item) {
    item.setColors(null).then(function() {      // deleting items from join table
      db.item.destroy({                    // then delete the color
        where: {
          id: req.params.id
        },
        // include: [db.item]
      })
      .then(function(item) {
        res.redirect("/boards");
      });
    });
  });
});



  // res.send("id: "+req.params.id);



// PUT /boards/:color lets you remove products from a board and renders the /boards/:color page
router.put('/:colorname', function(req, res) {
  res.render('boards/index');
});


module.exports = router;


