const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
var Cart=require('../models/cart.model');
var Order=require('../models/order.model');

router.get('/', function(req,res,next){
    Order.find({id:req.user},function(err,orders){
        if(err){
            console.log(err);
        }
        var cart;//console.log(orders);
        orders.forEach(function(order){
            cart=new Cart(order.cart);
           order.items=cart.generateArray();
            
        });
        res.render('myorder/orders',{orders:orders});
    }); 

   

});
 
module.exports=router;