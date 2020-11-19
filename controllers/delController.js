const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Image=mongoose.model('Image');

router.get('/',(_req,res)=>{ var mysort = { date: -1 };
    Image.find({}, (err, results) => {
        if (err) throw err
        var thumb = []
      
        for (var result of results) {
            thumb.push(result);
        }
        res.render('del/del', {
            thumb
     
           
        })
      })

});
router.post('/reduce/:_id',function(req,res,next){
    var pid=req.params._id;
    Image.findByIdAndDelete(pid, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
   
    res.redirect('/dele');
   
 });
 router.post('/update/:_id',function(req,res,next){
    var pid=req.params._id;
    var emp=new Image();
    Image.findByIdAndUpdate(pid, {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price
    
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
   
    res.redirect('/dele');
   
 });
module.exports=router;