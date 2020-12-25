const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');
const bcrypt=require('bcryptjs');
router.get('/',function(req,res){
    
       res.render('userpw/userpw'); 
       
 });
 router.post('/pass2',(req,res)=>{
    var id=req.user._id;
    
     Customer.find(id,(err,docs)=>{
       if(err) {
           console.log(err);
       }
       else {
        bcrypt.compare(req.body.current, req.user.password, (err, isMatch)=>
        {   bcrypt.hash(req.body.current, 10, function(err, hash){
            console.log(req.user.password);
            console.log(hash);console.log(req.body.new);console.log(req.body.confirm);

        })
            if (isMatch) 
           {
             if(req.body.new==req.body.confirm)
             { bcrypt.hash(req.body.new, 10, function(err, hash) {
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
                            res.render('userpw/passer1');
                        } 
                    });
              }); 
                
 
             }
             else
             {   
                 req.flash('confirm','New and confirm passwords dont match' );
                 res.send(req.flash('confirm'));
                 console.log("passwords dont match");
             }
           }else {
             req.flash('pass','Current password is wrong' );
             res.send(req.flash('pass'));
               console.log("current password wrong,",);
               //res.redirect('/pass');
           }
        });
       }
     })
     //.sort(mysort)
 });
module.exports=router;