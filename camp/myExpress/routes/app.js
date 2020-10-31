var express =                require('express');
var router =                 express.Router();
var mongoose =               require("mongoose");
var passport =               require('passport');
var bodyParser =             require('body-parser');
var LocalStrategy =          require('passport-local');
var passportLocalMongoose =  require('passport-local-mongoose');
var User  =                  require('../models/user.js')
// function isLoogedIn(req,res,next){
//     if(req.isAuthenticated())
//     return next();
//     res.redirect('/login');
//   }
  router.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
  })
  
  router.get("/",function(req,res,next){
    req.flash('success','Welcome to the home page');
  res.render("landing.ejs");
  });
  
  
  
  
  router.get('/register',function(req,res,next){
    res.render('register.ejs');
  });
  
  router.post('/register',function(req,res,next){
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
      if(err){
        console.log(err);
        req.flash('error',err.message);
        res.redirect('back');
      }
      console.log(user);
      passport.authenticate('local')(req,res,function(){
        req.flash('success','successfully registered')
        res.redirect('/campgrounds');
      })
  
    })
  })
  
  
  router.get('/login',function(req,res,next){

    res.render('login.ejs');
  })
  router.post('/login',passport.authenticate('local',
  {
    successRedirect:'/campgrounds',
    failureRedirect:'/login'
  }),function(req,res,next){
  
  });
  
  router.get('/logout',function(req,res,next){
    req.logout();
    req.flash('success','logged out successfully')
    res.redirect('/');
  })
module.exports= router;  