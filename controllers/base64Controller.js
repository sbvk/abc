const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');
var emp=new Image();

router.get('/',(_req,res)=>{
  /*  Image.find((err,docs)=>{
        if(!err){
            res.render("base/3dm",{
                pictures:docs
            });
        } else{
            console.log('error :'+err);
        }
    }*/
    
    Image.findById('5f7dc7398696fa3f34a65e24', function(err, result) {
        if (err) throw (err);
    
        var thumb = result.img.data.toString('base64');
        res.render('base/3dm', {img: thumb});
    });


});

module.exports=router;