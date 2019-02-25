const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn ,function(req, res, next) {
  res.render('user/profile');
});

router.get('/logout',isLoggedIn,function(req,res,next){
  req.logout();
  res.redirect('/');
});

router.use('/',notLoggedIn,function(req,res,next) {
  next();
});

router.get('/signup',
  function(req, res, next) {
    let messages = req.flash('error');
    console.log(messages);
    res.render('user/signup', {
      csrfToken: req.csrfToken(),
      messages: messages,
      hasErrors: messages.lenght > 0
    });
  });

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));


router.get('/signin', function(req, res, next) {
  let messages = req.flash('error');
  console.log('NOT the flash mistake');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.lenght > 0
  });
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));





module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
