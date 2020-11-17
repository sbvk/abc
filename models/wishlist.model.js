var mongoose=require('mongoose');
var Wish=require('../models/wish.model');
var wishSchema= new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId, ref:'Customer'},
    wish:{type:Object, required:true},
    email:{type:mongoose.Schema.Types.String, ref:'Customer'},
    
   firstname: {type:mongoose.Schema.Types.String, ref:'Customer'},
    
    date: {type:String}
    });
  

module.exports = mongoose.model('Wishlist', wishSchema);