const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
var Order=require('../models/order.model');
var Order1=mongoose.model('Order');
var Cart=require('../models/cart.model');

router.get('/', function(req,res,next){
    var mysort = { date: -1 };
    Order1.find(function(err,orders){
        if(err){
            console.log(err);
        }
        var cart;//console.log(orders);
        orders.forEach(function(order){
            cart=new Cart(order.cart);
           order.items=cart.generateArray();
            
        }); var ct;
        Order1.countDocuments(function(err,ct){
            if(err){
                console.log(err);
            }
            console.log(ct);
       
        res.render('allorders/allorders',{orders:orders, ct:ct});
    })
    }); 

   

});

router.post('/reduce/:_id',function(req,res,next){
    var pid=req.params._id;
    Order1.findByIdAndDelete(pid, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
   
    res.redirect('/allorders');
   
 });

module.exports=router;