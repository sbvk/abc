const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const Wishlist=mongoose.model('Wishlist');
const Cartlist=mongoose.model('Cartlist');

router.get('/',function(req,res){
    Customer.find(req.user, function(err, results) {
       res.render('editprofile/editprofile', {
        _id:req.user._id,   
        firstname:req.user.firstname,
        lastname:req.user.lastname,
        email:req.user.email,
        contact:req.user.contact});
        //console.log(req.user.firstname);
}); });

router.get('/delete/:_id',function(req,res,next){
    var email=req.user.email;
    Customer.findByIdAndDelete(req.user._id, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
    Wishlist.deleteMany({email:email}, function (err, docs) { 
        if (err){ 
            console.log("not found") 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
    Cartlist.deleteMany({email:email}, function (err, docs) { 
        if (err){ 
            console.log("not found") 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
    res.redirect('/');
   
 });
 router.post('/update/:_id',function(req,res,next){
    var pid=req.user._id;
    
    Customer.findByIdAndUpdate(pid, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        contact:req.body.contact
    
    },
        function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Updated User : ", docs); 
            } 
        }
    ); 
   
    res.redirect('/edit');
   
 });
module.exports=router;