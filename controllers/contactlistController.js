const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Contactus=mongoose.model('Contactus');

router.get('/',(req,res)=>{
    Contactus.find((err,docs)=>{
        if(!err){
            res.render("conlist1/conlist1",{
                list:docs
            });
        } else{
            console.log('error :'+err);
        }
    });
});

module.exports=router;