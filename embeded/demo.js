var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/embedded',{useNewUrlParser:true});


var postSchema=new mongoose.Schema({
    title:String,
    content:String
});

var userSchema=new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
});
var User = mongoose.model('User',userSchema);
var Post = mongoose.model('Post',postSchema);
// var newUser= new User({
//     email:"harleensingh35@gmail.com",
//     name:"harleen singh"
// });
// newUser.posts.push({
//     title:"hello",
//     content:"hey there"
// });
// newUser.save(function(err,user){
// if(err)
// console.log(err);
// else console.log(user);
// })
// User.findOne({name:'harleen singh'},function(err,user){
// if(err)
// console.log(err);
// else{
//     console.log(user);
//     user.posts.push({
//         title:"i am the new one",
//         content:'miss me'
//     });
//     user.save(function(err,newOne){
//         if(err)
//         console.log(err);
//         else console.log(newOne);
//     })
// }
// });