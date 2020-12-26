const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const bcrypt=require('bcrypt-nodejs');
const { ensureAuthenticated } = require('../config/checkAuth');
router.get('/',ensureAuthenticated,function(req,res){
    
       res.render('userpw/userpw'); 
       
 });
 router.post('/pass2',ensureAuthenticated,(req,res)=>{
    var id=req.user._id;
    
     Customer.find(id,(err,docs)=>{
       if(err) {
           console.log(err);
       }
       else {
        bcrypt.compare(req.body.current, req.user.password, (err, isMatch)=>
        {  
            
            if (isMatch) 
           {
             if(req.body.new==req.body.confirm)
             { bcrypt.genSalt(10, function(salt) {
                 bcrypt.hash(req.body.new, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
               
                Customer.findByIdAndUpdate(id, 
                    {
                        password : hash
                        
                    },  function (err, docs) { 
                        if (err){ 
                            console.log(err) 
                        } 
                        else{ 
                            console.log("Updated Password : ", docs); 
                            //res.render('userpw/passer1');
                            req.flash('success','Password changed successfully!' );
                            res.redirect('/login');
                        } 
                    });
              }); });
                
 
             }
             else
             {   
                 req.flash('error','New and confirm passwords dont match' );
                 console.log("passwords dont match");
                 res.redirect('/userpass');
             }
           }else {
             req.flash('error','Current password is wrong' );
               console.log("current password wrong,",);
               res.redirect('/userpass');
               //res.redirect('/pass');
           }
        });
       }
     })
     //.sort(mysort)
 });
module.exports=router;