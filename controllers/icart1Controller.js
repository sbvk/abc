const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
var Cartlist1=mongoose.model('Cartlist');
var { findById } = require('../models/cartlist.model');
var emp=new Image();
var Cart=require('../models/cart.model');
var Cartlist=require('../models/cartlist.model');
var Order=require('../models/order.model');
var cartlistModel = require('../models/cartlist.model');

router.get('/', function(req,res,next){
    var mysort = { date: -1 };
    Cartlist.find({id:req.user},function(err,orders){
        if(err){
            console.log(err);
        }
        var cart;//console.log(orders);
        orders.forEach(function(order){
            cart=new Cart(order.cart);
           order.items=cart.generateArray();
            
        });
        res.render('mycart/mycart',{orders:orders});
    }); 

   

});
router.post('/checkout', function(req,res,next){
   
        //var cart=req.session.cart;
       
        var pid=req.user._id; var i=0;
        //var qty=req.body.qty;
        //console.log(qty);
        Cartlist1.find({id:pid},function(err,docs){
          docs.forEach(function(rep){
              var pro=Object.values(rep.cart.items);
              var p=Object.entries(pro);
              var pq=Object.values(p[0]);
              var pp=pq[1];
              var pr=pp.price;
               
              
            if(err)
                console.log(err);
                else{
                
        var order=new Order({
            id:rep.id,
            cart:rep.cart,
            qty:req.body.qty[i],
            totalprice: pr*req.body.qty[i],
            email:req.user.email,
            firstname:req.user.firstname,
            date: new Date()

        }); console.log(req.body.qty[i],pr); i++;
        order.save(function(err,result){
            if(err){
                console.log(err);
            }
            else {
                
            
            Cartlist1.findOneAndDelete({id:pid}, function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        console.log("Deleted : ", docs); 
                        console.log('ordered');
                        req.flash('success','bought');
                        req.session.cart=null;
                        //res.redirect('/icart1');
                    } //res.redirect('/myord');
                }); //res.redirect('/myord');
           
        }
        });
         }
});
});

});


router.post('/reduce/:_id',function(req,res,next){
    var pid=req.params._id;
    Cartlist1.findByIdAndDelete(pid, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
   
    res.redirect('/icart1');
   
 });

 router.post('/remove',function(req,res,next){
  
   Cartlist1.deleteMany({id:req.user},function(err,docs){
    if(err){
        console.log(err);
    }
    
        else{ 
            console.log("Deleted : ", docs); 
        } 
    });
    res.redirect('/icart1');
    
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