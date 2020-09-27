const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
var emp=new Image();


router.get('/',(_req,res)=>{
    res.render("pic/3dmodel",{
        
    });

});



module.exports=router;
