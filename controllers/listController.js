const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Customer=mongoose.model('Customer');

router.get('/',(req,res)=>{
    var mysort = { date: -1 };
    var thumb = []
    var arr=[]
    var cap=[]
    Customer.find((err,docs)=>{
        if(!err){
            for (var result of docs) {
                thumb.push(result);    
            }
           
            res.render("list/list",{thumb});
        } else{
            console.log('error :'+err);
        }
    })
    //.sort(mysort)
});

module.exports=router;