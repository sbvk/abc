const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');

router.get('/',(req,res)=>{
    Customer.find((err,docs)=>{
        if(!err){
            res.render("list/list",{
                list:docs
            });
        } else{
            console.log('error :'+err);
        }
    });
});

module.exports=router;