const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Contactus=mongoose.model('Contactus');

router.get('/',(_req,res)=>{
    res.render("cont/contactus",{
        
    });

});
router.post('/',(req,res)=>{
    insertRecord1(req,res);

});

function insertRecord1(req,res,err){
    var con=new Contactus();
    con.date=new Date();
    con.firstname=req.body.firstname;
    con.lastname=req.body.lastname;
    con.contact=req.body.contact;
    con.email=req.body.email;
    con.message=req.body.message;
    con.save((err,doc)=>{
        if(!err)
            res.redirect('/')
        else{
            console.log('error in record inser:'+err);
            }
    },);
    
    
}  
    

  
module.exports=router;