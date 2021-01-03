const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Contactus=mongoose.model('Contactus');

router.get('/',(req,res)=>{
    res.render("cont/contactus",{
        user:req.user
    });

});
router.post('/',(req,res)=>{
    insertRecord1(req,res);

});
router.post('/reduce/:_id',function(req,res,next){
    var pid=req.params._id;
    Contactus.findByIdAndDelete(pid, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
   
    res.redirect('/conlist');
   
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
        if(!err){
            req.flash('success','Message submitted successfully!');
            res.redirect('/base');
        }
          
        else{
            console.log('error in record inser:'+err);
            }
    },);
    
    
}  
    

  
module.exports=router;