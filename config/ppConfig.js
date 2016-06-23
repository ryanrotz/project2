var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

// turning the user into just an id
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.user.findById(id)
  .then(function(user) {
    cb(null, user);
  }).catch(cb);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: { email: email }
  }).then(function(user) {
    if (user && user.validPassword(password)) {
      cb(null, user);
    } else {
      cb(null, false);    // we put false here because we don't want people to know when they enter a valid or invalid email
    }
  }).catch(cb);
}));

module.exports = passport;
