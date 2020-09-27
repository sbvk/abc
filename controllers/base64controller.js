const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
var emp=new Image();

router.get('/',(_req,res)=>{
    Image.find((err,docs)=>{
        if(!err){
            res.render("base/3dm",{
                pictures:docs
            });
        } else{
            console.log('error :'+err);
        }
    });

});

module.exports=router;