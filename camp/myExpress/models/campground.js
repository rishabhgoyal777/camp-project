var mongoose=require('mongoose');
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    desc:String,
    price:String,
    comments:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
      }
    ],
     author:{
      id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        // we have embedded the id from the user because we can get the username from the if
        // we can embed whole user but we dont need the hash and the salt in the username
      },
      username:String
    }

  });
  module.exports = mongoose.model("Campground",campgroundSchema);