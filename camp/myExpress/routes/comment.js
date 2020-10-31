var express =                require('express');
var router =                 express.Router();
var mongoose =               require("mongoose");
var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');
var middlewere = require('../middlewere/index.js');
// function isLoogedIn(req,res,next){
//     if(req.isAuthenticated())
//     return next();
//     res.redirect('/login');
//   }
router.get("/campgrounds/:id/comments/new",middlewere.isLoggedIn,function(req,res,next){
    Campground.findById(req.params.id,function(err,camp){
      if(err)
      console.log(err);
      else{
          console.log(camp);
      res.render('newcomment.ejs',{camp:camp});
      }
    })
   //  isLoogedIn is added in post because no one can post even from postman
    router.post("/campgrounds/:id/comments/",middlewere.isLoggedIn,function(req,res,next){
      var comment = {
         text:req.body.text,
         author:req.body.author
       };
       Campground.findById(req.params.id,function(err,camp){
         if(err)
         res.send("!!!");
         else{
           Comment.create(comment,function(err,newC){
             if(err)
             res.send('!!!');
             else{
                newC.author.id=req.user._id;
                newC.author.username=req.user.username;
                // now we have the username from the user
                // initially we have the username form but now we have deleted it and taking it from the username of user
                newC.save();
               camp.comments.push(newC);
               camp.save();
               req.flash('success','comment added');
               res.redirect('/campgrounds/' + camp._id);
             }
           })
           
         }
       })
    });
   });



  //  if we want to edit the comment according to the restful routes the
  // the route should be of type /campgrounds/:id/comments/:comment_id/edit

  router.get('/campgrounds/:id/comments/:comment_id/edit',middlewere.commentOwner,function(req,res,next){
    Comment.findById(req.params.comment_id,function(err,comment){
      if(err)res.send('something went wrong!!!')
      else res.render('commentedit.ejs',{campid:req.params.id,comment:comment});
    })
    
  })

  router.put('/campgrounds/:id/comments/:comment_id',middlewere.commentOwner,function(req,res,next){
    var x={
      text:req.body.text
  }
  Comment.findByIdAndUpdate(req.params.comment_id,x,function(err,camp){
      if(err)
      res.redirect('/');
      else{
        res.flash('success','comment updated');
      res.redirect('/campgrounds/' + req.params.id );
      }
  })
  })

  // ========delete route
  router.delete('/campgrounds/:id/comments/:comment_id',middlewere.commentOwner,function(req,res,next){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
      if(err)
      res.redirect('back');
      else{
        res.flash('success','comment deleted');
        res.redirect('/campgrounds/' + req.params.id);
      }
    })
  })









  // ===middlewere function to check the autherisation of the comment

//   function commentOwner(req,res,next){
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id,function(err,comment){
//             if(err)
//             res.redirect('back');
//         else {
//             // .equals function is given by mongoose 
//             // we cant use === because camp.author.id is object where the req.user._id is string
//                 if(comment.author.id.equals(req.user._id)){
//                     next();
//                 }
//                else res.redirect('back');
//             }
//         })
//     }
//    else{
//        res.redirect('back');
//    }
    
// }
   module.exports = router;