const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
const { findById } = require('../models/photo.model');
var emp=new Image();
var Wish=require('../models/wish.model');
var Wishlist=require('../models/wishlist.model');
var Wishlist1=mongoose.model('Wishlist');

router.get('/:_id',function(req,res,next){
    var pid=req.params._id;
     var wish=new Wish(req.session.wish ? req.session.wish: {} );
    Image.findById(pid,function(err,product){
         if(err)
         {
             //return res.redirect('/');
             console.log('no wish');
             
         } else
         {      
         wish.add(product,product._id);
         req.session.wish=wish;
         console.log(req.session.wish);
        
         //res.redirect('/base');
        var wishlist=new Wishlist({
            id:req.user,
            wish:req.session.wish,
            email:req.user.email,
            firstname:req.user.firstname,
            date: new Date()

        }); 
        Wishlist1.find({wish:wishlist.wish},function(err,docs){
            if(!err) 
            console.log("already added");
            else
            console.log("new");
         });
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