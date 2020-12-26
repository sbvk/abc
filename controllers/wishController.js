const { compare } = require('bcryptjs');
const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
const { findById } = require('../models/photo.model');
var emp=new Image();
var Wish=require('../models/wish.model');
var Wishlist=require('../models/wishlist.model');
var Wishlist1=mongoose.model('Wishlist');
const { ensureAuthenticated } = require('../config/checkAuth');

router.post('/:_id',ensureAuthenticated,function(req,res,next){
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
            var cid=req.user._id;
        Wishlist1.find({id:cid},function(err,docs){
            if(docs) 
            {  
                var wis=req.session.wish;
                //console.log(docs);
                var pro1=Object.values(wis);
                var p1=Object.entries(pro1);
                var pq1=Object.values(p1[0]);
                var s1=Object.values(pq1);
                var t1=s1[1];
                var g1=Object.values(t1);
                var h1=g1[0];
                var o1=h1.item._id;
                    console.log(o1); 
                    var k=[];
                docs.forEach(function(wi)
                {
                    var pro=Object.values(wi.wish.items);
                    var p=Object.entries(pro);
                    var pq=Object.values(p[0]);
                    var pp=pq[1];
                    var pr=pp.item._id;
                    console.log(pr);
                    var mn;
                    mn=pr.equals(o1); 
                    k.push(mn);
                    console.log(k);
                 
                        /*
                        console.log("new wish");
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
                        }); */
                    
                    
                }) 
                    
                function found(arr, obj) {
                    for (var i = 0; i < arr.length; i++) {
                      if (arr[i] == obj) return true;
                    }
                  }
                   if(found(k,true)==true)
                   {
                    console.log("already added");
                    req.flash('error','Already added to wishlist');
                    req.session.wish=null;
                    res.redirect('/base');
                   }
                   
                   else
                   {    
                    console.log("new wish"); 
                 wishlist.save(function(err,result){
                     if(err){
                         console.log(err);
                     }
                     else {
                     console.log('saved');
                     req.flash('success','Added to wishlist');
                     req.session.wish=null;
                     res.redirect('/base');
                 }
                 }); 
             } 
                    
                //console.log("already added"); */
            }  
           
            else
            
            {    
                   console.log("new user"); 
                wishlist.save(function(err,result){
                    if(err){
                        console.log(err);
                    }
                    else {
                    console.log('saved');
                    req.flash('success','Added to wishlist');
                    req.session.wish=null;
                    res.redirect('/base');
                }
                }); 
            } 
         }); /*
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
        }); */
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