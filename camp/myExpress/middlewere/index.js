// this file is created to add all the middlewere functions used in campground.js Comment.js and app.js files and we will export the object

var middleObj={};
var Campground = require('../models/campground.js');
var User  =                  require('../models/user.js')
var Comment = require('../models/comment.js');

middleObj.commentOwner = function(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,comment){
                if(err){
                req.flash('error','Something went wrong. Please try again')
                res.redirect('back');
                }
            else {
                // .equals function is given by mongoose 
                // we cant use === because camp.author.id is object where the req.user._id is string
                    if(comment.author.id.equals(req.user._id)){
                        next();
                    }
                else{
                    req.flash('error','you are not allowed to do this');
                     res.redirect('back');
                }
                }
            })
        }
    else{
        req.flash('error','Please log in ')
        res.redirect('back');
    }
        
}

middleObj.campgroundOwner = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,camp){
            if(err){
                req.flash('error','Something went wrong. Please try again')
                res.redirect('back');
            }
        else {
            // .equals function is given by mongoose 
            // we cant use === because camp.author.id is object where the req.user._id is string
                if(camp.author.id.equals(req.user._id)){
                    next();
                }
               else{ 
                req.flash('error','you are not allowed to do this')
                res.redirect('back');
                }
            }
        })
    }
   else{
       req.flash('error','Please log in ')
       res.redirect('back');
   }
    
}

middleObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated())
    return next();

    // if not logged in than we will use req.flash and pass the message and use in /login to display it only when this code is run
    // that is when user is not logged in and try bond punge
    // THIS IS ONE TIME THING
    req.flash('error','please login first');
    res.redirect('/login');
  }

  module.exports = middleObj;