const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express-validator');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passportField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({
    min: 4
  });
  let errors = req.validationErrors();
  if (errors) {
    let messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    console.log(messages);
    req.flash('error', messages);
    return done(null, false);
  }
  User.findOne({
    'email': email
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, {
        message: 'Email is alredy in use'
      });
    }
    let newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save(function(err, result) {
      if (err) {
        return done(err);
      }
      console.log('User saved!!!!!!!!!!!');
      return done(null, newUser);
    });
  });
}));

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty();
  let errors = req.validationErrors();
  if (errors) {
    let messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    console.log(messages);
    return done(null, false,req.flash('error', messages));
  }
  User.findOne({
    'email': email
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'No user find'
      });
    }
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Wrong passport'
      });
    }
    return done(null, user);
  });
}));
