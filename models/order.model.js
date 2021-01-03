var mongoose=require('mongoose');
var Cart=require('../models/cart.model');
var orderSchema= new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId, ref:'Customer'},
    cart: {type: Object, required:true },
    qty:{type:Number,required:true},
    totalprice:{type:Number,required:true},
    email:{type:mongoose.Schema.Types.String, ref:'Customer'},
    date: {type:String}
    });
  

module.exports = mongoose.model('Order', orderSchema);