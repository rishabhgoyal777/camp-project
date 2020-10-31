var express = require('express');
var router = express.Router();
var mongoose =               require('mongoose');
var passport =               require('passport');
var bodyParser =             require('body-parser');
var LocalStrategy =          require('passport-local');
var passportLocalMongoose =  require('passport-local-mongoose');
var User  =                   require('../models/user.js');
mongoose.connect('mongodb://localhost:27017/authentication', { useNewUrlParser: true });
/* GET home page. */
router.use(require('express-session')({
  secret: 'this is my personal secret',
  resave: false,
  saveUninitialized:false
  }));

router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

router.get('/', function(req, res, next) {
  res.render('home.ejs');
});
function isLoggedIn(req,res,next){
if(req.isAuthenticated())
return next();
res.redirect('/login');
};
router.get('/secret',isLoggedIn,function(req,res,next){
  res.render('secret.ejs');
})
router.get('/register',function(req,res,next){
  res.render('register.ejs');
})
router.post('/register',function(req,res,next){
  User.register(new User({username: req.body.username}),req.body.password,function(err,user){
    if(err){
      console.log(err);
      res.send('sorry');
    }
    console.log(user);
    passport.authenticate('local')(req,res,function(){
      res.redirect('/secret');
    })

  })
})
router.get('/login',function(req,res,next){
  res.render('login.ejs');
})
router.post('/login',passport.authenticate('local',
{
  successRedirect:'/secret',
  failureRedirect:'/login'
}),function(req,res,next){

});

router.get('/logout',function(req,res,next){
  req.logout();
  res.redirect('/');
})

module.exports = router;
