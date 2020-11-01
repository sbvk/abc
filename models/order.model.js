var mongoose=require('mongoose');
var Cart=require('../models/cart.model');
var orderSchema= new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId, ref:'Customer'},
    email:{type:mongoose.Schema.Types.String, ref:'Customer'},
    //cart: {type: Object, required:true }
   firstname: {type:mongoose.Schema.Types.String, ref:'Customer'},
    
    date: {type:String}
    });
  

module.exports = mongoose.model('Order', orderSchema);