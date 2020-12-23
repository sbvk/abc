const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
const { findById } = require('../models/photo.model');
var emp=new Image();
var Cart=require('../models/cart.model');
var Cartlist=require('../models/cartlist.model');
const { ensureAuthenticated } = require('../config/checkAuth');
//var Wishlist1=mongoose.model('Wishlist');


router.get('/:_id',ensureAuthenticated,function(req,res,next){
    var pid=req.params._id;
     var cart=new Cart(req.session.cart ? req.session.cart: {} );
    Image.findById(pid,function(err,product){
         if(err)
         {
             //return res.redirect('/');
             console.log('no cart');
             
         } else
         {      
        cart.add(product,product._id);
         req.session.cart=cart;
         console.log(req.session.cart);
        
         //res.redirect('/base');
        
        var cartlist=new Cartlist({
            id:req.user,
            cart:req.session.cart,
            email:req.user.email,
            firstname:req.user.firstname,
            date: new Date()  

        }); /*
        Wishlist1.find({$and : [{wish:req.session.wish},{id:req.user}]},function(err,docs){
            if(!err) 
            console.log("already added");
            else
            //console.log("new");
            {
                wishlist.save(function(err,result){
                    if(err){
                        console.log(err);
                    }
                    else {
                    console.log('saved');
                    req.flash('success','saved');
                    req.session.wish=null;
                    res.redirect('/base');
                }
                });
            }
         });*/
        cartlist.save(function(err,result){
            if(err){
                console.log(err);
            }
            else {
            console.log('saved');
            req.flash('success','saved');
            req.session.cart=null;
            res.redirect('/base');
        }
        }); 
   
    }
     }); 
     
     //console.log(pid);
 });
 /*
router.get('/wish1', function(req,res,next){

    //res.render('shop/shopcart');
    if(!wish){
        console.log('noooo wish');
        return res.render('wishl/wish', {products:null});
    } else 
    {
        //var wish=new Wish(req.session.wish);
        res.render('wishl/wish', {products:wish.generateArray()});
        console.log('yess');
    }
}); */

module.exports=router;