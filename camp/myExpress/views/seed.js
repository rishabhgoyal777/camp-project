var mongoose=require('mongoose');
var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');
var camps = [
    {name:'salmon creek',
     image:'https://images.unsplash.com/photo-1564890114015-e967754e2217?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
     desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum, eros sit amet euismod tincidunt, purus nisl vestibulum purus, eu elementum est nunc vitae mi. Aenean vel feugiat diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis libero ante. Curabitur eget rutrum nulla. Nullam laoreet rhoncus justo, in luctus elit sollicitudin ut. Sed pretium justo sem. Ut ac elit justo. In ac elementum sapien. Nulla laoreet quis nulla sit amet sodales. Aliquam dictum mauris risus, sagittis sodales ligula tristique eget. Pellentesque pellentesque dictum diam. Morbi et molestie risus. Nam et ultricies enim.'    
    },
    {name:'Granite hill',
     image:'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
     desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum, eros sit amet euismod tincidunt, purus nisl vestibulum purus, eu elementum est nunc vitae mi. Aenean vel feugiat diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis libero ante. Curabitur eget rutrum nulla. Nullam laoreet rhoncus justo, in luctus elit sollicitudin ut. Sed pretium justo sem. Ut ac elit justo. In ac elementum sapien. Nulla laoreet quis nulla sit amet sodales. Aliquam dictum mauris risus, sagittis sodales ligula tristique eget. Pellentesque pellentesque dictum diam. Morbi et molestie risus. Nam et ultricies enim.'    
    },
    
    {name:'frungant mountain',
     image:'https://images.unsplash.com/photo-1564849660700-524de8cb5ef9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
     desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum, eros sit amet euismod tincidunt, purus nisl vestibulum purus, eu elementum est nunc vitae mi. Aenean vel feugiat diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis libero ante. Curabitur eget rutrum nulla. Nullam laoreet rhoncus justo, in luctus elit sollicitudin ut. Sed pretium justo sem. Ut ac elit justo. In ac elementum sapien. Nulla laoreet quis nulla sit amet sodales. Aliquam dictum mauris risus, sagittis sodales ligula tristique eget. Pellentesque pellentesque dictum diam. Morbi et molestie risus. Nam et ultricies enim.'    
    }
    
        ];
function seedDB(){
    Campground.remove({},function(err){
    //     if(err)
    //     console.log(err);
    //     else {
    //         console.log('previous campgounds are removed');
    //         camps.forEach(function(camp){
    //             Campground.create(camp,function(err,x){
    //                 if(err)
    //                 console.log(err);
    //                 else{ 
    //                     Comment.create({text:'awesome place to visit',
    //                 author:'homer'},function(err,comment){
    //                     if(err)
    //                     console.log(err);
    //                     else{
    //                         x.comments.push(comment);
    //                         x.save();
    //                         console.log('new comment added');
    //                     }
    //                 })
    //                     }
    //             });
    //         });
    //     }
    });
}

// function seedDB(){
//     camps.forEach(function(camp){
//         Campground.create(camp,function(err,newcamp){
//             if(err)
//             console.log(err);
//             else{
//                 Comment.create({text:'hello',author:'homer'},function(err,comment){
//                     if(err)
//                     console.log(err);
//                     else{
//                         newcamp.comments.push(comment);
//                         newcamp.save();
//                         console.log(newcamp);
//                     }
//                 })
//             }
//         })
//     })
// }
module.exports = seedDB;