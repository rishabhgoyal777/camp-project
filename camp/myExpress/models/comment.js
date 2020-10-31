var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    text:String,
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
  module.exports = mongoose.model("Comment",commentSchema);