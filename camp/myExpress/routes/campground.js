var express =                require('express');
var router =                 express.Router();
var mongoose =               require("mongoose");
var Campground = require('../models/campground.js');
var methodOverride=          require('method-override');
router.use(methodOverride('_method'));
var middlewere = require('../middlewere/index.js');

// function isLoogedIn(req,res,next){
//     if(req.isAuthenticated())
//     return next();
//     res.redirect('/login');
//   }
router.get("/",function(req,res,next){
    Campground.find({},function(err,allcampgrounds){
        if(err)
        res.send("error 404!!!")
        else res.render("index.ejs",{campgrounds:allcampgrounds});
    })
    // res.render("campgrounds.ejs",{campgrounds:campgrounds});
    });
    router.post("/",middlewere.isLoggedIn,function(req,res,next){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.desc;
    var author={
        id: req.user._id,
        username: req.user.username
    }
    var price=req.body.price;
    var x={name:name,image:image,desc:desc,author:author,price:price};
    // campgrounds.push(x);
    
    Campground.create(x,function(err,newCamp){
    if(err)
    res.send("error 404!!!")
    else     
    {
        console.log(newCamp);
    res.redirect("/"); 
    }
    })
    
    });
    router.get("/new",middlewere.isLoggedIn,function(req,res,next){
    res.render("new.ejs");
    });
    router.get("/:id",function(req,res,next){
     
      Campground.findById(req.params.id).populate('comments').exec(function(err,camp){
          if(err)
          res.send("something went wrong   error 404!!!");
          else 
          {     console.log(camp);
              // console.log(camp);
              res.render("show.ejs",{campground:camp});
              
              }
      })
     
    });

    // edit routes=============
    router.get('/:id/edit',middlewere.campgroundOwner,function(req,res,next){
        Campground.findById(req.params.id,function(err,camp){
            if(err)
            res.redirect('back');
            else res.render('campedit.ejs',{campground:camp});
        })
    })
    router.put('/:id',middlewere.campgroundOwner,function(req,res,next){
        
        var x={
            name:req.body.name,
            image:req.body.image,
            desc:req.body.desc,
            price:req.body.price
        }
        Campground.findByIdAndUpdate(req.params.id,x,function(err,camp){
            if(err)
            res.redirect('/');
            else
            res.redirect('/campgrounds/' + req.params.id);
        })
    })
    // ========================
    // delete route=============
    router.delete('/:id',middlewere.campgroundOwner,function(req,res,next){
        Campground.findByIdAndRemove(req.params.id,function(err){
            if(err)
            res.redirect('/');
            else res.redirect('/campgrounds');
        })
    })

    // middlewere function to check who is the owner of the post
    // function campgroundOwner(req,res,next){
    //     if(req.isAuthenticated()){
    //         Campground.findById(req.params.id,function(err,camp){
    //             if(err)
    //             res.redirect('back');
    //         else {
    //             // .equals function is given by mongoose 
    //             // we cant use === because camp.author.id is object where the req.user._id is string
    //                 if(camp.author.id.equals(req.user._id)){
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
    module.exports=router;
    // =========================
    