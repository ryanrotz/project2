var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate( {
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
     passport.authenticate('local', {
      successRedirect: '/',       // change so that it redirects you to the previous page you were at
      successFlash: 'User created. You are logged in.'
     })(req, res);
    } else {
      console.log('user with that email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    console.log('error occured', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

  // change so that it redirects you to the previous page you were at
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   // delete req.session.returnTo,

//   successFlash: 'You are now logged in',
//   failureRedirect: '/auth/login'
// }));

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/auth/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      res.redirect(req.session.returnTo || '/');
      delete req.session.returnTo;
    });
  })(req, res, next);
});

// // Code from Custom Callback section of http://passportjs.org/docs
// app.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });




router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
