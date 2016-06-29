var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();
var util = require('util'),
  OperationHelper = require('apac').OperationHelper;


// GET /products -- displays all home decor products? Probably won't be used...?
router.get('/', function(req, res) {

var opHelper = new OperationHelper({
    awsId: process.env.AWS_ID,
    awsSecret: process.env.AWS_SECRET,
    assocId: process.env.ASSOC_ID,
});

opHelper.execute('ItemSearch', {
  'SearchIndex': 'HomeGarden',
  'Keywords': req.query.color,  // change to req.body
  'ResponseGroup': 'ItemAttributes,Offers,VariationMatrix',
  'Sort': 'titlerank'
}).then((response) => {
  // This returns "yellow". This parameter excludes a lot of products that match the color. Don't use it.
  // res.send(response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.Color);
  // res.send(response.result);
var itemArr = response.result.ItemSearchResponse.Items.Item;
  res.render('products/index', {itemArr: itemArr, colorQuery : req.query.color});

  // res.send(itemArr);

  // console.log("Results object: ", response.result);
  // console.log("Raw response body: ", response.responseBody);
}).catch((err) => {
    console.error("Something went wrong! ", err);
});
});

// GET /products/:color  -- displays products that are a certain color
router.get('/:color', function(req, res) {
  res.render('products/show');
});

// POST When someone clicks on a product, it should cause a board to be created
router.post('/add', function(req, res) {
  // console.log('posted color: ' + req.body.color);
  // user must sign in to add something to the board
  console.log('step 1');
  db.color.findOrCreate({
    where: {name: req.body.color}
  }).spread(function(color, created) {
    console.log('step 2');
    db.board.findOrCreate({
      where: {
        colorId: color.id,
        userId: 1
        // userId: req.user.id
      }
    }).spread(function(board, created) {
      // res.render('products/show');
      console.log('step 3');
      db.item.findOrCreate({
        where: {
          name: req.body.title
        }
      }).spread(function(item, created) {
        console.log('step 4');
        res.send({color: color, board: board, item: item});
      })
    })
  // res.redirect('/products/');
  });
});







module.exports = router;