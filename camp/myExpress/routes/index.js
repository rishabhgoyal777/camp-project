var express =                require('express');
var methodOverride=          require('method-override');
var router =                 express.Router();
var mongoose =               require("mongoose");
var passport =               require('passport');
var bodyParser =             require('body-parser');
var LocalStrategy =          require('passport-local');
var passportLocalMongoose =  require('passport-local-mongoose');
var User  =                  require('../models/user.js');
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
var commentRoutes = require('../routes/comment.js');
var appRoutes = require('../routes/app.js');
var campgroundRoutes=require('../routes/campground.js');
var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');
var seedDB = require('../views/seed.js');
// seedDB(); 
// to seed the database
router.use(methodOverride('_method'));
// if we want to add the flash messeges on error handling or log in issues
// there is a package to install and we will use req.flash() and pass in the message and use it in the ejs files but it will display 
// only when we hit the code where we are redirected to the back
var flash = require('connect-flash');




// ===================================================================================================================================================
// these are the must for authentication
router.use(require('express-session')({
  secret: 'shhh this is secret',
  resave: false,
  saveUninitialized:false
  }));
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
router.use(flash());
// ===============================================================================================================================================
// creating two campgrounds in the database explicitly
//  Campground.create({name:"Salmon Creek",
//                 image:"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e5074417c2e78d19145c7_340.jpg",
//                 desc:"This is the beautiful Salmon Creek on the roadside village !!!"
//                  },function(err,campground){
//                      if(err)
//                      console.log("something went wrong!!");
//                      else console.log(campground);
//                  });
                

// Campground.create({ name:"Granite Hill",
//                     image:"https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e5074417c2e78d19145c7_340.jpg",
//                     desc:"This is Granite Hill at the top of the mountain and is very scary !!!"
//                 },function(err,campground){
//                     if(err)
//                     console.log("something went wrong!!!")
//                     else console.log(campground);
//                 });
// /* GET home page. */

// to delete all the campgrounds from  the database
// Campground.remove().exec();



// to find all the campgrounds in the database
// Campground.find({},function(err,all){
//     if(err)
//     console.log("error");
//     else console.log(all);
// })
// campgrounds array
// var campgrounds = [{name:"Salmon Creek",image:"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e5074417c2e78d19145c7_340.jpg"},
//                    {name:"Granite Hill",image:"https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e5074417c2e78d19145c7_340.jpg"},
//                    {name:"Mountain Goat's Rest",image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547940742c7ed29f4f_340.jpg"},
//                    {name:"Salmon Creek",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e5074417c2e78d19145c7_340.jpg.png"},
//                    {name:"Granite Hill",image:"https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e5074417c2e78d19145c7_340.jpg.jpg"},
//                    {name:"Mountain Goat's Rest",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417c2e78d19145c7_340.jpg.jpg"}            
//                     ];
// ======middlewere function to check if user is logged in 
// this code can only help in back end for front end uses we have to use ejs

// this function make variables global that is we dont need to pass the variables to the ejs files
router.use(function(req,res,next){
  res.locals.currentUser=req.user;
  // res.locals.message=req.flash('error');
  // message can be used in any ejs file and its value is dynamic
  // message can be used in any ejs file but it will be displayed only when req.flash() run

// now we will use success and error instead of message coz we need tow type of global messages

  res.locals.success = req.flash('success');
  res.locals.error   = req.flash('error');



  next();
})
router.use(appRoutes);
router.use(commentRoutes);
router.use('/campgrounds',campgroundRoutes);
module.exports = router;









