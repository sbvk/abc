const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
var Wishlist1=mongoose.model('Wishlist');
const { findById } = require('../models/wishlist.model');
var emp=new Image();
var Wish=require('../models/wish.model');
var Wishlist=require('../models/wishlist.model');
const { ensureAuthenticated } = require('../config/checkAuth');

router.get('/',ensureAuthenticated, function(req,res,next){
    var mysort = { date: -1 };
    Wishlist.find({id:req.user},function(err,orders){
        if(err){
            console.log(err);
        }
        var wish;//console.log(orders);
        orders.forEach(function(order){
            wish=new Wish(order.wish);
           order.items=wish.generateArray();
            
        });
        res.render('profile/profile',{orders:orders});
    }); 

   

});


router.post('/reduce/:_id',function(req,res,next){
    var pid=req.params._id;
    Wishlist1.findByIdAndDelete(pid, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
            req.flash('success','Removed item from wishlist');
            res.redirect('/ord');
        } 
    }); 
   
   
   
 });

 router.post('/remove',function(req,res,next){
  
   Wishlist1.deleteMany({id:req.user},function(err,docs){
    if(err){
        console.log(err);
    }
    
        else{ 
            console.log("Deleted : ", docs); 
            res.redirect('/ord');
            req.flash('success','Removed all items from wishlist');
           
        } 
    });
    
    
}); 
   /*
    Wishlist1.deleteMany(ido.id=req.user,function(err,docs){
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); */
   
   
   
 

 
module.exports=router;