var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });

var campgroundSchema = new mongoose.Schema({
  name:String,
  image:String,
  desc:String
});
var Campground = mongoose.model("Campground",campgroundSchema);
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
router.get("/",function(req,res,next){
res.render("landing.ejs");
});


router.get("/campgrounds",function(req,res,next){
Campground.find({},function(err,allcampgrounds){
    if(err)
    res.send("error 404!!!")
    else res.render("index.ejs",{campgrounds:allcampgrounds});
})
// res.render("campgrounds.ejs",{campgrounds:campgrounds});

});
router.post("/campgrounds",function(req,res,next){
var name=req.body.name;
var image=req.body.image;
var desc=req.body.desc;
var x={name:name,image:image,desc:desc};
// campgrounds.push(x);
Campground.create(x,function(err,newCamp){
if(err)
res.send("error 404!!!")
else res.redirect("/campgrounds");
})

});
router.get("/campgrounds/new",function(req,res,next){
res.render("new.ejs");
});
router.get("/campgrounds/:id",function(req,res,next){
  var x=req.params.id;
  Campground.findById(x,function(err,camp){
      if(err)
      res.send("something went wrong   error 404!!!");
      else 
      {     
        //   console.log(camp);
          res.render("show.ejs",{campground:camp});
          
          }
  })
 
});

module.exports = router;










