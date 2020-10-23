const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Contactus=mongoose.model('Contactus');

router.get('/',(req,res)=>{
    var mysort = { date: -1 };
    var thumb = []
    Contactus.find((err,docs)=>{
        if(!err){
            for (var result of docs) {
                thumb.push(result);    
            }
            res.render("conlist1/conlist1",{
               thumb
            });
        } else{
            console.log('error :'+err);
        }
    }).sort(mysort)
});

module.exports=router;