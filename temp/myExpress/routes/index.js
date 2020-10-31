var express = require('express');
var connect        = require('connect');
var methodOverride = require('method-override');
var router = express.Router();
const bodyParser = require("body-parser");
var sanatizer = require("express-sanitizer");

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use((sanatizer()));

router.use(methodOverride("_method"));



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog_post', { useNewUrlParser: true });
var blogSchema = new mongoose.Schema({
title:String,
image:String,
body:String,
created:{type:Date,default:Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);
// Blog.create({
//   title:"beautiful places to visit",
//   image:"https://images.unsplash.com/photo-1588469400471-a00ffc5ee0c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   body:"These are some of the most beautiful places to visit "
// });
router.get("/",function(req,res,next){
  res.redirect("/blogs");
})
router.get("/blogs",function(req,res,next){
Blog.find({},function(err,all){
if(err)
res.send("something went wrong!!!")
else res.render("index.ejs",{blogs:all});
});
});
router.get("/blogs/new",function(req,res,next){
res.render("new.ejs");
});
router.post("/blogs",function(req,res,next){
  req.body.body = req.sanitize(req.body.body);
  var x={
    title:req.body.title,
    image:req.body.image,
    body:req.body.body
  }
Blog.create(x,function(err,newBlog){
  if(err)
  res.send("something went wrong!!!")
  else res.redirect("/blogs");
})
});
router.get("/blogs/:id",function(req,res,next){
  Blog.findById(req.params.id,function(err,newB){
    if(err)
    res.send("something went wrong!!")
    else res.render("show.ejs",{blog:newB});
  });
});
router.get("/blogs/:id/edit",function(req,res,next){
Blog.findById(req.params.id,function(err,findblog){
  if(err)
  res.send("something went wrong!!!")
  else res.render("edit.ejs",{blog:findblog});
});
});
router.put("/blogs/:id",function(req,res,next){
  req.body.body = req.sanitize(req.body.body);
  
  var x={
    title:req.body.title,
    image:req.body.image,
    body:req.body.body
  }
  // console.log(x);
  Blog.findByIdAndUpdate(req.params.id,x,function(err,updatBlog){
    if(err)
    res.send("something went wrong!!!");
    else res.redirect("/blogs/" + req.params.id);
  })
});
router.delete("/blogs/:id",function(req,res,next){
  Blog.findByIdAndRemove(req.params.id,function(err){
    if(err)
    res.send("something went wrong!!")
    else res.redirect("/blogs");
  })
})
module.exports = router;

